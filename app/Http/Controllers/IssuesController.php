<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Models\Issue;
use App\Http\Resources\IssueResource;

use App\Models\User;

use App\Http\Jobs\sendStatusMail;

class IssuesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate([
            "user"=>['numeric', Rule::exists(User::class, 'id')]
            ]);
        //

        if(!$request->user()->is_admin){
            $issues = $request->user()->issues;
        }elseif($request->user){
            $issues = User::findOrFail($request->user)->issues;
        }else {
            $issues = Issue::all();
        }
        
        return IssueResource::collection($issues->sortByDesc('created_at'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            "title"=>["required","string","max:255"],
            "content"=>["required","string","min:10"],
        ]);
        $validatedData["status"] = "0";
        $issue = $request->user()->issues()->create($validatedData);
        dispatch(new sendStatusMail($issue));
        return new IssueResource($issue);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Issue $issue)
    {
        //
        $validatedData = $request->validate([
            "title"=>["string","max:255"],
            "content"=>["string","min:10"],
            "status"=>["string", Rule::in(["0","1","2","3"])]
        ]);
        $issue->update($validatedData);
        dispatch(new sendStatusMail($issue));
        return new IssueResource($issue);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Issue $issue)
    {
        //
        $issue->delete();
        return new IssueResource($issue);
    }

    public function close(Request $request, Issue $issue){
        //to check if the current user is the owner
        if(!$request->user()->is_admin){
            $request->user()->issues()->findOrFail($issue->id);
        }
        $issue->update(["status"=>"3"]);
        dispatch(new sendStatusMail($issue));
        return new IssueResource($issue);
    }

}
