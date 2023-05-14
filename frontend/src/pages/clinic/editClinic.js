import { Button, Container, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const EditClinic = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [beds, setBeds] = useState("");
    const [nrRooms, setNrRooms] = useState({name:""});

    const navigate = useNavigate();

    const clinicId = useParams().clinicId;

    const LoadClinic = () => {
        axiosInstance
            .get('/clinics/' + clinicId)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name);
                setDescription(res.data.description);
                setAddress(res.data.address);
                setBeds(res.data.beds);
                setNrRooms(res.data.nrRooms)
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        LoadClinic();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance
            .put('clinics/' + clinicId, {
                'name':name,
                'description':description,
                'address': address,
                'beds': beds,
                'nrRooms': nrRooms,
            })
            .then(() => {
                navigate('/clinics/' + clinicId );
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleReset = (event) => {
        event.preventDefault();

        setName("");
        setDescription("");
        setAddress("");
        setBeds({name:""});
        setNrRooms("");
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

                <p>Description</p>
                <Input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth required />

                <p>Address</p>
                <Input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth required/>

                <p>Number of Beds</p>
                <Input type="text" name="beds" value={beds} onChange={(e) => setBeds(e.target.value)} fullWidth required/>

                <p>Number of Rooms</p>
                <Input type="text" name="nrRooms" value={nrRooms} onChange={(e) => setNrRooms(e.target.value)} fullWidth required/>


                <Container align="center">
                    
                    <Button type="submit" variant="contained" sx={{ m: 1 }}>Edit Clinic</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default EditClinic;