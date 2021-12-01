<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(  Student::all() , 200);;
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
        $edu = new Student();
        $edu->name = $request->name;
        $edu->student_id = $request->stuid;
        $edu->nid = $request->nid;
        $edu->reg_no = $request->birth_no;
        $edu->d_birth  = $request->d_birth;
        $edu->phone  = $request->phone;
        $edu->gender  = $request->gender;
        $edu->blood  = $request->blood;
        $edu->email  = $request->email;
        $edu->password  = $request->password;
        $edu->address  = $request->address;
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
        return response(Student::find($id),200);
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
        $edu = Student::find($id);
        $edu->name = $request->name;
        $edu->student_id = $request->stuid;
        $edu->nid = $request->nid;
        $edu->reg_no = $request->birth_no;
        $edu->d_birth  = $request->d_birth;
        $edu->phone  = $request->phone;
        $edu->gender  = $request->gender;
        $edu->blood  = $request->blood;
        $edu->email  = $request->email;
        $edu->password  = $request->password;
        $edu->address  = $request->address;
        
        $result = $edu->save();
        if($result)
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
        $dlt = Student::find($id);
        $rst = $dlt->delete();
        if($rst){
            return response( "Delete Successfull" , 200);
        }
    }
}
