<?php

namespace Domain\Loans\Models;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loan extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'user_id',
        'book_id',
        'due_date',
        'is_overdue',
        'returned_at',
        'is_active',
    ];

    protected $casts = [
        'due_date' => 'datetime:dd/mm/YYYY', 
        'created_at' => 'datetime:dd/mm/YYYY',
        'returned_at' => 'datetime:dd/mm/YYYY'
    ];

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->BelongsTo(Book::class);
    }
}