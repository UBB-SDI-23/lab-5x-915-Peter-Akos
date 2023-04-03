import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Typography} from '@mui/material';

const NumberOfDoctors = () => {
  
    const [data, setData] = useState([]);
    const columns = [
      {field:'id', headerName:'ID', width: 100, hide: true},
      { field: 'nr_doctors', headerName: 'Number of Doctors', width: 300 },
      { field: 'name', headerName: 'Name', width: 300,}

    ];
  
    const LoadReport = (() => {
      
    axiosInstance
        .get('clinics/nr-doctors-report')
        .then((res) => {

            for (let i = 0; i < res.data.length; i++)
        {
            res.data[i].id = i;
        }

          setData(res.data);
          console.log(res.data)
  
      })
        .catch((err) => {
  
          alert(err);
  
      });
  
    });
  
    useEffect(() => {
  
        LoadReport();
  
    }, []);
  
    return (
      <>
        <Container maxWidth="xl" sx={{ height: '100%'}}>
          
          <Typography variant="h3" align="center" sx={{ m: 5 }} >
            Number Of Doctors at Each Clinic
          </Typography>
  
          <DataGrid getRowId={(row) => row.id}
            sx={{ height: '700px' }}
            rows={data}
            columns={columns}
            initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
            
          />
  
          
        </Container>
  
      </>
    )
  };
    
    export default NumberOfDoctors;