<?php

return [
    'navigation' => [
        'menu' => 'Navigation Menu',
        'items' => [
            'dashboard' => 'Dashboard',
            'users' => 'Users',
            'floors' => 'Floors',
            'books' => 'Books',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
        ],
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
    'dashboard' => [
        'users' => 'Users',
        'floors' => 'Floors',
        'books' => 'Books',
        'zones' => 'Zones',
        'bookcases' => 'Bookcases',
        'description' => [
            'users' => 'Manage all users in the system',
            'floors' => 'Manage all floors and sections in the system',
            'books' => 'Manage all books in the system',
            'zones' => 'Manage all zones in the system',
            'bookcases' => 'Manage all bookcases in the system',
        ]
    ],
    'user_menu' => [
        'settings' => 'Settings',
        'logout' => 'Log out',
    ],
    'auth' => [
        'failed' => 'These credentials do not match our records.',
        'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    ],
    'settings' => [
        'title' => 'Settings',
        'description' => 'Manage your profile and account settings',
        'navigation' => [
            'profile' => 'Profile',
            'password' => 'Password',
            'appearance' => 'Appearance',
            'languages' => 'Languages',
        ],
        'profile' => [
            'title' => 'Profile settings',
            'information_title' => 'Profile information',
            'information_description' => 'Update your name and email address',
            'name_label' => 'Name',
            'name_placeholder' => 'Full name',
            'email_label' => 'Email address',
            'email_placeholder' => 'Email address',
            'unverified_email' => 'Your email address is unverified.',
            'resend_verification' => 'Click here to resend the verification email.',
            'verification_sent' => 'A new verification link has been sent to your email address.',
            'save_button' => 'Save',
            'saved_message' => 'Saved',
        ],
        'password' => [
            'title' => 'Password settings',
            'update_title' => 'Update password',
            'update_description' => 'Ensure your account is using a long, random password to stay secure',
            'current_password_label' => 'Current password',
            'current_password_placeholder' => 'Current password',
            'new_password_label' => 'New password',
            'new_password_placeholder' => 'New password',
            'confirm_password_label' => 'Confirm password',
            'confirm_password_placeholder' => 'Confirm password',
            'save_button' => 'Save password',
            'saved_message' => 'Saved',
        ],
        'appearance' => [
            'title' => 'Appearance settings',
            'description' => 'Update your account\'s appearance settings',
            'modes' => [
                'light' => 'Light',
                'dark' => 'Dark',
                'system' => 'System'
            ]
        ],
        'languages' => [
            'title' => 'Language settings',
            'description' => 'Change your preferred language',
        ],
    ],
    'validation' => [
           'required' => 'The :attribute field is required.',
            'email' => 'The :attribute field must be a valid email address.',
            'min' => [
                'string' => 'The :attribute field must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
            'confirmed' => 'The :attribute confirmation does not match.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters'=> [
            'title' => 'Filters',
            'clear' => 'Clear',
        ],
        'delete_dialog' => [
            'success' => 'User deleted successfully',
        ],
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
            'first' => 'First',
            'last' => 'Last',
        ],
        'per_page' => 'Per page',
        'no_results' => 'No results',
    ],
    'floors' => [
        'title' => 'Floors',
        'create' => 'Create Floor',
        'buttons' => [
            'new' => 'New Floor',
        ],
    ],
    'bookcases' => [
        'title' => 'Bookcases',
        "cards" => [
            "create"=>[
                "title"=> "Create bookcase", 
                "description"=> "Fill out the form below to add a new bookcase to the collection."
            ],
            "edit"=>[
                    "title" => "Edit bookcase",
                    "description"=> "Fill out the form below to update a bookcase to the collection.",
                ],
        ],
        'buttons' => [
            'new' => 'New Bookcase',
        ],
        'filters' => [
            'title'=> 'Title',
            'genres' => 'Genre',
            'author' => 'Author',
            'pages' => 'Pages',
            'publisher'=> 'Editorial',
            'floor'=> 'Floor Number',
            'zone'=> 'Zone Number',
            'bookcase'=>'Bookcase Number',
            'capacity' => 'Capacity',
            
        ],
        'fields'=>[
            'bookcase'=> 'Bookcase Number',
            'capacity' => 'Capacity',
            'floor'=> 'Floor Number',
            'zone'=> 'Zone Number',
            'zoneGenre'=> 'Genre',
        ],
        'columns'=>[
            'bookcase'=> 'Bookcase Number',
            'capacity' => 'Capacity',
            'floor'=> 'Floor Number',
            'zone'=> 'Zone Number',
            'zoneGenre'=> 'Genre',
            'created_at'=> 'Create at',
            'actions'=> 'Actions'
        ],
        'placeholders' => [
            'title'=> 'Enter a title...',
            'genres' =>'Enter a genre...',
            'author'=> 'Enter a author...',
            'pages'=> 'Enter a pages...',
            'publisher'=> 'Enter a editorial...',
            'floor'=> 'Enter a floor...',
            'zone' => 'Enter a zone...',
            'bookcase' => 'Enter a bookcase...',
            'capacity' => 'Enter a capacity...'
        ],
    ],
    'zones' => [
        'title' => 'Zones',
        "cards" => [
            "create"=>[
                "title"=> "Create Zones", 
                "description"=> "Fill out the form below to add a new zone to the collection."
            ],
            "edit"=>[
                    "title" => "Edit Zone",
                    "description"=> "Fill out the form below to update a zones to the collection.",
                ],
        ],
        'buttons' => [
            'new' => 'New Zone',
        ],
        'filters'=>[
            'number'=> 'Zone Number',
            'capacity'=> 'Capacity'
        ],
        'placeholders'=>[
            'number'=> 'Enter a number...',
            'capacity'=> 'Enter a capacity...',
        ],
        'columns'=> [
            'number' => 'Zone Number',
            'capacity' => 'Capacity',
            'genre' => 'Genre',
            'created_ad'=>'Created_at',
            'actions'=> 'Actions'
        ],
        'fields'=>[
            'number' => 'Zone Number',
            'capacity' => 'Capacity',
            'genre' => 'Genre',
        ],
        'create' => [
            'title' => 'title',
            'desc' => 'desc'
        ],
        'validation' => [
            'number_required' => 'The zone number is required',
            'number_integer' => 'The zone number must be an number',
            'capacity_required' => 'The capacity is required',
            'capacity_integer' => 'The capacity must be a number',
            'capacity_min' => 'The capacity must be at least :min',
        ],
    ],
    'users' => [
        'title' => 'Users',
        'create' => 'Create User',
        'edit' => 'Edit User',
        'fields' => [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'password_optional' => 'Password (optional)',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'rolPpal' => 'Main Role',
            'permisos' => 'Specific Permissions'
        ],
        'columns' => [
            'name' => 'Name',
            'email' => 'Email',
            'created_at' => 'Created at',
            'actions' => 'Actions',
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
                    'view' => 'View users',
                    'create' => 'Create users',
                    'edit' => 'Edit users',
                    'delete' => 'Delete users'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'View products',
                    'create' => 'Create products',
                    'edit' => 'Edit products',
                    'delete' => 'Delete products'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'View reports',
                    'export' => 'Export reports',
                    'print' => 'Print reports'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Access configuration',
                    'modify' => 'Modify configuration'
                ],

            ],
        ],
        'gridelements' => [
            'users' => 'Users',
            'products' => 'Products',
            'reports' => 'Reports',
            'configurations' => 'Configuration',

        ],
        'roles' => [
            'default' => 'Select a Role',
            'admin' => 'Administrator',
            'advanced' => 'Advanced User',
            'usuario' => 'Basic User'
        ],
        'filters' => [
            'name' => 'User name',
            'email' => 'User email',
        ],
        'placeholders' => [
            'name' => 'Complete user name',
            'email' => 'email@example.com',
            'password' => 'Secure user password',
            'search' => 'Search users...',
            'passRulings' => 'The password must be at least 8 characters long, including nubers and letters'
        ],
        'tabs' => [
            'userForm' => 'Basic Information',
            'permissionsForm' => 'Roles and Permissions'
        ],
        'cards' => [
            'title' => 'Create New User',
            'description' => 'Input the information to create a new user in the system.'
        ],
        'buttons' => [
            'new' => 'New User',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
            'success' => 'Successfully deleted ;)',
        ],
        'deleted_error' => 'Error deleting user',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading users. Please try again.',
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
        ],
    ],
    'floors' => [
        'title' => 'Floors',
        'filters' => [
            'floor_number' => 'Search by title',
            'capacity' => 'Search by capacity',
        ],
        'columns' => [
            'floor_number' => 'Number floor',
            'capacity' => 'Capacity',
            'created_at' => 'Date created',
            'actions' => 'Actions',
        ],
        'buttons' => [
            'new' => 'Create new floor',
        ],
        'placeholders' =>[
            'floor_number' => 'Number of floor',
            'capacity' => 'capacity quantity',
        ],
        
    ],
    'floor' => [
        'create' => 'Create Floor',
        'edit' => 'Edit Floor',
        'create_description' => 'Fill out the form to register a new floor in the system',
        'edit_description' => 'Update the floor information',
        'number' => 'Floor Number',
        'capacity' => 'Capacity',
        'createdAt' => 'Created At',
        'actions' => 'Actions',
        
        'validation' => [
            'number_required' => 'The floor number is required',
            'number_integer' => 'The floor number must be an integer',
            'number_unique' => 'This floor number already exists',
            'capacity_required' => 'The capacity is required',
            'capacity_integer' => 'The capacity must be a number',
            'capacity_min' => 'The capacity must be at least :min',
        ],
        
        'messages' => [
            'created' => 'Floor created successfully',
            'updated' => 'Floor updated successfully',
            'deleted' => 'Floor deleted successfully',
            'error' => [
                'create' => 'Error creating floor',
                'update' => 'Error updating floor',
                'delete' => 'Error deleting floor',
            ],
        ],
        
        'buttons' => [
            'create' => 'Create Floor',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'edit' => 'Edit',
            'delete' => 'Delete',
        ],
        
        'titles' => [
            'list' => 'Floors List',
            'management' => 'Floor Management',
            'details' => 'Floor Details',
        ],
        
        'placeholders' => [
            'number' => 'Enter floor number',
            'capacity' => 'Enter capacity',
            'search' => 'Search floors...',
        ],
        
        'filters' => [
            'all' => 'All Floors',
            'active' => 'Active Floors',
        ],
        
        'empty' => [
            'title' => 'No floors found',
            'description' => 'Start by creating a new floor',
        ],
    
    ],
    'books' => [
        'title' => 'Books',
        'create' => 'Create Book',
        'edit' => 'Edit Book',
        'fields' => [
            'title' => 'Title',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'title' => 'Title',
            'author' => 'Author',
            'genres' => 'Genres',
            'editor' => 'Publisher',
            'length' => 'Pages',
            'bookcase' => 'Bookcase',
            'zone' => 'Zone',
            'floor' => 'Floor',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
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
                    'access' => 'Acceso a configuración',
                    'modify' => 'Modificar configuración'
                ],

            ],
        ],
        'roles' => [
            'default' => 'Selecciona un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => "Book's Title...",
            'author' => "Book's Author...",
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'password' => 'Contraseña segura',
            'search' => 'Search books...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
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
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
  "books"=> [
    'title' => 'Books',
    "tabs"=> [
      "basic"=> "Basic Info",
      "location"=> "Location"
    ],
    "cards" => [
        "create"=>[
            "title"=> "Create book", 
            "description"=> "Fill out the form below to add a new book to the collection."
        ],
        "edit"=>[
                "title" => "Edit book",
                "description"=> "Fill out the form below to update a book to the collection.",
            ],
    ],
    'columns'=>[
        'title'=> 'Title',
        'genres' => 'Genre',
        'author' => 'Author',
        'length' => 'Pages',
        'editor'=> 'Editorial',
        'floor'=> 'Floor Number',
        'zone'=> 'Zone Number',
        'bookcase'=>'Bookcase Number',
        'created_at' => 'Create at',
        'actions' => 'Actions'
    ],
    "fields"=> [
      "title"=> "Title",
      "author"=> "Author",
      "editor"=> "Publisher",
      "length"=> "Page Count",
      "genres"=> "Genres",
      "selgenres"=> "Selected genres",
      "floors" => "Floor",
      "floor" => "Floor: ",
      "zones" => "Zone",
      "zone" => "Zone: ",
      "bookcases" => "Bookcase",
      "bookcase" => "Bookcase: "
    ],
    "placeholders"=> [
      "title"=> "Enter the book title",
      "author"=> "Enter the author's name",
      "editor"=> "Enter the publisher",
      "length"=> "Number of pages",
      "genres"=> "Select up to 3 genres"
    ],
    "buttons"=> [
      "cancel"=> "Cancel",
      "save"=> "Save",
      "saving"=> "Saving...",
      "update"=> "Update",
      'new'=> 'New Book'
    ],
    "error"=> [
      "create"=> "There was an error creating the book.",
      "update"=> "There was an error updating the book."
    ],
    
],
"genres" => [
    "names" => [
        "Fantasy" => "Fantasy",
        "Drama" => "Drama",
        "Historical" => "Historical",
        "Science Fiction" => "Science Fiction",
        "Horror" => "Horror",
        "Mystery" => "Mystery",
        "Thriller" => "Thriller",
        "Romance" => "Romance",
        "Adventure" => "Adventure",
        "Dystopian" => "Dystopian",
        "Gothic" => "Gothic",
        "Magical Realism" => "Magical Realism",
        "Satire" => "Satire",
        "Comedy" => "Comedy",
        "Tragedy" => "Tragedy",
        "Crime Fiction" => "Crime Fiction",
        "Mythology" => "Mythology",
        "Western" => "Western",
        "Cyberpunk" => "Cyberpunk",
        "Poetry" => "Poetry",
    ],
],
'loans' => [
        'title' => 'Loans',
        'buttons' => [
            'new' => 'New Loan',
        ],
        'placeholders' => [
            'user_email' => 'Enter user email',
            'book_title' => 'Enter book title',
            'due_date' => 'Enter due date',
        ],
        'filters'=>[
                'user_email'=> 'User Email',
                'book_title'=> 'Book Title',
                'due_date'=> 'Due Date'
        ],
        'columns' => [
            'user_id' => 'User ID',
            'book_id' => 'Book ID',
            'due_date' => '[Due Date',
            'is_active' => 'Is Active',
            'is_late' => 'Is Late',
            'created_at' => 'Created At',
            'actions'=> 'Actions'
        ],
    ],

];