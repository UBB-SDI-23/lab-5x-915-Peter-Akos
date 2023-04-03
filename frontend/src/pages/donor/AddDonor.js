import { Button, Container, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';


const AddTrip = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [citizenship, setCitizenship] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance
            .post('donors/', {
                'name':name,
                'phone':phone,
                'email': email,
                'birthday': birthday,
                'citizenship': citizenship,
            })
            .then(() => {

                navigate("/donors/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleReset = (event) => {
        event.preventDefault();

        setName("");
        setPhone("");
        setEmail("");
        setBirthday("2023-04-03");
        setCitizenship("");
    };

    return (
        <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>

        <Typography variant="h3" align="center" sx={{ m: 2 }}>
          Add Trip
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
                <p>Name*</p>
                <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />

                <p>Phone number</p>
                <Input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />

                <p>Email Address</p>
                <Input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />

                <p>Birth Date</p>
                <Input type="date" name="birthday" value={birthday ? birthday : ""} onChange={(e) => setBirthday(e.target.value)} fullWidth />

                <p>Citizenship</p>
                <Input type="text" name="email" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} fullWidth />

                <Container align="center">
                    
                    <Button style={{backgroundColor: '#d60000'}} type="submit" variant="contained" sx={{ m: 1 }}>Create Donor</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default AddTrip;