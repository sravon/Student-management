import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function EditStudents(props) {
    const [student, setstudent] = useState({
        name:"",stuid:"",nid:"",birth_no:"",d_birth:"",
        phone:"",gender:"",blood:"",
        email:"",password:"",address:""
    })

    const studentinfo = () =>{
        Axios.get('students/'+ props.editid).then(response => {
            if(response.status == 200){
                console.log(response.data)
                setstudent({...student,
                    name:response.data.name, stuid:response.data.student_id,
                    nid:response.data.nid, birth_no:response.data.reg_no,
                    d_birth:response.data.d_birth, phone:response.data.phone,
                    gender:response.data.gender, blood:response.data.blood,
                    email:response.data.email,password:response.data.password,
                    address:response.data.address
                })
                
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }

    useEffect(() => {
        studentinfo()
    }, [])
    

    const updatedata = (data) =>{
        
        Axios.put('students/'+props.editid,data).then(response => {
            if(response.status == 200){
                console.log(response)
                props.viewAll()
                setstudent({
                    name:"",stuid:"",nid:"",birth_no:"",d_birth:"",
                    phone:"",gender:"",blood:"",
                    email:"",password:"",address:""
                })
                props.useEdit(false)
            }else if(response.status == 201){
                console.log(response);
            }
        })

    }

    const updateStudent = e =>{
        e.preventDefault()
        console.log(student)
        updatedata(student)
    }
    return (
        <div>
            <h2 className="text-center p-4">Edit Student</h2>
            <form onSubmit={ e => updateStudent(e)}>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control"
                        placeholder="Enter Name"
                        value={student.name} 
                        onChange={e =>setstudent({...student,name:e.target.value})}
                        />
                </div>
                <div className="form-group">
                    <label >Student Id</label>
                    <input type="text" className="form-control"
                        placeholder="Enter Name"
                        value={student.stuid} 
                        onChange={e =>setstudent({...student,stuid:e.target.value})}
                        />
                </div>
                <div className="form-group">
                    <label >NID number</label>
                    <input type="text" className="form-control" placeholder="Enter email"
                    value={student.nid} 
                    onChange={e =>setstudent({...student,nid:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Birth Reg No</label>
                    <input type="text" className="form-control" placeholder="Enter email"
                    value={student.birth_no} 
                    onChange={e =>setstudent({...student,birth_no:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Date Of Birth</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                    value={student.d_birth} 
                    onChange={e =>setstudent({...student,d_birth:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Cell Phone</label>
                    <input type="text" className="form-control" placeholder="Enter email"
                    value={student.phone} 
                    onChange={e =>setstudent({...student,phone:e.target.value})}/>
                </div>
                <fieldset className="form-group">
                    <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                        <input className="form-check-input" type="radio"
                        value="m" 
                        onChange={e =>setstudent({...student,gender:e.target.value})} />
                        <label className="form-check-label" >
                            First radio
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" value="f"
                        onChange={e =>setstudent({...student,gender:e.target.value})}/>
                        <label className="form-check-label" >
                            Second radio
                        </label>
                        </div>
                    </div>
                    </div>
                </fieldset>
                <div className="form-group">
                    <label >Blood Group</label>
                    <select className="form-control"
                        onChange={e =>setstudent({...student,blood:e.target.value})}
                        value={student.blood}
                    >
                        <option>Default select</option>
                        <option value="a+" >A+</option>
                        <option value="ab+" >AB+</option>
                        <option value="b+" >B+</option>
                        <option value="o+" >O+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                    value={student.email}
                    onChange={e =>setstudent({...student,email:e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                    value={student.password}
                    onChange={e =>setstudent({...student,password:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Your address</label>
                    <input type="text" className="form-control" placeholder="Enter email"
                    value={student.address}
                    onChange={e =>setstudent({...student,address:e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
