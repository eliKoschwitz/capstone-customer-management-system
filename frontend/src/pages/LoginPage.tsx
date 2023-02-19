import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LoginIcon from '@mui/icons-material/Login';
import {toast, ToastContainer} from "react-toastify";
import "../styles/customer-page.css";

export default function LoginPage() {
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

    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );
    const navigate = useNavigate();

    const location = useLocation();

    const login = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                await axios.post("/api/app-users/login", null, {
                    headers: {
                        "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
                });
                navigate(redirect);
            } catch (e) {
                toast.error("Invalid username or password", {
                    className: "toast-message"
                });
            }
        },
        [credentials, navigate, redirect]
    );

    return (
        <div className="LoginPage">
            <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                 justifyContent={"center"} onSubmit={login} width={400} margin={"auto"} paddingTop={5}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LoginIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Login
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
                >Login</Button>

                <Link to={"/signup" + location.search} >Don't have an account? Sign Up</Link>
            </Box>
            <ToastContainer closeButton={false} position={"bottom-left"} autoClose={2000}/>
        </div>
    );
}