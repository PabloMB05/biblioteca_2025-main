import { createActionsColumn, createDateColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, useBooks, useDeleteBook } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { BookPlus, Check, PencilIcon, PlusIcon, TrashIcon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function BooksIndex() {
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
        filters.title ? filters.title : 'null',
        filters.genres ? filters.genres : 'null',
        filters.author ? filters.author : 'null',
        filters.pages ? filters.pages : 'null',
        filters.publisher ? filters.publisher : 'null',
        filters.floor ? filters.floor : 'null',
        filters.zone ? filters.zone : 'null',
        filters.bookcase ? filters.bookcase : 'null',
    ];

    const {
        data: books,
        isLoading,
        isError,
        refetch,
    } = useBooks({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });

    const deleteBookMutation = useDeleteBook();

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

    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookMutation.mutateAsync(id);
            toast.success(t('ui.books.deleted_success') || 'Book deleted successfully');
            refetch();
        } catch (error) {
            toast.error(t('ui.books.deleted_error') || 'Error deleting book');
            console.error('Error deleting book:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Book>({
                    id: 'title',
                    header: t('ui.books.columns.title') || 'Title',
                    accessorKey: 'title',
                }),
                createTextColumn<Book>({
                    id: 'genres',
                    header: t('ui.books.columns.genres') || 'Genres',
                    accessorKey: 'genres',
                    format: (value) => {
                        let aux;
                        let res: string[] = [];
                        if (value.includes(',')) {
                            aux = value.split(', ');
                            aux.map((genre) => {
                                genre = t(`ui.genres.names.${genre}`);
                                res.push(genre);
                            });
                            aux = res.join(', ');
                            return aux;
                        } else {
                            return t(`ui.genres.names.${value}`);
                        }
                    },
                }),
                createTextColumn<Book>({
                    id: 'author',
                    header: t('ui.books.columns.author') || 'Author',
                    accessorKey: 'author',
                }),
                createTextColumn<Book>({
                    id: 'length',
                    header: t('ui.books.columns.length') || 'Length',
                    accessorKey: 'length',
                }),
                createTextColumn<Book>({
                    id: 'editor',
                    header: t('ui.books.columns.editor') || 'Editor',
                    accessorKey: 'editor',
                }),
                createActionsColumn<Book>({
                    id: 'isbn',
                    header: t('ui.books.columns.isbn') || 'ISBN',
                   renderActions: (books) =>{
                    let $isbn = books.isbn;
                    let $isbn_count = books.count_book;
                    let $isbn_count_loan = books.count_loan_book;
                    return(
                        <span>{$isbn} <p>({$isbn_count_loan}/{$isbn_count})</p> </span>
                    )

                   }
                }),
                 createTextColumn<Book>({
                    id: 'avaiable',
                    header: t('ui.loans.columns.avaiable') || 'avaiable',
                    accessorKey: 'avaiable',
                    format: (value) => (value ? <Check/>: <X/>),
                }),
                createTextColumn<Book>({
                    id: 'floor_id',
                    header: t('ui.books.columns.floor') || 'Floor',
                    accessorKey: 'floor_id',
                }),
                createTextColumn<Book>({
                    id: 'zone_id',
                    header: t('ui.books.columns.zone') || 'Zone',
                    accessorKey: 'zone_id',
                }),
                createTextColumn<Book>({
                    id: 'bookcase_id',
                    header: t('ui.books.columns.bookcase') || 'Bookcase',
                    accessorKey: 'bookcase_id',
                }),
                createDateColumn<Book>({
                    id: 'created_at',
                    header: t('ui.books.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createActionsColumn<Book>({
                    id: 'actions',
                    header: t('ui.books.columns.actions') || 'Actions',
                    renderActions: (book) => (
                        <div className="flex gap-2">
                             <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    title={t('ui.books.buttons.edit') || 'Edit book'}
                                    className="hover:bg-primary/10"
                                >
                                    <BookPlus className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    title={t('ui.books.buttons.edit') || 'Edit book'}
                                    className="hover:bg-primary/10"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                            <DeleteDialog
                                id={book.id}
                                onDelete={handleDeleteBook}
                                title={t('ui.books.delete.title') || 'Delete book'}
                                description={
                                    t('ui.books.delete.description') || 'Are you sure you want to delete this book? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete user'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
                    ),
                }),
            ] as ColumnDef<Book>[],
        [t, handleDeleteBook],
    );

    return (
        <BookLayout title={t('ui.books.title')}>
            <div className="container py-8">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t('ui.books.title')}</h1>
                            <p className="text-muted-foreground mt-2">
                            </p>
                        </div>
                        <Link href="/books/create">
                            <Button className="gap-2">
                                <PlusIcon className="h-4 w-4" />
                                {t('ui.books.buttons.new')}
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardContent>
                            <FiltersTable
                                filters={
                                    [
                                        {
                                            id: 'title',
                                            label: t('ui.bookcases.filters.title') || 'Title',
                                            type: 'text',
                                            placeholder: t('ui.bookcases.placeholders.title') || 'Search by title...',
                                        },
                                        {
                                            id: 'genres',
                                            label: t('ui.bookcases.filters.genres') || 'Genres',
                                            type: 'text',
                                            placeholder: t('ui.bookcases.placeholders.genres') || 'Search by genre...',
                                        },
                                        {
                                            id: 'author',
                                            label: t('ui.bookcases.filters.author') || 'Author',
                                            type: 'text',
                                            placeholder: t('ui.bookcases.placeholders.author') || 'Search by author...',
                                        },
                                        {
                                            id: 'pages',
                                            label: t('ui.bookcases.filters.pages') || 'Pages',
                                            type: 'number',
                                            placeholder: t('ui.bookcases.placeholders.pages') || 'Filter by pages...',
                                        },
                                        {
                                            id: 'publisher',
                                            label: t('ui.bookcases.filters.publisher') || 'Publisher',
                                            type: 'text',
                                            placeholder: t('ui.bookcases.placeholders.publisher') || 'Search by publisher...',
                                        },
                                        {
                                            id: 'floor',
                                            label: t('ui.bookcases.filters.floor') || 'Floor',
                                            type: 'number',
                                            placeholder: t('ui.bookcases.placeholders.floor') || 'Filter by floor...',
                                        },
                                        {
                                            id: 'zone',
                                            label: t('ui.bookcases.filters.zone') || 'Zone',
                                            type: 'number',
                                            placeholder: t('ui.bookcases.placeholders.zone') || 'Filter by zone...',
                                        },
                                        {
                                            id: 'bookcase',
                                            label: t('ui.bookcases.filters.bookcase') || 'Bookcase',
                                            type: 'number',
                                            placeholder: t('ui.bookcases.placeholders.bookcase') || 'Filter by bookcase...',
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
                                <TableSkeleton columns={10} rows={10} />
                            ) : isError ? (
                                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                                    <div className="text-destructive">
                                        {t('ui.books.error_loading') || 'Error loading books'}
                                    </div>
                                    <Button onClick={() => refetch()} variant="outline">
                                        {t('ui.books.buttons.retry') || 'Retry'}
                                    </Button>
                                </div>
                            ) : (
                                <Table
                                    data={
                                        books ?? {
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
                                    noResultsMessage={t('ui.books.no_results') || 'No books found'}
                                    className="rounded-lg border"
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </BookLayout>
    );
}