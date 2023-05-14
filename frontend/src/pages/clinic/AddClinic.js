import { Button, Container, Input, Typography} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';


const AddClinic = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [beds, setBeds] = useState("");
    const [nrRooms, setNrRooms] = useState("");        

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance
            .post('clinics/', {
                'name':name,
                'description':description,
                'address': address,
                'beds': beds,
                'nrRooms':nrRooms,
            })
            .then(() => {

                navigate("/clinics/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    

    const handleReset = (event) => {
        event.preventDefault();

        setName("");
        setDescription("");
        setAddress("");
        setBeds("");
        setNrRooms("");
    };

    return (
        <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>

        <Typography variant="h3" align="center" sx={{ m: 2 }}>
          Add Clinic
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
                <p>Name</p>
                <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />

                <p>Description</p>
                <Input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />

                <p>Address</p>
                <Input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />

                <p>Number of Beds</p>
                <Input type="text" name="beds" value={beds} onChange={(e) => setBeds(e.target.value)} fullWidth />

                <p>Number of Rooms</p>
                <Input type="text" name="nrRooms" value={nrRooms} onChange={(e) => setNrRooms(e.target.value)} fullWidth />

                <Container align="center">
                    
                    <Button style={{backgroundColor: '#d60000'}} type="submit" variant="contained" sx={{ m: 1 }}>Create Clinic</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default AddClinic;