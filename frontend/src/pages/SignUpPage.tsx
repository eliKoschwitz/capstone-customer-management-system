import React, {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUpPage () {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

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
            setErrors([]);
            try {
                await axios.post("/api/app-users", credentials);
                navigate("/login" + location.search);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [credentials, navigate, location]
    );

    return (
        <div className="SignUpPage">
            {errors.length > 0 && (
                <div>
                    {errors.map((error) => <p key={error}>{error}</p>)}
                </div>
            )}
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
        </div>
    );
}