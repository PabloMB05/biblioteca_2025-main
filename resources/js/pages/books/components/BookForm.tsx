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
import { Book, ChartColumnStacked, FilePenLine, LandPlot, Layers, Lock, PencilRuler, Save, UserPen, X } from 'lucide-react';
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
var generosFinales: string[] = [];

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

    const [selectedGenres, setSelectedGenres] = useState<string[]>(explosion ?? []);
    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(prePisoId);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(undefined);
    const [SelectedImage, setSelectedImage] = useState<File | undefined>(undefined);
    const [selectedBookcase, setSelectedBookcase] = useState<string | undefined>(initialData?.bookcase_id);

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

    function comprobanteZona() {
        if (selectedZone != undefined && selectedGenres.length != 0) {
            return false;
        } else {
            return true;
        }
    }

    function comprobantePiso() {
        if (selectedFloor != undefined && selectedGenres.length != 0) {
            return false;
        } else {
            return true;
        }
    }
    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            editor: initialData?.editor ?? '',
            length: initialData?.length ?? undefined,
            bookcase_id: initialData?.bookcase_id ?? undefined,
            genres: explosion ?? [],
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();

            formData.append('title', value.title);
            formData.append('author', value.author);
            formData.append('editor', value.editor);
            formData.append('length', value.length);
            formData.append('bookcase_id', value.bookcase_id);
            formData.append('newImg', SelectedImage);
            formData.append('_method', 'PUT');
            let generosString = '';
            if (selectedGenres.length > 0) {
                generosString = selectedGenres[0];
                if (selectedGenres.length > 1) {
                    for (let i = 1; i < selectedGenres.length; i++) {
                        generosString += ', ' + selectedGenres[i];
                    }
                }
            } else {
                generosString = selectedGenres[0];
            }
            formData.append('generos', generosString);

            const bookData = {
                ...value,
                generos: selectedGenres,
            };
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Libro creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['books'] });

                    // Construct URL with page parameters
                    let url = '/books';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                    }
                },
            };

            if (initialData) {
                router.post(`/books/${initialData.id}`, formData, options);
            } else {
                router.post('/books', bookData, options);
            }
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Tabs defaultValue="book-info" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="book-info">{t('ui.books.tabs.bookInfo')}</TabsTrigger>
                    <TabsTrigger value="location">{t('ui.books.tabs.location')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="book-info" className="space-y-4">
                    {/* Title field */}
                    <div>
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
                                <>
                                    <Label htmlFor={field.name}>
                                        <div className="mb-1 flex items-center gap-1">
                                            <Book color="grey" size={18} />
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
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                    {/* Author field */}
                    <div>
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
                                <>
                                    <Label htmlFor={field.name}>
                                        <div className="mb-1 flex items-center gap-1">
                                            <UserPen color="grey" size={18} />
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
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Editor field */}
                        <div>
                            <form.Field
                                name="editor"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.publisher').toLowerCase() })
                                            : value.length < 2
                                              ? t('ui.validation.min.string', { attribute: t('ui.books.fields.publisher').toLowerCase(), min: '2' })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <FilePenLine color="grey" size={18} />
                                                {t('ui.books.fields.editor')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.books.placeholders.publisher')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Pages field */}
                        <div>
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
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <PencilRuler color="grey" size={18} />
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
                                            placeholder={t('ui.books.placeholders.pages')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Genres Multi Select Field */}
                    <div className="max-w-xl p-4">
                        <h1 className="mb-4 text-2xl font-bold">{t('ui.books.fields.genres')}</h1>
                        <MultiSelect
                            options={transformedGenres}
                            onValueChange={setSelectedGenres}
                            defaultValue={selectedGenres}
                            placeholder={t('ui.books.placeholders.genres')}
                            variant="inverted"
                            maxCount={3}
                        />
                    </div>

                   
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Floor Select */}
                        <div>
                            <Label>
                                <div className="mb-1 flex items-center gap-1">
                                    <Layers color="grey" size={18} />
                                    {t('ui.books.fields.floor')}
                                </div>
                            </Label>
                            <Select required={true} value={selectedFloor} onValueChange={(value) => handleFloorChange(value)}>
                                <SelectTrigger className="w-[180px]">
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
                        <div>
                            <Label>
                                <div className="mb-1 flex items-center gap-1">
                                    <LandPlot color="grey" size={18} />
                                    {t('ui.books.fields.zone')}
                                </div>
                            </Label>
                            <Select disabled={comprobantePiso()} required={true} value={selectedZone} onValueChange={(value) => handleZoneChange(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={t('ui.books.fields.zone')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {zones
                                        .filter((zone) => zone.floor_id === selectedFloor)
                                        .filter((zone) => selectedGenres.includes(zone.genre_name))
                                        .map((zone) => (
                                            <SelectItem key={zone.id} value={zone.id}>
                                                {`${t(`ui.books.fields.zone`)} ${zone.number} - ${t(`ui.genres.names.${zone.genre_name}`)}`}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Bookcase field */}
                        <div>
                            <form.Field
                                name="bookcase_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value ? t('ui.validation.required', { attribute: t('ui.books.fields.bookcase').toLowerCase() }) : null;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <ChartColumnStacked color="grey" size={18} />
                                                {t('ui.books.fields.bookcase')}
                                            </div>
                                        </Label>
                                        <Select
                                            disabled={comprobanteZona()}
                                            required={true}
                                            value={selectedBookcase}
                                            onValueChange={(value) => field.handleChange(value)}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={t('ui.books.fields.bookcase')} />
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
                                                            {`${t(`ui.books.fields.bookcase`)} ${bookcase.number} - ${bookcase.books_count}/${bookcase.capacity}`}
                                                            {bookcase.books_count >= bookcase.capacity ? <Lock></Lock> : ''}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </TabsContent>

                {/* Form buttons - placed outside tabs to always be visible */}
                <div className="mt-3 flex justify-center gap-100">
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
                        <X />
                        {t('ui.books.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.books.buttons.saving')
                                    : initialData
                                      ? t('ui.books.buttons.update')
                                      : t('ui.books.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </Tabs>
        </form>
    );
}