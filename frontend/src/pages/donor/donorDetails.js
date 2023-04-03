import { Typography, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useNavigate } from "react-router-dom";

const DonorDetails = () => {

    const navigate = useNavigate();

    const donorID = useParams().donorId;
    const [details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
        birthday: "",
        citizenship: "",
    });

    const LoadDonor = () => {
        axiosInstance
            .get('/donors/' + donorID + '/')
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => {
                navigate('/404')
            });

        return true;
    };

    useEffect(() => {
        LoadDonor();
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
                    Phone: {details.phone}
                    </Typography>

                    <Typography>
                    Email Address: {details.email}
                    </Typography>

                    <Typography>
                    Birth Date: {details.birthday}
                    </Typography>

                    <Typography>
                    Citizenship: {details.citizenship}
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
  
  export default DonorDetails;