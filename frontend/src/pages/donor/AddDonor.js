import { Button, Container, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { ToastContainer, toast } from 'react-toastify';


const AddDonor = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [citizenship, setCitizenship] = useState("");

    const navigate = useNavigate();

    const validateFormData = () => {
        const errorMessages = [];

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
          }

        if (name == null || name.length === 0)
        {
            errorMessages.push({"field": "name", "detail": "Name is required."});
        }

        if (name.length > 60)
        {
            errorMessages.push({"field": "name", "detail": "Maxiumum allowed length is 60 characters."});
        }

        if (!isValidEmail(email))
        {
            errorMessages.push({"field": "email", "detail": "Email format is incorrect."});
        }
        

        return errorMessages;
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const errorMessages = validateFormData();

        if (errorMessages.length > 0)
        {
            toast.error(errorMessages[0].detail);
            return;
        }
        
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
                toast.error(err.response.data.detail);
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
          Add Donor
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
                <p>Name*</p>
                <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />

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

        <ToastContainer />

        </Container>
        
    </>
    )
  }; 
  export default AddDonor;