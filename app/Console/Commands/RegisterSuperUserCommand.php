<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;


use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterSuperUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'superuser:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a superuser account';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $details['name'] = $this->ask('username');
        $details['email'] = $this->ask('email');
        $details['password'] = $this->secret('password');
        $details['confirm_password'] = $this->secret('confirm password');

        while( !$details['password'] || $details['password'] != $details['confirm_password']){
            if(!$details['password']){
                $this->error('Password must not be empty');
            }else{
                $this->error('Password and Confirm password do not match');
            }
            
            $details['password'] = $this->secret('password');
            $details['confirm_password'] = $this->secret('confirm password');
        }

        $details['password'] = Hash::make($details['password']);
        $details['is_admin'] = true;
        $user = User::create($details);
        $this->info('Superuser created with username: '.$user->name);
        return 0;
    }

}
