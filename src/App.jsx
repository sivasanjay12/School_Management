// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './Components/Signup/Signup';


// function App() {

//    return (
//     <>
//     <Router>
//       <div className="App">
//         <Routes>
//            <Route path="/" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//         </Routes>
//       </div>
//     </Router>
//     </>
//   );
// }

// export default App





import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './Components/Signup/Signup';
// import SignIn from './Components/Signin/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/Signup/Signup';
import SignIn from './Components/Signin/Signin';
import Dashboard from './Components/Dashboard/Dashboard';
import StudentDetails from './Components/Student_details/StudentDetails';
import TeacherList from './Components/TeacherList/TeacherList';
import Student_Table from './Components/Student_Table/Student_Table';
import Admin from './Components/AdminPage/Admin';
import AdminDashboard from './Components/AdminDetails/AdminDetails';
import AssessmentPlayer from './Components/Assement/Assement';
import TaskDiary from './Components/Task/Task';
import AdminForm from './Components/Admin_form/Admin_form';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/student-Table" element={<Student_Table />} />
          <Route path="/teacherlist" element={<TeacherList />} />
          <Route path="/admin" element={<Admin />} />
           <Route path="/adminDetails" element={<AdminDashboard />} />
           <Route path="/assesment" element={<AssessmentPlayer />} />
           <Route path="/task" element={<TaskDiary />} />
           <Route path="/admin_form" element={<AdminForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;