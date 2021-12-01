import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';
import Header from '../components/Header';
import AddCourse from '../components/AddCourse';
import EditCourse from '../components/EditCourse'

export default function CoursePanel() {
    const [courses, setcourses] = useState([])
    const [editFrom, setEditFrom] = useState(false);
    const [editid, setEditid] = useState("");
    
    const courseList = () => {
        Axios.get('courses').then(response => {
            if(response.status == 200){
                console.log(response)
                setcourses(response.data)
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }

    const updateCourse = (id) =>{
        console.log(id);
        setEditFrom(true)
        setEditid(id)
    }

    const deleteCourse = (id) =>{
        Axios.delete('courses/'+id).then(response => {
            if(response.status == 200){
                courseList()
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }
    

    useEffect(() => {
        courseList()
         
    }, [])

    

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-between items-center bg-secondary">
                <h6 className="mt-2 h4 ml-2">Welcome to {localStorage.getItem("name")}</h6>
            </div>

            <div className="container">
                <div className="row alert-secondary p-2">
                    <div className="col-md-6">
                        {(editFrom) ?
                            <EditCourse editid={editid} useEdit={setEditFrom} viewAll={courseList} /> :
                            <AddCourse data={courseList}/>
                        }
                    </div>
                    <div className="col-md-6">
                        <h2 className="text-center text-success pt-3">Course Info</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(courses.length >= 0)?(courses.map( (e,i) => (
                                <tr key={i}>
                                    <td>{e.course_code}</td>
                                    <td>{e.title}</td>
                                    <td><button className="btn btn-success btn-sm" onClick={() => updateCourse(e.id)}>Edit</button></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                {if(window.confirm('Are you sure to delete this record?')){ deleteCourse(e.id)};}
                                         
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
