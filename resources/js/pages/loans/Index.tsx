import { createActionsColumn, createDateColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loan, useLoans, useDeleteLoan } from '@/hooks/loans/useLoans';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Check, PencilIcon, PlusIcon, TrashIcon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function LoansIndex() {
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

    const combinedSearch = [
        filters.user_email ? filters.user_email : 'null',
        filters.book_title ? filters.book_title : 'null',
        filters.due_date ? filters.due_date : 'null',
    ];

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
        setFilters(newFilters);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteLoan = async (id: string) => {
        try {
            await deleteLoanMutation.mutateAsync(id);
            toast.success(t('ui.loans.deleted_success') || 'Loan deleted successfully');
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
                    id: 'user_email',
                    header: t('ui.loans.columns.user_id') || 'user email',
                    accessorKey: 'user_email',
                }),
                createTextColumn<Loan>({
                    id: 'book_title',
                    header: t('ui.loans.columns.book_id') || 'Book title',
                    accessorKey: 'book_title',
                }),
                createDateColumn<Loan>({
                    id: 'due_date',
                    header: t('ui.loans.columns.due_date') || 'Due Date',
                    accessorKey: 'due_date',
                }),
                createTextColumn<Loan>({
                    id: 'is_active',
                    header: t('ui.loans.columns.is_active') || 'Active',
                    accessorKey: 'is_active',
                    format: (value) => (value ? <Check/>: <X/>),
                }),
                createTextColumn<Loan>({
                    id: 'is_late',
                    header: t('ui.loans.columns.is_late') || 'Late',
                    accessorKey: 'is_late',
                    format: (value) => (value ? <Check/>: <X/>),
                }),                
                createDateColumn<Loan>({
                    id: 'return_date',
                    header: t('ui.loans.columns.return_date') || 'Created At',
                    accessorKey: 'return_date',
                }),
                createDateColumn<Loan>({
                    id: 'created_at',
                    header: t('ui.loans.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),

                createActionsColumn<Loan>({
                    id: 'actions',
                    header: t('ui.loans.columns.actions') || 'Actions',
                    renderActions: (loan) => (
                        <div className="flex gap-2">
                            <Link href={`/loans/${loan.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    title={t('ui.loans.buttons.edit') || 'Edit loan'}
                                    className="hover:bg-primary/10"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                                
                            </Link>
                            <DeleteDialog
                                id={loan.id}
                                onDelete={handleDeleteLoan}
                                title={t('ui.loans.delete.title') || 'Delete loan'}
                                description={
                                    t('ui.loans.delete.description') || 'Are you sure you want to delete this loan? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        title={t('ui.loans.buttons.delete') || 'Delete loan'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
                    ),
                }),
            ] as ColumnDef<Loan>[],
        [t, handleDeleteLoan],

    );

    return (

        <LoanLayout title={t('ui.loans.title')}>
            <div className="container py-8 ml-4">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t('ui.loans.title')}</h1>
                            <p className="text-muted-foreground mt-2">
                            </p>
                        </div>
                        <Link href="/loans/create">
                            <Button className="gap-2 mr-10">
                                <PlusIcon className="h-4 w-4" />
                                {t('ui.loans.buttons.new')}
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardContent>
                            <FiltersTable
                                filters={
                                    [
                                        {
                                            id: 'user_email',
                                            label: t('ui.loans.filters.user_email') || 'User Email',
                                            type: 'text',
                                            placeholder: t('ui.loans.placeholders.user_email') || 'Search by user ID...',
                                        },
                                        {
                                            id: 'book_title',
                                            label: t('ui.loans.filters.book_title') ,
                                            type: 'text',
                                            placeholder: t('ui.loans.placeholders.book_title') || 'Search by book ID...',
                                        },
                                        {
                                            id: 'due_date',
                                            label: t('ui.loans.filters.due_date') || 'Due Date',
                                            type: 'date',
                                            placeholder: t('ui.loans.placeholders.due_date') || 'Filter by due date...',
                                        },
                                    ] as FilterConfig[]
                                }
                                onFilterChange={handleFilterChange}
                                initialValues={filters}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            {isLoading ? (
                                <TableSkeleton columns={7} rows={10} />
                            ) : isError ? (
                                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                                    <div className="text-destructive">
                                        {t('ui.loans.error_loading') || 'Error loading loans'}
                                    </div>
                                    <Button onClick={() => refetch()} variant="outline">
                                        {t('ui.loans.buttons.retry') || 'Retry'}
                                    </Button>
                                </div>
                            ) : (
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
                                    className="rounded-lg border"
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LoanLayout>
    );
}
