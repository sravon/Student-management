<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(  Course::all() , 200);;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $edu = new Course();
        $edu->course_code = $request->course_code;
        $edu->title = $request->course_title;
        $edu->des = $request->course_des;
        $edu->credit = $request->credit;
        $edu->save();
        return response($edu, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Course::find($id),200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $edu = Course::find($id);
        $edu->course_code = $request->course_code;
        $edu->title = $request->course_title;
        $edu->des = $request->course_des;
        $edu->credit = $request->credit;
        $edu->save();
        if($edu->save())
            return ['update successfull'];

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dlt = Course::find($id);
        $rst = $dlt->delete();
        if($rst){
            return response( "Delete Successfull" , 200);
        }
    }
}
