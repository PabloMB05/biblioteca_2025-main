<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Domain\Loans\Models\Loan;


class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('loans/Index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('loans/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email'],
            'isbn' => ['required', 'exists:books,isbn'],
            'due_date' => ['required', 'date', 'after:today'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $action($validator->validated());

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
    }


    public function edit(Request $request, Loan $loan)
    {

    }
    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
{
    
}
public function return(Request $request, Loan $loan)
{
    if (!$loan->is_active) {
        return $request->wantsJson()
            ? response()->json(['message' => 'Loan already returned'], 400)
            : redirect()->back()->with('error', 'Loan already returned');
    }

    $loan->is_active = false;
    $loan->return_date = now();
    $loan->save();

    return $request->wantsJson()
        ? response()->json(['message' => 'Loan returned successfully', 'loan' => $loan])
        : redirect()->back()->with('success', 'Loan returned successfully');
}


    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);
        return redirect()->route('loans.index')
            ->with('success', ('messages.loans.deleted'));
    }


}