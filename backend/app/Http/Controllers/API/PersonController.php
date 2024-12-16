<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Get(
 *     path="/api/persons",
 *     summary="Get all persons",
 *     operationId="getAllPersons",
 *     tags={"Person"},
 *     @OA\Response(
 *         response=200,
 *         description="List of persons",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(property="id", type="integer"),
 *                 @OA\Property(property="name", type="string"),
 *                 @OA\Property(property="last_name", type="string"),
 *                 @OA\Property(property="email", type="string"),
 *                 @OA\Property(property="phone", type="string"),
 *                 @OA\Property(property="address", type="string")
 *             )
 *         )
 *     )
 * )
 */

class PersonController extends Controller
{
    public function index() {
        try {
            $data = Person::orderBy('created_at', 'DESC')->get();
            return response()->json(PersonResource::collection($data), 200);
        } catch (\Throwable $th) {
            return new Exception($th);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/persons",
     *     summary="Create a person",
     *     operationId="createPerson",
     *     tags={"Person"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "last_name", "email", "phone", "address"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="last_name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="address", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Person created successfully"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     )
     * )
     */

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

    /**
     * @OA\Get(
     *     path="/api/persons/{id}",
     *     summary="Get a person by ID",
     *     operationId="getPersonById",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Person ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Person details",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer"),
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="last_name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="address", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Person not found"
     *     )
     * )
     */

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

     /**
     * @OA\Put(
     *     path="/api/persons/{id}",
     *     summary="Update a person",
     *     operationId="updatePerson",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Person ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "last_name", "email", "phone", "address"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="last_name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="address", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Person updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Person not found"
     *     )
     * )
     */

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

     /**
     * @OA\Delete(
     *     path="/api/persons/{id}",
     *     summary="Delete a person",
     *     operationId="deletePerson",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Person ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Person deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Person not found"
     *     )
     * )
     */

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
