import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';
import Header from '../components/Header';
import AddGrade from '../components/AddGrade';
import EditGrade from '../components/EditGrade'

export default function GradePanel() {
    const [grades, setgrades] = useState([])
    const [editFrom, setEditFrom] = useState(false);
    const [editid, setEditid] = useState("");
    
    const gradeList = () => {
        Axios.get('grades').then(response => {
            if(response.status == 200){
                console.log(response)
                setgrades(response.data)
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

    const deletegrade = (id) =>{
        console.log(id)
        Axios.delete('grades/'+id).then(response => {
            if(response.status == 200){
                gradeList()
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }
    

    useEffect(() => {
        gradeList()
         
    }, [])

    

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-between items-center bg-secondary">
                <h6 className="mt-2 h4 ml-2">Welcome to {localStorage.getItem("name")}</h6>
            </div>

            <div className="container">
                <div className="row alert-secondary">
                    <div className="col-md-4">
                        {(editFrom) ?
                            <EditGrade editid={editid} useEdit={setEditFrom} viewAll={gradeList} /> :
                            <AddGrade data={gradeList}/>
                        }
                    </div>
                    <div className="col-md-8">
                        <h2 className="text-center text-success">Personal Info</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th>Student ID</th>
                                <th>Course Code</th>
                                <th>Semester</th>
                                <th>Section</th>
                                <th>Grade</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(grades.length >= 0)?(grades.map( (e,i) => (
                                <tr key={i}>
                                    <td>{e.student_id}</td>
                                    <td>{e.course_code}</td>
                                    <td>{e.semester}</td>
                                    <td>{e.section}</td>
                                    <td>{e.grade=== 4 ? "A" : 
                                        e.grade === 3.87 ? "A-":e.grade === 3.50? "B+"
                                        :e.grade=== 3? "B":null}</td>
                                    <td><button className="btn btn-success btn-sm" onClick={() => updateStudents(e.id)}>Edit</button></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm "
                                            onClick={() =>
                                                {if(window.confirm('Are you sure to delete this record?')){ deletegrade(e.id)}}
                                         
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
