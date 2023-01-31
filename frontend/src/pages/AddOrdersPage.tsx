import React, {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {AppBar, IconButton, Stack, Toolbar} from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import Order from "../types/order";

export default function AddOrdersPage() {

    const [order, setOrder] = useState<Order>({
        customerId:"",
        website:"",
        startTime:"",
        endTime:"",
        description:"",
        createdBy: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setOrder({...order, [name]: value});
        },
        [order, setOrder]
    );

    const saveOrder = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrors([]);
            try {
                await axios.post("/api/order", order);
                navigate("/order");
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [order, navigate]
    );

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
                            <Button color={"inherit"} onClick={() => navigate("/order")}>Back</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
                <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                     justifyContent={"center"} onSubmit={saveOrder} width={400} margin={"auto"} paddingTop={5}>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <AddIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Add Order
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Website"
                        name="website"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Start Point"
                        name="startTime"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="End Point"
                        name="endTime"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Customer"
                        name="customerId"
                        onChange={handleChange}
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >Add Order</Button>
                </Box>
            </div>
        </div>

    );
}