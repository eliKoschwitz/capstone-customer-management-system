import React, {FormEvent, useCallback, useState} from "react";
import axios, {AxiosError} from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";
import "../styles/customer-page.css"

export default function SignUpPage () {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });


    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const navigate = useNavigate();

    const location = useLocation();

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                await axios.post("/api/app-users", credentials);
                navigate("/login" + location.search);
            } catch (e: any | AxiosError) {
                console.log("Validation error",e.response.data)
                toast.error(JSON.stringify(e.response.data, null, 2).replaceAll(":",  " ")
                    .replaceAll("{"  ,"").replaceAll("}"  ,"")
                    .replaceAll(","," ").replaceAll('"'," "), {
                    className: "toast-message"
                });
            }
        },
        [credentials, navigate, location.search]
    );

    return (
        <div className="SignUpPage">
            <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                 justifyContent={"center"} onSubmit={signUp} width={400} margin={"auto"} paddingTop={5}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    < LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type={"password"}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >Sign Up</Button>
            </Box>

            <ToastContainer closeButton={false} position={"bottom-left"} autoClose={2000}/>

        </div>
    );
}