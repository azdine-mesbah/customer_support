<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Mail;

use App\Models\Issue;

class sendStatusMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $issue;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Issue $issue)
    {
        //
        $this->issue = $issue;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $data = [
            'subject' => "Issue status",
            'email' => $this->issue->user->email,
            'content' => "your issue has been ".$this->issue->status];

        Mail::send('email-template', $data, function($message) use ($data) {
            $message->to($data['email'])
            ->subject($data['subject']);
          });

    }
}
