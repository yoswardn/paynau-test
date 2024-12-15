<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Person extends Model
{
    //
    use HasUuids, HasFactory;

    protected $keyType = 'string';

    protected $table = 'persons';

    public $incrementing = false;

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'date_born',
        'phone',
        'address',
    ];
}
