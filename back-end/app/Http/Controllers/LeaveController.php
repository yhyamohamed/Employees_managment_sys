<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAbsenceRequest;
use App\Http\Requests\StoreLeaveRequest;
use App\Http\Requests\UpdateAbsenceRequest;
use App\Http\Requests\UpdateLeaveRequest;
use App\Models\Leave;

class LeaveController extends Controller
{
    public function index()
    {
        return response()->json(Leave::all(), 200);
    }


    public function store(StoreAbsenceRequest $request)
    {
        $created_entry = Leave::create($request->all());

        if ($created_entry) {
            return response()->json($created_entry, 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant add that entry'], 500);
        }
    }


    public function show($id)
    {
        $entry = Leave::find($id);

        if ($entry) {
            return response()->json($entry, 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that entry'], 500);
        }
    }


    public function update(UpdateAbsenceRequest $request, Leave $leave)
    {
        $updated_entry = Leave::update($request->all());

        if ($updated_entry) {
            return response()->json($updated_entry, 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant add that user '], 500);
        }
    }


    public function destroy(Leave $leave)
    {
        $deleted = $leave->delete();
        if ($deleted) {
            return response()->json('a entry deleted successfully !', 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that entry'], 500);
        }
    }
}
