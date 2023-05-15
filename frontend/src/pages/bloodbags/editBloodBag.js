import { Button, Container, Input, Typography, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const EditBloodBag = () => {

    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [donor, setDonor] = useState({name:""});
    const [doctor, setDoctor] = useState({name:""});

    const [donorOptions, setdonorOptions] = useState(['']);
    const [doctorOptions, setdoctorOptions] = useState(['']);

    function handleInputChangeDonor(_, value, reason) {
        if (reason === "input") {
			axiosInstance
            .get('donors/autocomplete?query=' + value)
            .then((res) => {
                setdonorOptions(res.data);
                console.log(res.data)
        
            })
            .catch((err) => {
                console.log(err);
            });
        
      }
	}

    function handleInputChangeDoctor(_, value, reason) {
        if (reason === "input") {
			axiosInstance
            .get('doctors/autocomplete?query=' + value)
            .then((res) => {
                setdoctorOptions(res.data);
                console.log(res.data)
        
            })
            .catch((err) => {
                console.log(err);
            });
        
      }
	}


    const navigate = useNavigate();

    const bloodbagId = useParams().bloodbagId;

    const LoadBloodBag = () => {
        axiosInstance
            .get('/bloodbags/' + bloodbagId)
            .then((res) => {
                console.log(res.data)
                setQuantity(res.data.quantity);
                setDate(res.data.date);
                const initialDonorName = res.data.source.donor.name
                const initialDoctorName = res.data.source.doctor.name

                handleInputChangeDoctor(NaN, initialDoctorName, "input"); 
                handleInputChangeDonor(NaN, initialDonorName, "input"); 

                setDonor({id: res.data.source.donor.id, name:res.data.source.donor.name})
                setDoctor({id: res.data.source.doctor.id, name:res.data.source.doctor.name})
                
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        LoadBloodBag();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance
            .put('bloodbags/' + bloodbagId, {
                'source':{'donor':{'id':'', 'name':donor.id}, 'doctor':{'id':'', 'name':doctor.id}},
                'donor_id':donor.id,
                'doctor_id':doctor.id,
                'quantity':quantity,
                'date':date,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/bloodbags/");
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleReset = (event) => {
        event.preventDefault();

        setDate("");
        setQuantity("");
        setDonor({name:""});
        setDoctor({name:""});
    };

    return (
        <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>
        
        <Typography variant="h3" align="center" sx={{ m: 2 }}>
          Edit Bloodbag
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
                <p>Donor</p>
                <Autocomplete
                id="combo-box-demo"
                options={donorOptions}
                sx={{ width: 300 }}
                onInputChange={handleInputChangeDonor}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="" />}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )
                }}
                onChange={(_, value) => {
                    if (value) {
                        setDonor({id:value['id'], name:value['name']});
                    }
                }}
                value={donor}
                />

                <p>Doctor</p>
                <Autocomplete
                id="combo-box-demo"
                options={doctorOptions}
                sx={{ width: 300 }}
                onInputChange={handleInputChangeDoctor}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="" />}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )
                }}
                onChange={(_, value) => {
                    if (value) {
                        setDoctor({id:value['id'], name:value['name']});
                    }
                }}
                value={doctor}
                />

                <p>Quantity</p>
                <Input type="text" name="salary" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth />

                <p>Date</p>
                <Input type="text" name="salary" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />


                <Container align="center">
                    
                    <Button type="submit" variant="contained" sx={{ m: 1 }}>Edit BloodBag</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default EditBloodBag;