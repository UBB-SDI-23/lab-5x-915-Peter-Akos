import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Typography, Button} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import './donors.css'

const Donors = () => {

    const navigate = useNavigate();
  
    const [data, setData] = useState([]);
    const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 300,
      renderCell: (params) => (
        <Link to={`${params.id}/`} className='details-link'>{params.value}</Link>
        )
        },
      { field: 'phone', headerName: 'Phone Number', width: 150 },
      { field: 'email', headerName: 'Email Address', width: 300 },
      { field: 'birthday', headerName: 'Birth Date', width: 150 },
      { field: 'citizenship', headerName: 'Citizenship', width: 150 },
      { field: 'doctors', headerName: 'Doctors', width: 100 },
      { field: 'actions', headerName: '', sortable: false, width: 200, renderCell: (params) => {
        return (
          <>
            <Button sx={{ m: 1 }}
              variant="contained"
              onClick={() => {navigate(params.id + '/edit/')}}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => {navigate(params.id + '/delete/')}}
              sx={{bgcolor: '#8b0000', ":hover": {bgcolor: '#9b0000'}}}
            >
              Delete
            </Button>
          </>
        );
      }}
    ];
  
    const LoadDonors = (() => {
      
    axiosInstance
        .get('donors/')
        .then((res) => {

          setData(res.data);
          console.log(res.data)
  
      })
        .catch((err) => {
  
          alert(err);
  
      });
  
    });
  
    useEffect(() => {
  
      LoadDonors();
  
    }, []);
  
    return (
      <>
        <Container maxWidth="xl" sx={{ height: '100%'}}>
          
          <Typography variant="h3" align="center" sx={{ m: 5 }} >
            Donors
          </Typography>

          <Button style={{
            borderRadius: 35,
            backgroundColor: '#fa5757',
            padding: "18px 36px",
            fontSize: "18px"
            }} variant="contained" size="large" className="donors-add-button">
          <Link to="/donors/add/" className='add-link'>+ Add Donor</Link>
            </Button>
  
          <DataGrid sx={{ height: '700px' }}
            rows={data}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'asc' }],
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                  doctors:false,
                },
              },
            }}
          />
  
          
        </Container>
  
      </>
    )
  };
    
    export default Donors;