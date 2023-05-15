import { Typography, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useNavigate } from "react-router-dom";

const BloodBagDetails = () => {

    const navigate = useNavigate();

    const bloodbagID = useParams().bloodbagId;
    const [details, setDetails] = useState({
        source:{
            donor:{
                name:""
            },
            doctor:{
                name:""
            }
        },
        quantity: "",
        date: "",
    });

    const LoadBloodBag = () => {
        axiosInstance
            .get('/bloodbags/' + bloodbagID)
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
        LoadBloodBag();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container maxWidth="xl" sx={{ height: '100%'}}>

            <Box component="div" sx={{ display: 'block' }}>
                <Box component="div" sx={{ m: 2 }}>
                    <Typography variant="h4" align="center">
                    Bloodbag
                    </Typography>
                </Box>

            </Box>

            <Box component="div" align="center" sx={{ m: 3 }}>
                    <Typography>
                    Donor Name: {details.source.donor.name}
                    </Typography>

                    <Typography>
                    Doctor Name: {details.source.doctor.name}
                    </Typography>

                    <Typography>
                    Quantity: {details.quantity}
                    </Typography>

                    <Typography>
                    Date: {details.date}
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
  
  export default BloodBagDetails;