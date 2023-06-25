import { useNavigate,Link } from "react-router-dom";
import {FormControl, FormGroup, TextField, Typography,Button} from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

import { saveAuthCredentials,getAuthCredentials } from "../services/api";

const StyledFormGroup=styled(FormGroup)`
    background-color:#fff;
    margin:50px auto;
    padding:60px;
    border-radius:20px;
    max-width:400px;
`;
const StyleTextField=styled(TextField)`
margin-bottom:20px;

`;
const StyledTypography=styled(Typography)`
margin-bottom:30px;

`;
const StyledButton=styled(Button)`
background-color:#27374D;
font-size:16px;
padding:10px;
border:0;
&:hover{
    background-color: black;
}
&:disabled{
    color:#27374D;
}
`;
const StyledSignUpLink=styled(Link)`
    text-decoration:none;
    margin:20px auto 0;
     color:#262A56;
    &:hover{
        color:#5C469C;
        cursor:pointer;
    }
    
`;

function SignIn(props){
    //signup=0,login=1
    const logIn=props.val;
    const auth=localStorage.getItem("user");
    const Navigate=useNavigate();

    const [user,setUser]=useState({
        username:"",
        empId:"",
        password:"",
        confirmPassword:""
    });
    const [passwordWarning,setPasswordWarning]=useState(false);
    const [disableSubmit,setDisableSubmit]=useState(false);
    
    function handleChange(event){
        const name=event.target.name;
        let value=event.target.value;
        if(name==="empId")value=value.toUpperCase();
        setUser((prevVal)=>{
            return({
                ...prevVal,
                [name]:value
            });
        });
    }

    async function handleSignUp(){

        const newUserData={
            empId:user.empId,
            empName:user.username,
            password:user.password
        };
        const response=await saveAuthCredentials(newUserData);
        if(response.status===201){
            Navigate("/viewEmployees");
            localStorage.setItem("user",JSON.stringify(response.data.message));
        }
        else{
            Swal.fire({
                title: 'There is already a user with this EmpId',
                text: 'Try logging In directly.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#27374D'
              });
        }
        
    }

    async function handleLogIn(){
        const response=await getAuthCredentials(user.empId);

        if(response.status===201&&response.data!==null){
            const dataFetched=response.data;
            if(dataFetched.password===user.password){
                Navigate("/viewEmployees");
                localStorage.setItem("user",JSON.stringify(dataFetched));
                
            }
            else{
                Swal.fire({
                    title: 'Wrong Password!',
                    text: 'Try Signing up, if you have not yet.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#27374D'
                  });
            }
        }
        else{
            Swal.fire({
                title: 'No such User Id exists.',
                text: 'Try Signing up, if you have not yet.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#27374D'
              });
        }
    }

    useEffect(()=>{
        if(logIn==="0"){
        if(user.password!==user.confirmPassword){
            setPasswordWarning(true);
        }
        else{
            setPasswordWarning(false);
        }}
    },[user.confirmPassword]);

    useEffect(()=>{
        if(logIn==="0"&&(user.username===""||user.confirmPassword===""||user.empId===""||user.password===""||user.password!==user.confirmPassword)){
            setDisableSubmit(true);
        }
        else if(logIn==="1"&&(user.empId===""||user.password==="")){
            setDisableSubmit(true);
        }
        else{
            setDisableSubmit(false);
        }
    },[user]);

    useEffect(()=>{
        if(auth){
            Navigate("/viewEmployees");
        }
    },[]);
    return (
    <>
    <StyledFormGroup>
    {/* <Alert severity="info">This is an information message!</Alert> */}
        <StyledTypography variant="h2">{logIn==="0"?<>Sign Up</>:<>Log In</>}</StyledTypography>
        <FormControl>
        <StyleTextField required  name="empId" label="User Id" variant="outlined" value={user.empId} onChange={handleChange} />
        </FormControl>

        {logIn==="0"?
            <FormControl>
                <StyleTextField required  name="username" label="User Name" variant="outlined" value={user.username} onChange={handleChange}/>
            </FormControl>:null
        }
    
        <FormControl>
        <StyleTextField type="password" required  name="password" label="Password" variant="outlined" value={user.password} onChange={handleChange} />
        </FormControl>

        {logIn==="0"?
            <FormControl>
                <StyleTextField helperText={passwordWarning?"Password need to match.":null} type="password" required id="filled-basic" name="confirmPassword" label="Confirm Password" variant="outlined"  value={user.confirmPassword} onChange={handleChange} />
                
            </FormControl>:null
        }

        <FormControl>
        {logIn==="0"?
        <>
        <StyledButton disabled={disableSubmit} onClick={handleSignUp} variant="contained">Sign Up</StyledButton>
        <StyledSignUpLink to="/login">Signed Up already?</StyledSignUpLink>
        </>
        :
        <>
        <StyledButton disabled={disableSubmit} onClick={handleLogIn} variant="contained">Log In</StyledButton>
        <StyledSignUpLink to="/signup">Have not Signed up?</StyledSignUpLink>
        </>}
        
        </FormControl>
    </StyledFormGroup>
    </>
    );
}

export default SignIn;