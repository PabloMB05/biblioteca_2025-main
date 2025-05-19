import { createActionsColumn, createDateColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Reservation, useDeleteReservation, useReservations } from '@/hooks/reservations/useReservations';
import { useTranslations } from '@/hooks/use-translations';
import { ReservationLayout } from '@/layouts/Reservations/ReservationLayout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IndexReservationProps extends PageProps {
    lang: string;
}
export default function ReservationsIndex({lang}:IndexReservationProps) {
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
        filters.book ? filters.book : 'null',
        filters.user ? filters.user : 'null',
        filters.queue ? filters.queue : 'null',
        filters.start_date ? filters.start_date : 'null',
    ];
    const {
        data: reservations,
        isLoading,
        isError,
        refetch,
    } = useReservations({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteReservationMutation = useDeleteReservation();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteReservation = async (id: string) => {
        try {
            await deleteReservationMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.reservations.deleted_error') || 'Error deleting reservation');
            console.error('Error deleting reservation:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Reservation>({
                    id: 'book_title',
                    header: t('ui.reservations.columns.book_id') || 'book_id',
                    accessorKey: 'book_title',
                }),
                createTextColumn<Reservation>({
                    id: 'user_mail',
                    header: t('ui.reservations.columns.user_id') || 'user_id',
                    accessorKey: 'user_mail',
                }),
                createTextColumn<Reservation>({
                    id: 'puesto',
                    header: t('ui.reservations.columns.puesto') || 'puesto',
                    accessorKey: 'puesto',
                }),
                createDateColumn<Reservation>({
                    id: 'created_at',
                    header: t('ui.reservations.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createActionsColumn<Reservation>({
                    id: 'actions',
                    header: t('ui.reservations.columns.actions') || 'Actions',
                    renderActions: (reservation) => (
                        <>
                            <DeleteDialog
                                id={reservation.id}
                                successMessage={t('messages.reservations.deleted')}
                                onDelete={handleDeleteReservation}
                                title={t('ui.reservations.delete.title') || 'Delete reservation'}
                                description={
                                    t('ui.reservations.delete.description') ||
                                    'Are you sure you want to delete this reservation? This action cannot be undone.'
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
            ] as ColumnDef<Reservation>[],
        [t, handleDeleteReservation],
    );

    return (
        <ReservationLayout title={t('ui.reservations.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.reservations.title')}</h1>
                    </div>
                    <div></div>

                    <div className="space-y-4">
                        <FiltersTable
                            lang={lang}
                            filters={
                                [
                                    {
                                        id: 'book',
                                        label: t('ui.reservations.filters.book') || 'Libro',
                                        type: 'text',
                                        placeholder: t('ui.reservations.placeholders.book') || 'Libro...',
                                    },
                                    {
                                        id: 'user',
                                        label: t('ui.reservations.filters.email') || 'Usuario',
                                        type: 'text',
                                        placeholder: t('ui.reservations.placeholders.user') || 'Usuario...',
                                    },
                                    {
                                        id: 'queue',
                                        label: t('ui.reservations.filters.queue') || 'Queue',
                                        type: 'number',
                                        min: 1,
                                        step: 1,
                                        placeholder: t('ui.reservations.placeholders.queue') || 'Queue...',
                                    },
                                    {
                                        id: 'start_date',
                                        label: t('ui.loans.filters.start_date') || 'Starting date',
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.start_date') || 'Starting date...',

                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={setFilters}
                            initialValues={filters}
                        />
                    </div>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={10} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.reservations.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.reservations.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        reservations ?? {
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
                                    noResultsMessage={t('ui.reservations.no_results') || 'No reservations found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ReservationLayout>
    );
}