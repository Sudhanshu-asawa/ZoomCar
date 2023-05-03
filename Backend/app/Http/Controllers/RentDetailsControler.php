<?php

namespace App\Http\Controllers;

use App\Models\CarDetails;
use App\Models\rentDetails;
use Illuminate\Http\Request;

class RentDetailsControler extends Controller
{
    //
    public function rentData(Request $request){
        $car = new rentDetails;
        $car->userid = $request->input('userid');
        $car->carid = $request->input('carid');
        $car->price = $request->input('price');
        $car->rental_date = $request->input('rental_date');
        $car->return_date = $request->input('return_date');

        $rent = CarDetails::findOrFail($request->input('carid'));
        $rent->availability = false;
        $rent->update();

        $car->save();
        return response()->json($car);

    }
    public function carView()
    {
        $car = CarDetails::where('availability', true)->get();
        return response()->json($car);
    }
    public function carViewO()
    {
        $car = CarDetails::where('availability', false)->get();
        return response()->json($car);
    }
}
