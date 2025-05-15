<?php

return [
'navigation' => [
    'menu' => 'Navigation Menu',
    'items' => [
        'dashboard' => 'Dashboard',
        'users' => 'Users',
        'floors' => 'Floors',
        'floor' => 'Floors',
        'zones' => 'Zones',
        'bookcases' => 'Bookcases',
        'loans' => 'Loans',
        'reservations' => 'Reservations',
        'ranking' => 'Ranking',
        'books' => 'Books',
        'repository' => 'Repository',
        'documentation' => 'Documentation',
    ],
],

    'ranking' => [
        'book' => [
            'title' => 'Ranking of Most Reserved and Borrowed Books',
        ],
        'user' => [
            'title' => 'Most Active Users',
        ],
        'zone' => [
            'title' => 'Zones with the Most Activity',
            'floor'=> 'Floor'
        ],
        'legend'=>[
            'reservation'=> 'Reservations',
            'loan'=> 'Loans',
        ],
    ],

    'reservations' => [
        'title' => 'Reservations',
        'no_results'=> 'No results resarvations',
        'filters' => [
            'book' => 'Book title',
            'email' => 'User email',
            'queue' => 'Queue Position',
        ],
        'utils' => [
            'select_email'=> 'Select User Email',
            'required_fields'=> 'User Email is required',
            'search_email'=> 'Search Email',
            'title' => 'Reservation Form',
            'description' => 'Fill in the fields to complete the book reservation',
            'book' => 'Book Title',
            'email' => 'Email Address',
            'confirm'=> 'Confirm'
        ],

        'placeholders' => [
            'book' => 'Enter book title...',
            'user' => 'Enter user email...',
            'queue' => 'Enter queue position...'
        ],
        'columns' => [
            'book_id' => 'User Name',
            'user_id' => 'User email',
            'puesto' => 'Position',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'delete' => [
            'title' => 'Delete Reservation',
            'description' => 'Are you sure you want to delete this reservation? This action cannot be undone.',
        ],
    ],
    'messages'=> [
        'loans'=> [
            'created'=> 'Loan created succefully',
        ],
    ],
    'loans' => [
        'title' => 'Loans',
        'no_results'=> 'No results',
        'buttons' => [
            'new' => 'New Loan',
        ],
        'filters'=>[
            'book'=> 'Enter a book title...',
            'email'=> 'Enter user email...',
            'status'=> 'Enter status...',
            'start_date'=> 'Enter start date...',
            'due_date'=> 'Enter due date...',
        ],
        'placeholders' => [
            'booktitle' => 'Book title',
            'email' => 'Email',
            'status' => 'Status',
            'start_date' => 'Start date',
            'due_date' => 'Due date',
        ],
        'columns' => [
            'book' => 'Book',
            'email' => 'Email',
            'status' => 'Status',
            'created_at' => 'Created at',
            'remaining' => 'Remaining',
            'duedate' => 'Due date',
            'actions' => 'Actions',
        ],
        'utils' => [
            'inProgress' => 'In progress',
            'finished' => 'Finished',
            'returned' => 'Returned on: ',
            'days' => 'days',
            'remaining' => 'Remaining',
            'minutes' => 'Minutes',
            'hours' => 'Hours',
            'overdue' => 'Overdue'
        ],

        'cards' => [
            'create'=> [
                'title' => 'Create Loan',
                'description' => 'Form for creating a new loan',
                'edit' => 'Form for updating a new loan',
            ],
        ],
        'fields' => [
            'book'=> 'Book ISBN',
            'user' => 'User Email',
            'duedate' => 'Expiration Date'
        ],
        'placeholders' => [
            'book' => 'Enter the book ISBN',
            'user' => 'Enter the User Email',
            'booktitle' => 'Book Title',
            'email' => 'User Email',
            'status'=> 'Status',
            'start_date' => 'start_date',
            'due_date' => 'Due Date',
        ],
        'buttons' => [
            'cancel' => 'Cancel',
            'save' => 'Save',
            'update' => 'Update',
            'new' => 'New Loan'
        ],
    ],
    'common' => [
        'filters' => [
            'results' => 'Results',
        ],
    ],
    'buttons' => [
        'new' => 'New',
        'edit' => 'Edit',
        'save' => 'Save',
        'update' => 'Update',
        'cancel' => 'Cancel',
        'delete' => 'Delete',
        'deleting' => 'Deleting...',
        'saving' => 'Saving...',
        'retry' => 'Retry',
    ],
    'dashboard' => [
        'users' => 'Users',
        'floors' => 'Floors',
        'books' => 'Books',
        'zones' => 'Zones',
        'bookcases' => 'Bookcases',
        'loans' => 'Loans',
        'reservations' => 'Reservations',
        'ranking'=> 'Ranking',
        'description' => [
            'users' => 'Manage all system users',
            'floors' => 'Manage all floors and sections of the system',
            'books' => 'Manage all books in the system',
            'zones' => 'Manage all zones in the system',
            'bookcases' => 'Manage all bookcases in the system',
            'loans' => 'Manage all loans in the system',
            'reservations' => 'Manage all reservations in the system',
            'ranking'=> 'View rankings for books, users and zones'
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
        'filters' => [
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
        'no_results'=> 'There are no results for shelves',
        'total'=> 'Total Bookcases',
        "cards" => [
            "create" => [
                "title" => "Create bookcase",
                "description" => "Fill out the form below to add a new bookcase to the collection."
            ],
            "edit" => [
                "title" => "Edit bookcase",
                "description" => "Fill out the form below to update a bookcase in the collection.",
            ],
        ],
        'buttons' => [
            'new' => 'New Bookcase',
        ],
        'filters' => [
            'title' => 'Title',
            'genres' => 'Genre',
            'author' => 'Author',
            'pages' => 'Pages',
            'publisher' => 'Publisher',
            'floor' => 'Floor Number',
            'zone' => 'Zone Number',
            'bookcase' => 'Bookcase Number',
            'capacity' => 'Capacity',
        ],
        'fields' => [
            'bookcase' => 'Bookcase Number',
            'capacity' => 'Capacity',
            'floor' => 'Floor Number',
            'zone' => 'Zone Number',
            'zoneGenre' => 'Genre',
        ],
        'columns' => [
            'bookcase' => 'Bookcase Number',
            'capacity' => 'Capacity',
            'floor' => 'Floor Number',
            'zone' => 'Zone Number',
            'zoneGenre' => 'Genre',
            'created_at' => 'Created at',
            'actions' => 'Actions'
        ],
        'placeholders' => [
            'title' => 'Enter a title...',
            'genres' => 'Enter a genre...',
            'author' => 'Enter an author...',
            'pages' => 'Enter page count...',
            'publisher' => 'Enter a publisher...',
            'floor' => 'Enter a floor...',
            'zone' => 'Enter a zone...',
            'bookcase' => 'Enter a bookcase...',
            'capacity' => 'Enter capacity...'
        ],
        'delete'=>[
            'title' => 'Delete Bookcase',
            'description' => 'Are you sure you want to delete this bookcase? This action cannot be undone.',
        ],
    ],
    'zones' => [
        'total'=> 'Total Zones',
        'title' => 'Zones',
        'number' => 'Zone Number',
        'capacity'=> 'Zone Capacity',
        'floor'=> 'Floor Number',
        'genre'=> 'Zone Genre',
        'select_floor'=> 'Select Floor',
        'floor_label'=> 'Floor Capacity',
        'select_genre'=> 'Select Genre',
        "cards" => [
            "create" => [
                "title" => "Create Zone",
                "description" => "Fill out the form below to add a new zone to the collection."
            ],
            "edit" => [
                "title" => "Edit Zone",
                "description" => "Fill out the form below to update a zone in the collection.",
            ],
        ],
        'buttons' => [
            'new' => 'New Zone',
        ],
        'filters' => [
            'number' => 'Zone Number',
            'capacity' => 'Capacity'
        ],
        'placeholders' => [
            'number' => 'Enter a number...',
            'capacity' => 'Enter capacity...',
        ],
        'columns' => [
            'number' => 'Zone Number',
            'capacity' => 'Capacity',
            'genre' => 'Genre',
            'created_at' => 'Created at',
            'actions' => 'Actions'
        ],
        'fields' => [
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
            'number_integer' => 'The zone number must be a number',
            'capacity_required' => 'The capacity is required',
            'capacity_integer' => 'The capacity must be a number',
            'capacity_min' => 'The capacity must be at least :min',
        ],
        'delete'=>[
            'title'=> 'Zone Delete',
            'description'=> '¿Are you sure you want to block this zone?'
        ]
    ],
    'users' => [
        'title' => 'Users',
        'create' => 'Create User',
        'edit' => 'Edit User',
        'flters'=>[
            'search' => 'User search',
        ],
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
            'users' => 'Users',
            'products' => 'Products',
            'reports' => 'Reports',
            'configurations' => 'Configuration',
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
            'name' => 'Full user name',
            'email' => 'email@example.com',
            'password' => 'Secure password',
            'search' => 'Search users...',
            'passRulings' => 'Password must be at least 8 characters long, including numbers and letters'
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
            'success' => 'Successfully deleted',
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
        'total'=> 'Registered floors',
        'filters' => [
            'floor_number' => 'Search by title',
            'capacity' => 'Search by capacity',
        ],
        'columns' => [
            'floor_number' => 'Floor number',
            'capacity' => 'Capacity',
            'created_at' => 'Date created',
            'actions' => 'Actions',
        ],
        'buttons' => [
            'new' => 'Create new floor',
        ],
        'placeholders' => [
            'floor_number' => 'Floor number',
            'capacity' => 'Capacity quantity',
        ],
        'delete'=>[
            'title'=> 'Deleted Floor',
            'description'=> 'Are you sure you want to delete this floor? This action cannot be undone.',

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
        
        'filters' => [
            'search' => 'Search',
            'title' => 'Book Title...',
            'author' => 'Book Author...',
            'available' => 'Available',
            'genres' => 'Book Genre...',
        ],
        'title' => 'Books',
        'create' => 'Create Book',
        'edit' => 'Edit Book',
        'fields' => [
            'title' => 'Title',
            'email' => 'Email',
            'password' => 'Password',
            'password_optional' => 'Password (optional)',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'rolPpal' => 'Main Role',
            'permisos' => 'Specific Permissions'
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
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'gridelements' => [
            'users' => 'Users',
            'products' => 'Products',
            'reports' => 'Reports',
            'configurations' => 'Configuration',
        ],
        'permissions' => [
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
            'delete'=>[
                'title' => 'Delete Book',
                'description' => 'Are you sure you want to delete this book? This action cannot be undone.',
            ],
        ],
        'roles' => [
            'default' => 'Select a Role',
            'admin' => 'Administrator',
            'advanced' => 'Advanced User',
            'usuario' => 'Basic User'
        ],
        'filters' => [
            'search' => 'Search',
            'title' => 'Book Title...',
            'author' => 'Book Author...',
            'available' => 'Available',
            'genres' => 'Book Genre...',
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'password' => 'Secure password',
            'search' => 'Search books...',
            'passRulings' => 'Password must be at least 8 characters long, including letters and numbers'
        ],
        'cards' => [
            'title' => 'Create New User',
            'description' => 'Enter the information to create a new user in the system'
        ],
        'buttons' => [
            'new' => 'New',
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
            'success' => 'Successfully deleted',
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
    "books" => [
        'title' => 'Books',
        'total'=> 'Registered books',
        'create' => 'Create book',
        "tabs" => [
            "basic" => "Basic Info",
            "location" => "Location",
            'userForm' => 'Basic Information',
            'permissionsForm' => 'Roles and Permissions',
            'bookInfo' => 'Book Form',
        ],
        "cards" => [
            "create" => [
                "title" => "Create book",
                "description" => "Fill out the form below to add a new book to the collection."
            ],
            "edit" => [
                "title" => "Edit book",
                "description" => "Fill out the form below to update a book in the collection.",
            ],
        ],
        'filters'=>[
            'title'=> 'Book title',
            'genres' => 'Genre',
            'author' => 'Author',
            'pages'=> 'Pages',
            'publisher' => 'Publisher',
            'floor'=> 'Floor number',
            'zone' => 'Zone number',
            'bookcase'=> 'Bookcase number',
        ],
        'columns' => [
            'title' => 'Title',
            'genres' => 'Genre',
            'author' => 'Author',
            'length' => 'Pages',
            'editor' => 'Publisher',
            'floor' => 'Floor Number',
            'zone' => 'Zone Number',
            'bookcase' => 'Bookcase Number',
            'created_at' => 'Created at',
            'actions' => 'Actions'
        ],
        "fields" => [
            "title" => "Title",
            "author" => "Author",
            "editor" => "Publisher",
            "length" => "Page Count",
            "genres" => "Genres",
            "selgenres" => "Selected genres",
            "floors" => "Floor",
            "floor" => "Floor: ",
            "zones" => "Zone",
            "zone" => "Zone: ",
            "bookcases" => "Bookcase",
            "bookcase" => "Bookcase: ",
            "publisher"=> "publisher",
        ],
        "placeholders" => [
            "title" => "Enter the book title",
            'ISBN'=> 'Enter the book ISBN',
            'pages' => 'Enter the pages nummber',
            'publisher' => 'Enter the publisher',
            'floor' => 'Enter the floor number',
            'zone' => 'Enter the zone number',
            'bookcase' => 'Enter the bookcase number',
            "author" => "Enter the author's name",
            "editor" => "Enter the publisher",
            "length" => "Number of pages",
            "genres" => "Select up to 3 genres"
        ],
        "buttons" => [
            "cancel" => "Cancel",
            "save" => "Save",
            "saving" => "Saving...",
            "update" => "Update",
            'new' => 'New Book'
        ],
        "error" => [
            "create" => "There was an error creating the book.",
            "update" => "There was an error updating the book."
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
    'records' => [
        'title' => 'History',
        'description' => 'Review your book loans and reservations activity',
        'loan' => [
            'none' => 'No loans recorded',
            'info' => 'When you request a loan, it will appear here.',
            'delete' => 'Loan eliminated',
        ],
        'reservation' => [
            'none' => 'No reservations recorded',
            'info' => 'When you make a reservation, it will appear here.',
        ],
        'timeline'=>[
            'all'=> 'All',
            'none'=> 'No loan and reservations recorded',
            'info'=> 'When you request a loan and reservation, it will appear here.'
        ],
        'info' => [
            'duration' => 'Duration',
            'left' => 'Left:',
            'defeated_ago' => 'defeated_ago',
            'days'=> 'days',
            'hours' => 'hours',
            'minutes' => 'minutes',
            'reserv' => 'Reserved on:',
            'canceled_reserv' => 'canceled reservation',
        ],
    ],
    
    
];