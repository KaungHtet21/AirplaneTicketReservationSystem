<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class passenger extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'first_name',
        'last_name',
        'gender',
        'dob',
        'doc_type',
        'nrc_passport',
        'contact_id',
        'ticket_id',
        'way'
    ];
}
