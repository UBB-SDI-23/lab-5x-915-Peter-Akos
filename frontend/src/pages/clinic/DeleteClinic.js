import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { ToastContainer, toast } from 'react-toastify';

const DeleteClinicConfirmation = () => {

    const [name, setName] = useState("");
    const clinicId = useParams().clinicId;
    const navigate = useNavigate();

    const LoadClinicName = () => {
        axiosInstance
            .get('/clinics/' + clinicId)
            .then((res) => {
                setName(res.data.name);
            })
            .catch((err) => {
                navigate('/404')
            })
    };

    useEffect(() => {
        LoadClinicName();
    });

    const DeleteClinic = (event) => {
        event.stopPropagation();

        if (!localStorage.getItem('tokens'))
        {
            toast.error("Log in to edit the database");
            return;
        }
    
        axiosInstance
          .delete('clinics/' + clinicId)
          .then((res) => {
            
            navigate('/clinics/');
    
          })
          .catch((err) => {
            toast.error("You don't have access to this object")
          });
    
          
      };

    return (
      <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>
        
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Are you sure that you want to delete Clinic {name}?
        </Typography>

        <Box component="div" align="center">
                <Button
                    variant="contained"
                    onClick={DeleteClinic}
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

            <ToastContainer />
  
        </Container>
      </>
    )
  };
  
  export default DeleteClinicConfirmation;