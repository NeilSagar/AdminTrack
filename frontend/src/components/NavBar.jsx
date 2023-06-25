import {Button,styled} from '@mui/material';
import Face2Icon from '@mui/icons-material/Face2';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';



const StyledFaceIcon=styled(Face2Icon)`
margin-right:10px;
position:relative:
top:15px;
`;
const StyledTabs=styled(Button)`
margin-left:10px;
color:#fff;
font-weight:600;
padding:20px;
${'' /* text-transform:none; */}
`;

function NavBar(){
    const Navigate=useNavigate();
    const [auth,setAuth]=useState(null);

    function alert(){
        Swal.fire({
            title: 'Are you sure to Sign Out?',
            text: "You will be directed to Log In page.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#27374D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Sign Out!'
          }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed Out'
                  })
            }
          })
    }
    function handleLogout(){
        localStorage.clear();
        Navigate("/login");
    }
    useEffect(()=>{
        setAuth(localStorage.getItem("user"));
    },);
    return(
        <div className="navbar">
            <div className='brand'>
                <h2><StyledFaceIcon/>Employee Manager</h2>
            </div>
            {auth?
            <div className='nav-links'>
            <StyledTabs variant='text' component={Link} to="/viewemployees"> Employees</StyledTabs>
            <StyledTabs variant='text' component={Link} to="/addemployee">Add Employees</StyledTabs>
            <StyledTabs className='logOut' variant="text" startIcon={<LogoutIcon />} onClick={alert}>Log Out</StyledTabs>
            </div>
            :null}
        </div>
    );
}

export default NavBar;