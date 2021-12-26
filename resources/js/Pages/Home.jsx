import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import Message from '../Components/Message';
import Axios from '../Axios/Axios';

export default function Home() {
    const initialState = ""
    const [username, setusername] = useState(initialState);
    const [password, setpassword] = useState(initialState);
    const [error, setError] = useState([]);
    const his = useNavigate();

    const checkdata = (data) =>{
        
        Axios.post('users/login', data).then(response => {
            if(response.status == 200){
                console.log(response)
                localStorage.setItem('user_id', response.data.id);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('username', response.data.username);
                his("/home");
            }else if(response.status == 201){
                console.log(response);
                setError([response.data])
            }
        })
    }

    const loginUser = e =>{
        e.preventDefault();

        let errror_array = []

        if(username == "" && password == ""){
            console.log("All fields is Required")
            errror_array.push("All fields is Required");
        }
        if(errror_array.length != 0){
            setError(errror_array)
            return
        }else{ setError([]) }
        const data = {username,password}
        checkdata(data)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                {error?(error.map( (e,i) => (
                    <Message key={i} msg={e} color="bg-danger" />
                    ))
                ): null}
                    <div className="card mt-5" style={{ background: "linear-gradient(to right, #8e9eab, #eef2f3)"}}>
                        <div className="card-header text-primary h3 text-center">Login</div>
                        <div className="card-body">
                            <form onSubmit={ e => loginUser(e)}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Username</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" 
                                        value={username} onChange={ e =>setusername(e.target.value) } />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" 
                                        placeholder="Password" value={password} onChange={ e =>setpassword(e.target.value) }/>
                                    </div>
                                </div>
                                <Link to="registration" className="btn btn-primary mr-2">registration</Link>
                                
                                <button type="submit" className="btn btn-primary float-right mr-2">Sign in</button>
                                <Link to="forget" className="float-right mr-2">Forget Password? </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
