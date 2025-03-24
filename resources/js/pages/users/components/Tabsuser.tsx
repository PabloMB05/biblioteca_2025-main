//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, X, Eye, Save, Shield, Users,  PackageOpen, FileText, Settings} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import{ Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
//Para invalidar y actualizar datos en caché después de un cambio
import { useQueryClient } from "@tanstack/react-query";
//Para la navegación y envío de formularios sin recargar la página
import { router } from "@inertiajs/react";
//Muestra notificaciones cunado ocurren errores o acciones exitosas
import { toast } from "sonner";
//traduccion
import { useTranslations } from "@/hooks/use-translations";
//logica form
import { useForm } from "@tanstack/react-form";
//tipo de datos para definir un campo en el form
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";



//Datos que puede recibe el formulario(Esto sirve para editar usuario)
interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    //paginación
    page?: string;
    perPage?: string;
    arrayRolePermissions?: String[];
}


// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}




export function UserForm({ initialData, page, perPage, arrayRolePermissions = []}: UserFormProps) {
    const { t } = useTranslations(); 
    const queryClient = useQueryClient();
    //const types = ["basicInformation", "rp"];
    const [arrayPermissions, setArrayPermissions] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("default");


    function handleRoleChange(role: string) {
        setSelectedRole(role);
        console.log("Rol seleccionado:", role); 
        const defaultPermissionRole = arrayRolePermissions
            .filter(([rol]) => rol === role) 
            .map(([_, permiso]) => permiso); 
            setArrayPermissions(defaultPermissionRole);
        console.log("Permisos:", defaultPermissionRole); 
    }

    function togglePermission(permission: string, isChecked: boolean) {
        setArrayPermissions((prev) => {
            const updatedPermissions = isChecked
                ? [...prev, permission] 
                : prev.filter((perm) => perm !== permission); 
            
            console.log("Permisos actualizados:", updatedPermissions); 
            return updatedPermissions;
        });
    }
    //const[Tabactive, setTabActive] = useState(types[0]);
    //let permissionArray:string[] = [];
    //const [permission, setPermission] = useState([permissionArray]);

    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? "", 
            email: initialData?.email ?? "",
            password: "",
            role: 'default',
            permissions: {
                users: { view: false, create: false, edit: false, delete: false },
                products: { view: false, create: false, edit: false, delete: false },
                reports: { view: false, export: false, print: false },
                settings: { access: false, modify: false },
            },
        },
        onSubmit: async ({ value }) => {
            const userData ={
                ...value,
                permissions: arrayPermissions,
            }
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                    // Construct URL with page parameters
                    let url = "/users";
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
                        toast.error(
                            initialData
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };
            //PUT --> Para editar usuario; POST--> Para crear nuevo usuario
            if (initialData) {
                router.put(`/users/${initialData.id}`, userData, options,);
            } else {
                router.post("/users", userData, options);
            }
        },
    });

     
    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

   
    
    return (
        <div className="">
            <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
            <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
            <div className="flex items-center gap-2">
            <Icon iconNode={User} className="w-6 h-6 text-blue-500" />
            <Label className="text-2xl font-black">{t("ui.header.titulo")}</Label>        
            </div>
            <p className="text-gray-600">{t("ui.header.string")}</p>
            </header> 
            <hr className="dark:border-black "></hr> 
             <div className="py-1 bg-gray-100 dark:bg-[#272726]"></div>
            <form onSubmit={handleSubmit} className="space-y-1  bg-gray-100 dark:bg-[#272726] " noValidate>
            <Tabs defaultValue="basicInformation" className="mr-3 ml-3">
                <TabsList className="grid w-full h-15 grid-cols-2 ">
                    <TabsTrigger className="capitalize p-3 " value="basicInformation">{t("ui.header.tabtitle1")}</TabsTrigger>
                    <TabsTrigger className="p-3" value="rp">{t("ui.header.tabtitle2")}</TabsTrigger>
                </TabsList>
                <TabsContent value="basicInformation">
                    <Card>
                        <div className="ml-5 mr-5">
                                <div className="mb-4">
                                {/* Name field */}
                                    <form.Field
                                        name="name"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                return !value
                                                    ? t("ui.validation.required", { attribute: t("ui.users.fields.name").toLowerCase() })
                                                    : value.length < 2
                                                        ? t("ui.validation.min.string", { attribute: t("ui.users.fields.name").toLowerCase(), min: "2" })
                                                        : undefined;
                                            },
                                        }}
                                >
                                    {(field) => (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                            <Icon iconNode={User} className="w-5 h-5" />
                                            <Label htmlFor={field.name}>{t("ui.users.fields.name")}</Label>
                                            </div>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t("ui.users.placeholders.name")}
                                                disabled={form.state.isSubmitting}
                                                required={false}
                                                autoComplete="off"
                                            />
                                            <FieldInfo field={field} />
                                        </div>
                                    )}
                                    </form.Field>
                                </div>
            
                                {/* Email field */}
                                <div className="mb-4">
                                    <form.Field
                                        name="email"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                return !value
                                                    ? t("ui.validation.required", { attribute: t("ui.users.fields.email").toLowerCase() })
                                                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                                        ? t("ui.validation.email", { attribute: t("ui.users.fields.email").toLowerCase() })
                                                        : undefined;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                <Icon iconNode={Mail} className="w-5 h-5" />
                                                <Label htmlFor={field.name}>{t("ui.users.fields.email")}</Label>
                                                </div>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t("ui.users.placeholders.email")}
                                                    disabled={form.state.isSubmitting}
                                                    required={false}
                                                    autoComplete="off"
                                                />
                                                <FieldInfo field={field} />
                                            </div>
                                        )}
                                    </form.Field>
                                </div>

                                {/* Password field */}
                                <div className="">
                                    <form.Field
                                        name="password"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                if (!initialData && (!value || value.length === 0)) {
                                                    return t("ui.validation.required", { attribute: t("ui.users.fields.password").toLowerCase() });
                                                }
                                                if (value && value.length > 0 && value.length < 8) {
                                                    return t("ui.validation.min.string", { attribute: t("ui.users.fields.password").toLowerCase(), min: "8" })+ ", " + t("ui.createUser.pwd");
                                                }
                                                return undefined;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                <Icon iconNode={Lock} className="w-5 h-5" />
                                                <Label htmlFor={field.name}>
                                                    {initialData
                                                        ? t("ui.users.fields.password_optional")
                                                        : t("ui.users.fields.password")}
                                                </Label>
                                                </div>
                                                <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="password"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t("ui.users.placeholders.password")}
                                                    disabled={form.state.isSubmitting}
                                                    autoComplete="off"
                                                    required={false}
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    <Icon iconNode={Eye} className="w-5 h-5" />
                                                </div>
                                                </div>
                                                <FieldInfo field={field} />
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                        </div> 
                    </Card>
                 </TabsContent>
                <TabsContent value="rp" className="disabled">
                    <Card>
                    <div className="ml-5 mr-5">
                        <div className="flex items-center gap-2">
                            <Icon iconNode={Shield} className="w-5 h-5" />
                            <Label className="font-black capitalize">{t("ui.headerpermits.title")}</Label>
                        </div>
                        <div className="">
                        <form.Field
                                        name="role" 
                                        children={(field) => ( 
                                            <div>
                                            <Select 
                                            value={selectedRole}
                                            onValueChange={handleRoleChange}
                                            >
                                                <SelectTrigger className="mt-3 border-2 w-full py-2 px-1 rounded-md dark:bg-[#272726]">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="default">{t("ui.headerpermits.rol")}</SelectItem>
                                                    <SelectItem value="administrador">{t("ui.headerpermits.role1")}</SelectItem>
                                                    <SelectItem value="visualizer">{t("ui.headerpermits.role2")}</SelectItem>
                                                    <SelectItem value="Editor">{t("ui.headerpermits.role3")}</SelectItem>
                                                </SelectContent>
                                                </Select>
                                                {field.state.value == 'default' && <p className="mt-1">{t("ui.headerpermits.string")}</p>}
                                             </div> 
                                        )
                                    }
                                    />    
                        </div>
                        
                            <div className="p-3"></div>
                            <hr className="dark:border-white"></hr>
                            <div className=" mt-5 mb-5 flex items-center gap-2">
                                <Icon iconNode={Shield} className="w-5 h-5 text-blue-500" />
                                <Label className="font-black capitalize">{t("ui.specificpermits.permits")}</Label>
                            </div>
                            {/*DIV DE LOS 4 DIVS */}
                            <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-4 ">
                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={Users} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.specificpermits.users.user")}</Label>        
                                    </div>
                                    <form.Field
                                        name="permissions.users.view" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">      
                                                <Checkbox
                                                    id="users.view"
                                                    checked={ arrayPermissions.includes("users.view")} 
                                                    onCheckedChange={(checked) => 
                                                        togglePermission("users.view", !!checked)            
                                                    }
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"> 
                                                </Checkbox>
                                               
                                                <Label htmlFor="users.view" className="text-sm">{t("ui.specificpermits.users.seeuser")}</Label>   
                                                                                            
                                            </div>
                                        )}
                                    />      
                                    <form.Field
                                        name="permissions.users.create" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="users.create"
                                                    checked={arrayPermissions.includes("users.create")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("users.create", !!checked) ;
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500">
                                                    </Checkbox>
                                                <Label htmlFor="users.create" className="text-sm">{t("ui.specificpermits.users.createusers")}</Label>
                                            </div>
                                        )}
                                    />    
                                    <form.Field
                                        name="permissions.users.edit" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="users.edit"
                                                    checked={arrayPermissions.includes("users.edit")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("users.edit", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                                />
                                                <Label htmlFor="users.edit" className="text-sm">{t("ui.specificpermits.users.editusers")}</Label>
                                            </div>
                                        )}
                                    />
                                    <form.Field
                                        name="permissions.users.delete" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="users.delete"
                                                    checked={arrayPermissions.includes("users.delete")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("users.delete", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="users.delete" className="text-sm">{t("ui.specificpermits.users.deleteusers")}</Label>
                                            </div>
                                        )}
                                    />   
                                </div>   


                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={PackageOpen} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.specificpermits.products.products")}</Label>        
                                    </div>
                                    <form.Field
                                        name="permissions.products.view" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="products.view"
                                                    checked={arrayPermissions.includes("products.view")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("products.view", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="products.view" className="text-sm">{t("ui.specificpermits.products.seeproduct")}</Label>
                                            </div>
                                        )}
                                    />  
                                     <form.Field
                                        name="permissions.products.create" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="products.create"
                                                    checked={arrayPermissions.includes("products.create")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("products.create", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="products.create" className="text-sm">{t("ui.specificpermits.products.createproduct")}</Label>
                                            </div>
                                        )}
                                    />  
                                     <form.Field
                                        name="permissions.products.edit" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="products.edit"
                                                    checked={arrayPermissions.includes("products.edit")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("products.edit", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="products.edit" className="text-sm">{t("ui.specificpermits.products.editproduct")}</Label>
                                            </div>
                                        )}
                                    />  
                                     <form.Field
                                        name="permissions.products.delete" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="products.delete"
                                                    checked={arrayPermissions.includes("products.delete")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("products.delete", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="products.delete" className="text-sm">{t("ui.specificpermits.products.deleteproducts")}</Label>
                                            </div>
                                        )}
                                    />  
                                </div>


                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={FileText} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.specificpermits.reports.reports")}</Label>        
                                    </div>
                                    <form.Field
                                        name="permissions.reports.view" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="reports.view"
                                                    checked={arrayPermissions.includes("reports.view")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("reports.view", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="reports.view" className="text-sm">{t("ui.specificpermits.reports.seereports")}</Label>
                                            </div>
                                        )}
                                    />  
                                    <form.Field
                                        name="permissions.reports.export" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="reports.export"
                                                    checked={arrayPermissions.includes("reports.export")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("reports.export", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="reports.export" className="text-sm">{t("ui.specificpermits.reports.exportreport")}</Label>
                                            </div>
                                        )}
                                    />
                                    <form.Field
                                        name="permissions.reports.print" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="reports.print"
                                                    checked={arrayPermissions.includes("reports.print")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("reports.print", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="reports.print" className="text-sm">{t("ui.specificpermits.reports.printreport")}</Label>
                                            </div>
                                        )}
                                    />
                                </div>


                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={Settings} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.specificpermits.configs.configs")}</Label>        
                                    </div>
                                    <form.Field
                                        name="permissions.settings.access" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="settings.access"
                                                    checked={arrayPermissions.includes("settings.access")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("settings.access", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="settings.access" className="text-sm">{t("ui.specificpermits.configs.accesssettings")}</Label>
                                            </div>
                                        )}
                                    />
                                    <form.Field
                                        name="permissions.settings.modify" 
                                        children={(field) => ( 
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="settings.modify"
                                                    checked={arrayPermissions.includes("settings.modify")} 
                                                    onCheckedChange={(checked) => {
                                                        togglePermission("settings.modify", !!checked);
                                                    }}
                                                    className="border-1 border-blue-500 bg-white data-[state=checked]:bg-blue-500"
                                            />
                                                <Label htmlFor="settings.modify" className="text-sm">{t("ui.specificpermits.configs.modifysettings")}</Label>
                                            </div>
                                        )}
                                    />

                                </div>

                            </div>

                        </div>
                    </Card>
                </TabsContent>
            </Tabs>   
            
            <div className="p-1.5 bg-gray-100 dark:bg-[#272726]"></div>      
            <hr className="dark:border-black" />
        <div className="p-1 bg-gray-100 dark:bg-[#272726] "></div>
        {/* DIV BOTONES */}
        <div className="grid grid-cols-2 justify-items-end gap-4 bg-gray-100 dark:bg-[#272726]"> 
                <Button
                className="justify-self-start hover:bg-red-500 ml-4"
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = "/users";
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
                    <Icon iconNode={X} className="w-5 h-5" />
                    {t("ui.users.buttons.cancel")}
                </Button>

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                            <Icon iconNode={Save} className="w-5 h-5" />
                            {isSubmitting
                                ? t("ui.users.buttons.saving")
                                : initialData
                                    ? t("ui.users.buttons.update")
                                    : t("ui.users.buttons.save")}
                        </Button>
                    )}

                </form.Subscribe>
            </div>
            <div className="rounded-b-lg p-1 bg-gray-100 dark:bg-[#272726]"></div>
            </form>
        </div>
    </div>
    );
}