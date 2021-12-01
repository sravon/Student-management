import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Message from '../Components/Message';
import Axios from '../Axios/Axios';

export default function Register() {
    const initialState = "";
    const [name, setname] = useState(initialState);
    const [username, setusername] = useState(initialState);
    const [email, setemail] = useState(initialState);
    const [password, setpassword] = useState(initialState);
    const [error, setError] = useState([]);
    const his = useNavigate();

    const postUser = (data) =>{
        
        Axios.post('users', data).then(response => {
            if(response.status == 200){
                console.log(response)
                localStorage.setItem('user', response.data.id);
                his("/academic");
            }else if(response.status == 201){
                console.log(response);
                setError[response.data]
            }
        })
    }
    
    const registerUser = e =>{
        e.preventDefault();

        let errror_array = []

        if(name == "" && email == "" && password == ""){
            console.log("All fields is Required")
            errror_array.push("All fields is Required");
        }
        if(errror_array.length != 0){
            setError(errror_array)
            return
        }else{ setError([]) }
        const data = {name,email,username,password}
        postUser(data)
    }

    return (
        <div className="container-fluid container">
            {error?(error.map( (e,i) => (
                <Message key={i} msg={e} color="bg-danger" />
                ))
            ): null}
            <form className="w-75 bg-secondary m-5 p-5" onSubmit={ e => registerUser(e)}>
                <h2 className="text-center text-danger">Personal Information</h2>
                <div className="form-group">
                    <label >Name </label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" 
                    placeholder="Enter name" value={name}
                    onChange={ e =>setname(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp"
                     placeholder="Enter email" value={email}
                     onChange={ e =>setemail(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label >Username</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" 
                    placeholder="Enter username" value={username}
                    onChange={ e =>setusername(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" 
                    placeholder="Password" value={password}
                    onChange={ e =>setpassword(e.target.value) }/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
