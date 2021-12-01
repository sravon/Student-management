import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';
import Header from '../components/Header';
import AddCustomer from '../components/AddCustomer';
import EditCustomer from '../components/EditCustomer'

export default function CustomerPanel() {
    const [customer, setcustomer] = useState([])
    const [editFrom, setEditFrom] = useState(false);
    const [editid, setEditid] = useState("");
    
    const customerList = () => {
        Axios.get('customers').then(response => {
            if(response.status == 200){
                console.log(response)
                setcustomer(response.data)
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }

    const updateCourse = (id) =>{
        console.log(id);
        setEditFrom(true)
        setEditid(id)
    }

    const deleteCourse = (id) =>{
        Axios.delete('customers/'+id).then(response => {
            if(response.status == 200){
                customerList()
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }
    

    useEffect(() => {
        customerList()
         
    }, [])

    

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-between items-center bg-secondary">
                <h6 className="mt-2 h4 ml-2">Welcome to {localStorage.getItem("name")}</h6>
            </div>

            <div className="container">
                <div className="row alert-secondary p-2">
                    <div className="col-md-4">
                        {(editFrom) ?
                            <EditCustomer editid={editid} useEdit={setEditFrom} viewAll={customerList} /> :
                            <AddCustomer data={customerList}/>
                        }
                    </div>
                    <div className="col-md-8">
                        <h2 className="text-center text-success pt-3">Course Info</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>BIN</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(customer.length >= 0)?(customer.map( (e,i) => (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.bin}</td>
                                    <td><img src={"http://localhost:8000/"+e.upload} width={100} height={100} alt="" /></td>
                                    <td><button className="btn btn-success btn-sm" onClick={() => updateCourse(e.id)}>Edit</button></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                {if(window.confirm('Are you sure to delete this record?')){ deleteCourse(e.id)};}
                                         
                                        }>
                                            Delete</button>
                                     </td>
                                </tr>
                            ))):null}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
