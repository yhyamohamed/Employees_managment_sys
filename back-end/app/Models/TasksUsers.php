<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Relations\Pivot;

class TasksUsers extends Pivot
{
    use HasFactory;

    public $incrementing = true;
    protected $table = 'tasks_users';

}
