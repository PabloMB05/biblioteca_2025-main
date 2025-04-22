<?php

namespace App\Loans\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class LoanApiController extends Controller
{
    /**
     * Display a listing of loans.
     */
    public function index(Request $request, LoanIndexAction $action)
    {
        // Devuelve los préstamos con paginación y búsqueda
        // return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    /**
     * Show details of a specific loan.
     */
    public function show(Loan $loan)
    {
        // return response()->json(['loan' => $loan]);
    }

    /**
     * Store a new loan.
     */
    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => ['required', 'integer', 'exists:books,id'], // Asegurarse que el libro existe
            'user_id' => ['required', 'integer', 'exists:users,id'], // Asegurarse que el usuario existe
            'loan_date' => ['required', 'date'],
            'return_date' => ['required', 'date'],
        ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        // Crea el préstamo
        $loan = $action($validator->validated());

        // return response()->json([
        //     'message' => __('messages.loans.created'),
        //     'loan' => $loan
        // ]);
    }

    /**
     * Update an existing loan.
     */
    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => ['required', 'integer', 'exists:books,id'], // Validar que el libro existe
            'user_id' => ['required', 'integer', 'exists:users,id'], // Validar que el usuario existe
            'loan_date' => ['required', 'date'],
            'return_date' => ['required', 'date'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Actualiza el préstamo
        $updatedLoan = $action($loan, $validator->validated());

        // return response()->json([
        //     'message' => __('messages.loans.updated'),
        //     'loan' => $updatedLoan
        // ]);
    }

    /**
     * Destroy an existing loan.
     */
    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        if (!$loan) {
            // return response()->json(['error' => 'Loan not found'], 404);
        }

        // Elimina el préstamo
        $action($loan);
        // return response()->json([
        //     'message' => __('messages.loans.deleted')
        // ]);
    }
}
