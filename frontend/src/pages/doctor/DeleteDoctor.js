import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const DeleteDoctorConfirmation = () => {

    const [name, setName] = useState("");
    const doctorId = useParams().doctorId;
    const navigate = useNavigate();

    const LoadDoctorName = () => {
        axiosInstance
            .get('/doctors/' + doctorId)
            .then((res) => {
                setName(res.data.name);
            })
            .catch((err) => {
                navigate('/404')
            })
    };

    useEffect(() => {
        LoadDoctorName();
    });

    const DeleteDoctor = (event) => {
        event.stopPropagation();
    
        axiosInstance
          .delete('doctors/' + doctorId)
          .then((res) => {
            
            navigate('/doctors/');
    
          })
          .catch((err) => {
            alert(err);
          });
    
          
      };

    return (
      <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>
        
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Are you sure that you want to delete Doctor {name}?
        </Typography>

        <Box component="div" align="center">
                <Button
                    variant="contained"
                    onClick={DeleteDoctor}
                    sx={{bgcolor: '#8b0000', ":hover": {bgcolor: '#9b0000'}}}
                >
                Yes
                </Button>
                <Button sx={{ m: 1 }}
                    variant="contained"
                    onClick={() => {navigate(-1)}}
                >
                No
                </Button>
            </Box>
  
        </Container>
      </>
    )
  };
  
  export default DeleteDoctorConfirmation;