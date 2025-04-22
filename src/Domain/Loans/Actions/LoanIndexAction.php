<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Models\Loan;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        // Inicializar las variables de búsqueda
        $user_email = '';
        $book_title = '';
        $due_date = '';

        if ($search) {

            $user_email = $search[0];
            $book_title = $search[1];
            $due_date = $search[2];
        }


        $UserQuery = User::query()
            ->when($user_email !== 'null', function ($query) use ($user_email) {
                $query->where('email', 'ILIKE', '%' . $user_email . '%');
            })
            ->pluck('id');

        $BookQuery = Book::query()
            ->when($book_title !== 'null', function ($query) use ($book_title) {
                $query->where('title', 'ILIKE', '%' . $book_title . '%');
            })
            ->pluck('id');


        $LoansQuery = Loan::query()
            ->when($due_date !== 'null', function ($query) use ($due_date) {
                $query->whereDate('due_date', '=', $due_date); 
            });

        $LoansQuery = $LoansQuery
            ->when($user_email !== 'null', function ($query) use ($UserQuery) {
                $query->whereIn('user_id', $UserQuery);
            })
            ->when($book_title !== 'null', function ($query) use ($BookQuery) {
                $query->whereIn('book_id', $BookQuery);
            })
            ->latest()->paginate($perPage); 


        return $LoansQuery->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
