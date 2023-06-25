import { useEffect ,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import { Accordion, AccordionSummary,Typography, AccordionDetails,styled, List, ListItem, ListItemIcon, ListItemText,Fab} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { moreInfoEmployee,deleteEmployee } from "../services/api";
import RedirectMsg from "./RedirectMsg";

const StyledTypographyH4=styled(Typography)`
padding:15px;
`;
const StyledTypographyKey=styled(Typography)`
width:200px;
`;
const StyledEditIcon=styled(Fab)`
position:fixed;
left:85%;
bottom:13%;
text-transform:none;
background-color:#27374D;
color:#fff;
width:200px;
display:flex;
justify-content:space-around;
&:hover{
    color:#27374D;
    background-color:#DDE6ED;
}
`;
const StyledDeleteIcon=styled(Fab)`
position:fixed;
left:85%;
bottom:5%;
text-transform:none;
background-color:#B70404;
color:#F9FBE7;
width:200px;
display:flex;
font-weight:600;
justify-content:space-around;
&:hover{
    color:#B70404;
    background-color:#F9FBE7;
}
`;

const StyledEditTypo=styled(Typography)`
font-family: 'Major Mono Display', monospace;

`;

function MoreInfo(){
    const {empId}=useParams();
    
    const Navigate=useNavigate();
    const defaultUser={
        empId:"",
        name:"",
        sex:"",
        dob:"",
        phone:"",
        email:"",
        address:"",
        jobTitle:"",
        department:"",
        joiningDate:"",
        reportingTo:"",
        salary:"",
        workingHourStarts:"",
        workingHourEnds:"",
        leaveBalance:"",
        leavesTaken:"",
        notableContributions:""
    };
    
    const [allInfo,setAllInfo]=useState(defaultUser);
    const [expandFirst,setExpandFirst]=useState(true);
    const[invalidEntry,setInvalidEntry]=useState(false);
    const [headingMsg,setHeadingMsg]=useState("");
    const [msg,setMsg]=useState("");

    async function getAllInfo(){
        // setShowBackDrop(true);
        const response=await moreInfoEmployee(empId);
        // setShowBackDrop(false);
        if(response.data!==null){
            setAllInfo(response.data);
        }
        else{
            setInvalidEntry(true);
            setHeadingMsg("Seems you are lost!");
            setMsg("Redirecting to Employee Info Page.....");
            setTimeout(()=>Navigate("/viewEmployees"),3000);
        }
    }

    function handleUpdateEmployee(){
        Navigate("/editEmployee/"+empId);
    }

    async function deleteFunc(){
        await deleteEmployee(empId);
    }
    function handleDeleteEmployee(){
            // setShowBackDrop(true);
            deleteFunc();
            setInvalidEntry(true);
            setHeadingMsg("This employee is deleted.");
            setMsg("Redirecting to Employee Info Page.....");
            setTimeout(() => {
               Navigate("/viewEmployees");
            }, 7000);
    }

    useEffect(()=>{
        getAllInfo();
    },[]);

    useEffect(()=>{},[allInfo]);
    return(
    <div className="details-sec">
    {
        (!invalidEntry?(<>
        
        <StyledEditIcon variant="extended" onClick={handleUpdateEmployee}>
            <EditIcon  /><StyledEditTypo variant="subtitle2">Edit This</StyledEditTypo>
        </StyledEditIcon>
        <StyledDeleteIcon variant="extended" onClick={handleDeleteEmployee}>
            <DeleteIcon  /><StyledEditTypo variant="subtitle2">Delete This</StyledEditTypo>
        </StyledDeleteIcon>

        <Accordion expanded={expandFirst} onClick={()=>setExpandFirst(!expandFirst)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} TransitionProps={{ unmountOnExit: true }} >
                <StyledTypographyH4 variant="h4"><AccountCircleOutlinedIcon sx={{fontSize:40,position:"relative",top:8,marginRight:2}} />Personal Details</StyledTypographyH4>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5">Employee Id</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.empId}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Name</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.name}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5">Sex</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.sex}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >DOB</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.dob}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Phone</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.phone}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Email Id</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.email}</Typography></ListItemText>
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
        <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <StyledTypographyH4 variant="h4"><ContactSupportOutlinedIcon sx={{fontSize:40,position:"relative",top:8,marginRight:2}} />Contact Details</StyledTypographyH4>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Phone</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.phone}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Email Id</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.email}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Address</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.address}</Typography></ListItemText>
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
        <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <StyledTypographyH4 variant="h4"><BusinessOutlinedIcon sx={{fontSize:40,position:"relative",top:8,marginRight:2}} />Employment Details</StyledTypographyH4>
            </AccordionSummary>
            <AccordionDetails>
            <List>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Designation</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.jobTitle}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Department</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.department}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Joined On</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.joiningDate}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Reporting To</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.reportingTo}</Typography></ListItemText>
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
        <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <StyledTypographyH4 variant="h4"><WorkOutlineOutlinedIcon sx={{fontSize:40,position:"relative",top:8,marginRight:2}} />Working Details</StyledTypographyH4>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Salary</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.salary}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Working Hours</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.workingHourStarts} - {allInfo.workingHourEnds}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Leave Balance</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.leaveBalance}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Leaves Taken</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.leavesTaken}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Notable Contribution to Company</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{allInfo.notableContributions}</Typography></ListItemText>
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
        </>)
        :(<RedirectMsg heading={headingMsg} msg={msg}/>))
    }
    </div>
    );
}

export default MoreInfo;