import { Button, Container, Input, Typography, TextField,Autocomplete} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';


const AddDoctor = () => {

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [university_gpa, setUniversityGPA] = useState("");
    const [clinic, setClinic] = useState("");

    const [clinicOptions, setclinicOptions] = useState(['']);

    function handleInputChange(_, value, reason) {
        if (reason === "input") {
			axiosInstance
            .get('clinics/autocomplete?query=' + value)
            .then((res) => {
                setclinicOptions(res.data);
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

        if (!localStorage.getItem('tokens'))
        {
            toast.error("Log in to edit the database");
            return;
        }
        
        axiosInstance
            .post('doctors/', {
                'name':name,
                'title':title,
                'salary': parseInt(salary),
                'university_gpa': parseInt(university_gpa),
                'hospital':clinic,
                'createdBy':{
                    'username': localStorage.getItem('tokens') ? jwt_decode(JSON.parse(localStorage.getItem('tokens')).access)['user_id'] : null
                }
            })
            .then(() => {

                navigate("/doctors/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    

    const handleReset = (event) => {
        event.preventDefault();

        setName("");
        setTitle("");
        setSalary("");
        setUniversityGPA("");
    };

    return (
        <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>

        <Typography variant="h3" align="center" sx={{ m: 2 }}>
          Add Doctor
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
                <p>Name</p>
                <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />

                <p>Title</p>
                <Input type="text" name="phone" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />

                <p>Salary</p>
                <Input type="text" name="email" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth />

                <p>Clinic</p>

                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={clinicOptions}
                sx={{ width: 300 }}
                onInputChange={handleInputChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={(_, value) => {
                    if (value) {
                        setClinic(value['id']);
                    }
                }}
                getOptionLabel={(option) => option.name}
                />

                <p>University GPA</p>
                <Input type="text" name="birthday" value={university_gpa} onChange={(e) => setUniversityGPA(e.target.value)} fullWidth />

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
  export default AddDoctor;