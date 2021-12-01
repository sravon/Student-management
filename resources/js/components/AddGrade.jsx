import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function AddGrade(props) {
    const [student, setstudent] = useState([])
    const [courses, setcourses] = useState([])
    const [grade, setgrade] = useState({
        stuid:"",course_code:"",semester:"",
        section:"", grade:""
    })

    const studentList = () => {
        Axios.get('students').then(response => {
            if(response.status == 200){
                console.log(response)
                setstudent(response.data)
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }

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
    

    const insertdata = (data) =>{
        
        Axios.post('grades/',data).then(response => {
            if(response.status == 200){
                console.log(response)
                //props.data()
                
            }else if(response.status == 201){
                console.log(response);
                
            }
        })

    }

    const registerGrade = e =>{
        e.preventDefault()
        console.log(grade)
        insertdata(grade)
    }

    useEffect(() => {
        studentList()
        courseList()
    }, [])

    return (
        <div>
            <h2 className="text-center p-4">Registration Grade</h2>
            <form onSubmit={ e => registerGrade(e)}>
                <div className="form-group">
                    <label >Student ID</label>
                    <select className="form-control"
                        value={grade.stuid}
                        onChange={e =>setgrade({...grade,stuid:e.target.value})}
                    >
                        <option>Default select</option>
                        {(student.length >= 0)?(student.map( (e,i) => (
                            <option key={e.id} value={e.id}>{e.student_id}</option>
                        ))):null}
                        
                    </select>
                </div>
                <div className="form-group">
                    <label >Course Code</label>
                    <select className="form-control"
                        value={grade.course_code}
                        onChange={e =>setgrade({...grade,course_code:e.target.value})}
                    >
                        <option>Default select</option>
                        {(courses.length >= 0)?(courses.map( (e,i) => (
                            <option key={e.id} value={e.id}>{e.course_code}</option>
                        ))):null}
                        <option value="cse215" >Cse215</option>
                        <option value="ab+" >AB+</option>
                        <option value="b+" >B+</option>
                        <option value="o+" >O+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Semester</label>
                    <select className="form-control"
                        value={grade.semester}
                        onChange={e =>setgrade({...grade,semester:e.target.value})}
                    >
                        <option>Default select</option>
                        <option value="fall-21" >Fall 21</option>
                        <option value="ab+" >AB+</option>
                        <option value="b+" >B+</option>
                        <option value="o+" >O+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Section</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                    value={grade.section} 
                    onChange={e =>setgrade({...grade,section:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Grade</label>
                    <select className="form-control"
                        value={grade.grade}
                        onChange={e =>setgrade({...grade,grade:e.target.value})}
                    >
                        <option>Default select</option>
                        <option value="4.00" >A</option>
                        <option value="ab+" >AB+</option>
                        <option value="b+" >B+</option>
                        <option value="o+" >O+</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
