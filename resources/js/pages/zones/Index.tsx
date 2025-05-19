import { Button } from "@/components/ui/button";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { Zone, useDeleteZone, useZones } from "@/hooks/zones/useZones";
import { PencilIcon, PlusIcon, TrashIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function ZonesIndex() {
  const { t } = useTranslations();
  const { url } = usePage();

  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const pageParam = urlParams.get('page');
  const perPageParam = urlParams.get('per_page');

  // Estados
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [genre, setGenre] = useState<string | null>(null);
  const [genreOpen, setGenreOpen] = useState(false);

const searchFilters = [
  filters.number || "null",
  filters.capacity || "null",
  filters.floor || "null",  // Ahora el piso va en la posición 2
  genre || "null"           // El género va en la posición 3
];

  // Obtener datos
  const { data: zones, isLoading, isError, refetch } = useZones({
    search: searchFilters,
    page: currentPage,
    perPage: perPage,
  });

  // Obtener opciones de género
  const { data: zonesData } = useZones({ search: ["null", "null", "null", "null"], page: 1, perPage: 1000 });
  const genreOptions = useMemo(() => {
    if (!zonesData?.data) return [];
    const uniqueGenres = new Set<string>();
    zonesData.data.forEach((zone) => {
      if (zone.genre_name) uniqueGenres.add(zone.genre_name);
    });
    return Array.from(uniqueGenres).map((g) => ({ label: g, value: g }));
  }, [zonesData?.data]);

  const deleteZoneMutation = useDeleteZone();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleDeleteZone = async (id: string) => {
    try {
      await deleteZoneMutation.mutateAsync(id);
      refetch();
      toast.success(t("messages.zones.deleted") || "Zone deleted successfully");
    } catch (error) {
      toast.error(t("ui.zones.deleted_error") || "Error deleting zone");
      console.error("Error deleting zone:", error);
    }
  };

  // Columnas tabla
  const columns = useMemo(() => [
    createTextColumn<Zone>({
      id: "number",
      header: t("ui.zones.columns.number") || "Zone Number",
      accessorKey: "number",
    }),
    createTextColumn<Zone>({
      id: "capacity",
      header: t("ui.zones.columns.capacity") || "Capacity",
      accessorKey: "capacity",
    }),
    createTextColumn<Zone>({
      id: "genre",
      header: t("ui.zones.columns.genre") || "Genre",
      accessorKey: "genre_name",
    }),
    createTextColumn<Zone>({
      id: "floor",
      header: t("ui.zones.columns.floor") || "Floor",
      accessorKey: "floor_id",
    }),
    createDateColumn<Zone>({
      id: "created_at",
      header: t("ui.zones.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Zone>({
      id: "actions",
      header: t("ui.zones.columns.actions") || "Actions",
      renderActions: (zone) => (
        <>
          <Link href={`/zones/${zone.id}/edit?page=${currentPage}&per_page=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.zones.buttons.edit") || "Edit zone"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={zone.id}
            onDelete={handleDeleteZone}
            title={t("ui.zones.delete.title") || "Delete zone"}
            successMessage={t('messages.zones.deleted')}
            description={t("ui.zones.delete.description") || "Are you sure you want to delete this zone? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.zones.buttons.delete") || "Delete zone"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Zone>[], [t, currentPage, perPage]);

  return (
    <ZoneLayout title={t('ui.zones.title')}>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{t('ui.zones.title')}</h1>
            <Link href="/zones/create">
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                {t('ui.zones.buttons.new')}
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <FiltersTable
              filters={[
                { id: 'number', label: t('ui.zones.filters.number') || 'Zone Number', type: 'text', placeholder: t('ui.zones.placeholders.number') || 'Zone number...' },
                { id: 'capacity', label: t('ui.zones.filters.capacity') || 'Capacity', type: 'text', placeholder: t('ui.zones.placeholders.capacity') || 'Capacity...' },
                { id: 'floor', label: t('ui.zones.filters.floor') || 'Floor', type: 'text', placeholder: t('ui.zones.placeholders.floor') || 'Floor...' },
              ]}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              initialValues={filters}
            />
            
            {/* Filtro de género */}
            <div>
              <label className="block mb-1 font-semibold">{t('ui.zones.filters.genre') || 'Genre'}</label>
              <Popover open={genreOpen} onOpenChange={setGenreOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={genreOpen}
                    className="w-full justify-between"
                  >
                    {genre || (t('ui.zones.placeholders.genre') || 'Select genre')}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={t('ui.zones.filters.genre') || 'Search genre...'} />
                    <CommandEmpty>
                      {t('ui.zones.no_results') || 'No genres found.'}
                    </CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        key="all-genres"
                        value=""
                        onSelect={() => {
                          setGenre(null);
                          setGenreOpen(false);
                          setCurrentPage(1);
                        }}
                      >
                        {t('ui.zones.filters.all') || 'All genres'}
                      </CommandItem>

                      {genreOptions.map(({ label, value }) => (
                        <CommandItem
                          key={value}
                          value={value}
                          onSelect={(currentValue) => {
                            setGenre(currentValue);
                            setGenreOpen(false);
                            setCurrentPage(1);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              genre === value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>{t('ui.zones.total')}: {zones?.meta.total}</div>
          
          <div className="w-full overflow-hidden">
            {isLoading ? (
              <TableSkeleton columns={5} rows={10} />
            ) : isError ? (
              <div className="p-4 text-center">
                <div className="mb-4 text-red-500">{t('ui.zones.error_loading')}</div>
                <Button onClick={() => refetch()} variant="outline">
                  {t('ui.zones.buttons.retry')}
                </Button>
              </div>
            ) : (
              <Table
                data={zones ?? {
                  data: [],
                  meta: {
                    current_page: 1,
                    from: 0,
                    last_page: 1,
                    per_page: perPage,
                    to: 0,
                    total: 0,
                  },
                }}
                columns={columns}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                perPageOptions={[10, 25, 50, 100]}
                noResultsMessage={t('ui.zones.no_results') || 'No zones found'}
              />
            )}
          </div>
        </div>
      </div>
    </ZoneLayout>
  );
}