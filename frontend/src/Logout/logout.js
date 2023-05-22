import React, {useContext, useEffect} from 'react'
import { Container, Grid, Button } from '@mui/material'
import authContext from '../Context/context';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    let {user,logout} = useContext(authContext);
    const navigate = useNavigate()
    
    let logoutHandler = () => {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        if (!user)
            navigate("/");
    }, [user, navigate])

    return (
        <Container sx={{display:"flex", justifyContent:"space-evenly", alignContent:"center"}}>
            <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 5 }}>
                <Button variant="contained" color='error' onClick={logoutHandler} id='logoutBtn' >Logout</Button>
            </Grid>
        </Container>
    )
}

export default LogoutPage