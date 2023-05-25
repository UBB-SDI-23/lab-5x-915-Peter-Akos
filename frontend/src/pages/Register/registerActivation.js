import React, {useContext, useState, useEffect} from 'react'
import { Grid, TextField, Button, Container } from '@mui/material'
import authContext from '../../Context/context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const URL_BASE = "https://bloodclinic.mooo.com/api/register/";
// const URL_BASE = "http://localhost:8000/api/register/";

function ActivationPage() {
    let {user} = useContext(authContext);
    let [code, setCode] = useState("");
    let [message, setMessage] = useState(null);
    const navigate = useNavigate()
    
    let activationHandler = async () => {
        if (!/^[0-9]+$/.test(code)){
            toast.error("Invalid code");
            return;
        }

        let response = await fetch(URL_BASE + "confirm/" + code + "/", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        });
        await response.json();
        if (response.status === 200){
            setMessage("Activation Successfull!")
        } else {
            toast.error("Activation Failed!");
        }
    }

    useEffect(() => {
        if (user)
            navigate("/");
    }, [user, navigate])

    return (
        <Container>
            <form className="registerForm">
                <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 5 }}>
                    <TextField name="Code" variant="outlined" id="Code" value={code} label="Code" onChange={(e) => { setCode(e.target.value) }}>Code</TextField>
                </Grid>
                <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 5 }}>
                    <Button variant="contained" onClick={activationHandler}>Activate</Button>
                </Grid>
                {message ? <h2>Activation successfull!</h2> : <></>}
            </form>
            <ToastContainer/>
        </Container>
            
    )
}

export default ActivationPage