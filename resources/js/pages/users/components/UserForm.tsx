import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Bolt, Eye, EyeOff, FileText, Lock, Mail, PackageOpen, Save, Shield, User, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
    roles?: string[];
    rolesConPermisos: Record<string, string[]>;
    permisos?: string[];
    permisosAgrupados: Record<string, string[]>;
    permisosDelUsuario?: string[];
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

const iconComponents = {
    Users: Users,
    Products: PackageOpen,
    Reports: FileText,
    Config: Bolt,
};

const categorias = [
    { id: 1, icon: 'Users', label: 'users', perms: 'users' },
    { id: 2, icon: 'Products', label: 'products', perms: 'products' },
    { id: 3, icon: 'Reports', label: 'reports', perms: 'reports' },
    { id: 4, icon: 'Config', label: 'configurations', perms: 'config' },
];

var permisosUsuarioFinal: string[] = [];

export function UserForm({ initialData, page, perPage, roles, rolesConPermisos, permisosAgrupados, permisosDelUsuario }: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [arrayPermisosState, setArrayPermisosState] = useState(permisosUsuarioFinal);

    useEffect(() => {
        if (permisosDelUsuario && initialData) {
            permisosUsuarioFinal = permisosDelUsuario;
            setArrayPermisosState(permisosDelUsuario);
        } else {
            permisosUsuarioFinal = [];
            setArrayPermisosState(permisosUsuarioFinal);
        }
    }, [permisosDelUsuario]);

    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            email: initialData?.email ?? '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            const userData = {
                ...value,
                permisos: arrayPermisosState,
            };

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['users'] });
                    let url = '/users';
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
                        toast.error(initialData ? t('messages.users.error.update') : t('messages.users.error.create'));
                    }
                },
            };

            if (initialData) {
                router.put(`/users/${initialData.id}`, userData, options);
            } else {
                router.post('/users', userData, options);
            }
        },
    });

    function comprobadorDependencias(permiso: string, parent: string) {
        if (permiso == 'users.view' || permiso == 'products.view' || permiso == 'reports.view' || permiso == 'config.access') {
            return false;
        } else {
            return !permisosUsuarioFinal.includes(parent);
        }
    }

    function togglePermiso(permiso: string) {
        if (permisosUsuarioFinal.includes(permiso)) {
            switch (permiso) {
                case 'users.view':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter(
                        (permiso) => !['users.edit', 'users.delete', 'users.create'].includes(permiso),
                    );
                    break;
                case 'products.view':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter(
                        (permiso) => !['products.edit', 'products.delete', 'products.create'].includes(permiso),
                    );
                    break;
                case 'reports.view':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter((permiso) => !['reports.print', 'reports.export'].includes(permiso));
                    break;
                case 'config.access':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter((permiso) => !['config.modify'].includes(permiso));
                    break;
            }
            permisosUsuarioFinal = permisosUsuarioFinal.filter((element) => element !== permiso);
            setArrayPermisosState(permisosUsuarioFinal);
        } else {
            permisosUsuarioFinal = [...permisosUsuarioFinal, permiso];
            setArrayPermisosState(permisosUsuarioFinal);
        }
    }

    function roleSelector(role: string) {
        const permisosDelRol = rolesConPermisos[role];
        permisosUsuarioFinal = [];
        setArrayPermisosState(permisosUsuarioFinal);
        permisosDelRol.forEach((permiso) => {
            togglePermiso(permiso);
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const [showPassword, setShowPassword] = useState(false);
    const accesoPermisos = false;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-6xl mx-auto" noValidate>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="userForm">
                    <TabsList className="w-full">
                        <TabsTrigger value="userForm" className="w-1/2">
                            {t('ui.users.tabs.userForm')}
                        </TabsTrigger>
                        <TabsTrigger value="permissionsForm" className="w-1/2" disabled={accesoPermisos}>
                            {t('ui.users.tabs.permissionsForm')}
                        </TabsTrigger>
                    </TabsList>
                    <Separator className="my-4" />
                    <TabsContent value="userForm" className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name field */}
                            <div className="col-span-1">
                                <form.Field
                                    name="name"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            return !value
                                                ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                                : value.length < 2
                                                  ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                                  : undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <User color="grey" size={18} />
                                                    {t('ui.users.fields.name')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.users.placeholders.name')}
                                                disabled={form.state.isSubmitting}
                                                required={false}
                                                autoComplete="off"
                                                className="w-full"
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            
                            {/* Email field */}
                            <div className="col-span-1">
                                <form.Field
                                    name="email"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            return !value
                                                ? t('ui.validation.required', { attribute: t('ui.users.fields.email').toLowerCase() })
                                                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                                  ? t('ui.validation.email', { attribute: t('ui.users.fields.email').toLowerCase() })
                                                  : undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Mail color="grey" size={18} />
                                                    {t('ui.users.fields.email')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.users.placeholders.email')}
                                                disabled={form.state.isSubmitting}
                                                required={false}
                                                autoComplete="off"
                                                className="w-full"
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>

                        {/* Password field - full width */}
                        <div className="mt-4 w-full">
                            <form.Field
                                name="password"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!initialData && (!value || value.length === 0)) {
                                            return t('ui.validation.required', { attribute: t('ui.users.fields.password').toLowerCase() });
                                        }
                                        if (value && value.length > 0 && value.length < 8) {
                                            return t('ui.validation.min.string', {
                                                attribute: t('ui.users.fields.password').toLowerCase(),
                                                min: '8',
                                            });
                                        }
                                        return undefined;
                                    },
                                }}
                            >
                                {(field) => {
                                    return (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Lock color="grey" size={18} />
                                                    {initialData ? t('ui.users.fields.password_optional') : t('ui.users.fields.password')}
                                                </div>
                                            </Label>

                                            <div className="relative w-full">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.password')}
                                                    disabled={form.state.isSubmitting}
                                                    autoComplete="off"
                                                    required={false}
                                                    className="pr-10 w-full"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>

                                            <p className="text-muted-foreground mt-1 text-xs">{t('ui.users.placeholders.passRulings')}</p>

                                            <FieldInfo field={field} />
                                        </>
                                    );
                                }}
                            </form.Field>
                        </div>
                    </TabsContent>
                    <TabsContent value="permissionsForm" className="w-full">
                        {/* Pre-selections field */}
                        <div className="space-y-4">
                            <div>
                                <Label>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Shield color="grey" size={18} />
                                        {t('ui.users.fields.rolPpal')}
                                    </div>
                                </Label>
                                <Select onValueChange={(value) => roleSelector(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('ui.users.roles.default')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles?.map((role) => (
                                            <SelectItem key={String(role)} value={String(role)}>
                                                {t('ui.users.roles.' + role)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <Separator className="my-4" />

                            {/* Permisos Especificos */}
                            <div>
                                <div className="mb-4 flex items-center gap-1">
                                    <Shield color="#2762c2" size={18} />
                                    <span className="font-medium">{t('ui.users.fields.permisos')}</span>
                                </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categorias.map((categoria) => {
                                        const permisosCat = permisosAgrupados[categoria.perms];
                                        const permisoPadre = permisosCat[0];
                                        const catKey = categoria.icon;
                                        const Icono = iconComponents[catKey as keyof typeof iconComponents];

                                        return (
                                            <Card className="h-full" key={categoria.id}>
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Icono size={18} color="#2762c2" />
                                                        <CardTitle className="text-base">
                                                            {t('ui.users.gridelements.' + categoria.label)}
                                                        </CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-3">
                                                    {permisosCat.map((permiso) => (
                                                        <div className="flex items-center space-x-2" key={String(permiso)}>
                                                            <Checkbox
                                                                id={String(permiso)}
                                                                checked={arrayPermisosState.includes(permiso)}
                                                                onCheckedChange={() => togglePermiso(permiso)}
                                                                disabled={comprobadorDependencias(permiso, permisoPadre)}
                                                                className="border-blue-500"
                                                            />
                                                            <Label htmlFor={String(permiso)} className="text-sm font-normal">
                                                                {t('ui.users.permisos.' + categoria.icon + '.' + permiso)}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                <Separator className="my-6" />
                {/* Form buttons */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/users';
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                        className="min-w-[120px]"
                    >
                        <X className="mr-2 h-4 w-4" />
                        {t('ui.users.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit} className="min-w-[120px]">
                                <Save className="mr-2 h-4 w-4" />
                                {isSubmitting
                                    ? t('ui.users.buttons.saving')
                                    : initialData
                                      ? t('ui.users.buttons.update')
                                      : t('ui.users.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}