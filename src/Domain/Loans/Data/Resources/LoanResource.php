<?php

namespace Domain\Loans\Data\Resources;

use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;
use Carbon\Carbon;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $user_id,
        public readonly string $user_email,
        public readonly int $book_id,
        public readonly string $book_title,
        public readonly string|null $return_date,
        public readonly string $due_date,
        public readonly int $days_between,
        public readonly bool $is_active,
        public readonly bool $is_late,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        // Obtener los detalles del usuario
        $user = User::find($loan->user_id);
        $user_email = $user ? $user->email : 'Unknown';

        // Obtener los detalles del libro
        $book = Book::find($loan->book_id);
        $book_title = $book ? $book->title : 'Unknown';

        // Asegurarse de que las fechas sean instancias de Carbon o cadenas válidas
        $due_date = ($loan->due_date instanceof Carbon) ? $loan->due_date->format('Y-m-d') : $loan->due_date;
        $return_date = ($loan->return_date instanceof Carbon) 
        ? $loan->return_date->format('Y-m-d') 
        : null;
    
        $created_at = ($loan->created_at instanceof Carbon) ? $loan->created_at->format('Y-m-d') : $loan->created_at;
        $updated_at = ($loan->updated_at instanceof Carbon) ? $loan->updated_at->format('Y-m-d') : $loan->updated_at;

        // Verificar que los valores sean enteros
        $user_id = (int)$loan->user_id;
        $book_id = (int)$loan->book_id;
        return new self(
            id: (string)$loan->id,
            user_id: $user_id,
            user_email: $user_email,
            book_id: $book_id,
            book_title: $book_title,
            return_date: $return_date,
            due_date: $due_date,
            days_between: Carbon::now()->diffInDays($loan->due_date),
            is_active: $loan->is_active,
            is_late: $loan->is_late,
            created_at: (string)$created_at,
            updated_at: (string)$updated_at,
        );
    }
}
