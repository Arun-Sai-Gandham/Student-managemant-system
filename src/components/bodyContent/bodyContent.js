import { useEffect, useState } from "react";
import FilterBar from "./filterBar/filterBar";
import "./body-content.css";
import StudentList from "./studentList/studentList";
import ViewModal from "../../templates/viewModal/viewModal";
import useFetch from "../../hooks/fetch";

const BodyContent = () => 
{
    
    // cap Alphabets
    const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    // Show loading before data loading
    const [loading,setLoading] = useState(true)
    
    // DEpartment List From API
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
    
    // Gender List from API
    const gender = [
            {genderaName : "Male", genderId : 1},
            {genderaName : "FeMale", genderId : 2}
    ];
    
    // Fun for saving new student
    const submitUserData = async (userData) => {
        setViewModalDisplayStatus("none")
        const url = "http://localhost:8000/students";
        fetch(url,{method:'POST',body: JSON.stringify(userData),headers:{ "Content-type":"application/json" }});        
        await fetch('http://localhost:8000/students').then(res => res.json()).then(data => 
        {
            setStudentData(data);
        });
        filterStudentsList("","","")
    }

    // Student List from API
    const [studentData,setStudentData] = useState([]);
    useEffect(() =>{
        
        fetch('http://localhost:8000/students').then(res => res.json()).then(data => 
        {
            setStudentData(data);
            
        });
        setLoading(false)
    },[]);

    // useEffect to run when ever there is change in total student data 
    useEffect(() => {
        filterStudentsList("","","");
    },[studentData])
    
    
    // Storing filtred student list ( Default All students )
    const [filteredStudentList,setFilteredStudentList] = useState(studentData);
    const [viewModalDisplayStatus,setViewModalDisplayStatus] = useState("none")
    const [searchFilterBy,setFilterBy] = useState("stuedntname"); // For storing Sort by value 

    // This function is for filter by search text box
    const textSearchFilterBy = (filterByValue) =>
    {
        setFilterBy(filterByValue);
        document.getElementById("searchInput").value = "";
        filterStudentsList("","","")
    }

    // when we click on clear filter this function will clear all filter values and o/p all the students
    const resetFilters = () => {
        document.getElementById("filterBy").selectedIndex = 0;
        document.getElementById("searchInput").value = "";
        setFilterBy("stuedntname");
        filterStudentsList("","","");
    }
    
    // setting the view modal form to add form not edit form 
    const isEdit = false;

    // function to change the filtred students to show in front end
    const filterStudentsList = (filterBy,filterValue,type) => 
    {
        if(type === "section" && filterValue != ""){
            setFilteredStudentList(studentData.filter((student) => String(student[filterBy]) === String(filterValue)));
        }
        else if(type === "alpha" && filterValue != "")
        {
            setFilteredStudentList(studentData.filter((student) => String(student.stuedntname.toUpperCase()).startsWith(filterValue.toUpperCase())));
        }
        else if(type === "search" && filterValue != "")
        {
            if(!isNaN(filterValue)){
                setFilteredStudentList(studentData.filter((student) => String(student[searchFilterBy]).startsWith(String(filterValue))));
            }
            else{
                setFilteredStudentList(studentData.filter((student) => {
                    return isNaN(student[searchFilterBy]) && String(student[searchFilterBy].toUpperCase()).includes(String(filterValue.toUpperCase()))
                }));
            }
            
        }
        else
        {
            setFilteredStudentList(studentData);
        }
    }
    return (
        <div>
        <div className="container">
            <div className="body-content-outer">
                <div className="filter-bar-outer">
                    <FilterBar branchs={branchs} departments={ departments } genders={ gender } filterStudents={(filterBy,filterValue,type)=> filterStudentsList(filterBy,filterValue,type)}  studentData={studentData} resetFilters={resetFilters} />
                </div>
                <div className="body-data">
                    <div className="alphabets-outer">
                        {alphabets.map((letter) => (
                            <div className="alphs-item" key={letter}>
                                <p onClick={() => filterStudentsList('',letter,"alpha")}>{letter}</p>
                            </div>
                        ))}
                    </div>
                    <div className="input-filter">
                        <div className="search-input">
                            <span>Search: </span><input type="serach" className="input-search-bar" onChange={e => filterStudentsList("",e.target.value,"search")} id="searchInput"/>
                        </div>
                        <div className="search-by">
                        <span>Filter by: </span>
                            <select onChange={(e) => textSearchFilterBy(e.target.value)}  id="filterBy">
                                <option value="stuedntname">Name</option>
                                <option value="rollNo">Roll No</option>
                            </select>
                            <button onClick={() => setViewModalDisplayStatus("block")}>Add New Student</button>
                        </div>
                    </div>
                    { studentData.length !== 0 && <StudentList studentData={filteredStudentList} loading={loading} branchs={branchs} departments={departments} genders={ gender } />}
                </div>
            </div>
        </div>
        <ViewModal isEdit={isEdit} branchs={branchs} studentData={{}} departments={departments} genders={ gender } displayStatus={viewModalDisplayStatus} viewModal={ (word) => setViewModalDisplayStatus(word)} submitUserData={(newUserData) => submitUserData(newUserData)} />
        </div>
    );
}
 
export default BodyContent;