import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Select, MenuItem, Pagination, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';


const Users = () => {

  const [data, setData] = useState({});

  const [pageNumber, setPageNumber] = useState(1);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 300 },
    { field: 'role', headerName: 'Role', width: 300,
      renderCell: (params) => (
        <Select
            labelId="roleLabel"
            id="roleId"
            value={params.value}
            label="Role"
            sx={{width:"90%"}}
            onChange={handleDropDownChange}
        >
            <MenuItem value={'Regular'}>Regular</MenuItem>
            <MenuItem value={'Moderator'}>Moderator</MenuItem>
            <MenuItem value={'Admin'}>Admin</MenuItem>
        </Select>
      )
    },
  ];

  function handleDropDownChange(_, value) {
    console.log(value.props.value)
    console.log(value)
    console.log(value._owner.key)
    console.log(data)

    for (let i = 0; i < 20; i++) {
        if (data[i].id === value._owner.key)
        {
            data[i].role = value.props.value;
        }
    } 

    console.log(value.props.value)
    
    axiosInstance
    .put(`/users/${value._owner.key}/`, {
      "role": value.props.value
    })
    .catch(error => {
      toast.error(error)
    });
  }
  

  const handlePageChange = ((_, value) => {
    setPageNumber(value);
  })
// eslint-disable-next-line
  const LoadUsers = (() => {
    
    axiosInstance
      .get('users/?page_number=' + String(pageNumber - 1) + '&page_size=' + String(20))
      .then((res) => {
        setData(res.data);
        
    })
      .catch((err) => {

        toast.error(err.response.data.detail);

    });
  });

  useEffect((LoadUsers) => {

    LoadUsers();
// eslint-disable-next-line
  }, [pageNumber, LoadUsers]);


  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100%'}}>
        
        <Typography variant="h3" align="center" sx={{ m: 2 }} >
          Admin Page
        </Typography>

            <DataGrid sx={{ height: '600px' }}
              rows={data}
              columns={columns}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'id', sort: 'asc' }],
                },
              }}
              hideFooter
              components={{
                NoRowsOverlay: () => (
                  <></>
                ),
              }}
            />


        <Pagination
          count={502}
          page={pageNumber}
          onChange={handlePageChange}
          size='small'
          color='primary'
          variant='outlined'
          className='pagination'
          siblingCount={1}
          boundaryCount={1}
        />

        <ToastContainer/>
      </Container>

    </>
  )
};
  
  export default Users;