<?php

return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Pisos',
            'floor'=> 'Pisos',
            'zones'=> 'Zonas',
            'bookcases'=> 'Estanterías',
            'loans'=> 'Préstamos',
            'reservations'=> 'Reservas',
            'ranking'=> 'Ranking',
            'books' => 'Libros',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
        ],
    ],
    'ranking' => [
        'book' => [
            'title' => 'Ranking de Libros Más Reservados y Prestados',
        ],
        'user'=> [
            'title'=>'Usuarios Más Activos'
        ],
        'zone'=>[
            'title'=> 'Zonas con Más Movimiento',
            'floor'=> 'Piso'
        ],
        'legend'=>[
            'reservation'=> 'Reservados',
            'loan'=> 'Prestados',
        ],
    ],

    'messages'=> [
        'loans'=> [
            'created'=> 'Loan created succefully',
        ],
    ],
    'reservations' => [
        'title' => 'Reservas',
        'no_results'=> 'No hay resultados de reservas',
        'filters' => [
            'book' => 'Título del libro',
            'email' => 'Correo del usuario',
            'queue' => 'Posición en cola',
        ],
        'utils'=> [
            'select_email'=> 'Selecciona un email de usuario',
            'required_fileds'=> 'Email de usuario obligatorio',
            'search_email'=> 'Busca Email',
            'title' => 'Formulario de Reserva',
            'description'=> 'Rellena los campos para completar la reserva del libro',
            'book'=> 'Nombre del libro',
            'email' => 'Correo electrónico',
            'confirm'=> 'Confirmar  '
        ],
        'placeholders' => [
            'book' => 'Ingrese título del libro...',
            'user' => 'Ingrese correo del usuario...',
            'queue' => 'Ingrese posición en cola...'
        ],
        'columns' => [
            'book_id' => 'Nombre de usuario',
            'user_id' => 'Correo del usuario',
            'puesto' => 'Posición',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'delete' => [
            'title' => 'Eliminar Reserva',
            'description' => '¿Está seguro de eliminar esta reserva? Esta acción no se puede deshacer.',
        ],
    ],
    'loans' => [
        'title' => 'Préstamos',
        'no_results'=> 'No hay resultados de préstamos',
        'buttons' => [
            'new' => 'Nuevo Préstamo',
        ],
        'filters'=>[
            'book'=> 'Ingrese título del libro...',
            'email'=> 'Ingrese correo del usuario...',
            'status'=> 'Ingrese estado...',
            'start_date'=> 'Ingrese fecha de inicio...',
            'due_date'=> 'Ingrese fecha de vencimiento...',
        ],
        'placeholders' => [
            'booktitle' => 'Título del libro',
            'email' => 'Correo electrónico',
            'status' => 'Estado',
            'start_date' => 'Fecha de inicio',
            'due_date' => 'Fecha de vencimiento',
        ],
        'columns' => [
            'book' => 'Libro',
            'email' => 'Correo',
            'status' => 'Estado',
            'created_at' => 'Creado el',
            'remaining' => 'Restante',
            'duedate' => 'Fecha de vencimiento',
            'actions' => 'Acciones',
        ],
        'utils' => [
            'inProgress' => 'En progreso',
            'finished' => 'Finalizado',
            'returned' => 'Devuelto el: ',
            'days' => 'días',
            'remaining' => 'Restantes',
            'minutes'=> 'Minutos',
            'hours' => 'Horas ',
            'overdue'=> 'Pasadas'

        ],
        'fields'=> [
            'book'=> 'Libro',
            'user'=> 'Email del usuario',
            'duedate' => 'Fecha de devolución',
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear préstamo',
                'description' => 'Complete los datos para registrar un nuevo préstamo',
            ],
        ],
    'placeholders' => [
        'user' => 'Seleccionar usuario',
    ],
    'buttons' => [
        'cancel' => 'Cancelar',
        'save' => 'Guardar'
    ],
    ],
    'common' => [            


        'filters' => [

            'results' => 'Resultados',
        ],
    ],
    'buttons' => [
        'new' => 'Nuevo',
        'edit' => 'Editar',
        'save' => 'Guardar',
        'update' => 'Actualizar',
        'cancel' => 'Cancelar',
        'delete' => 'Eliminar',
        'deleting' => 'Eliminando...',
        'saving' => 'Guardando...',
        'retry' => 'Reintentar',
    ],
    'dashboard' => [
        'users' => 'Usuarios',
        'floors' => 'Pisos',
        'books' => 'Libros',
        'zones' => 'Zonas',
        'bookcases' => 'Estanterías',
        'loans' => 'Préstamos',
        'reservations' => 'Reservas',
        'ranking'=> 'Ranking',
        'description' => [
            'users' => 'Gestionar todos los usuarios del sistema',
            'floors' => 'Gestionar todos los pisos y secciones del sistema',
            'books' => 'Gestionar todos los libros del sistema',
            'zones' => 'Gestionar todas las zonas del sistema',
            'bookcases' => 'Gestionar todas las estanterías del sistema',
            'loans' => 'Gestionar todos los préstamos del sistema',
            'reservations' => 'Gestionar todas las reservas del sistema',
            'ranking'=> 'Ver clasificaciones de libros, usuarios y zonas',
        ]
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor intente nuevamente en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Administre la configuración de su perfil y cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración de perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualice su nombre y dirección de correo',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Correo electrónico',
            'email_placeholder' => 'Correo electrónico',
            'unverified_email' => 'Su correo electrónico no está verificado.',
            'resend_verification' => 'Haga clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a su correo electrónico.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrese de usar una contraseña larga y aleatoria para mantener su cuenta segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualice la configuración de apariencia de su cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambie su idioma preferido',
        ],
    ],
    'validation' => [
        'required' => 'El campo :attribute es obligatorio.',
        'email' => 'El campo :attribute debe ser una dirección de correo válida.',
        'validating'=> 'Validando',
        'min' => [
            'string' => 'El campo :attribute debe tener al menos :min caracteres.',
        ],
        'max' => [
            'string' => 'El campo :attribute no debe ser mayor a :max caracteres.',
        ],
        'unique' => 'El :attribute ya ha sido tomado.',
        'confirmed' => 'La confirmación de :attribute no coincide.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters' => [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado exitosamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'Sin resultados',
    ],
    'floors' => [
        'title' => 'Pisos',
        'create' => 'Crear Piso',
        'edit_title' => 'Editar Piso',
        'delete' => [
            'title' => 'Piso eliminado',
            'description' => '¿Estás seguro de que deseas eliminar este piso? Esta acción no se puede deshacer.',
        ],

        'buttons' => [
            'new' => 'Nuevo Piso',
        ],
    ],
    'bookcases' => [
        'title' => 'Estanterías',
        'total' => 'Estanterías Registradas',
        'no_results'=> 'No hay resultados de estanterías',        
        'edit'=> 'Edición de Estantería',
        "cards" => [
            "create" => [
                "title" => "Crear estantería",
                "description" => "Complete el formulario para agregar una nueva estantería a la colección."
            ],
            "edit" => [
                "title" => "Editar estantería",
                "description" => "Complete el formulario para actualizar una estantería en la colección.",
            ],
        ],
        'buttons' => [
            'new' => 'Nueva Estantería',
        ],
        'filters' => [
            'title' => 'Título',
            'genres' => 'Género',
            'author' => 'Autor',
            'pages' => 'Páginas',
            'publisher' => 'Editorial',
            'floor' => 'Número de piso',
            'zone' => 'Número de zona',
            'bookcase' => 'Número de estantería',
            'capacity' => 'Capacidad',
        ],
        'fields' => [
            'bookcase' => 'Número de estantería',
            'capacity' => 'Capacidad',
            'floor' => 'Número de piso',
            'zone' => 'Número de zona',
            'zoneGenre' => 'Género',
        ],
        'columns' => [
            'bookcase' => 'Número de estantería',
            'capacity' => 'Capacidad',
            'floor' => 'piso',
            'zone' => 'Número de zona',
            'zoneGenre' => 'Género',
            'created_at' => 'Creado el',
            'actions' => 'Acciones'
        ],
        'placeholders' => [
            'title' => 'Ingrese un título...',
            'genres' => 'Ingrese un género...',
            'author' => 'Ingrese un autor...',
            'pages' => 'Ingrese número de páginas...',
            'publisher' => 'Ingrese una editorial...',
            'floor' => 'Ingrese un piso...',
            'zone' => 'Ingrese una zona...',
            'bookcase' => 'Ingrese una estantería...',
            'capacity' => 'Ingrese capacidad...'
        ],
        'delete'=>[
            'title' => 'Eliminar estantería',
            'description' => '¿Estás seguro de que deseas eliminar esta estantería? Esta acción no se puede deshacer.',
        ],
    ],
    'zones' => [
        'title' => 'Zonas',
        'number'=> 'Número de la zona',
        'total' => 'Zonas Registradas',
        'capacity'=> 'Capacidad',
        'floor_label'=> 'Piso',
        'floor'=> 'Piso de la zona',
        'genre'=> 'Género de la zona',

        "cards" => [
            "create" => [
                "title" => "Crear Zona",
                "description" => "Complete el formulario para agregar una nueva zona a la colección."
            ],
            "edit" => [
                "title" => "Editar Zona",
                "description" => "Complete el formulario para actualizar una zona en la colección.",
            ],
        ],
        'buttons' => [
            'new' => 'Nueva Zona',
        ],
        'filters' => [
            'number' => 'Número de zona',
            'capacity' => 'Capacidad'
        ],
        'placeholders' => [
            'number' => 'Ingrese un número...',
            'capacity' => 'Ingrese capacidad...',
        ],
        'columns' => [
            'number' => 'Número de zona',
            'capacity' => 'Capacidad',
            'genre' => 'Género',
            'created_at' => 'Creado el',
            'actions' => 'Acciones'
        ],
        'fields' => [
            'number' => 'Número de zona',
            'capacity' => 'Capacidad',
            'genre' => 'Género',
        ],
        'create' => [
            'title' => 'título',
            'desc' => 'descripción'
        ],
        'validation' => [
            'number_required' => 'El número de zona es requerido',
            'number_integer' => 'El número de zona debe ser un número',
            'capacity_required' => 'La capacidad es requerida',
            'capacity_integer' => 'La capacidad debe ser un número',
            'capacity_min' => 'La capacidad debe ser al menos :min',
        ],
        
    ],
    'users' => [
        'total' => 'Usuarios Registrados',
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'flters'=>[
            'search' => 'Buscar usuario',
        ],
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Correo',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Correo',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permisos' => [
            'Users' => [
                'users' => [
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],
            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],
            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceder a configuración',
                    'modify' => 'Modificar configuración'
                ],
            ],
        ],

        'roles' => [
            'default' => 'Seleccione un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'name' => 'Nombre de usuario',
            'email' => 'Correo del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo números y letras'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingrese la información para crear un nuevo usuario en el sistema.'
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Está seguro?',
            'description' => 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Está seguro?',
            'description' => 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.',
            'success' => 'Eliminado exitosamente',
        ],
        'deleted_error' => 'Error al eliminar usuario',
        'no_results' => 'Sin resultados.',
        'error_loading' => 'Error al cargar usuarios. Por favor intente nuevamente.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'floors' => [
        'title' => 'Pisos',
        'total' => 'Pisos Registrados',
        'filters' => [
            'floor_number' => 'Buscar por título',
            'capacity' => 'Buscar por capacidad',
        ],
        'columns' => [
            'floor_number' => 'Número de piso',
            'capacity' => 'Capacidad',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'buttons' => [
            'new' => 'Crear nuevo piso',
        ],
        'placeholders' => [
            'floor_number' => 'Número de piso',
            'capacity' => 'Cantidad de capacidad',
        ],
        'delete' => [
            'title' => 'Piso eliminado',
            'description' => '¿Estás seguro de que deseas eliminar este piso? Esta acción no se puede deshacer.',
        ],

    ],
    'floor' => [
        'create' => 'Crear Piso',
        'edit' => 'Editar Piso',
        'create_description' => 'Complete el formulario para registrar un nuevo piso en el sistema',
        'edit_description' => 'Actualice la información del piso',
        'number' => 'Número de Piso',
        'capacity' => 'Capacidad',
        'createdAt' => 'Creado El',
        'actions' => 'Acciones',
        'validation' => [
            'number_required' => 'El número de piso es requerido',
            'number_integer' => 'El número de piso debe ser un entero',
            'number_unique' => 'Este número de piso ya existe',
            'capacity_required' => 'La capacidad es requerida',
            'capacity_integer' => 'La capacidad debe ser un número',
            'capacity_min' => 'La capacidad debe ser al menos :min',
            
        ],
        'messages' => [
            'created' => 'Piso creado exitosamente',
            'updated' => 'Piso actualizado exitosamente',
            'deleted' => 'Piso eliminado exitosamente',
            'error' => [
                'create' => 'Error al crear piso',
                'update' => 'Error al actualizar piso',
                'delete' => 'Error al eliminar piso',
            ],
        ],
        'buttons' => [
            'create' => 'Crear Piso',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'edit' => 'Editar',
            'delete' => 'Eliminar',
        ],
        'titles' => [
            'list' => 'Lista de Pisos',
            'management' => 'Gestión de Pisos',
            'details' => 'Detalles del Piso',
        ],
        'placeholders' => [
            'number' => 'Ingrese número de piso',
            'capacity' => 'Ingrese capacidad',
            'search' => 'Buscar pisos...',
        ],
        'filters' => [
            'all' => 'Todos los Pisos',
            'active' => 'Pisos Activos',
        ],
        'empty' => [
            'title' => 'No se encontraron pisos',
            'description' => 'Comience creando un nuevo piso',
        ],
    ],
    'books' => [
        'total'=> 'Libros registrados',
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del libro...',
            'author' => 'Autor del libro...',
            'available' => 'Disponible',
            'genres' => 'Género del libro...',
        ],
        'title' => 'Libros',
        'create' => 'Crear Libro',
        'edit' => 'Editar Libro',
        'fields' => [
            'title' => 'Título',
            'email' => 'Correo',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'title' => 'Título',
            'author' => 'Autor',
            'genres' => 'Géneros',
            'editor' => 'Editorial',
            'length' => 'Páginas',
            'bookcase' => 'Estantería',
            'zone' => 'Zona',
            'floor' => 'Piso',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permissions' => [
            'Users' => [
                'users' => [
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],
            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],
            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceder a configuración',
                    'modify' => 'Modificar configuración'
                ],
            ],
            'delete'=>[
                'title' => 'Eliminar libro',
                'description' => '¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.',
            ],
        ],
        'roles' => [
            'default' => 'Seleccione un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del libro...',
            'author' => 'Autor del libro...',
            'available' => 'Disponible',
            'genres' => 'Género del libro...',
        ],
        'placeholders' => [
            'title' => 'Título...',
            'author' => 'Autor...',
            'password' => 'Contraseña segura',
            'search' => 'Buscar libros...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'bookinfo'=> 'Información del libro',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingrese la información para crear un nuevo usuario en el sistema'
        ],
        'buttons' => [
            'new' => 'Nuevo',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Está seguro?',
            'description' => 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Está seguro?',
            'description' => 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.',
            'success' => 'Eliminado exitosamente',
        ],
        'deleted_error' => 'Error al eliminar usuario',
        'no_results' => 'Sin resultados.',
        'error_loading' => 'Error al cargar usuarios. Por favor intente nuevamente.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    "books" => [
        'total'=> 'Libros Registrados',
        'title' => 'Libros',
        "tabs" => [
            "basic" => "Información Básica",
            "location" => "Ubicación"
        ],
        "cards" => [
            "create" => [
                "title" => "Crear libro",
                "description" => "Complete el formulario para agregar un nuevo libro a la colección."
            ],
            "edit" => [
                "title" => "Editar libro",
                "description" => "Complete el formulario para actualizar un libro en la colección.",
            ],
        ],
        'filters'=>[
            'title'=> 'Título del libro',
            'genres' => 'Género',
            'author' => 'Autor',
            'pages'=> 'Páginas',
            'publisher' => 'Editorial',
            'floor'=> 'Número de piso',
            'zone' => 'Número de zona',
            'bookcase'=> 'Número de estantería',
        ],
        'tabs'=>[
            'bookInfo'=> 'Información del libro',
            'location'=> 'Ubicación',
        ],
        'columns' => [
            'title' => 'Título',
            'genres' => 'Género',
            'author' => 'Autor',
            'length' => 'Páginas',
            'editor' => 'Editorial',
            'floor' => 'Número de Piso',
            'zone' => 'Número de Zona',
            'bookcase' => 'Número de Estantería',
            'created_at' => 'Creado el',
            'actions' => 'Acciones'
        ],
        "fields" => [
            "title" => "Título",
            "author" => "Autor",
            "editor" => "Editorial",
            "length" => "Número de Páginas",
            "genres" => "Géneros",
            "selgenres" => "Géneros seleccionados",
            "floors" => "Piso",
            "floor" => "Piso: ",
            "zones" => "Zona",
            "zone" => "Zona: ",
            "bookcases" => "Estantería",
            "bookcase" => "Estantería: ",
            "publisher"=> "Editorial",
        ],
        "placeholders" => [
            "title" => "Ingrese el título del libro",
            'ISBN'=> 'Ingrese el ISBN del libro',
            'pages' => 'Ingrese el número de páginas',
            'publisher' => 'Ingrese la editorial',
            'floor' => 'Ingrese el número de piso',
            'zone' => 'Ingrese el número de zona',
            'bookcase' => 'Ingrese el número de estantería',
            "author" => "Ingrese el nombre del autor",
            "editor" => "Ingrese la editorial",
            "length" => "Número de páginas",
            "genres" => "Seleccione hasta 3 géneros"
        ],
        "buttons" => [
            "cancel" => "Cancelar",
            "save" => "Guardar",
            "saving" => "Guardando...",
            "update" => "Actualizar",
            'new' => 'Nuevo Libro'
        ],
        "error" => [
            "create" => "Hubo un error al crear el libro.",
            "update" => "Hubo un error al actualizar el libro."
        ],
    ],
    "genres" => [
        "names" => [
            "Fantasy" => "Fantasía",
            "Drama" => "Drama",
            "Historical" => "Histórico",
            "Science Fiction" => "Ciencia Ficción",
            "Horror" => "Terror",
            "Mystery" => "Misterio",
            "Thriller" => "Suspenso",
            "Romance" => "Romance",
            "Adventure" => "Aventura",
            "Dystopian" => "Distopía",
            "Gothic" => "Gótico",
            "Magical Realism" => "Realismo Mágico",
            "Satire" => "Sátira",
            "Comedy" => "Comedia",
            "Tragedy" => "Tragedia",
            "Crime Fiction" => "Ficción Criminal",
            "Mythology" => "Mitología",
            "Western" => "Western",
            "Cyberpunk" => "Cyberpunk",
            "Poetry" => "Poesía",
        ],
    ],
    'records' => [
        'title' => 'Historial',
        'description' => 'Revisa tu actividad de préstamos y reservas de libros',
        'loan' => [
            'none' => 'No hay préstamos registrados',
            'info' => 'Cuando solicites un préstamo, aparecerá aquí.',
            'delete' => 'Préstamo eliminado',
        ],
        'reservation' => [
            'none' => 'No hay reservas registradas',
            'info' => 'Cuando hagas una reserva, aparecerá aquí.',
        ],
        'info' => [
            'duration' => 'Duración',
            'left' => 'Faltan:',
            'defeated_ago' => 'Vencido hace',
            'days' => 'días',
            'reserv' => 'Reservado el:',
            'canceled_reserv' => 'Reserva cancelada',
        ],
    ],
    'genres' => [
    'label' => [
        'Fantasy' => 'Fantasía',
        'Drama' => 'Drama',
        'Historical' => 'Histórico',
        'Science Fiction' => 'Ciencia ficción',
        'Horror' => 'Terror',
        'Mystery' => 'Misterio',
        'Thriller' => 'Suspenso',
        'Romance' => 'Romance',
        'Adventure' => 'Aventura',
        'Dystopian' => 'Distopía',
        'Gothic' => 'Gótico',
        'Magical Realism' => 'Realismo mágico',
        'Satire' => 'Sátira',
        'Comedy' => 'Comedia',
        'Tragedy' => 'Tragedia',
        'Crime Fiction' => 'Novela negra',
        'Mythology' => 'Mitología',
        'Western' => 'Western',
        'Cyberpunk' => 'Cyberpunk',
        'Poetry' => 'Poesía',
        ],
    ],
];