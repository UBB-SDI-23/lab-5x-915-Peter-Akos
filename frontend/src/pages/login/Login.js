import React, {useContext, useState, useEffect} from 'react'
import { TextField, Button, Container } from '@mui/material'
import authContext from '../../Context/context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function LoginPage() {
    let {user,login} = useContext(authContext);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate()

    
    let loginHandler = () => {
        if (!/^[a-zA-Z0-9 ]+$/.test(username)){
            console.log("Username can only contain numbers and letters");
            toast.error("Username can only contain numbers and letters");
            return;
        }

        login(username, password);
        if (localStorage.getItem('tokens')){
            navigate("/");
            window.location.reload(true)
        }
        else
        {
            toast.error("Incorrect login credentials");
        }
    }

    useEffect(() => {
        if (user)
            navigate("/");
    }, [user, navigate])

    return (
        <Container maxWidth="xl" sx={{ height: '100%' }}>
        <form className="registerForm">
        <TextField name="username" variant="outlined" id="username" value={username} label="Username" onChange={(e) => { setUsername(e.target.value) }}  margin='normal' fullWidth>Username</TextField>
        <TextField type="password" name="password" variant="outlined" id="password" value={password} label="Password" onChange={(e) => { setPassword(e.target.value) }}  margin='normal' fullWidth>Password</TextField>

        <Button variant="contained" color='error' onClick={loginHandler} id='loginButton' margin='normal'>Log In</Button>

    </form>
        <ToastContainer/>
        </Container>
        
        
    )
}

export default LoginPage