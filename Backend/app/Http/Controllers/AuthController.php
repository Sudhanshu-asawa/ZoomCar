<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    function SignupPost(Request $request){

        $request->validate([
            'name' => 'required|regex:/^[a-z A-Z ,.-]+$/',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);


        $user = new User;
        $user->name=$request->input('name');
        $user->email=$request->input('email');
        $user->password=Hash::make($request-> input('password'));
        $user->save();
        return $user;


    }

    function LoginPost(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->only('email','password');
        if (Auth::attempt($credentials)){
            return response([
               "name"=>Auth::user()->name,
               "userid"=>Auth::user()->id,
               "isAdmin"=>Auth::user()->IsAdmin
            ]);
        }
        return response([
            "error"=>"Invalid Credentials"
        ]);
    }
}
