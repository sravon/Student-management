import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function AddCourse(props) {
    const [customer, setcustomer] = useState({
        name:"",bin:"",
        email:"", upload:""
    })
    

    const courseinfo = () =>{
        Axios.get('customers/'+ props.editid).then(response => {
            if(response.status == 200){
                console.log(response)
                setcustomer({...customer,
                        name:response.data.name,bin:response.data.bin,
                        email:response.data.email, upload:response.data.upload
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
        
        Axios.put('customers/'+props.editid,data).then(response => {
            if(response.status == 200){
                console.log(response)
                setcustomer({name:"",bin:"",
                email:"", upload:""})
                props.viewAll()
                props.useEdit(false)
            }else if(response.status == 201){
                console.log(response);
            }
        })

    }

    const updateCustomer = e =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("name",customer.name);
        formData.append("bin", customer.bin);
        formData.append("email", customer.email);
        formData.append("upload", customer.upload);
        
        console.log(customer)
        updatedata(customer)
    }
    return (
        <div>
            <h2 className="text-center p-4">Edit Customer</h2>
            <form onSubmit={ e => updateCustomer(e)}>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name"
                    value={customer.name}
                    onChange={e =>setcustomer({...customer,name:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Bin</label>
                    <input type="text" className="form-control" placeholder="Enter Bin"
                    value={customer.bin}
                    onChange={e =>setcustomer({...customer,bin:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" className="form-control" placeholder="Enter Email"
                    value={customer.email}
                    onChange={e =>setcustomer({...customer,email:e.target.value})}/>
                </div>
                <img src={customer.upload} width={100} height={100} alt="" />
                <div className="form-group">
                    <label >Scanner Upload</label>
                    <input type="file" className="form-control" placeholder="Enter Email"
                    
                    onChange={e =>setcustomer({...customer,upload:e.target.files[0]})}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
