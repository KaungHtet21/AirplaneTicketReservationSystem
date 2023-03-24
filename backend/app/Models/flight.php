<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class flight extends Model
{
    use HasFactory;
    protected $fillable = [
        'from',
        'to',
        'depart_date',
        'depart_time',
        'arrive_time',
        'total_seats'
    ];
}
