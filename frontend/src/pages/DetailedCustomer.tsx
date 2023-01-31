import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Customer from "../types/customer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AppBar, IconButton, Stack, Toolbar} from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DetailedCustomer() {

    const [customer, setCustomer] = useState<Customer>({
        id:"",
        firstName: "",
        lastName: "",
        telefonNr: "",
        email: "",
        createdBy: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const objId = useParams<{ id: string }>();

    // SAFE THE VALUES FROM THE FORMS
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    //GET A SINGLE CUSTOMER
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/customer/" + objId.id);
                setCustomer(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [objId.id]);

    console.log(objId);
    console.log(customer);

    // UPDATE A SINGLE CUSTOMER
    const editCustomer = async (e:FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setErrors([]);
        try {
            //await axios.put("/api/customer/"+ customer.id, customer);
            await axios.post("/api/customer/", customer);
            navigate("/");
        } catch (e) {
            setErrors((errors) =>
                [...errors, "Invalid user data"]
            );
        }
    }

    // DELETE A CUSTOMER
    const deleteCustomer = async () => {
        setErrors([]);
        try {
            await axios.delete("/api/customer/" + objId.id);
            navigate("/");
        } catch (e) {
            setErrors((errors) =>
                [...errors, "Invalid user data"]
            );
        }
    }

    return (
        <div className="add-customers">
            <div>
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}>
                            <DomainVerificationIcon/>
                        </IconButton>
                        <Typography variant={"h6"} sx={{flexGrow: 1}}>
                            ORGANIZE
                        </Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Button color={"inherit"} onClick={() => navigate("/")}>Back</Button>
                            <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}
                                        onClick={deleteCustomer}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
                <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                     justifyContent={"center"} onSubmit={editCustomer} width={400} margin={"auto"} paddingTop={5}>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <EditIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Edit Customer
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="FirstName"
                        name="firstName"
                        onChange={handleChange}
                        value={customer.firstName}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="LastName"
                        name="lastName"
                        onChange={handleChange}
                        value={customer.lastName}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="TelefonNr"
                        name="telefonNr"
                        onChange={handleChange}
                        value={customer.telefonNr}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="E-Mail"
                        name="email"
                        onChange={handleChange}
                        value={customer.email}
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >Edit Customer</Button>
                </Box>
            </div>
        </div>
    );
}