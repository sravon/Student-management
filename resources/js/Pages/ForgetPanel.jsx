import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import Message from '../Components/Message';
import Axios from '../Axios/Axios';

export default function ForgetPanel() {
    const initialState = ""
    const [email, setemail] = useState(initialState);
    const [error, setError] = useState([]);
    const his = useNavigate();

    const checkdata = (data) =>{
        
        Axios.post('users/checkuser', data).then(response => {
            if(response.status == 200){
                console.log(response)
                
            }else if(response.status == 201){
                console.log(response);
                setError([response.data])
            }
        })
    }

    const checkUser = e =>{
        e.preventDefault();
         const data = {email}
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
                        <div className="card-header text-primary h3 text-center">Find Your Account</div>
                        <div className="card-body">
                            <form onSubmit={ e => checkUser(e)}>
                            <label className="col-form-label">Please enter your email address or mobile number to search for your account.</label>
                                <div className="form-group row">
                                    
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" 
                                        value={email} onChange={ e =>setemail(e.target.value) } />
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn btn-primary float-right mr-2">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
