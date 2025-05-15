import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book, useBooks, useDeleteBook , useUsers  } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Import, HandHelping, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner'; 
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // función utilitaria para combinar clases


interface BookIndexProps {
  floor_list: number[];
  zone_list: number[];
  bookcase_list: number[];
}

export default function BooksIndex({ floor_list, zone_list, bookcase_list }: BookIndexProps) {
  // Agrega el hook para obtener usuarios
  const { data: users = [], isLoading: usersLoading, isError: usersError } = useUsers();

  const emailOptions = useMemo(() => {
    return users.map(user => ({
      value: user.email,
      label: user.email,
    }));
  }, [users]);
  

  const { t } = useTranslations();
  const { url } = usePage();
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const pageParam = urlParams.get('page');
  const perPageParam = urlParams.get('per_page');

  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reserMail, setReserMail] = useState('');
  const [emailOpen, setEmailOpen] = useState(false);

  const combinedSearch = [
    filters.title || 'null',
    filters.genres || 'null',
    filters.author || 'null',
    filters.pages || 'null',
    filters.publisher || 'null',
    filters.floor || 'null',
    filters.zone || 'null',
    filters.bookcase || 'null',
    filters.ISBN || 'null',
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

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleLoanButton = (bookID: string) => router.get('/loans/create', { bookID });

  const handleFilterChange = (newFilters: Record<string, any>) => {
    const filtersChanged = newFilters !== filters;
    if (filtersChanged) setCurrentPage(1);
    setFilters(newFilters);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBookMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t('ui.books.deleted_error') || 'Error deleting book');
      console.error('Error deleting book:', error);
    }
  };

  const HandleReservation = (bookID: string, userMail: string) => {
    const reservationData = new FormData();
    reservationData.append('bookID', bookID);
    reservationData.append('userMail', userMail);
    router.post('/reservations', reservationData);
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
          id: 'isbn',
          header: t('isbn') || 'ISBN',
          accessorKey: 'isbn',
          format: (value) => `${value.number} - (${value.loans}/${value.total})`,
        }),
        createTextColumn<Book>({
          id: 'genres',
          header: t('ui.books.columns.genres') || 'Genres',
          accessorKey: 'genres',
          format: (value) => {
            if (value.includes(',')) {
              const genres = value.split(', ').map((g) => t(`ui.genres.names.${g}`));
              return genres.join(', ');
            }
            return t(`ui.genres.names.${value}`);
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
        createActionsColumn<Book>({
          id: 'actions',
          header: t('ui.books.columns.actions') || 'Actions',
          renderActions: (book) => (
            <>
              {!book.hasActive && (
                <Button
                  disabled={book.hasActive}
                  onClick={() => handleLoanButton(book.id)}
                  variant="outline"
                  size="icon"
                  title={t('ui.books.buttons.loan') || 'Loan book'}
                >
                  <HandHelping className="h-4 w-4 text-green-500" />
                </Button>
              )}

              {book.hasActive && (
                <Button
                  variant="outline"
                  size="icon"
                  title={t('ui.books.buttons.queue') || 'Reserve book'}
                  onClick={() => {
                    setSelectedBook(book);
                    setOpen(true);
                  }}
                >
                  <Import className="h-4 w-4 text-orange-500" />
                </Button>
              )}

              <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                <Button variant="outline" size="icon" title={t('ui.books.buttons.edit') || 'Edit book'}>
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </Link>

              <DeleteDialog
                id={book.id}
                successMessage={t('messages.books.deleted')}
                onDelete={handleDeleteBook}
                title={t('ui.books.delete.title') || 'Delete book'}
                description={
                  t('ui.books.delete.description') ||
                  'Are you sure you want to delete this book? This action cannot be undone.'
                }
                trigger={
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title={t('ui.users.buttons.delete') || 'Delete book'}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                }
              />
            </>
          ),
        }),
      ] as ColumnDef<Book>[],
    [t, handleDeleteBook]
  );

  return (
    <BookLayout title={t('ui.books.title')}>
      <div className="p-4 sm:p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{t('ui.books.title')}</h1>
            <Link href="/books/create" className="w-full md:w-auto">
              <Button className="w-full md:w-auto">
                <PlusIcon className="mr-2 h-4 w-4" />
                {t('ui.books.buttons.new')}
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <FiltersTable
            filters={[
              { id: 'title', label: t('ui.books.filters.title') || 'Título', type: 'text', placeholder: 'Título...' },
              { id: 'ISBN', label: t('ISBN'), type: 'text', placeholder: 'ISBN...' },
              { id: 'genres', label: t('ui.books.filters.genres'), type: 'text', placeholder: 'Géneros...' },
              { id: 'author', label: t('ui.books.filters.author'), type: 'text', placeholder: 'Autor...' },
              { id: 'pages', label: t('ui.books.filters.pages'), type: 'number', placeholder: 'Páginas...' },
              { id: 'publisher', label: t('ui.books.filters.publisher'), type: 'text', placeholder: 'Editorial...' },
              { id: 'floor', label: t('ui.books.filters.floor'), type: 'select', options: floor_list, placeholder: 'Piso...' },
              { id: 'zone', label: t('ui.books.filters.zone'), type: 'select', options: zone_list, placeholder: 'Zona...' },
              { id: 'bookcase', label: t('ui.books.filters.bookcase'), type: 'select', options: bookcase_list, placeholder: 'Estantería...' },
            ]}
            onFilterChange={handleFilterChange}
            initialValues={filters}
            containerClassName="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          />
            <div>{t('ui.books.total')}: {books?.meta.total}</div>
          {/* Table */}
          <div className="w-full overflow-auto">
            {isLoading ? (
              <TableSkeleton columns={10} rows={10} />
            ) : isError ? (
              <div className="p-4 text-center">
                <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                <Button onClick={() => refetch()} variant="outline">
                  {t('ui.books.buttons.retry')}
                </Button>
              </div>
            ) : (
              <Table
                data={
                  books ?? {
                    data: [],
                    meta: { current_page: 1, from: 0, last_page: 1, per_page: perPage, to: 0, total: 0 },
                  }
                }
                columns={columns}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                perPageOptions={[10, 25, 50, 100]}
                noResultsMessage={t('ui.books.no_results') || 'No books found'}
              />
            )}
          </div>
        </div>
      </div>

      {/* Reservation Dialog */}
{/* Reservation Dialog */}
<Dialog
  open={open}
  onOpenChange={(val) => {
    setOpen(val);
    if (!val) {
      setReserMail('');
      setSelectedBook(null);
    }
  }}
>
  <DialogContent className="w-[90vw] max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{t('ui.reservations.utils.title')}</DialogTitle>
      <DialogDescription>{t('ui.reservations.utils.description')}</DialogDescription>
    </DialogHeader>

    {selectedBook && (
      <div className="grid gap-4 py-4">
        {/* Book title */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="book-title" className="text-right">
            {t('ui.reservations.utils.book')}
          </Label>
          <Input
            id="book-title"
            disabled
            value={selectedBook?.title || ''}
            className="col-span-3"
          />
        </div>
        {/* Email selector using Command + Popover */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            {t('ui.reservations.utils.email')}
          </Label>
          <Popover open={emailOpen} onOpenChange={setEmailOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={emailOpen}
                className="w-full justify-between col-span-3"
              >
                {reserMail || t('ui.reservations.utils.select_email') || 'Selecciona un email'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder={t('ui.reservations.utils.search_email') || 'Buscar email...'}
                />
                <CommandEmpty>
                  {t('ui.reservations.utils.no_email') || 'No se encontraron correos.'}
                </CommandEmpty>
                <CommandGroup>
                  {emailOptions.map((email) => (
                    <CommandItem
                      key={email.value}
                      value={email.value}
                      onSelect={(currentValue) => {
                        const matched = emailOptions.find(
                          (opt) => opt.value.toLowerCase() === currentValue.toLowerCase()
                        );
                        setReserMail(matched?.value || currentValue);
                        setEmailOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          reserMail === email.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {email.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )}
    <DialogFooter>
      <Button
        onClick={() => {
          if (!selectedBook || !reserMail) {
            toast.error(t('ui.reservations.utils.required_fields') || 'Selecciona un libro y un correo.');
            return;
          }
          HandleReservation(selectedBook.id, reserMail);
          setOpen(false);
        }}
      >
        {t('ui.reservations.utils.confirm')}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </BookLayout>
  );
}
