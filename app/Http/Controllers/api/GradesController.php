<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grade;
use Illuminate\Support\Facades\DB;

class GradesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $st = DB::table('grades')
            ->join('students', 'students.id', '=', 'grades.student_id')
            ->join('courses', 'courses.id', '=', 'grades.course_id')
            ->get();
        return response(   $st , 200);
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
        $edu = new Grade();
        $edu->course_id = $request->course_code;
        $edu->student_id = $request->stuid;
        $edu->semester = $request->semester;
        $edu->section = $request->section;
        $edu->grade  = $request->grade;
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
        return response(Grade::find($id),200);
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
        $edu = Grade::find($id);
        $edu->course_id = $request->course_code;
        $edu->student_id = $request->stuid;
        $edu->semester = $request->semester;
        $edu->section = $request->section;
        $edu->grade  = $request->grade;
        if($edu->save()){
            return response(['update success'],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dlt = Grade::find($id);
        $rst = $dlt->delete();
        if($rst){
            return response( "Delete Successfull" , 200);
        }
    }
}
