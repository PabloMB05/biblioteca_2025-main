<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Str;

class LoanSeeder extends Seeder
{
    public function run()
    {
        // Obtener algunos libros y usuarios aleatorios
        $books = Book::all();
        $users = User::all();

        // Verificar si hay libros y usuarios en la base de datos
        if ($books->isEmpty() || $users->isEmpty()) {
            $this->command->error('No hay libros o usuarios disponibles en la base de datos para asignar préstamos.');
            return;
        }

        // Crear 10 préstamos aleatorios
        for ($i = 0; $i < 10; $i++) {
            Loan::create([
                'id' => Str::uuid(), // Generar UUID para el ID
                'user_id' => $users->random()->id, // Asignar un usuario aleatorio
                'book_id' => $books->random()->id, // Asignar un libro aleatorio
                'due_date' => Carbon::now()->addDays(30), 
                'return_date' => null,
                'is_active' => true, // El préstamo está activo por defecto
            ]);
        }

        $this->command->info('Seeder de préstamos completado.');
    }
}
