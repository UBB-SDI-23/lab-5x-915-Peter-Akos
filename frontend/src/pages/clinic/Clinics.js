import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Typography, Button, MenuItem, InputLabel, FormControl, Select, Input} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import {Pagination} from '@mui/material';
import './clinics.css'


const Clinics = () => {

    const navigate = useNavigate();
  
    const [data, setData] = useState([]);

    const [pageNumber, setPageNumber] = useState(1);

    const [pageSize, setPageSize] = useState(25);

    const [minBeds, setMinBeds] = useState(0);

    function handlePageSizeChange(event) {
      const value = parseInt(event.target.value, 10);
      setPageSize(value);
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
      const InitializeCount = (() => {

        axiosInstance
            .get('clinics/count')
            .then((res) => {
    
              setCount(res.data['count']);
              console.log(res.data['count'])
      
          })
            .catch((err) => {
      
              alert(err);
      
          });
      
        });
  
        InitializeCount();

    }, [minBeds]);


    const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 200,
      renderCell: (params) => (
        <Link to={`${params.id}/`} className='details-link'>{params.value}</Link>
        )
        },
      { field: 'createdBy', headerName: 'Created By', width: 100,
      renderCell: (params) => (
        <Link to={`../user/${params.value.id}/`} className='details-link'>{params.value.username}</Link>
        )
        },
      { field: 'description', headerName: 'Description', width: 300 },
      { field: 'address', headerName: 'Address', width: 300 },
      { field: 'beds', headerName: 'Number of beds', width: 150 },
      { field: 'nrRooms', headerName: 'Number of rooms', width: 150 },
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
    
  
    useEffect(() => {
      const LoadDonors = (() => {

        axiosInstance
            .get('clinics/?page_number=' + String(pageNumber - 1) + '&page_size=' + String(pageSize)+ '&min_beds=' + String(minBeds))
            .then((res) => {
              setData(res.data);
              console.log(res.data)
      
          })
            .catch((err) => {
      
              alert(err);
      
          });
      
        });
  
      LoadDonors();
  
    }, [pageNumber, pageSize, minBeds]);

    const handlePageChange = (_, value) => {
      console.log(String(value))
      setPageNumber(value);
    };
  
    return (
      <>
        <Container maxWidth="xl" sx={{ height: '100%'}}>
          
          <Typography variant="h3" align="center" sx={{ m: 5 }} >
            Clinics
          </Typography>

          <Button style={{
            borderRadius: 35,
            backgroundColor: '#fa5757',
            padding: "18px 36px",
            fontSize: "18px"
            }} variant="contained" size="large" className="donors-add-button">
          <Link to="/clinics/add/" className='add-link'>+ Add Clinic</Link>
            </Button>

            <FormControl>
            <InputLabel id="page-size-label">Page Size</InputLabel>
            <Select
              labelId="page-size-label"
              id="page-size-dropdown"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>

            <text>Minimum beds:   </text>
            <Input type="text" name="description" value={minBeds} onChange={(e) => setMinBeds(e.target.value)} />
      
          
          <DataGrid sx={{ height: '700px' }}
            rows={data}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'desc' }],
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            hideFooter={true}
          />
        <Pagination
        count={parseInt(count / pageSize , 10 ) + 1}
        page={pageNumber}
        onChange={handlePageChange}
        siblingCount={5} boundaryCount={3}
      />  
  
          
        </Container>
  
      </>
    )
  };
    
    export default Clinics;