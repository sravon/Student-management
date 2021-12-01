import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';


export default function AddCustomer(props) {
    const [students, setstudents] = useState([])
    const [customer, setcustomer] = useState({
        name:"",bin:"",
        email:"", upload:""
    })

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
    
    useEffect(() => {
        studentList()
         
    }, [])

    const insertdata = (data) =>{
        
        Axios.post('customers',data).then(response => {
            if(response.status == 200){
                console.log(response)
                setcustomer({name:"",bin:"",
                email:"", upload:""})
                props.data()
                
            }else if(response.status == 201){
                console.log(response);
                
            }
        })

    }

    const registerCourse = e =>{
        e.preventDefault()
        
        const formData = new FormData();
        formData.append("name",customer.name);
        formData.append("bin", customer.bin);
        formData.append("email", customer.email);
        formData.append("upload", customer.upload);
        
        console.log(customer)
        //const data = {title,category,file,link,des}
        //postWorks(formData)
       insertdata(formData)
    }
    const setAllValue = e => {
        //setcustomer({...customer,name:e.target.value})
        students.map( (er,i) => (
            (er.id == e.target.value)
            ?setcustomer({...customer,name:er.name,email:er.email}):null
        ))
    }
    return (
        <div>
            <h2 className="text-center p-4">Registration Customer</h2>
            <form onSubmit={ e => registerCourse(e)}>
                <div className="form-group">
                    <label >Name</label>
                    <select name="" id="" className="form-control"
                        onChange={e =>setAllValue(e)}>
                        <option value="">Select Students</option>
                    {(students.length >= 0)?(students.map( (e,i) => (
                        <option value={e.id} key={e.id}>{e.student_id} - {e.name}</option>
                    ))):
                        <option value="">No Students</option>}
                    </select>
                </div>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control" placeholder="Enter Bin"
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
                <img src={customer.upload} alt="" />
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
