<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonController extends Controller
{
    public function index() {
        try {
            $data = Person::orderBy('created_at', 'DESC')->get();
            return response()->json([PersonResource::collection($data)], 200);
        } catch (\Throwable $th) {
            return new Exception($th);
        }
    }

    public function store( PersonRequest $request ) {

        $validatedData = $request->validated();

        DB::beginTransaction();
        
        try {
            $person = Person::create($validatedData);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Successfully registered.',
                'data'    => new PersonResource($person), 200
            ]);

        } catch (\Throwable $th) {
            DB::rollBack();
            return new Exception($th);
        }
    }

    public function show( $id ) {
        try {
            $person = Person::find($id);

            if ( $person ) {
                return response()->json([
                    'success' => true,
                    'message' => 'Successfully registered.',
                    'data'    => new PersonResource($person), 200
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'message' => 'This record does not exist.'
                ]);
            }
        } catch (\Throwable $th) {
            return new Exception($th);
        }
    }

    public function update( PersonRequest $request, $id ) {

        $person = Person::findOrFail($id);
        $validatedData = $request->validated();
        
        DB::beginTransaction();
        
        try {
            $person->update($validatedData);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Registration correctly updated.',
                'data'    => new PersonResource($person), 200
            ]);

        } catch (\Throwable $th) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Error updating the person.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function destroy( $id ) {
        try {

            $person = Person::findOrFail( $id );
            $person->delete();

            return response()->json([
                'success' => true,
                'message' => 'Register correctly eliminated.'
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error delete the person.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
