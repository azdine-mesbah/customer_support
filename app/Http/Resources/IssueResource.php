<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id"=>$this->id,
            "customer"=>$this->user,
            "title"=>$this->title,
            "content"=>$this->content,
            "status"=>$this->status,
            "updated_at"=>$this->updated_at->format("Y-m-d H:i:s")
        ];
    }
}
