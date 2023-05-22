import React, { useContext, useState, useEffect} from 'react'
import { Grid, TextField, Button, Select, InputLabel, MenuItem, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import authContext from '../../Context/context';
import { ToastContainer, toast } from 'react-toastify';

const URL_BASE = "https://bloodclinic.mooo.com/api/register/";

function RegisterPage() {
    let {user} = useContext(authContext);
    let [username, setUsername] = useState("");
    let [message, setMessage] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [bio, setBio] = useState("");
    let [location, setLocation] = useState("");
    let [birthday, setBirthday] = useState("2000-01-01");
    let [gender, setGender] = useState("O");
    let [marital, setMarital] = useState("S");
    const navigate = useNavigate()

    function validateRegister() {
        if (!/^[a-zA-Z0-9 ]+$/.test(username)){
            toast.error("Username can only contain numbers and letters");
            return false;
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[.,$+\\]/.test(password)){
            toast.error("Password isn't strong enough! (special characters allowed: .,$+\\)");
            return false;
        }
        if (password.length < 8){
            toast.error("Password must be at least 8 characters");
            return false;
        }
        if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            toast.error("Invalid email!");
            return false;
        }
        if (!/^[a-zA-Z0-9 ]+$/.test(bio)){
            toast.error("Bio can only contain numbers and letters");
            return false;
        }
        if (!/^[a-zA-Z0-9 ]+$/.test(location)){
            toast.error("Location can only contain numbers and letters");
            return false;
        }
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthday)){
            toast.error("Birthday needs to have the following format: yyyy-mm-dd");
            return false;
        }
        if (gender !== 'O' && gender !== 'M' && gender !== 'F'){
            toast.error("Invalid gender");
            return false;
        }
        if (marital !== 'M' && marital !== 'S' && marital !== 'R'){
            toast.error("Invalid marital");
            return false;
        }
        return true;
    }
    
    let registerHandler = async () => {
        if (!validateRegister())
            return;

        let response = await fetch(URL_BASE, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'username':username, 
                'password':password,
                'email':email,
                'bio':bio,
                'location':location,
                'day':birthday,
                'gender':gender,
                'marital':marital
            })
        });
        const res = await response.json();
        if (response.status === 200){
            console.log(response);
            console.log(response.json());
            console.log(res);
            toast("Your code is: " + String(res.code))
            setMessage("Registration successful. Your code is: " + String(res.code))
            // navigate("/activation");
        } else {
            alert("registration Failed!");
        }
    }

    useEffect(() => {
        if (user)
            navigate("/");
    }, [user, navigate])

    return (
        <Container maxWidth="xl" sx={{ height: '100%' }}>
            <form className="registerForm">
            <Grid container id='inputHolder'>
                <TextField name="username" variant="outlined" id="username" value={username} label="Username" onChange={(e) => { setUsername(e.target.value) }} fullWidth margin='normal'>Username</TextField>
                <TextField type="password" name="password" variant="outlined" id="password" value={password} label="Password" onChange={(e) => { setPassword(e.target.value) }} fullWidth margin='normal'>Password</TextField>
                <TextField name="email" variant="outlined" id="email" value={email} label="Email" onChange={(e) => { setEmail(e.target.value) }} fullWidth margin='normal'>Email</TextField>
                <TextField name="bio" variant="outlined" id="bio" value={bio} label="Bio" onChange={(e) => { setBio(e.target.value) }} sx={{width:"100%", mt:3}}>Bio</TextField>
                <TextField name="location" variant="outlined" id="location" value={location} label="Location" onChange={(e) => { setLocation(e.target.value) }} sx={{width:"100%", mt:3}}>Location</TextField>
                <TextField name="birthday" variant="outlined" id="birthday" value={birthday} label="Birthday" onChange={(e) => { setBirthday(e.target.value) }} sx={{width:"100%", mt:3}}>Birthday</TextField>
                <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pt: 5}}>
                    <InputLabel id="genderLabel">Gender</InputLabel>
                    <Select
                        labelId="genderLabel"
                        id="gender"
                        value={gender}
                        label="Gender"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <MenuItem value={'M'}>Male</MenuItem>
                        <MenuItem value={'F'}>Female</MenuItem>
                        <MenuItem value={'O'}>Other</MenuItem>
                    </Select>
                </Grid>
                <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pt: 5}}>
                    <InputLabel id="maritalLabel">Marital Status</InputLabel>
                    <Select
                        labelId="maritalLabel"
                        id="marital"
                        value={marital}
                        label="Marital Status"
                        onChange={(e) => setMarital(e.target.value)}
                    >
                        <MenuItem value={'M'}>Married</MenuItem>
                        <MenuItem value={'R'}>Relationship</MenuItem>
                        <MenuItem value={'S'}>Single</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 5, mb:20 }}>
                <Button variant="contained" color='error' onClick={registerHandler} id='registerBtn'>Register</Button>
                <Button variant="contained" color='error' onClick={() => {
    navigate("/activation");
  }} id='activationBtn'>Activate</Button>
            </Grid>
        </form>
        <TextField variant="standard" name="message" id="message" value={message} aria-readonly margin='normal' InputProps={{disableUnderline: true }} fullWidth>Username</TextField>
        <ToastContainer />
        </Container>
        

    )
}

export default RegisterPage