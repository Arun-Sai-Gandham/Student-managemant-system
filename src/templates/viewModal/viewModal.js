import { useEffect, useRef, useState } from "react";
import "./viewModal.css";
const ViewModal = ({branchs,departments,genders,displayStatus,viewModal,submitUserData,isEdit,studentData}) => {
    
    const initial_values = {
        stuedntname : isEdit ? studentData.stuedntname: "",
        rollNo : isEdit ? studentData.rollNo: "",
        branch : isEdit ? studentData.branch: "",
        department : isEdit ? studentData.department: "",
        gender : isEdit ? studentData.gender: "",
        profileURL : isEdit ? studentData.profileURL: ""
    }
    const  [errors,setErrors] = useState(initial_values);
    const [formValues,setFormvalues] = useState(initial_values);
    const handleChange = (e) => {
        const {id,value} = e.target;
        setFormvalues({...formValues,[id]:value});
    }
    const validateForm = (e) => {
        e.preventDefault();
        // setErrors({});
        setErrors(validationReq(formValues))
    }
    useEffect(() =>{
        submit_data();
    },[errors]);
    const submit_data = () => {
        if(Object.keys(errors).length === 0)
        {
            const inputField = document.getElementById("dataForm");
            inputField.reset();
            setErrors(initial_values);
            setFormvalues(initial_values);
            submitUserData(formValues);
            setFile();
            // e.target.reset();
        }
    }
    const [file, setFile] = useState();
    function imageHandleChange(e) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setFormvalues({...formValues,["profileURL"]:reader.result});
        })
        reader.readAsDataURL(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        setFile(isEdit ? studentData.profileURL : "");
    },[]);
    const validationReq = (data) => {
        const errors = {}
        if(data.stuedntname == "")
        {
            errors.name = "Name required";
        }
        if(formValues.profileURL == "")
        {
            errors.profileURL = "Profiel picture is imortant";
        }
        if(data.rollNo == "")
        {
            errors.rollNo = "Roll Number required";
        }
        if(data.branch == "")
        {
            errors.branch = "branch required";
        }
        if(data.department == "")
        {
            errors.department = "Department required";
        }
        if(data.gender == "")
        {
            errors.gender = "Gender required";
        }
        return errors;
    }
    const closeModal = () => {
        viewModal("none")
    }
    return ( 
        <div className="view-modal-outer" style={{"display":displayStatus}}>
            <div className="modal-outer">
                <div className="modal-inner">
                    <div className="title-header">
                        <div className="title">
                            <h2>{isEdit ? "Update":"Student"} Form</h2>
                        </div>
                        <div className="close">
                            <p onClick={closeModal}>close</p>
                        </div>
                    </div>
                    
                    <div className="form-outer">
                        <form onSubmit={validateForm} encType="multipart/form-data" id="dataForm">
                        <div className="form-item" >
                                <p>Profile Picture<span>*</span>: </p>
                                <div className="fieldOuter">
                                    <input className="input-item" type="file" id="profile" onChange={imageHandleChange} multiple />
                                    <br/><img src={file}/>
                                    <br/><p>{ errors.profileURL }</p>
                                </div>
                            </div>
                            <div className="form-item" >
                                <p>Name<span>*</span>: </p>
                                <div className="fieldOuter">
                                    <input className="input-item" type="text" id="stuedntname" value={initial_values.stuedntname} onChange={handleChange}/>
                                    <p>{ errors.name }</p>
                                </div>
                            </div>
                            <div className="form-item" >
                                <p>Roll No<span>*</span>: </p>
                                <div className="fieldOuter">
                                <input className="input-item" type="number" id="rollNo" value={initial_values.rollNo}  onChange={handleChange}/>
                                <p>{ errors.rollNo }</p>
                                </div>
                            </div>
                            <div className="form-item" >
                                <p>Branch<span>*</span>: </p>
                                <div className="fieldOuter">
                                <select className="input-item" id="branch" value={initial_values.branch} onChange={handleChange}>
                                <option value="">Select</option>
                                    {
                                        branchs.map((branch) => (
                                            <option  key={branch.branchId} value={branch.branchId}>{ branch.branchLocation }</option>
                                        ))
                                    }
                                </select>
                                <p>{ errors.branch }</p>
                                </div>
                            </div>
                            <div className="form-item" >
                                <p>Department<span>*</span>: </p>
                                <div className="fieldOuter">
                                <select className="input-item" id="department" value={initial_values.department} onChange={handleChange}>
                                    <option value="">Select</option>
                                    {
                                        departments.map((department) => (
                                            <option key={department.deptId} value={department.deptId}>{ department.departmentName }</option>
                                        ))
                                    }
                                </select>
                                <p>{ errors.department }</p>
                                </div>
                            </div>
                            <div className="form-item" >
                                <p>Gender<span>*</span>: </p>
                                <div className="fieldOuter">
                                <select className="input-item" id="gender" value={initial_values.gender} onChange={handleChange}>
                                <option value="">Select</option>
                                    {
                                        genders.map((gender) => (
                                            <option key={gender.genderId} value={gender.genderId}>{ gender.genderaName }</option>
                                        ))
                                    }
                                </select>
                                <p>{ errors.gender }</p>
                                </div>
                            </div>
                            <div className="form-item" >
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewModal;