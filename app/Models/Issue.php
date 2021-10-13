<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'title',
        'content',
        'status'
    ];

    protected $casts = [
        'status'=>'integer'
    ];

    private $status_table = ["Submitted", "In Progress", "Resolved", "Closed"];

    public function getStatusAttribute($value){
        return ucfirst($this->status_table[$value]);
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
