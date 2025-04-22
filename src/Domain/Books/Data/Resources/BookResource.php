<?php

namespace Domain\Books\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;
use Domain\Models\Floors\Floor;

use Domain\Zones\Models\Zone;
use Domain\Loans\Models\Loan;

use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $genres,
        public readonly string $author,
        public readonly int $length,
        public readonly string $editor,
        public readonly string $isbn,
        public readonly int  $count_book,
        public readonly int  $count_loan_book,
        public readonly bool $avaiable,
        public readonly int $bookcase_id,
        public readonly int $zone_id,
        public readonly int $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        // Eager load las relaciones necesarias
        $bookcase = $book->bookcase()->with(['zone.floor'])->first(); // Asegúrate que las relaciones estén definidas en el modelo Book
        $zone = $bookcase->zone;
        $floor = $zone->floor;
        $countLoansWithIsbn = Loan::whereHas('book', function ($query) use ($book) {
            $query->where('isbn', $book->isbn);  // Filter loans by the same ISBN
        })->count();
        $countBook = Book::where('isbn', $book->isbn)->count();
        return new self(
            
            id: $book->id,
            title: $book->title,
            genres: $book->genres,
            author: $book->author,
            length: $book->length,
            editor: $book->editor,
            isbn: $book->isbn,
            count_book: $countBook,
            count_loan_book: $countLoansWithIsbn,
            avaiable: $book->activeLoan()->doesntExist(),
            bookcase_id: $bookcase->number, // Usamos el número del estante
            zone_id: $zone->number,        // Usamos el número de la zona
            floor_id: $floor->floor_number,      
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
