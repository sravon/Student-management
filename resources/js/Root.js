import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Academic from './Pages/Academic';
import Home from './Pages/Home'
import Register from './Pages/Register'
import Profile from './Pages/Profile';
import GradePanel from './Pages/GradePanel'
import CoursePanel from './Pages/CoursePanel'
import CustomerPanel from './Pages/CustomerPanel';
import StudentPanel from './Pages/StudentPanel';

function Root() {
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/registration" element={<Register/>}/>
            <Route exact path="/academic" element={<Academic/>}/>
            <Route exact path="/home" element={<Profile/>}/>
            <Route exact path="/grade" element={<GradePanel/>}/>
            <Route exact path="/course" element={<CoursePanel/>}/>
            <Route exact path="/customers" element={<CustomerPanel/>}/>
            <Route exact path="/students" element={<StudentPanel/>}/>
          </Routes>
        </BrowserRouter>
    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
