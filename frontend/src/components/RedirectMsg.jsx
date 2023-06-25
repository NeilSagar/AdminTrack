import { Card ,Typography,styled} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const StyledCard=styled(Card)`
padding:30px;
width:60%;

&>h3{
    margin:10px;
    font-size:54px;
    color:#16213E;
    position:relative;
    left:50px;
}
&>h4{
    margin:20px;
    color:#526D82;
    position:relative;
    left:60px;
}
`;

const StyledIcon=styled(WarningRoundedIcon)`
color:#F2CD5C;
font-size:72px;
position:relative;
top:10px;
margin-right:10px;
`;

function RedirectMsg(props){
    return(
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <StyledCard>
                    <Typography variant='h3'><StyledIcon/>{props.heading}</Typography>
                    <Typography variant='h4'>{props.msg}</Typography>
                </StyledCard>
            </Backdrop>
        </>
    );
}

export default RedirectMsg;