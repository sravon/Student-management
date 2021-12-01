import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function AddCourse(props) {
    const [course, setcourse] = useState({
        course_code:"",course_title:"",
        course_des:"", credit:""
    })
    

    const insertdata = (data) =>{
        
        Axios.post('courses/',data).then(response => {
            if(response.status == 200){
                console.log(response)
                setcourse({course_code:"",course_title:"",
                course_des:"", credit:""})
                props.data()
                
            }else if(response.status == 201){
                console.log(response);
                
            }
        })

    }

    const registerCourse = e =>{
        e.preventDefault()
        console.log(course)
       insertdata(course)
    }
    return (
        <div>
            <h2 className="text-center p-4">Registration course</h2>
            <form onSubmit={ e => registerCourse(e)}>
                <div className="form-group">
                    <label >Course Code</label>
                    <select className="form-control"
                        value={course.course_code}
                        onChange={e =>setcourse({...course,course_code:e.target.value})}
                    >
                        <option>Default select</option>
                        <option value="cse115" >CSE115</option>
                        <option value="cse215" >CSE215</option>
                        <option value="cse231" >CSE231</option>
                        <option value="cse311" >CSE311</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Course Title</label>
                    <input type="text" className="form-control" placeholder="Enter Title"
                    value={course.course_title} 
                    onChange={e =>setcourse({...course,course_title:e.target.value})}/>
                </div>
                <div className="form-group items-center">
                    <label >Course Description</label>
                    <textarea onChange={e =>setcourse({...course,course_des:e.target.value})} className="form-control">

                    </textarea>
                </div>
                <div className="form-group">
                    <label >Course Credit</label>
                    <select className="form-control"
                        value={course.credit}
                        onChange={e =>setcourse({...course,credit:e.target.value})}
                    >
                        <option>Select select</option>
                        <option value="3.00" >3.0</option>
                        <option value="1.5" >1.5</option>
                        <option value="1" >1.0</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
