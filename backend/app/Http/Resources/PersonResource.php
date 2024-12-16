<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @OA\Schema(
 *     schema="PersonResource",
 *     type="object",
 *     required={"id", "name", "lastname", "email", "date_born", "phone", "address"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="John"),
 *     @OA\Property(property="lastname", type="string", example="Doe"),
 *     @OA\Property(property="email", type="string", format="email", example="john.doe@example.com"),
 *     @OA\Property(property="date_born", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="phone", type="string", example="1234567890"),
 *     @OA\Property(property="address", type="string", example="123 Main St")
 * )
 */

class PersonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'lastname' => $this->last_name,
            'email' => $this->email,
            'date_born' => $this->date_born,
            'phone' => $this->phone,
            'address' => $this->address,
        ];
    }
}
