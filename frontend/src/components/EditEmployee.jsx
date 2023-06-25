import React,{useEffect, useState} from "react";
import { FormGroup ,Typography,TextField,styled,Select,MenuItem,InputLabel,FormControl, Button} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker,DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {useParams,useNavigate} from "react-router-dom";

import { moreInfoEmployee,editEmployeeData } from "../services/api";

const StyledFormGroup=styled(FormGroup)`
width:60%;
margin:50px auto;
background-color:#DDE6ED;
padding:60px;
padding-bottom:0;
border-radius:20px;
`;
const StyledTextField=styled(TextField)`
margin:20px 20px 0 0;
`;
const StyledField=styled(FormControl)`
position:relative;
top:20px;
`;
const StyledButton=styled(Button)`
width:40%;
padding:10px;
margin:25px auto 0;
background-color:#213555;
`;
const StyledHelperText=styled(Typography)`
text-align:center;
margin-bottom:20px;
`;

function EditEmployee(){
    const {empId}=useParams();
    const Navigate=useNavigate();

    const defaultUser={
        empId:"",
        name:"",
        sex:"",
        dob:new Date(),
        phone:"",
        email:"",
        address:"",
        jobTitle:"",
        department:"",
        joiningDate:new Date(),
        reportingTo:"",
        salary:"",
        workingHourStarts:new Date(),
        workingHourEnds:new Date(),
        leaveBalance:"",
        leavesTaken:"",
        notableContributions:""
    };
    const [user,setUser]=useState(defaultUser);
    const [dob, setdob] = useState(dayjs(new Date()));
    const [joiningDate, setJoiningDate] = useState(dayjs(new Date()));
    const [workingHourStarts, setWorkingHourStarts] = useState(dayjs(new Date()));
    const [workingHourEnds, setWorkingHourEnds] = useState(dayjs(new Date()));   
    const [isEnabled,setIsEnabled]=useState(false);
    
    const fourPM = dayjs().set('hour', 16).startOf('hour');

    
    function handleChange(event){
        const name=event.target.name;
        let value=event.target.value;
        if(name==="empId")value=value.toUpperCase();
        setUser((prevVal)=>{
            return(
                {
                ...prevVal,
                [name]:value
                }
            );
        });
    }
    async function loadEmployeeData(){
        const response=await moreInfoEmployee(empId);
        const oneEmpData=response.data;
        setUser(oneEmpData);
        setdob(dayjs(oneEmpData.dob));
        setJoiningDate(dayjs(oneEmpData.joiningDate));
        setWorkingHourStarts(dayjs(oneEmpData.workingHourStarts,"HH:mm"));
        setWorkingHourEnds(dayjs(oneEmpData.workingHourEnds,"HH:mm"));
    }
    async function handleEditEmployee(){
        await editEmployeeData(user,empId);
        Navigate("/viewEmployees/"+empId);
    }
    function checkIsValid(){
        if(user.empId!==""&&
        user.name!==""&&
        user.sex!==""&&
        user.phone!==""&&
        user.email!==""&&
        user.address!==""&&
        user.jobTitle!==""&&
        user.department!==""&&
        user.reportingTo!==""&&
        user.salary!==""&&
        user.workingHourStarts!==""&&
        user.workingHourEnds!==""&&
        user.leaveBalance!==""&&
        user.leavesTaken!==""&&
        user.notableContributions!==""){
            return true;
        }
        return false;
    }
    useEffect(()=>{
        const check=checkIsValid();
        // console.log(check);
        if(check){
            setIsEnabled(true);
        }
        else{
            setIsEnabled(false);
        }
    },[user]);

    useEffect(()=>{
        const chosenDate=dob.format("YYYY-MM-DD");
        setUser((prevVal)=>{
            return(
                {
                    ...prevVal,
                    "dob":chosenDate
                }
            );
        });
    },[dob]);


    useEffect(()=>{
        const chosenDate=joiningDate.format("YYYY-MM-DD");
        setUser((prevVal)=>{
            return(
                {
                    ...prevVal,
                    "joiningDate":chosenDate
                }
            );
        });
    },[joiningDate]);

    useEffect(()=>{
        const chosenTime=workingHourStarts.format("HH:mm");
        setUser((prevVal)=>{
            return(
                {
                    ...prevVal,
                    "workingHourStarts":chosenTime
                }
            );
        });
    },[workingHourStarts]);

    useEffect(()=>{
        const chosenTime=workingHourEnds.format("HH:mm");
        setUser((prevVal)=>{
            return(
                {
                    ...prevVal,
                    "workingHourEnds":chosenTime
                }
            );
        });
    },[workingHourEnds]);

    useEffect(()=>{
        loadEmployeeData();
        // console.log(user);
    },[]);
    return (
        <>
            <StyledFormGroup>
            <Typography variant='h2'>Edit Employee</Typography>
            <StyledTextField id="outlined-basic" label="Employee Id" variant="outlined" sx={{ width: 3.5/10, marginBottom:3 }} name="empId" value={user.empId} onChange={handleChange} />
                <Typography variant='h4'>Employee's Personal Details</Typography>
            <div className="personal-details">
            <StyledTextField id="outlined-basic" label="Employee Name" variant="outlined" sx={{ width: 5/10 }} name="name" value={user.name} onChange={handleChange}/>
            
            <StyledField sx={{ width: 1.7/10,marginRight:2}}>
            <InputLabel >Sex</InputLabel>
            <Select autoWidth label="Sex" name="sex" value={user.sex} onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </Select>
            </StyledField>

            <StyledField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Employee dob" format="DD-MM-YYYY" value={dob} onChange={(newval)=>setdob(newval)} sx={{marginRight:2,marginBottom:2}}/>
                </LocalizationProvider>
            </StyledField>

            <StyledTextField id="outlined-basic" label="Phone No." variant="outlined" sx={{ width: 4.5/10}} name="phone" value={user.phone} onChange={handleChange}/>
            <StyledTextField id="outlined-basic" label="Email Id" variant="outlined" sx={{ width: 5/10 }} name="email" value={user.email} onChange={handleChange}/>
            <StyledTextField id="outlined-basic" label="Address" variant="outlined" sx={{ width: 9.7/10 }} name="address" value={user.address} onChange={handleChange}/>
            </div>

            <Typography variant='h4' sx={{marginTop:5}}>Employment Details</Typography>
            <div className="employment-details">
            <StyledTextField id="outlined-basic" label="Job Title" variant="outlined" sx={{ width: 3.3/10}} name="jobTitle" value={user.jobTitle} onChange={handleChange}/>
            <StyledTextField id="outlined-basic" label="Department" variant="outlined" sx={{ width: 3.3/10}} name="department" value={user.department} onChange={handleChange}/>
            
            <StyledField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Joining Date" sx={{marginRight:2 ,marginBottom:2}} format="DD-MM-YYYY" value={joiningDate} onChange={(newval)=>setJoiningDate(newval)}/>
            </LocalizationProvider>
            </StyledField>
            
            <StyledTextField id="outlined-basic" label="Reporting To" variant="outlined" sx={{ width: 5/10}} name="reportingTo" value={user.reportingTo} onChange={handleChange}/>
            <StyledTextField type="Number" id="outlined-basic" label="Salary (in rupees)" variant="outlined" sx={{ width: 4.5/10}} name="salary" value={user.salary} onChange={handleChange}/>
            </div>

            <Typography variant='h4' sx={{marginTop:5}}>Working Details</Typography>
            <div className="working-details">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="workingHours">
                <TimePicker  label="Working Starts" sx={{ width: 3/10,marginRight:2}} value={workingHourStarts} onChange={(newVal)=>{setWorkingHourStarts(newVal);}}/>
                <TimePicker defaultValue={fourPM} label="Working Ends" sx={{ width: 3/10,marginRight:2}} value={workingHourEnds} onChange={(newVal)=>{setWorkingHourEnds(newVal);}} />
                </div>
            </LocalizationProvider>
            <br/>
            <StyledTextField type="Number" id="outlined-basic" label="Leave Balance (in Days)" variant="outlined" sx={{ width: 3.5/10}} name="leaveBalance" value={user.leaveBalance} onChange={handleChange}/>
            <StyledTextField type="Number" id="outlined-basic" label="Leaves Taken (in Days)" variant="outlined" sx={{ width: 3.5/10}} name="leavesTaken" value={user.leavesTaken} onChange={handleChange}/>
            <StyledTextField id="outlined-basic" label="Notable Contribution to Company" variant="outlined" sx={{ width: 9.8/10}} name="notableContributions" value={user.notableContributions} onChange={handleChange}/>
            </div>

            <FormControl>
                <StyledButton variant="contained" 
                sx={{":hover": {bgcolor: "#080202"}}} onClick={handleEditEmployee} disabled={!isEnabled} >Edit Details</StyledButton>
            </FormControl>
            {!isEnabled?<StyledHelperText variant="subtitle" sx={{color:"#E0144C"}}>* Some fields are not filled.</StyledHelperText>:<StyledHelperText variant="subtitle" sx={{color:"#DDE6ED"}}>.</StyledHelperText>}
            </StyledFormGroup>
        </>
    );
}

export default EditEmployee;




