import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
        doctors:{},
    });

    const [rows, setRows] = useState([]);

    const LoadDonor = () => {
        axiosInstance
            .get('/donors/' + donorID)
            .then((res) => {
                console.log(res.data)
                res.data.doctors = res.data.doctors.map((item, index) => ({ id: index, name: item.name }));
                console.log(res.data)
                setDetails(res.data);
                setRows(res.data.doctors)

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

    const columns = [
        { field: 'id', headerName: 'Number', width: 100 },
        { field: 'name', headerName: 'Name', width: 300}
      ];

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
            <DataGrid sx={{ height: '400px' , width: '50%', marginLeft:'25%'}}
            rows={rows}
            columns={columns}
            hideFooter={true}
          />


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