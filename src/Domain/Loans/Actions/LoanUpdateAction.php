<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        // Usando fill() para evitar tener que construir manualmente el array de datos
        $loan->fill([
            'user_id' => $data['user_id'],
            'book_id' => $data['book_id'],
            'due_date' => $data['due_date'],
            'is_active' => $data['is_active'] ?? $loan->is_active,  // No actualizar si no se pasa el valor
            'is_late' => $data['is_late'] ?? $loan->is_late,        // No actualizar si no se pasa el valor
        ]);

        // // Guardar los cambios
        // $loan->save();

        // Retornar el recurso actualizado
        return LoanResource::fromModel($loan->fresh());
    }
}

