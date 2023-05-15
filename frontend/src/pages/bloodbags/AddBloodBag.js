import { Button, Container, Input, Typography, TextField,Autocomplete} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';


const AddBloodBag = () => {

    const [donor, setDonor] = useState("");
    const [doctor, setDoctor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");

    const [donorOptions, setDonorOptions] = useState([{name:""}]);
    const [doctorOptions, setDoctorOptions] = useState([{name:""}]);

    function handleInputChangeDonor(_, value, reason) {
        if (reason === "input") {
			axiosInstance
            .get('donors/autocomplete?query=' + value)
            .then((res) => {
                setDonorOptions(res.data);
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
                setDoctorOptions(res.data);
                console.log(res.data)
        
            })
            .catch((err) => {
                console.log(err);
            });
        
      }
	}
        

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();    

        axiosInstance
            .post('bloodbags/', {
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

        setDoctor("");
        setDonor("");
        setQuantity("");
        setDate("");
    };

    return (
        <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>

        <Typography variant="h3" align="center" sx={{ m: 2 }}>
          Add BloodBag
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
                <p>Donor</p>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={donorOptions}
                sx={{ width: 300 }}
                onInputChange={handleInputChangeDonor}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={(_, value) => {
                    if (value) {
                        setDonor({id:value['id'], name:value['name']});
                    }
                }}
                getOptionLabel={(option) => option.name}
                />

                <p>Doctor</p>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={doctorOptions}
                sx={{ width: 300 }}
                onInputChange={handleInputChangeDoctor}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={(_, value) => {
                    if (value) {
                        setDoctor({id:value['id'], name:value['name']});
                    }
                }}
                getOptionLabel={(option) => option.name}
                />

                <p>Quantity</p>
                <Input type="text" name="email" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth />

                <p>Date</p>
                <Input type="date" name="birthday" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />

                <Container align="center">
                    
                    <Button style={{backgroundColor: '#d60000'}} type="submit" variant="contained" sx={{ m: 1 }}>Create Doctor</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default AddBloodBag;