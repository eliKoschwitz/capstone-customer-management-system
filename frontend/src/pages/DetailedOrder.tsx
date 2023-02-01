import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AppBar, IconButton, Stack, Toolbar} from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Order from "../types/order";

export default function DetailedCustomer() {

    const [order, setOrder] = useState<Order>({
        id:"",
        customerId:"",
        website:"",
        startTime:"",
        endTime:"",
        description:"",
        createdBy: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const objId = useParams<{ id: string }>();

    // SAFE THE VALUES FROM THE FORMS
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setOrder({...order, [name]: value});
        },
        [order, setOrder]
    );

    //GET A SINGLE CUSTOMER
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/order/" + objId.id);
                setOrder(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [objId.id]);

    console.log(objId);
    console.log(order);

    // UPDATE A SINGLE CUSTOMER
    const editOrder = async (e:FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setErrors([]);
        try {
            //await axios.put("/api/customer/"+ customer.id, customer);
            await axios.post("/api/order/", order);
            navigate("/order");
        } catch (e) {
            setErrors((errors) =>
                [...errors, "Invalid user data"]
            );
        }
    }

    // DELETE A CUSTOMER
    const deleteOrder = async () => {
        setErrors([]);
        try {
            await axios.delete("/api/order/" + objId.id);
            navigate("/order");
        } catch (e) {
            setErrors((errors) =>
                [...errors, "Invalid user data"]
            );
        }
    }

    return (
        <div>
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
                            <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}
                                        onClick={deleteOrder}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
                <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                     justifyContent={"center"} onSubmit={editOrder} width={400} margin={"auto"} paddingTop={5}>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <EditIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Edit Order
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Website"
                        name="website"
                        onChange={handleChange}
                        value={order.website}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Start Point"
                        name="startTime"
                        onChange={handleChange}
                        value={order.startTime}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="End Point"
                        name="endTime"
                        onChange={handleChange}
                        value={order.endTime}
                    />

                    <TextField
                        fullWidth
                        multiline={true}
                        rows={4}
                        margin="normal"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        value={order.description}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Customer"
                        name="customerId"
                        onChange={handleChange}
                        value={order.customerId}
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