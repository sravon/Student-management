import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function AddClient(props) {
    const [api, setapi] = useState({
        api_key:"",stu_id:"",
        stu_id:""
    })
    const [students, setstudents] = useState([])
    
    useEffect(() => {
        studentList()
    }, [])

    const insertdata = (data) =>{
        
        Axios.post('clients',data).then(response => {
            if(response.status == 200){
                console.log(response)
                setapi({api_key:"",stu_id:"",
                image:""})
                props.data()
                
            }else if(response.status == 201){
                console.log(response);
                
            }
        })

    }
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

    const registerClient = e =>{
        e.preventDefault()
        console.log(api)
        const formData = new FormData();
        formData.append("key",api.api_key);
        formData.append("stu_id", api.stu_id);
        formData.append("image", api.image);
       insertdata(formData)
    }
    return (
        <div>
            <h2 className="text-center p-4">Registration client</h2>
            <form onSubmit={ e => registerClient(e)}>
                <div className="form-group">
                    <label >Course Code</label>
                    <input className="form-control"
                        value={api.api_key}
                        onChange={e =>setapi({...api,api_key:e.target.value})}
                        type="text"
                    />
                    <button type='button' onClick={() => setapi({...api,api_key:Math.random().toString(16).substr(2, 8)})}>generate key</button>
                </div>
                <div className="form-group">
                    <label >Image</label>
                    <input type="FILE" className="form-control" placeholder="Enter Title"
                     
                    onChange={e =>setapi({...api,image:e.target.files[0]})}/>
                </div>
                <div className="form-group">
                    <label >sTUDENT id</label>
                    <select className="form-control"
                        value={api.stu_id}
                        onChange={e =>setapi({...api,stu_id:e.target.value})}
                    >
                        <option>Default select</option>
                        {(students.length >= 0)?(students.map( (e,i) => (
                            <option key={e.id} value={e.id}>{e.student_id}</option>
                        ))):null}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
