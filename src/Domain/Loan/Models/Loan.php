<?php

namespace Domain\Loan\Models;

use Illuminate\Database\Eloquent\Model;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
class Loan extends Model
{
    protected $fillable = [
        'id',
        'book_id',
        'user_id',
        'due_date',
        'return_date',
        'is_active',
        'is_late',
    ];    
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
