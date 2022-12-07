import { useEffect, useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import ViewModal from "../../templates/viewModal/viewModal";
import "./viewStudent.css";
const ViewStudentDetails = () => {
    const { user_id } = useParams();
    const [userData,setUserData] = useState({"asdfas" : "asdf"});
    const getMyData = async () => {
        const data = new Promise(function(resolve,reject){
            const return_data = fetch('http://localhost:8000/students/10').then(res => res.json()).then(data => {return data});
            return resolve(return_data)
        })
        setUserData(data.then(data => {return data}));
    }
    const [viewModalDisplayStatus,setViewModalDisplayStatus] = useState("none")
    // useEffect(() => {
    //     console.log(userData)
    // });
    const [initial_values,setInitial_values] = useState({
        stuedntname : "",
        rollNo : "",
        branch : "",
        department : "",
        gender : "",
        profileURL : ""
    })
    const submitUserData = async (userData) => {
        setViewModalDisplayStatus("none")
    }
    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (
            await fetch(
              `http://localhost:8000/students/${user_id}`
            )
          ).json();
          setUserData(data);
          setInitial_values({
            stuedntname : data.stuedntname,
                rollNo : data.rollNo,
                branch : (branchs.filter(branch => String(branch.branchId) == String(data.branch)))[0].branchLocation,
                department : (departments.filter(department => String(department.deptId) == String(data.department)))[0].departmentName,
                gender : (genders.filter(each_gender => String(each_gender.genderId) == String(data.gender)))[0].genderaName,
                profileURL : data.profileURL
            })
          // set state when the data received
          
        };
        
        dataFetch();
      }, []);
      
      const openEditModal = () => {
        setViewModalDisplayStatus("block")
      }
      const departments = [
        {departmentName : "Electrical",deptId : 1,shortCode:"EEE"},
        {departmentName : "Mechanical",deptId : 2,shortCode:"MECH"},
        {departmentName : "Computer Science",deptId : 3,shortCode:"CSE"},
        {departmentName : "Civil",deptId : 4,shortCode:"CV"},
        {departmentName : "Elctronics Conmunication",deptId : 5,shortCode:"ECE"},
    ];
// Branch List From API
const branchs = [
        {branchLocation : "Andhra Pradesh", branchId : 1},
        {branchLocation : "Telangana", branchId : 2},
        {branchLocation : "New Delhi", branchId : 3},
        {branchLocation : "Gujarath", branchId : 4},
        {branchLocation : "Tamilnadu", branchId : 5}
    ];
    const navigate = useNavigate();

// Gender List from API
const genders = [
        {genderaName : "Male", genderId : 1},
        {genderaName : "FeMale", genderId : 2}
];
const isEdit = true;
const deleteStudent = () => {
    if (window.confirm(`You are deleting ${userData.stuedntname} profile!!`)) {
        fetch(`http://localhost:8000/students/${user_id}`,{ method: "DELETE"})
        navigate("/");
      }
}
    return (
        <div className="view-student">
            <div className="container">
                <div className="view-student-inner">
                    <div className="item-box">
                        <div className="image-container">
                            <div className="back-link"><Link to="/">Back</Link></div>
                            <img src={userData.profileURL} alt="profile Pic"></img>
                        </div>
                    </div>
                    <div className="item-box">
                        <div className="data-container">
                            <div className="data-fields">
                                <p>Name: <b>{initial_values.stuedntname}</b></p>
                                <p>Department: <b>{initial_values.department}</b></p>
                                <p>Branch: <b>{initial_values.branch}</b></p>
                                <p>Gender: <b>{initial_values.gender}</b></p>
                                <p>Roll No: <b>{initial_values.rollNo}</b></p>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <button className="edit" onClick={() => openEditModal()}>Edit</button>
                            <button className="delet" onClick={() => deleteStudent()}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <ViewModal isEdit={isEdit}  studentData={userData} branchs={branchs} departments={departments} genders={ genders }  displayStatus={viewModalDisplayStatus} viewModal={ (word) => setViewModalDisplayStatus(word)}  submitUserData={(newUserData) => submitUserData(newUserData)} />
        </div>
     ); 
}
 
export default ViewStudentDetails;