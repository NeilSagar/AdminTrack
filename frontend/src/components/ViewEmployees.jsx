import styled from "@emotion/styled";
import { TableContainer,Table, TableHead,TableRow, TableCell, TableBody , Card} from "@mui/material";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

import { allEmployee } from "../services/api";

const StyledTable=styled(Table)`
width:85%;
margin:50px auto;
background-color:#fff;

`;
const StyledTableRow=styled(TableRow)`
background-color:#27374D;
`;
const StyedHeadTableCell=styled(TableCell)`
color:#DDE6ED;
font-weight:600;
font-size:20px;
padding-left:40px;
`;
const StyledBodyTableCell=styled(TableCell)`
font-weight:400;
font-size:18px;
padding-left:40px;
`

const StyledButtonSec=styled(TableCell)`
    text-align:center;
    & >button{
        margin:10px;
    }
`;

const StyledTypo=styled(Card)`
    text-align:center;
    padding:100px;
    width:71%;
    margin:50px auto;
    position:relative;
    bottom:100px;
    border-radius:0;
    font-size:32px;
`;
const StyledMoreInfoButton=styled(Button)`
    color:#27374D;
    border:1px solid #27374D;
    &:hover{
        color:#fff;
        background-color:#27374D;
    }
`;


function ViewEmployees(){

    const [employees,setEmployee]=useState([]);
    const [empdatasize,setEmpdatasize]=useState(0);

    const Navigate=useNavigate();

    async function loadEmployeesData(){
        const employeesData=await allEmployee();
        setEmployee(employeesData);
    }

    function handleMoreInfo(id){
        Navigate("/viewEmployees/"+id);
    }
    function handleRenderingEmployees(employee,i){
        return(
            <TableRow key={i}>
                <StyledBodyTableCell>{i+1}</StyledBodyTableCell>
                <StyledBodyTableCell>{employee.empId}</StyledBodyTableCell>
                <StyledBodyTableCell>{employee.name}</StyledBodyTableCell>
                <StyledBodyTableCell>{employee.jobTitle}</StyledBodyTableCell>
                <StyledButtonSec >
                <StyledMoreInfoButton variant="outlined" onClick={()=>handleMoreInfo(employee.empId)}><InfoIcon sx={{marginRight:0.5}}/>More Info</StyledMoreInfoButton>
                </StyledButtonSec>
            </TableRow>
        );
    }

    useEffect(()=>{
        loadEmployeesData();
        setEmpdatasize(employees.length);
    },[employees]);
       
    return(
        <>

        <TableContainer>
            <StyledTable>
                <TableHead>
                    <StyledTableRow >
                        <StyedHeadTableCell>#</StyedHeadTableCell>
                        <StyedHeadTableCell>Employee Id</StyedHeadTableCell>
                        <StyedHeadTableCell>Employee Name</StyedHeadTableCell>
                        <StyedHeadTableCell>Job Title</StyedHeadTableCell>
                        <StyedHeadTableCell></StyedHeadTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {employees.map(handleRenderingEmployees)}
                </TableBody>
            </StyledTable>
        </TableContainer>
        {empdatasize===0?<StyledTypo>It seems no employee has been added yet!</StyledTypo>:null}
        </>
    );
}

export default ViewEmployees;