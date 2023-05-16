<?php

namespace App\Http\Controllers;

use App\Models\CarDetails;
use App\Models\rentDetails;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentDetailsControler extends Controller
{
    //
    public function rentData(Request $request){

        $request->validate([
            'userid' => 'required|integer',
            'carid' => 'required|integer',
            'rental_date' => 'required|date',
            'return_date' => 'required|date|after:rental_date',
        ]);

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
    public function rentedCar(Request $request){
        $cars = CarDetails::join('rent_details', 'car_details.id', '=', 'rent_details.carid')
        ->join('users', 'rent_details.userid', '=', 'users.id')
        ->where('car_details.availability', 0)
        ->select('car_details.*',
            DB::raw('DATEDIFF(rent_details.return_date, rent_details.rental_date) AS rent_duration'),
            'users.name as user_name', 'rent_details.return_date')
        ->get();

    return response()->json($cars);

    }
    public function userRentedCar(Request $request ,$id){
        $cars = CarDetails::join('rent_details', 'car_details.id', '=', 'rent_details.carid')
        ->where('rent_details.userid', $id)
        ->select('car_details.*',
            DB::raw('DATEDIFF(rent_details.return_date, rent_details.rental_date) AS rent_duration'), 'rent_details.return_date')
        ->get();

    return response()->json($cars);
    }

    function carRentDelete($id)
    {
        $car = rentDetails::where('carid', $id);
        $car->delete();
        $rent = CarDetails::findOrFail($id);
        $rent->availability = true;
        $rent->update();

        return response([
        "success" => "Data Deleted Successfully",
            "msg"=>"hello"
    ]);
    }
}
