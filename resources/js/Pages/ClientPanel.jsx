import React,{useState,useEffect} from 'react'
import Axios from '../Axios/Axios';
import Header from '../components/Header';
import AddClient from '../components/AddClient';
import EditCourse from '../components/EditCourse'

export default function ClientPanel() {
    const [clients, setclients] = useState([])
    const [editFrom, setEditFrom] = useState(false);
    const [editid, setEditid] = useState("");
    
    const clientsList = () => {
        Axios.get('clients').then(response => {
            if(response.status == 200){
                console.log(response)
                setclients(response.data)
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
        Axios.delete('courses/'+id).then(response => {
            if(response.status == 200){
                courseList()
            }else if(response.status == 201){
                console.log(response);
            }
        })
    }
    

    useEffect(() => {
        clientsList()
         
    }, [])

    

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-between items-center bg-secondary">
                <h6 className="mt-2 h4 ml-2">Welcome to {localStorage.getItem("name")}</h6>
            </div>

            <div className="container">
                <div className="row alert-secondary p-2">
                    <div className="col-md-6">
                        {(editFrom) ?
                            <EditCourse editid={editid} useEdit={setEditFrom} viewAll={courseList} /> :
                            <AddClient data={clientsList}/>
                        }
                    </div>
                    <div className="col-md-6">
                        <h2 className="text-center text-success pt-3">Course Info</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Api Key</th>
                                    <th>Student Id</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(clients.length >= 0)?(clients.map( (e,i) => (
                                <tr key={i}>
                                    <td>{e.key}</td>
                                    <td>{e.student_id}</td>
                                    <td><img src={"http://localhost:8000/"+e.image} width={100} height={100} alt="" /></td>
                                    
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
