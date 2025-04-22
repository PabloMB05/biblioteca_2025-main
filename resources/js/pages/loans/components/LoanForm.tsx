import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { BookOpen, Save, X } from 'lucide-react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { Building2 } from 'lucide-react';
import { Icon } from '@/components/icon';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isAfter, isValid, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import type { AnyFieldApi } from '@tanstack/react-form';

interface LoanFormProps {
    initialData?: {
        id?: number;
        email: string;
        isbn: string;
        due_date: Date;
    };
    page?: string;
    perPage?: string;
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

export function LoanForm({ initialData, page, perPage }: LoanFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const form = useForm({
        defaultValues: {
            email: initialData?.email ?? '',
            isbn: initialData?.isbn ?? '',
            due_date: initialData?.due_date ? initialData.due_date.toISOString().split('T')[0] : '',
        },
        onSubmit: async ({ value }) => {
            const loanData = {
                ...value,
            };

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['loans'] });
                    let url = '/loans';
                    if (page) url += `?page=${page}`;
                    if (perPage) url += `&per_page=${perPage}`;
                    router.visit(url);
                    toast.success(t('messages.loans.created'));
                },
                onError: (err) => {
                    console.error('Create loan error:', err);
                    toast.error(t('messages.loans.error.create'));
                },
            };

            // Si existe initialData, estamos editando, entonces enviamos la actualización
            if (initialData?.id) {
                router.put(`/loans/${initialData.id}`, loanData, options);
            } else {
                // Si no existe initialData, estamos creando un préstamo nuevo
                router.post('/loans', loanData, options);
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
                        <BookOpen className="h-5 w-5" />
                        {t(initialData?.id ? 'ui.loan.edit' : 'ui.loan.create')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Email field */}
                    <div>
                        <form.Field
                            name="email"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((r) => setTimeout(r, 300));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.user.email') })
                                        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                        ? t('ui.validation.email')
                                        : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>{t('ui.user.email')}</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="user@example.com"
                                        disabled={form.state.isSubmitting}
                                        required
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* ISBN field */}
                    <div>
                        <form.Field
                            name="isbn"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t('ui.validation.required', {
                                            attribute: t('ui.loans.fields.isbn').toLowerCase(),
                                        });
                                    }
                                    if (!/^\d+$/.test(value)) {
                                        return t('ui.validation.numeric', {
                                            attribute: t('ui.books.columns.isbn').toLowerCase(),
                                        });
                                    }
                                    return undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={Building2} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t('ui.loans.fields.isbn')}</Label>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.loans.createLoan.placeholders.isbn')}
                                        disabled={form.state.isSubmitting}
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Due Date field */}
                    <div>
                        <form.Field
                            name="due_date"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((r) => setTimeout(r, 300));

                                    if (!value) {
                                        return t('ui.validation.required', { attribute: t('ui.loan.due_date') });
                                    }

                                    const parsedDate = parseISO(value);
                                    if (!isValid(parsedDate)) {
                                        return t('ui.validation.date', { attribute: t('ui.loan.due_date') });
                                    }

                                    if (!isAfter(parsedDate, new Date())) {
                                        return t('ui.validation.after_today', { attribute: t('ui.loan.due_date') });
                                    }

                                    return undefined;
                                },
                            }}
                        >
                            {(field) => {
                                const date = field.state.value ? parseISO(field.state.value) : null;

                                return (
                                    <>
                                        <Label htmlFor={field.name}>{t('ui.loan.due_date')}</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full text-left flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                                                >
                                                    {date ? format(date, 'PPP') : t('ui.loan.createLoan.placeholders.date')}
                                                    <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date ?? undefined}
                                                    onSelect={(selectedDate) => {
                                                        if (selectedDate) {
                                                            const iso = selectedDate.toISOString().split('T')[0];
                                                            field.handleChange(iso);
                                                        }
                                                    }}
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FieldInfo field={field} />
                                    </>
                                );
                            }}
                        </form.Field>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                let url = '/loans';
                                if (page) url += `?page=${page}`;
                                if (perPage) url += `&per_page=${perPage}`;
                                router.visit(url);
                            }}
                            disabled={form.state.isSubmitting}
                        >
                            <X className="mr-2 h-4 w-4" />
                            {t('ui.loan.buttons.cancel')}
                        </Button>

                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting ? t('ui.loan.buttons.saving') : t(initialData?.id ? 'ui.loan.buttons.update' : 'ui.loan.buttons.save')}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
