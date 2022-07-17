<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        return response()->json(User::all(), 200);
    }


    public function store(StoreUserRequest $request)
    {
        $created_user = User::create($request->all());

        if ($created_user) {
            return response()->json($created_user, 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant add that user '], 500);
        }
    }


    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user, 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that user '], 500);
        }
    }

    public function update(UpdateUserRequest $request,User $user)
    {
        $created_user = User::update($request->all());

        if ($created_user) {
            return response()->json($created_user, 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant add that user '], 500);
        }
    }


    public function destroy(User $user)
    {
        $deleted = $user->delete();
        if ($deleted) {
            return response()->json('a user deleted successfully !', 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that user'], 500);
        }
    }
}