<?php

namespace App\Zones\Controllers;

use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneIndexAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Domain\Genres\Models\Genre;
use Domain\Models\floors\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ZoneController extends Controller
{
    // Mostrar todas las zonas
public function index()
    {

        $floor_numbers = Floor::all()->pluck('floor_number')->map(function ($floor_number) {
            return [
                'label' => $floor_number,
                'value' => $floor_number,
            ];
        })->toArray();

        return Inertia::render('zones/Index', ['floor_list' => $floor_numbers]);
    }

    // Mostrar el formulario de creación de una nueva zona
    public function create()
    {
        $floors =  Floor::withCount('zones')->get()->toArray();
        $genres = Genre::all();

        //dd($floors);
        return Inertia::render('zones/Create',['floors'=> $floors ,'genre' => $genres]);
    }

    // Almacenar una nueva zona
    public function store(Request $request, ZoneStoreAction $action)
    {
        
        // Validación de los datos del formulario
        $validator = Validator::make($request->all(), [
            'number' => ['required'],
            'genre_name' => ['required'],
            'capacity' => ['required'],
            'floor_id' => ['required'], // Validación del 'floor_id' como UUID que referencia la tabla `floors`
        ]);

        // Si la validación falla, se vuelve a la página anterior con los errores
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Ejecutar la acción para almacenar la nueva zona
        $action($validator->validated());

        // Redirigir a la página de listado de zonas con un mensaje de éxito
        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));
    }

    // Mostrar el formulario para editar una zona existente
    public function edit(Request $request, Zone $zone)
    {
        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'floors' =>  Floor::withCount('zones')->get()->toArray(),
            'genre' => Genre::all(), // Obtener todos los géneros
        ]);
    }
    

    // Actualizar una zona existente
    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        // Validación de los datos del formulario
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'integer', Rule::unique('zones')->ignore($zone->id)],
            'genre_name' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1'],
            'floor_id' => ['required', 'uuid', 'exists:floors,id'],
        ]);

        // Si la validación falla, se vuelve a la página anterior con los errores
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Ejecutar la acción para actualizar la zona
        $action($zone, $validator->validated());

        // Construir la URL de redirección para mantener la paginación
        $redirectUrl = route('zones.index');

        // Añadir parámetros de página y por número de elementos por página si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        // Redirigir a la página de listado de zonas con un mensaje de éxito
        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));
    }

    // Eliminar una zona
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        // Ejecutar la acción para eliminar la zona
        $action($zone);

        // Redirigir a la página de listado de zonas con un mensaje de éxito
        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
    
}
