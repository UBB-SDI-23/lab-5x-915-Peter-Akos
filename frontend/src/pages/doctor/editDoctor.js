import { Button, Container, Input, Typography, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const EditDoctor = () => {

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [university_gpa, setUniversityGPA] = useState("");
    const [clinic, setClinic] = useState({name:""});

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

    const doctorId = useParams().doctorId;

    const LoadDoctor = () => {
        axiosInstance
            .get('/doctors/' + doctorId)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name);
                setTitle(res.data.title);
                setSalary(res.data.salary);
                // setClinic({id: res.data.hospital.id, name:res.data.hospital.name})
                const initialHospitalName = res.data.hospital.name
                setUniversityGPA(res.data.university_gpa);
                handleInputChange(NaN, initialHospitalName, "input"); 
                setClinic({id: res.data.hospital.id, name:res.data.hospital.name})
                
                
                
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        LoadDoctor();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance
            .put('doctors/' + doctorId, {
                'name':name,
                'title':title,
                'salary': salary,
                'hospital': clinic.id,
                'university_gpa': university_gpa,
            })
            .then(() => {
                navigate('/doctors/' + doctorId );
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleReset = (event) => {
        event.preventDefault();

        setName("");
        setTitle("");
        setSalary("");
        setClinic({name:""});
        setUniversityGPA("");
    };

    return (
        <>
        <Container maxWidth="xl" sx={{ height: '100%' }}>
        
        <Typography variant="h3" align="center" sx={{ m: 2 }}>
          Edit {name}
        </Typography>
  
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Container maxWidth="md" >
            <p>Name*</p>
                <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />

                <p>Title</p>
                <Input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />

                <p>Salary</p>
                <Input type="text" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth />

                <p>Clinic</p>
                <Autocomplete
                id="combo-box-demo"
                options={clinicOptions}
                sx={{ width: 300 }}
                onInputChange={handleInputChange}
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
                        setClinic({id:value['id'], name:value['name']});
                    }
                }}
                value={clinic}
                />


                <p>University GPA</p>
                <Input type="text" name="universityGPA" value={university_gpa} onChange={(e) => setUniversityGPA(e.target.value)} fullWidth />


                <Container align="center">
                    
                    <Button type="submit" variant="contained" sx={{ m: 1 }}>Edit Doctor</Button>
                    <Button type="reset" variant="outlined" sx={{ m: 1 }}>Clear</Button>

                </Container>
            </Container>
        </form>

        </Container>
        
    </>
    )
  }; 
  export default EditDoctor;