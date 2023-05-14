import { Typography, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useNavigate } from "react-router-dom";

const ClinicDetails = () => {

    const navigate = useNavigate();

    const clinicID = useParams().clinicId;
    const [details, setDetails] = useState({
        name: "",
        description: "",
        address: "",
        beds: "",
        nrRooms: "",
    });

    const LoadClinic = () => {
        axiosInstance
            .get('/clinics/' + clinicID)
            .then((res) => {
                console.log(res)
                setDetails(res.data);
            })
            .catch((err) => {
                navigate('/404')
            });

        return true;
    };

    useEffect(() => {
        LoadClinic();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container maxWidth="xl" sx={{ height: '100%'}}>

            <Box component="div" sx={{ display: 'block' }}>
                <Box component="div" sx={{ m: 2 }}>
                    <Typography variant="h4" align="center">
                    {details.name}
                    </Typography>
                </Box>

            </Box>

            <Box component="div" align="center" sx={{ m: 3 }}>
                    <Typography>
                    Description: {details.description}
                    </Typography>

                    <Typography>
                    Address: {details.address}
                    </Typography>

                    <Typography>
                    Number of Beds: {details.beds}
                    </Typography>

                    <Typography>
                    Number of Rooms: {details.nrRooms}
                    </Typography>

            </Box>


            <Box component="div" align="center">
                <Button sx={{ m: 1 }}
                    variant="contained"
                    onClick={() => {navigate('edit/')}}
                >
                Edit
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {navigate('delete/')}}
                    sx={{bgcolor: '#8b0000', ":hover": {bgcolor: '#9b0000'}}}
                >
                Delete
                </Button>
            </Box>
            
            </Container>
        </>
    )

  };
  
  export default ClinicDetails;