import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AppBar, IconButton, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, Toolbar} from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Order from "../types/order";
import customer from "../types/customer";

export default function DetailedCustomer() {

    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
            },
        },
    };

    const [order, setOrder] = useState<Order>({
        id: "",
        customerId: "",
        website: "",
        startTime: "",
        endTime: "",
        description: "",
        fileIds: [],
        createdBy: ""
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [customerList, setCustomerList] = useState<customer[]>([]);

    const navigate = useNavigate();

    const objId = useParams<{ id: string }>();

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setOrder({...order, customerId: event.target.value});
    };

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

    // UPDATE A SINGLE CUSTOMER
    const editOrder = async (e: FormEvent<HTMLDivElement>) => {
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

    // DELETE A ORDER
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

    // GET ALL CUSTOMERS
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/customer");
                setCustomerList(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                console.log("setAxiosWasPerformed(true);");
            }
        })();
    }, []);

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
            <Box display="flex" flexDirection="column">
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Box display={"flex"} flexDirection={"column"} component="form" margin={"auto"} paddingTop={5}
                         alignItems={"center"} justifyContent={"center"} width={400} onSubmit={editOrder}>
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

                        <Select
                            fullWidth
                            value={order.customerId}
                            label="CustomerName"
                            onChange={handleChangeSelect}
                            input={<OutlinedInput label="CustomerName" color={"info"}/>}
                            MenuProps={MenuProps}
                        >
                            {customerList.map(customer => (
                                <MenuItem value={customer.firstName +" "+ customer.lastName}>{customer.firstName + " " + customer.lastName}</MenuItem>
                            ))}
                        </Select>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >Edit Customer</Button>
                    </Box>

                    <Box margin={"auto"} paddingTop={15}>
                        <TextField
                            fullWidth
                            multiline={true}
                            rows={12}
                            margin="normal"
                            label="Description"
                            name="description"
                            onChange={handleChange}
                            value={order.description}
                        />
                        <Link to={"/order-imgs/" + order.id} style={{textDecoration: 'none'}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >Show IMGs</Button>
                        </Link>
                    </Box>

                </Box>
            </Box>
        </div>
    );

}