import React,{useState} from 'react'
import Axios from '../Axios/Axios';
import Header from '../components/Header';

export default function StudentPanel() {
    const [stuid, setstuid] = useState("");
    const [stulist, setstulist] = useState("");

    const searchResult = () => {
        console.log(stuid);
        Axios.get('studentsearch/'+stuid).then(response => {
            if(response.status == 200){
                console.log(response)
                setstulist(response.data)
            }else if(response.status == 201){
                console.log(response);
                alert('No Student FOund')
            }
        })
    }

    return (
    <>
        <Header/>
        <div className='container-fluid container'>
            <div className="row bg-secondary">
                <div className="col-md-6 mx-auto">
                    <div className="d-flex p-5">
                        <input type="text" className="w-75 p-1" value={stuid} 
                            onChange={e =>setstuid(e.target.value)} 
                            placeholder='Enter student id' maxLength={7}/>
                        <button className='w-25 btn btn-info' onClick={searchResult}>Search</button>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="container-fluid container">
            {(stulist != "")?
            <table className="table">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{stulist.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{stulist.email}</td>
                </tr>
                <tr>
                    <td>Student Id</td>
                    <td>{stulist.student_id}</td>
                </tr>
                <tr>
                    <td>NILD</td>
                    <td>{stulist.nid}</td>
                </tr>
                <tr>
                    <td>Reg No</td>
                    <td>{stulist.reg_no}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{stulist.phone}</td>
                </tr>
            </tbody>
            </table>
            :null}
        </div>
    </>
    )
}
