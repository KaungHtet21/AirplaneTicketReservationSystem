<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transaction extends Model
{
    use HasFactory;
    protected $fillable = [
    'transaction_id',
    'customer_id',
    'ticket_number',
    'total_amount',
    'payment_method',
    'card_number',
    'transaction_status'
    ];
}
