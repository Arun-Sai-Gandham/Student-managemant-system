import { Link } from "react-router-dom";
import defaultUser from "./../default-user.png";
import noStudentFound from "./no-student-found.jpg";

const StudentList = (props) => {
    const studentLink = "";
    if(!props.loading)
    {
    if(!props.studentData.length){
        return ( 
            <div className="no-data-items">
                <img src={noStudentFound} alt="No Data Found"/>
                <h2>No Students Found</h2>
            </div>
        );
    }
    else
    {
        return ( 
            <div className="data-items">
                {
                    props.studentData.map((student) => (
                        
                        <div className="student-item"  key={student.id}>
                            <Link to={`/view-student/${student.id}`}>
                            <div className="student-item-inner">
                                <div className="student-image">
                                    <img src={student.profileURL ? student.profileURL : defaultUser} alt="pf-pic"/>
                                </div>
                                <div className="student-details">
                                    <p>Name: {student.stuedntname}</p>
                                    <p>Department: {props.departments.filter((department) => String(department.deptId) === String(student.department))[0].shortCode}</p>
                                    <p>Branch: {props.branchs.filter((branch) => String(branch.branchId) === String(student.branch))[0].branchLocation}</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
         );
    }
}
else{
    return (
        <div>Loading...</div>
    )
}
    
}
 
export default StudentList;