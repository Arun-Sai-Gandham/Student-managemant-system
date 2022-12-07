import "./filter-bar.css";
const FilterBar = ({branchs,departments,genders,filterStudents,studentData,resetFilters}) => {
    return ( 
        <div className="filter-bar">
            <div className="filter-bar-inner">
                <h2>Filter By:</h2>
                <ul>
                    <li className="clear-filter" ><p onClick={resetFilters}>Clear Filter</p></li>
                </ul>
                <h3>Branch: </h3>
                <ul>
                    {
                        branchs.map((branch) => (
                            <li  key={branch.branchId}><p onClick={() => filterStudents('branch',branch.branchId,"section")}>{ branch.branchLocation } ({studentData.filter((student) => String(student.branch) === String(branch.branchId)).length})</p></li>
                        ))
                    }
                </ul>
                <h3>Department:</h3>
                <ul>
                    {
                        departments.map((department) => (
                            <li key={department.deptId}><p onClick={() => filterStudents('department',department.deptId,"section")}>{ department.departmentName } ({studentData.filter((student) => String(student.department) === String(department.deptId)).length})</p></li>
                        ))
                    }
                </ul>
                <h3>Gender:</h3>
                <ul>
                    {
                        genders.map((gender) => (
                            <li key={gender.genderId}><p onClick={() => filterStudents('gender',gender.genderId,"section")}>{ gender.genderaName }  ({studentData.filter((student) => String(student.gender) === String(gender.genderId)).length})</p></li>
                        ))
                    }
                </ul>
            </div>
        </div>
     );
}
 
export default FilterBar;