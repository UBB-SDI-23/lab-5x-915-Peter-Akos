import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, TextField, InputLabel, Select, MenuItem, Container, Button } from '@mui/material';
import authContext from '../../Context/context';
import "./userPage.css"
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';


// const URL_BASE = "https://bloodclinic.mooo.com/api/userdetails/";
const URL_BASE = "http://localhost:8000/api/userdetails/";

function CurrentUserPage(props) {
    const { user} = useContext(authContext);
    const [ bio, setBio ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ birthday, setBirthday ] = useState("");
    const [ gender, setGender ] = useState("O");
    const [ marital, setMarital ] = useState("S");
    const [ numberOfClinics, setNumberOfClinics ] = useState(0);
    const [ numberOfDoctors, setNumberOfDoctors ] = useState(0);
    const [ numberOfDonors, setNumberOfDonors ] = useState(0);
    const [ numberOfBloodBags, setNumberOfBloodBags ] = useState(0);
    const [ userName, setUserName ] = useState("");
    const [ paginationValue, setPaginationValue ] = useState(localStorage.getItem('paginationValue') ? JSON.parse(localStorage.getItem('paginationValue')) : 25);
    let navigate = useNavigate();

    const fillText = useCallback((userLook) => {
        if (userLook !== null && userLook !== undefined){
            console.log("itt")
            setBio(userLook.bio);
            setLocation(userLook.location);
            setBirthday(userLook.birthday);
            setGender(userLook.gender);
            setMarital(userLook.marital);
            setNumberOfClinics(userLook.numberOfClinics);
            setNumberOfDoctors(userLook.numberOfDoctors);
            setNumberOfDonors(userLook.numberOfDonors);
            setNumberOfBloodBags(userLook.numberOfBloodBags);
            setUserName(userLook.userName);
        }
        console.log(userLook)
    }, [])

    let adminHandler = () => {
        console.log(jwt_decode(localStorage.getItem('access_token')).role)
        if(jwt_decode(localStorage.getItem('access_token')).role == "Admin")
        {
            navigate("admin/");
        }
        else{
            toast.error("You have to be admin to access this page")
        }
    }

    useEffect(() => {
        if (user === null)
            navigate("/");
        else {
            fetch(URL_BASE + user.user_id + "/")
                .then(uesrDetail => uesrDetail.json())
                .then(uesrDetail => fillText(uesrDetail));
        }
    }, [navigate, fillText, user])

    const paginationHandler = (value) => {
        setPaginationValue(value);
        localStorage.setItem('paginationValue', String(value));
    }
    
    return (
        

        
        <Container maxWidth="md" >
                <TextField variant="outlined" id="bio" value={userName} label="Username" sx={{width:"100%"}} margin='normal'>Username</TextField> 
                <TextField variant="outlined" id="bio" value={bio} label="Bio" sx={{width:"100%", mt:2}}margin='normal' >Bio</TextField>
                <TextField variant="outlined" id="location" value={location} label="Location" margin='normal'>Location</TextField>
                <TextField variant="outlined" id="birthday" value={birthday} label="Birthday" margin='normal'>Birthday</TextField>
                <TextField variant="outlined" id="numberOfClinics" value={numberOfClinics} label="NumberOfClinics"  aria-readonly margin='normal'>NumberOfClinics</TextField>
                <TextField variant="outlined" id="numberOfDoctors" value={numberOfDoctors} label="NumberOfDoctors"  aria-readonly margin='normal'>numberOfDoctors</TextField>
                <TextField variant="outlined" id="numberOfDonors" value={numberOfDonors} label="NumberOfDonors"  aria-readonly margin='normal'>NumberOfDonors</TextField>
                <TextField variant="outlined" id="numberOfBloodBags" value={numberOfBloodBags} label="NumberOfBloodBags"  aria-readonly margin='normal'>NumberOfBloodBags</TextField>
                <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pt: 5}} id='genderHolder'>
                    <InputLabel id="genderLabel">Gender</InputLabel>
                    <Select
                        labelId="genderLabel"
                        id="gender"
                        value={gender}
                        label="Gender"
                        sx={{width:"30%"}}
                    >
                        <MenuItem value={'M'}>Male</MenuItem>
                        <MenuItem value={'F'}>Female</MenuItem>
                        <MenuItem value={'O'}>Other</MenuItem>
                    </Select>
                </Grid>
                <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pt: 5}} id='maritalHolder'>
                    <InputLabel id="maritalLabel">Marital Status</InputLabel>
                    <Select
                        labelId="maritalLabel"
                        id="marital"
                        value={marital}
                        label="Marital Status"
                        sx={{width:"30%"}}
                    >
                        <MenuItem value={'M'}>Married</MenuItem>
                        <MenuItem value={'R'}>Relationship</MenuItem>
                        <MenuItem value={'S'}>Single</MenuItem>
                    </Select>
                </Grid>
                <Grid id='paginationHolder'>
                {
                    (user) ?  
                        <Select
                            value={paginationValue}
                            label="12"
                            onChange={(e) => paginationHandler(e.target.value)}
                            sx={{ml:"auto", order:2, mt:3}}
                        >
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select> : <></>
                        
                    
                }
                </Grid>

                <Button variant="contained" color='error' onClick={adminHandler} id='logoutBtn' >Admin Page</Button>
                <ToastContainer/>
            </Container>
    )
}

export default CurrentUserPage