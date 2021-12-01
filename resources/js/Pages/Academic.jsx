import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Message from '../Components/Message';
import Axios from '../Axios/Axios';

export default function Academic() {
    const initialState = "";
    const [name, setname] = useState(initialState);
    const [subject, setsubject] = useState(initialState);
    const [qualication, setqualication] = useState(initialState);
    const [cgpa, setcgpa] = useState(initialState);
    const [error, setError] = useState([]);
    const his = useNavigate();

    const postAca = (data) =>{
        
        Axios.post('educations', data).then(response => {
            if(response.status == 200){
                console.log(response)
                localStorage.removeItem("user")
                his("/");
            }else if(response.status == 201){
                console.log(response);
                setError[response.data]
            }
        })
    }
    
    const registerAca = e =>{
        e.preventDefault();

        let errror_array = []

        if(name == "" && subject == "" && qualication == ""){
            console.log("All fields is Required")
            errror_array.push("All fields is Required");
        }
        if(errror_array.length != 0){
            setError(errror_array)
            return
        }else{ setError([]) }
        const stu_id = localStorage.getItem("user");
        console.log(stu_id);
        const data = {name,stu_id,qualication,subject,cgpa}
        postAca(data)
    }

    return (
        <div className="container-fluid container">
            {error?(error.map( (e,i) => (
                <Message key={i} msg={e} color="bg-danger" />
                ))
            ): null}
            <form className="w-75 alert-secondary m-5 p-5" onSubmit={ e => registerAca(e)}>
                <h2 className="text-center text-danger">Academic Information</h2>
                <div className="form-group">
                    <label >Institution Name </label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" 
                    placeholder="Enter name" value={name}
                    onChange={ e =>setname(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label >Qualication</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp"
                     placeholder="Enter Qualication" value={qualication}
                     onChange={ e =>setqualication(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label >Subject</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" 
                    placeholder="Enter Subject" value={subject}
                    onChange={ e =>setsubject(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label >Cgpa</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" 
                    placeholder="enter cgpa" value={cgpa}
                    onChange={ e =>setcgpa(e.target.value) }/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
