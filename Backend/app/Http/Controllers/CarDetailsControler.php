<?php

namespace App\Http\Controllers;

use App\Models\CarDetails;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CarDetailsControler extends Controller
{
    public function carView()
    {
        $car = CarDetails::all();
        return response()->json($car);
    }

//    function create()
//    {
//        return view('BookCreate');
//    }

//    function update(Books $book)
//    {
//        return view('BookUpdate', compact('book'));
//    }

    public function carPost(Request $request)
    {
//        $request->validate([
//
//            'title' => 'required|max:15',
//            'author' => 'required|max:15|regex:/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/',
//            'date' => 'required|before:today',
//            'description' => 'required|max:15'
//        ]);
        $car = new CarDetails;
        $car->brand = $request->input('brand');
        $car->model = $request->input('model');
        $car->price = $request->input('price');
        $car->fuel = $request->input('fuel');
        $car->gearbox = $request->input('gearbox');
        $car->availability = $request->input('availability');

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('public/images', $filename);
            $car->image = $filename;
        }
        $car->save();
        return response()->json($car);



    }

    public function carUpdate(Request $request, $id)
    {
//        $request->validate([
//            'title'=>'required',
//            'description'=>'required',
//            'image'=>'nullable'
//        ]);
        $car = CarDetails::findOrFail($id);

        $car->brand = $request->input('brand');
        $car->model = $request->input('model');
        $car->price = $request->input('price');
        $car->fuel = $request->input('fuel');
        $car->gearbox = $request->input('gearbox');
        $car->availability = $request->input('availability');

        if ($request->hasFile('image')) {

            // remove old image
            if ($car->image) {
                $exists = Storage::disk('public')->exists("images/{$car->image}");
                if ($exists) {
                    Storage::disk('public')->delete("images/{$car->image}");
                }
            }

            $filename = $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('public/images', $filename);
            $car->image = $filename;
            $car->update();



            return response()->json([
                'message' => 'Product Updated Successfully!!'
            ]);


        }
//        $car->image = $request->input('image');
        $car->update();

        return response()->json([
            'message' => 'Product Updated Successfully!!'
        ]);

    }

//
//

    function carUpdateView(CarDetails $id){
        $car = CarDetails::findOrFail($id->id);
        return response()->json($car);
    }
    function carDelete(CarDetails $id)
    {
        $id->delete();
        return response([
        "success" => "Data Deleted Successfully",
            "msg"=>"hello"
    ]);
    }
}
