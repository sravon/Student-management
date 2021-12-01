import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';
import Header from '../components/Header';
import AddStudents from '../components/AddStudents';
import EditStudents from '../components/EditStudents'

export default function Profile() {
    const [students, setstudents] = useState([])
    const [editFrom, setEditFrom] = useState(false);
    const [editid, setEditid] = useState("");
    
    const studentList = () => {
        Axios.get('students').then(response => {
            if(response.status == 200){
                console.log(response)
                setstudents(response.data)
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }

    const updateStudents = (id) =>{
        console.log(id);
        setEditFrom(true)
        setEditid(id)
    }

    const deleteStudents = (id) =>{
        Axios.delete('students/'+id).then(response => {
            if(response.status == 200){
                studentList()
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }
    

    useEffect(() => {
        studentList()
         
    }, [])

    

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-between items-center bg-secondary">
                <h6 className="mt-2 h4 ml-2">Welcome to {localStorage.getItem("name")}</h6>
            </div>

            <div className="container">
                <div className="row alert-secondary">
                    <div className="col-md-6">
                        {(editFrom) ?
                            <EditStudents editid={editid} useEdit={setEditFrom} viewAll={studentList} /> :
                            <AddStudents data={studentList}/>
                        }
                    </div>
                    <div className="col-md-6">
                        <h2 className="text-center text-success">Personal Info</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(students.length >= 0)?(students.map( (e,i) => (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.student_id}</td>
                                    <td><button className="btn btn-success btn-sm" onClick={() => updateStudents(e.id)}>Edit</button></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                {if(window.confirm('Are you sure to delete this record?')){ deleteStudents(e.id)};}
                                         
                                        }>
                                            Delete</button>
                                     </td>
                                </tr>
                            ))):null}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
