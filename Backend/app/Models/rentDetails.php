<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rentDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'userid',
        'carid',
        'price',
        'return_date',
        'rent_date'
    ];
}
