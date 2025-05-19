<?php

namespace Domain\Zones\Actions;

use Domain\Models\floors\Floor;
use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $number = $search[0];
        $capacity = $search[1];
        $genre = $search[2];
        $floor = $search[3];

        $floorModel = Floor::query()->when($floor !== "null", function ($query) use ($floor) {
            $query->where('floor_number', '=', $floor);
        })->first();

        $floor_id = $floorModel ? $floorModel->id : null;

        $zone = Zone::query()
            ->when($number !== "null", function ($query) use ($number) {
                $query->where('number', '=', $number);
            })
            ->when($capacity !== "null", function ($query) use ($capacity) {
                $query->where('capacity', '=', $capacity);
            })
            ->when($genre !== "null", function ($query) use ($genre) {
                $query->where('genre_name', 'ILIKE', '%' . $genre . '%');
            })
            ->when($floor !== "null", function ($query) use ($floor_id) {
                $query->where('floor_id', '=', $floor_id);
            })
            ->latest()
            ->paginate($perPage);

        return $zone->through(fn($zone) => ZoneResource::fromModel($zone));
    }
}