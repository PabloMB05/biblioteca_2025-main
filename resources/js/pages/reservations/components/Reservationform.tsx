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
import { Book, Calendar, Save, User, X } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';
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
interface ReservationFormProps {
    initialData?: {
        id: string;
        book_id: string;
        user_id: string;
        queue: string;
        start_date: string;
        end_date: string;
    };
    page?: string;
    perPage?: string;
    books: { id: string; title: string }[];
    users: { id: string; email: string }[];
    queues: number[];
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    const { t } = useTranslations();
    
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">{t('ui.validation.validating')}</p> : null}
        </>
    );
}

export function ReservationForm({ 
    initialData, 
    page, 
    perPage,
    books,
    users,
    queues 
}: ReservationFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const form = useForm({
        defaultValues: {
            book_id: initialData?.book_id ?? '',
            user_id: initialData?.user_id ?? '',
            queue: initialData?.queue ?? '1',
            start_date: initialData?.start_date ?? new Date().toISOString().split('T')[0],
            end_date: initialData?.end_date ?? new Date().toISOString().split('T')[0],
        },
        onSubmit: async ({ value }) => {
            const reservationData = {
                ...value,
                queue: Number(value.queue),
            };

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['reservations'] });
                    let url = '/reservations';
                    if (page) url += `?page=${page}`;
                    if (perPage) url += `&per_page=${perPage}`;
                    
                    router.visit(url);
                    toast.success(initialData ? t('messages.reservations.updated') : t('messages.reservations.created'));
                },
                onError: () => {
                    toast.error(initialData ? t('messages.reservations.error.update') : t('messages.reservations.error.create'));
                },
            };

            if (initialData) {
                router.put(`/reservations/${initialData.id}`, reservationData, options);
            } else {
                router.post('/reservations', reservationData, options);
            }
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5" />
                        {initialData ? t('ui.reservation.edit') : t('ui.reservation.create')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Book selection */}
                    <div>
                        <form.Field
                            name="book_id"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.reservation.book').toLowerCase() })
                                        : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.reservation.book')}
                                    </Label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        disabled={form.state.isSubmitting}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">{t('ui.reservation.select_book')}</option>
                                        {books.map((book) => (
                                            <option key={book.id} value={book.id}>
                                                {book.title}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                   {/* User selection */}
                    <div>
                    <form.Field
                        name="user_id"
                        validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            return !value
                            ? t('ui.validation.required', { attribute: t('ui.reservation.user').toLowerCase() })
                            : undefined;
                        },
                        }}
                    >
                        {(field) => (
                        <>
                            <Label htmlFor={field.name}>
                            {t('ui.reservation.user')}
                            </Label>
                            <Popover
                            open={field.state.active}
                            onOpenChange={() => {}}
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
                                    ? users.find((u) => u.id === field.state.value)?.email
                                    : t('ui.reservation.select_user')}
                                <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                <CommandInput placeholder={t('ui.reservation.select_user')} className="h-9" />
                                <CommandList>
                                    <CommandEmpty>{t('ui.common.no_results')}</CommandEmpty>
                                    <CommandGroup>
                                    {isLoadingUsers ? (
                                        <CommandItem value="loading" disabled>
                                        {t('ui.common.loading')}
                                        </CommandItem>
                                    ) : (
                                        users.map((user) => (
                                        <CommandItem
                                            key={user.id}
                                            value={user.id}
                                            onSelect={() => {
                                            field.handleChange(user.id)
                                            }}
                                        >
                                            {user.email}
                                            <Check
                                            className={cn(
                                                "ml-auto",
                                                field.state.value === user.id ? "opacity-100" : "opacity-0"
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
                            <FieldInfo field={field} />
                        </>
                        )}
                    </form.Field>
                    </div>


                    {/* Queue selection */}
                    <div>
                        <form.Field
                            name="queue"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.reservation.queue').toLowerCase() })
                                        : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.reservation.queue')}
                                    </Label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        disabled={form.state.isSubmitting}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        {queues.map((queue) => (
                                            <option key={queue} value={queue}>
                                                {queue}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* Start date */}
                    <div>
                        <form.Field
                            name="start_date"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.reservation.start_date').toLowerCase() })
                                        : new Date(value) < new Date()
                                          ? t('ui.validation.future_date', { attribute: t('ui.reservation.start_date').toLowerCase() })
                                          : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.reservation.start_date')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="date"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        min={new Date().toISOString().split('T')[0]}
                                        disabled={form.state.isSubmitting}
                                        required
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* End date */}
                    <div>
                        <form.Field
                            name="end_date"
                            validators={{
                                onChangeAsync: async ({ value, fieldApi }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    const startDate = fieldApi.form.getFieldValue('start_date');
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.reservation.end_date').toLowerCase() })
                                        : new Date(value) < new Date(startDate)
                                          ? t('ui.validation.after_date', { 
                                              attribute: t('ui.reservation.end_date').toLowerCase(),
                                              date: new Date(startDate).toLocaleDateString()
                                            })
                                          : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.reservation.end_date')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="date"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        min={form.getFieldValue('start_date') || new Date().toISOString().split('T')[0]}
                                        disabled={form.state.isSubmitting}
                                        required
                                    />
                                    <FieldInfo field={field} />
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
                                let url = '/reservations';
                                if (page) url += `?page=${page}`;
                                if (perPage) url += `&per_page=${perPage}`;
                                router.visit(url);
                            }}
                            disabled={form.state.isSubmitting}
                        >
                            <X className="mr-2 h-4 w-4" />
                            {t('ui.reservation.buttons.cancel')}
                        </Button>

                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting
                                        ? t('ui.reservation.buttons.saving')
                                        : initialData
                                          ? t('ui.reservation.buttons.update')
                                          : t('ui.reservation.buttons.create')}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}