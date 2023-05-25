import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Typography, Button, MenuItem, InputLabel, FormControl, Select} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import {Pagination} from '@mui/material';
import './bloodbags.css'


const BloodBags = () => {

    const navigate = useNavigate();
  
    const [data, setData] = useState([]);

    const [pageNumber, setPageNumber] = useState(1);

    const [pageSize, setPageSize] = useState(25);

    function handlePageSizeChange(event) {
      const value = parseInt(event.target.value, 10);
      setPageSize(value);
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
      const InitializeCount = (() => {

        axiosInstance
            .get('bloodbags/count')
            .then((res) => {
    
              setCount(res.data['count']);
              console.log(res.data['count'])
      
          })
            .catch((err) => {
      
              alert(err);
      
          });
      
        });
  
        InitializeCount();

    }, []);


    const columns = [
      { field: 'id', headerName: 'ID', width: 100},
      { field: 'source', headerName: 'Source', width: 200},
      { field: 'toDisplay', headerName: 'Donor and Doctor', width: 400,
      renderCell: (params) => (
        <Link to={`${params.id}/`} className='details-link'>{params.value}</Link>
        ) },
        { field: 'createdBy', headerName: 'Created By', width: 100,
        renderCell: (params) => (
          <Link to={`../user/${params.value.id}/`} className='details-link'>{params.value.username}</Link>
          )
          },
      { field: 'donorName', headerName: 'Donor Name', width: 200},
      { field: 'doctorName', headerName: 'Doctor Name', width: 200},
      { field: 'quantity', headerName: 'Quantity', width: 300 },
      { field: 'date', headerName: 'Date', width: 300 },
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
            .get('bloodbags/?page_number=' + String(pageNumber - 1) + '&page_size=' + String(pageSize))
            .then((res) => {
              console.log(res.data)
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].donorName = res.data[i].source.donor.name
                res.data[i].doctorName = res.data[i].source.doctor.name
                res.data[i].source = res.data[i].source.id
                res.data[i].toDisplay = "Donor: " + res.data[i].donorName + " Doctor: " + res.data[i].doctorName
              }
              setData(res.data);
              console.log(res.data)
      
          })
            .catch((err) => {
      
              alert(err);
      
          });
      
        });
  
      LoadDonors();
  
    }, [pageNumber, pageSize]);

    const handlePageChange = (_, value) => {
      console.log(String(value))
      setPageNumber(value);
    };
  
    return (
      <>
        <Container maxWidth="xl" sx={{ height: '100%'}}>
          
          <Typography variant="h3" align="center" sx={{ m: 5 }} >
            BloodBags
          </Typography>

          <Button style={{
            borderRadius: 35,
            backgroundColor: '#fa5757',
            padding: "18px 36px",
            fontSize: "18px"
            }} variant="contained" size="large" className="donors-add-button">
          <Link to="/bloodbags/add/" className='add-link'>+ Add BloodBag</Link>
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
      
          
          <DataGrid sx={{ height: '700px' }}
            rows={data}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'desc' }],
              },
              columns: {
                columnVisibilityModel: {
                  source: false,
                  donorName:false,
                  id:false,
                  doctorName:false,

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
    
    export default BloodBags;