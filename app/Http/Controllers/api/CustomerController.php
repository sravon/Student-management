<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response( Customer::all() , 200);;
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
        $name = $request->input('name');
        $category = $request->input('bin');
        $filepath = $request->file('upload')->store('customer');
        $link = $request->input('email');
        $a = DB::table('customers')->insert([
            'name' =>  $name ,
            'bin' => $category,
            'email'=> $link,
            'upload' => $filepath
        ]); 
        if($a)
            return response("Data added successfull", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Customer::find($id),200);
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
        $name = $request->input('name');
        $bin = $request->input('bin');
        $email = $request->input('email');
        if ($request->hasFile('upload')) {
            $filepath = $request->file('upload')->store('customer');;
        }else{
            $filepath = NULL;
        }
        $result = DB::table('customers')
              ->where('id', $id)
              ->update([
                'name' =>  $name ,
                'bin' => $bin,
                'email'=> $email,
                'upload' => $filepath
                ]);
        if($result)
            return response('update successfull',200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dlt = Customer::find($id);
        $rst = $dlt->delete();
        if($rst){
            return response( "Delete Successfull" , 200);
        }
    }
}
