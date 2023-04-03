import { Button, Container, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const EditDonor = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [citizenship, setCitizenship] = useState("");


    const navigate = useNavigate();

    const donorId = useParams().donorId;

    const LoadDonor = () => {
        axiosInstance
            .get('/donors/' + donorId + '/')
            .then((res) => {

                setName(res.data.name);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setBirthday(res.data.birthday);
                setCitizenship(res.data.citizenship);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        LoadDonor();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance
            .put('donors/' + donorId + '/', {
                'name':name,
                'phone':phone,
                'email': email,
                'birthday': birthday,
                'citizenship': citizenship,
            })
            .then(() => {
                navigate('/donors/' + donorId + '/');
            })
            .catch((err) => {
                alert(err);
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
          Edit {name}
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
                    
                    <Button type="submit" variant="contained" sx={{ m: 1 }}>Edit Donor</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default EditDonor;