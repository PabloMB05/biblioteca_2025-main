import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTableloans';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Loan, useDeleteLoan, useLoans } from '@/hooks/loans/useLoans';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { BookDown, Clock, PencilIcon, PlusIcon, TrashIcon, TriangleAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IndexLoanProps extends PageProps {
    lang: string;
}
export default function LoansIndex({lang}:IndexLoanProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});
    // Combine name and email filters into a single search string if they exist
    const combinedSearch = [
        filters.email ? filters.email : 'null',
        filters.book ? filters.book : 'null',
        filters.status ? filters.status : 'null',
        filters.start_date ? filters.start_date : 'null',
        filters.due_date ? filters.due_date : 'null',
        // filters.capacity ? filters.capacity : 'null',
        // filters.genre ? filters.genre : 'null',
        // filters.floor ? filters.floor : 'null',
    ];

    function handleReturnButton(loan_id: string) {
        const newStatus = false;
        const information = new FormData();
        information.append('newStatus', newStatus);
        information.append('_method', 'PUT');
        router.post(`/loans/${loan_id}`, information);
        setTimeout(function () {
            refetch(); //no recargar pagina solo refetch
        }, 500);
    }

    function handleAmpliacion(loan_id: string, due_date: string, days: number) {
        let dayE = parseInt(due_date.slice(0, 2));
        console.log(dayE);
        let monthE = parseInt(due_date.slice(3, 5));
        console.log(monthE);
        let yearE = parseInt(due_date.slice(6, 10));
        console.log(yearE);

        let dateE = new Date(yearE, monthE - 1, dayE);

        dateE.setDate(dateE.getDate() + days);

        const dateEString = dateE.toLocaleString('en-GB', { timeZone: 'Europe/Madrid' });

        console.log(dateEString);
        const information = new FormData();
        information.append('newDueDate', dateEString);
        information.append('_method', 'PUT');
        console.log(information);
        router.post(`/loans/${loan_id}`, information);
        refetch(); //no recargar pagina solo refetch
    }

    const {
        data: loans,
        isLoading,
        isError,
        refetch,
    } = useLoans({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteLoanMutation = useDeleteLoan();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters!==filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
        };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteLoan = async (id: string) => {
        try {
            await deleteLoanMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.loans.deleted_error') || 'Error deleting loan');
            console.error('Error deleting loan:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Loan>({
                    id: 'title',
                    header: t('ui.loans.columns.book') || 'Book',
                    accessorKey: 'title',
                }),
                createTextColumn<Loan>({
                    id: 'email',
                    header: t('ui.loans.columns.email') || 'Email',
                    accessorKey: 'email',
                }),
                createTextColumn<Loan>({
                    id: 'is_active',
                    header: t('ui.loans.columns.status') || 'Status',
                    accessorKey: 'is_active',
                    format: (value) => {
                        return value ? t('ui.loans.utils.inProgress') : t('ui.loans.utils.finished');
                    },
                }),
                createTextColumn<Loan>({
                    id: 'created_at',
                    header: t('ui.loans.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createActionsColumn<Loan>({
                    id: 'remaining',
                    header: t('ui.loans.columns.remaining') || 'Remaining',
                    renderActions: (loan) => {
                        const textDays = t('ui.loans.utils.days');
                        const textHours = t('ui.loans.utils.hours');
                        const textMinutes = t('ui.loans.utils.minutes');

                        let intHours = loan.hours_between;
                        let intDays = Math.trunc(intHours / 24);
                        let intMinutes = Math.trunc(intHours * 60);

                        let absMinutes = Math.abs(intMinutes);
                        let absHours = Math.abs(intHours);
                        let absDays = Math.abs(intDays);

                        let intHoursD = loan.hoursDue_between;
                        let intDaysD = Math.trunc(intHoursD / 24);
                        let intMinutesD = Math.trunc(intHoursD * 60);

                        let absMinutesD = Math.abs(intMinutesD);
                        let absHoursD = Math.abs(intHoursD);
                        let absDaysD = Math.abs(intDaysD);

                        const overdue = loan.hours_between < 0;
                        const followup = overdue ? t('ui.loans.utils.overdue') : t('ui.loans.utils.remaining');

                        let dayD = parseInt(loan.due_date.slice(0, 2));
                        let monthD = parseInt(loan.due_date.slice(3, 5));
                        let yearD = parseInt(loan.due_date.slice(6, 10));

                        let dayE = parseInt(loan.returned_at.slice(0, 2));
                        let monthE = parseInt(loan.returned_at.slice(3, 5));
                        let yearE = parseInt(loan.returned_at.slice(6, 10));

                        let dateE = new Date(yearE, monthE, dayE);
                        let dateD = new Date(yearD, monthD, dayD);

                        let comprobanteTarde = dateE > dateD;

                        return (
                            <section>
                                {loan.is_active && (
                                    <span className={`flex items-center gap-1 ${overdue ? 'text-red-500' : ''}`}>
                                        {absDays == 0
                                            ? absHours == 0
                                                ? absMinutes + ' ' + textMinutes
                                                : absHours + ' ' + textHours
                                            : absDays + ' ' + textDays}
                                        {followup}
                                        {overdue && <TriangleAlert className="text-yellow-500" />}
                                    </span>
                                )}
                                {!loan.is_active && (
                                    <span className={`flex items-center gap-1 ${comprobanteTarde ? 'text-red-500' : ''}`}>
                                        {t('ui.loans.utils.returned')}: {loan.returned_at}
                                        <br />
                                        {comprobanteTarde &&
                                            (absDaysD == 0
                                                ? absHoursD == 0
                                                    ? absMinutesD + ' ' + textMinutes
                                                    : absHoursD + ' ' + textHours
                                                : absDaysD + ' ' + textDays)}
                                        {comprobanteTarde && followup}
                                    </span>
                                )}
                            </section>
                        );
                    },
                }),
                createTextColumn<Loan>({
                    id: 'due_date',
                    header: t('ui.loans.columns.duedate') || 'Due Date',
                    accessorKey: 'due_date',
                }),
                createActionsColumn<Loan>({
                    id: 'actions',
                    header: t('ui.loans.columns.actions') || 'Actions',
                    renderActions: (loan) => (
                        <>
                            <Button
                                disabled={!loan.is_active}
                                onClick={() => handleReturnButton(loan.id)}
                                variant="outline"
                                size="icon"
                                title={t('ui.loans.buttons.return') || 'Return book'}
                            >
                                <BookDown className="h-4 w-4" />
                            </Button>
                            <Button
                                disabled={!loan.is_active}
                                onClick={() => handleAmpliacion(loan.id, loan.due_date, 7)}
                                variant="outline"
                                size="icon"
                                title={t('ui.loans.buttons.delayOneWeek') || 'Return book'}
                            >
                                <Clock className="h-4 w-4" />
                            </Button>
                            <Link disabled={!loan.is_active} href={`/loans/${loan.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button variant="outline" size="icon" title={t('ui.loans.buttons.edit') || 'Edit loan'}>
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                            <DeleteDialog
                                id={loan.id}
                                 successMessage={t('messages.loans.deleted')}
                                onDelete={handleDeleteLoan}
                                title={t('ui.loans.delete.title') || 'Delete loan'}
                                description={
                                    t('ui.loans.delete.description') || 'Are you sure you want to delete this loan? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete user'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Loan>[],
        [t, handleDeleteLoan],
    );

    return (
        <LoanLayout title={t('ui.loans.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>
                        
                    </div>

                    <div className="space-y-4">
                        <FiltersTable
                        lang={lang}
                            filters={
                                [
                                    {
                                        id: 'book',
                                        label: t('ui.loans.filters.book') || 'Book',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.booktitle') || 'Book...',
                                    },
                                    {
                                        id: 'email',
                                        label: t('ui.loans.filters.email') || 'Email',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.email') || 'Email...',
                                    },
                                    {
                                        id: 'status',
                                        label: t('ui.loans.filters.status') || 'Status',
                                        type: 'select',
                                        options: [
                                            { label: t('ui.loans.utils.inProgress'), value: 'true' },
                                            { label: t('ui.loans.utils.finished'), value: 'false' },
                                        ],
                                        placeholder: t('ui.loans.placeholders.status') || 'Status...',
                                    },
                                    {
                                        id: 'start_date',
                                        label: t('ui.loans.filters.start_date') || 'Starting date',
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.start_date') || 'Starting date...',
                                    },
                                    {
                                        id: 'due_date',
                                        label: t('ui.loans.filters.due_date') || 'Due date',
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.due_date') || 'Due date...',

                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                    </div>
                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={10} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.loans.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        loans ?? {
                                            data: [],
                                            meta: {
                                                current_page: 1,
                                                from: 0,
                                                last_page: 1,
                                                per_page: perPage,
                                                to: 0,
                                                total: 0,
                                            },
                                        }
                                    }
                                    columns={columns}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                    perPageOptions={[10, 25, 50, 100]}
                                    noResultsMessage={t('ui.loans.no_results') || 'No loans found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LoanLayout>
    );
}