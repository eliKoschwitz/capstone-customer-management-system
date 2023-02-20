import React, {FormEvent, useCallback, useEffect, useState} from "react";
import getMe from "../hooks/getMe";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import Customer from "../types/customer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/NavBar";
import {ThemeConfig} from "../config/Theme";
import {ToastContainer} from "react-toastify";
import ToastError from "../components/ToastError";

export default function AddCustomersPage() {
    const [customer, setCustomer] = useState<Customer>({
        firstName: "",
        lastName: "",
        telefonNr: "",
        email: "",
        createdBy: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const user = await getMe();
            if (user.role === "BASIC") {
                console.log("You are logged in as a basic user!");
            }
        })();
    }, []);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const saveCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                await axios.post("/api/customer", customer);
                navigate("/");
            } catch (e: any | AxiosError) {
                ToastError(e);
            }
        },
        [customer, navigate]
    );

    return (
        <div className="add-customers">
            <NavBar/>
            <div>
                <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                     justifyContent={"center"} onSubmit={saveCustomer} width={400} margin={"auto"} paddingTop={5}>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <AddIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Add Customer
                    </Typography>
                    <ThemeConfig>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="FirstName"
                            name="firstName"
                            onChange={handleChange}
                        />
                    </ThemeConfig>
                    <ThemeConfig>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="LastName"
                            name="lastName"
                            onChange={handleChange}
                        />
                    </ThemeConfig>
                    <ThemeConfig>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="TelefonNr"
                            name="telefonNr"
                            onChange={handleChange}
                        />
                    </ThemeConfig>

                    <ThemeConfig>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="E-Mail"
                            name="email"
                            onChange={handleChange}
                        />
                    </ThemeConfig>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >Add Customer</Button>
                </Box>
            </div>
            <ToastContainer closeButton={false} position={"bottom-left"} autoClose={2000}/>
        </div>
    );
}