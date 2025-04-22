<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Carbon\Carbon;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        // Buscar el usuario por su email
        $user = User::where('email', $data['email'])->firstOrFail();
        $userId = $user->id;

        // Buscar un libro con ese ISBN que no esté prestado actualmente
        $book = Book::where('isbn', $data['isbn'])
            ->whereDoesntHave('activeLoan', fn ($q) => $q->where('is_active', true))
            ->firstOrFail();

        // Convertir due_date a instancia de Carbon
        $dueDate = Carbon::parse($data['due_date']);

        // Crear el préstamo
        $loan = Loan::create([
            'user_id' => $userId,
            'book_id' => $book->id,
            'due_date' => $dueDate,
            'status' => true, // préstamo activo
        ]);

        // Retornar el recurso del préstamo
        return LoanResource::fromModel($loan);
    }
}
