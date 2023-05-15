import { Button, Container, Input, Typography, TextField,Autocomplete} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { ToastContainer, toast } from 'react-toastify';


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

    const validateFormData = () => {
        const errorMessages = [];

        if (donor.name == null || donor.name.length === 0)
        {
            errorMessages.push({"field": "donor", "detail": "Donor is required."});
        }

        if (doctor.name == null || doctor.name.length === 0)
        {
            errorMessages.push({"field": "doctor", "detail": "Doctor is required."});
        }

        if (quantity > 450)
        {
            errorMessages.push({"field": "quantity", "detail": "Maxiumum allowed quantity is 450."});
        }

        var oldDate = new Date(date);
        var todayDate = new Date();

        if ((todayDate - oldDate) / (1000 * 3600 * 24 * 365) > 5)
        {
            errorMessages.push({"field": "date", "detail": "The date is over 5 year"});
        }


        

        return errorMessages;
    }


    const handleSubmit = (event) => {
        event.preventDefault();    

        const errorMessages = validateFormData();

        if (errorMessages.length > 0)
        {
            toast.error(errorMessages[0].detail);
            return;
        }

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
        
        <ToastContainer />

        </Container>
        
    </>
    )
  }; 
  export default AddBloodBag;