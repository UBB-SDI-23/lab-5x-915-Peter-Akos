import { Typography, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

const DoctorDetails = () => {

    const navigate = useNavigate();

    const doctorID = useParams().doctorId;
    const [details, setDetails] = useState({
        name: "",
        title: "",
        salary: "",
        hospital: "",
        university_gpa: "",
        donors:{},
    });

    const [rows, setRows] = useState([]);

    const LoadDoctor = () => {
        axiosInstance
            .get('/doctors/' + doctorID)
            .then((res) => {
                console.log(res)
                res.data.donors = res.data.donors.map((item, index) => ({ id: index, name: item.name }));
                console.log(res)
                setDetails(res.data);
                setRows(res.data.donors)
            })
            .catch((err) => {
                navigate('/404')
            });

        return true;
    };

    useEffect(() => {
        LoadDoctor();
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
                    Title: {details.title}
                    </Typography>

                    <Typography>
                    Salary: {details.salary}
                    </Typography>

                    <Typography>
                    Clinic: {details.hospital.name}
                    </Typography>

                    <Typography>
                    University GPA: {details.university_gpa}
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

            <DataGrid sx={{ height: '400px' , width: '50%', marginLeft:'25%'}}
            rows={rows}
            columns={columns}
            hideFooter={true}
          />
            
            </Container>
        </>
    )

  };
  
  export default DoctorDetails;