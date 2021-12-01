import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function AddCourse(props) {
    const [course, setcourse] = useState({
        course_code:"",course_title:"",
        course_des:"", credit:""
    })
    

    const courseinfo = () =>{
        
        Axios.get('courses/'+ props.editid).then(response => {
            if(response.status == 200){
                console.log(response)
                setcourse({...course,
                    course_code:response.course_code, course_title:response.data.title,
                    course_des:response.data.des, credit:response.data.credit
                })
            }else if(response.status == 201){
                console.log(response);
                
            }
        })

    }

    useEffect(() => {
        courseinfo()
    }, [])
    

    const updatedata = (data) =>{
        
        Axios.put('courses/'+props.editid,data).then(response => {
            if(response.status == 200){
                console.log(response)
                setcourse({course_code:"",course_title:"",
                course_des:"", credit:""})
                props.viewAll()
                props.useEdit(false)
            }else if(response.status == 201){
                console.log(response);
            }
        })

    }

    const updateStudent = e =>{
        e.preventDefault()
        console.log(course)
        updatedata(course)
    }
    return (
        <div>
            <h2 className="text-center p-4">Edit course</h2>
            <form onSubmit={ e => updateStudent(e)}>
                <div className="form-group">
                    <label >Course Code</label>
                    <select className="form-control"
                        onChange={e =>setcourse({...course,course_code:e.target.value})}
                        value={course.course_code}
                    >
                        <option value="">Default select</option>
                        <option value="cse215" >CSE215</option>
                        <option value="cse321" >AB+</option>
                        <option value="ccc3" >B+</option>
                        <option value="dsdff222" >O+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Course Title</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                    value={course.course_title} 
                    onChange={e =>setcourse({...course,course_title:e.target.value})}/>
                </div>
                <div className="form-group items-center">
                    <label >Course Description</label>
                    <textarea value={course.course_des} onChange={e =>setcourse({...course,course_des:e.target.value})} className="form-control">
                        
                    </textarea>
                </div>
                <div className="form-group">
                    <label >Course Credit</label>
                    <select className="form-control"
                        onChange={e =>setcourse({...course,credit:e.target.value})}
                        value={course.credit}
                    >
                        <option>Select select</option>
                        <option value="3" >3</option>
                        <option value="1.5" >1.5</option>
                        <option value="1.2" >1.2</option>
                        <option value="1.3" >2.3</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
