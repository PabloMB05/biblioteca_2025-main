import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Book, ChartColumnStacked, FilePenLine, LandPlot, Layers, PencilRuler, Save, UserPen, X } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        editor: string;
        length: number;
        isbn: string,
        bookcase_id: string;
        genre: string;
    };
    floors: {
        id: string;
        floor_number: number;
    }[];
    zones: {
        id: string;
        number: number;
        floor_id: string;
        genre_name: string;
    }[];
    bookcases: {
        id: string;
        number: number;
        books_count: number;
        capacity: number;
        zone_id: string;
    }[];
    genres: { value: string; label: string }[];
    page?: string;
    explosion?: string[];
    perPage?: string;
    imgPreviaUrl?: string;
}

interface Genre {
    value: string;
    label?: string;
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

let generosFinales: string[] = [];

export function BookForm({ initialData, page, perPage, genres, explosion, floors, zones, bookcases, imgPreviaUrl }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const transformGenres = (genres: Genre[]) => {
        return genres.map((genre) => ({
            ...genre,
            label: t(`ui.genres.names.${genre.value}`),
        }));
    };

    const transformedGenres = transformGenres(genres);
    let prePisoId = undefined;

    // State for form controls
    const [selectedGenres, setSelectedGenres] = useState<string[]>(explosion ?? []);
    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(prePisoId);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(undefined);
    const [selectedBookcase, setSelectedBookcase] = useState<string | undefined>(initialData?.bookcase_id);
    const [activeTab, setActiveTab] = useState('basic');

    const handleFloorChange = (floorId: string) => {
        setSelectedFloor(floorId);
    };

    const handleZoneChange = (zoneId: string) => {
        setSelectedZone(zoneId);
    };

    useEffect(() => {
        if (explosion && initialData) {
            generosFinales = explosion;
            setSelectedGenres(explosion);
        } else {
            generosFinales = [];
            setSelectedGenres(generosFinales);
        }
    }, [explosion]);

    const comprobanteZona = () => selectedZone === undefined || selectedGenres.length === 0;
    const comprobantePiso = () => selectedFloor === undefined || selectedGenres.length === 0;

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            editor: initialData?.editor ?? '',
            length: initialData?.length ?? '',
            isbn: initialData?.isbn ?? '',
            bookcase_id: initialData?.bookcase_id ?? undefined,
            genres: explosion ?? [],
        },
        
        onSubmit: async ({ value }) => {
            const formData = new FormData();
            formData.append('title', value.title);
            formData.append('author', value.author);
            formData.append('editor', value.editor);
            formData.append('length', value.length.toString());
            formData.append('isbn', value.isbn);
            formData.append('_method', 'PUT');
            
            const generosString = selectedGenres.join(', ');
            formData.append('generos', generosString);

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['books'] });
                    let url = '/books';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }
                    router.visit(url);
                },
                onError: () => {
                    toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                },
            };

            if (initialData) {
                router.post(`/books/${initialData.id}`, formData, options);
            } else {
                router.post('/books', {
                    ...value,
                    generos: selectedGenres,
                }, options);
            }
        },
    });
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">
                        <Book className="mr-2 h-4 w-4" />
                        {t('ui.books.tabs.basic')}
                    </TabsTrigger>
                    <TabsTrigger value="location">
                        <LandPlot className="mr-2 h-4 w-4" />
                        {t('ui.books.tabs.location')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                    {/* Title field */}
                    <form.Field
                        name="title"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.title').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.books.fields.title').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    <div className="flex items-center gap-2">
                                        <Book className="h-4 w-4" />
                                        {t('ui.books.fields.title')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.title')}
                                    disabled={form.state.isSubmitting}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    </form.Field>

                    {/* Author field */}
                    <form.Field
                        name="author"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.author').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.books.fields.author').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    <div className="flex items-center gap-2">
                                        <UserPen className="h-4 w-4" />
                                        {t('ui.books.fields.author')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.author')}
                                    disabled={form.state.isSubmitting}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    </form.Field>

                    {/* Editor field */}
                    <form.Field
                        name="editor"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.editor').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.books.fields.editor').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    <div className="flex items-center gap-2">
                                        <FilePenLine className="h-4 w-4" />
                                        {t('ui.books.fields.editor')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.editor')}
                                    disabled={form.state.isSubmitting}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    </form.Field>

                    {/* Pages field */}
                    <form.Field
                        name="length"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.books.fields.length').toLowerCase() }) : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    <div className="flex items-center gap-2">
                                        <PencilRuler className="h-4 w-4" />
                                        {t('ui.books.fields.length')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.length')}
                                    disabled={form.state.isSubmitting}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    </form.Field>
                    {/* ISBN field */}
                        <form.Field
                            name="isbn"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t('ui.validation.required', { attribute: 'ISBN' });
                                    }
                                    const isbnRegex = /^(?:\d{9}|\d{13})$/;
                                    return !isbnRegex.test(value) ? t('ui.validation.invalid', { attribute: 'ISBN' }) : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        <div className="flex items-center gap-2">
                                            <Layers className="h-4 w-4" />
                                            {t('ui.books.fields.isbn')}
                                        </div>
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="9781234567890"
                                        disabled={form.state.isSubmitting}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        </form.Field>

                    {/* Genres Multi Select */}
                    <div className="space-y-2">
                        <Label>
                            <div className="flex items-center gap-2">
                                <ChartColumnStacked className="h-4 w-4" />
                                {t('ui.books.fields.genres')}
                            </div>
                        </Label>
                        <MultiSelect
                            options={transformedGenres}
                            onValueChange={setSelectedGenres}
                            defaultValue={selectedGenres}
                            placeholder={t('ui.books.placeholders.genres')}
                            variant="inverted"
                            maxCount={3}
                        />
                        {selectedGenres.length > 0 && (
                            <div className="mt-2 rounded-md border p-3">
                                <h3 className="text-sm font-medium">{t('ui.books.fields.selgenres')}</h3>
                                <ul className="mt-1 list-inside list-disc space-y-1">
                                    {selectedGenres.map((genre) => (
                                        <li key={genre} className="text-sm">
                                            {t(`ui.genres.names.${genre}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                    {/* Floor Select */}
                    <div className="space-y-2">
                        <Label>
                            <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4" />
                                {t('ui.books.fields.floors')}
                            </div>
                        </Label>
                        <Select value={selectedFloor} onValueChange={handleFloorChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('ui.books.fields.floor')} />
                            </SelectTrigger>
                            <SelectContent>
                                {floors.map((floor) => (
                                    <SelectItem key={floor.id} value={floor.id}>
                                        {t('ui.books.fields.floor')} {floor.floor_number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Zone Select */}
                    <div className="space-y-2">
                        <Label>
                            <div className="flex items-center gap-2">
                                <LandPlot className="h-4 w-4" />
                                {t('ui.books.fields.zones')}
                            </div>
                        </Label>
                        <Select disabled={comprobantePiso()} value={selectedZone} onValueChange={handleZoneChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('ui.books.fields.zone')} />
                            </SelectTrigger>
                            <SelectContent>
                                {zones
                                    .filter((zone) => zone.floor_id === selectedFloor)
                                    .filter((zone) => selectedGenres.includes(zone.genre_name))
                                    .map((zone) => (
                                        <SelectItem key={zone.id} value={zone.id}>
                                            {`${t('ui.books.fields.zone')} ${zone.number} - ${t(`ui.genres.names.${zone.genre_name}`)}`}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Bookcase Select */}
                    <form.Field
                        name="bookcase_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.bookcases.fieldsbookcase').toLowerCase() }) : null;
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label>
                                    <div className="flex items-center gap-2">
                                        <ChartColumnStacked className="h-4 w-4" />
                                        {t('ui.books.fields.bookcases')}
                                    </div>
                                </Label>
                                <Select
                                    disabled={comprobanteZona()}
                                    value={selectedBookcase}
                                    onValueChange={(value) => field.handleChange(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('ui.books.fields.bookcases')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bookcases
                                            .filter((bookcase) => bookcase.zone_id === selectedZone)
                                            .map((bookcase) => (
                                                <SelectItem
                                                    key={bookcase.id}
                                                    value={bookcase.id}
                                                    disabled={bookcase.books_count >= bookcase.capacity}
                                                >
                                                    {`${t('ui.books.fields.bookcase')} ${bookcase.number} - ${bookcase.books_count}/${bookcase.capacity}`}
                                                    {bookcase.books_count >= bookcase.capacity ? ' (Full)' : ' (Available)'}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    </form.Field>
                </TabsContent>
            </Tabs>

            {/* Form buttons */}
            <div className="flex justify-end gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = '/books';
                        if (page) {
                            url += `?page=${page}`;
                            if (perPage) {
                                url += `&per_page=${perPage}`;
                            }
                        }
                        router.visit(url);
                    }}
                    disabled={form.state.isSubmitting}
                >
                    <X className="mr-2 h-4 w-4" />
                    {t('ui.books.buttons.cancel')}
                </Button>

                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit}>
                            <Save className="mr-2 h-4 w-4" />
                            {isSubmitting
                                ? t('ui.books.buttons.saving')
                                : initialData
                                  ? t('ui.books.buttons.update')
                                  : t('ui.books.buttons.save')}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
}