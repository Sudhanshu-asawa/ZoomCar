<?php

namespace App\Http\Controllers;

use App\Models\CarDetails;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Validator;

class CarDetailsControler extends Controller
{
    public function carView()
    {
        $car = CarDetails::all();
        return response()->json($car);
    }

    public function carPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string',
            'model' => 'required|string',
            'price' => 'required|numeric|min:0',
            'gearbox' => 'required|string',
            'fuel' => 'required|string',
            'availability' => 'required',
            'image' => 'required|image|max:2048'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

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
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string',
            'model' => 'required|string',
            'price' => 'required|numeric|min:0',
            'gearbox' => 'required|string',
            'fuel' => 'required|string',
            'availability' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

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
                'success' => 'Product Updated Successfully!!'
            ]);


        }
        $car->update();

        return response()->json([
            'message' => 'Product Updated Successfully!!'
        ]);

    }
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
