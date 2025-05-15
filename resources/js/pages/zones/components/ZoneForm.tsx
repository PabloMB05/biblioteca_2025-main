import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { MapPin, Save, X,Check, ChevronsUpDown } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface ZoneFormProps {
  initialData?: {
    id: string,
    number: string,
    capacity: string,
    genre_name: string,
    floor_id: string,
  };
  floors: {
    id:string,
    floor_number: number,
    zones_count:number,
    capacity: number,
}[];
  genres:any[];
  page?: string;
  perPage?: string;
  isLoadingFloors?: boolean;
  floorsError?: Error | null;
}

function FieldError({ field }: { field: AnyFieldApi }) {
  const { t } = useTranslations();
  
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errorMap?.onChange ? (
        <p className="text-destructive mt-1 text-sm">
          {t(field.state.meta.errorMap.onChange)}
        </p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="text-muted-foreground mt-1 text-sm">{t('ui.validation.validating')}</p>
      ) : null}
    </>
  );
}

export function ZoneForm({ 
  initialData, 
  floors = [], 
  genres=[],
  isLoadingFloors = false, 
  floorsError = null,
  page, 
  perPage 
}: ZoneFormProps) {
  const { t } = useTranslations();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      number: initialData?.number ?? '',
      capacity: initialData?.capacity ?? '',
      genre_name: initialData?.genre_name ?? '',
      floor_id: initialData?.floor_id ?? '',
    },
    onSubmit: async ({ value }) => {
      const zoneData = {
        number: value.number,
        capacity: value.capacity,
        genre_name: value.genre_name,
        floor_id: value.floor_id,
      };

      const options = {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['zones'] });
          let url = '/zones';
          if (page) url += `?page=${page}`;
          if (perPage) url += `&per_page=${perPage}`;
          router.visit(url);
        },
        onError: () => {
          toast.error(initialData ? t('messages.zones.error.update') : t('messages.zones.error.create'));
        },
      };

      if (initialData) {
        router.put(`/zones/${initialData.id}`, zoneData, options);
      } else {
        router.post('/zones', zoneData, options);
      }
    },
  });
console.log(floors);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const validateFloorId = (value: string) => {
    if (!value) return t('ui.validation.required', { attribute: t('ui.zones.floor').toLowerCase() });
    if (!floors.some(floor => floor.id === value)) return t('messages.floors.invalid_selection');
    return undefined;
  };

  if (floorsError) {
    return (
      <Card>
        <CardContent className="p-4 text-destructive">
          {t('messages.floors.load_error')}
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {initialData ? t('ui.zones.cards.edit.title') : t('ui.zones.cards.create.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Zone number field */}
          <div>
            <form.Field
              name="number"
              validators={{
                onChange: ({ value }) => {
                  // Verificar si el valor está vacío
                  if (!value) {
                    return t('ui.zones.validation.number_required', { attribute: t('ui.zones.number').toLowerCase() });
                  }
                  
                  // Verificar si el valor no es un número
                  if (isNaN(Number(value))) {
                    return t('ui.zones.validation.number_integer', { attribute: t('ui.zones.number').toLowerCase() });
                  }
              
                  return undefined;
                }
              }}
              
            >
              {(field) => (
                <>
                  <Label htmlFor={field.name}>
                    {t('ui.zones.number')}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t('ui.zones.placeholders.number')}
                    disabled={form.state.isSubmitting}
                    min="1"
                  />
                  <FieldError field={field} />
                </>
              )}
            </form.Field>
          </div>

          {/* Capacity field */}
          <div>
            <form.Field
              name="capacity"
              validators={{
                onChange: ({ value }) => {
                  // Verificar si el valor está vacío
                  if (!value) {
                    return t('ui.zones.validation.capacity_required', { attribute: t('ui.zones.capacity').toLowerCase() });
                  }
                  
                  // Verificar si el valor no es un número
                  if (isNaN(Number(value))) {
                    return t('ui.zones.validation.capacity_integer', { attribute: t('ui.zones.capacity').toLowerCase() });
                  }
              
                  // Verificar si el valor es menor o igual a 0
                  if (Number(value) <= 0) {
                    return t('ui.zones.validation.capacity_min', { attribute: t('ui.zones.capacity').toLowerCase(), min: 1 });
                  }
              
                  return undefined;
                }
              }}
              
            >
              {(field) => (
                <>
                  <Label htmlFor={field.name}>
                    {t('ui.zones.capacity')}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t('ui.zones.capacity')}
                    disabled={form.state.isSubmitting}
                    min="1"
                  />
                  <FieldError field={field} />
                </>
              )}
            </form.Field>
          </div>

          {/* Floor selection */}
          <div>
            <form.Field
              name="floor_id"
              validators={{
                onChange: ({ value }) => validateFloorId(value),
              }}
            >
              {(field) => (
                <>
                  <Label>
                    {t('ui.zones.floor')}
                  </Label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    disabled={isLoadingFloors || !!floorsError}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        isLoadingFloors 
                          ? t('ui.common.loading') 
                          : t('ui.zones.select_floor')
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingFloors ? (
                        <SelectItem value="loading" disabled>
                          {t('ui.common.loading')}
                        </SelectItem>
                      ) : (
                        floors.map((floor) => (
                          <SelectItem key={floor.id} value={floor.id} disabled={floor.zones_count >= floor.capacity}>
                            {`${t('ui.zones.floor_label')} ${floor.floor_number} `} -- {floor.zones_count}/{floor.capacity}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FieldError field={field} />
                </>
              )}
            </form.Field>
          </div>

          {/* Genre selection */}
          <div>
            <form.Field
              name="genre_name"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return t('ui.validation.required', { attribute: t('ui.zones.genre').toLowerCase() });
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <Label>
                    {t('ui.zones.genre')}
                  </Label>
                  <Popover
                    open={field.state.active}
                    onOpenChange={(open) => {
                      // Optional: Update based on form state if needed
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={field.state.active}
                        className="w-full justify-between"
                        type="button"
                      >
                        {field.state.value
                          ? t(`ui.genres.names.${field.state.value}`)
                          : t('ui.zones.select_genre')}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder={t('ui.zones.select_genre')} className="h-9" />
                        <CommandList>
                          <CommandEmpty>{t('ui.common.no_results')}</CommandEmpty>
                          <CommandGroup>
                            {isLoadingFloors ? (
                              <CommandItem value="loading" disabled>
                                {t('ui.common.loading')}
                              </CommandItem>
                            ) : (
                              genres.map((genre) => (
                                <CommandItem
                                  key={genre.id}
                                  value={genre.name}
                                  onSelect={(currentValue) => {
                                    field.handleChange(currentValue === field.state.value ? '' : currentValue)
                                  }}
                                >
                                  {t(`ui.genres.names.${genre.name}`)}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      field.state.value === genre.name ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FieldError field={field} />
                </>
              )}
            </form.Field>
          </div>


          <Separator className="my-4" />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const url = `/zones${page ? `?page=${page}` : ''}${perPage ? `&per_page=${perPage}` : ''}`;
                router.visit(url);
              }}
              disabled={form.state.isSubmitting}
            >
              <X className="mr-2 h-4 w-4" />
              {t('ui.buttons.cancel')}
            </Button>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button 
                  type="submit" 
                  disabled={!canSubmit || isLoadingFloors || !!floorsError}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting
                    ? t('ui.common.saving')
                    : initialData
                      ? t('ui.buttons.update')
                      : t('ui.buttons.save')}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}