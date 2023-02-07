import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Order from "../types/order";
import customer from "../types/customer";
import NavBar from "../components/NavBar";

export default function AddOrdersPage() {

    const [order, setOrder] = useState<Order>({
        customerId: "",
        website: "",
        startTime: "",
        endTime: "",
        description: "",
        fileIds: [],
        createdBy: ""
    });

    const [customerList, setCustomerList] = useState<customer[]>([]);

    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
            },
        },
    };

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

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setOrder({...order, customerId: event.target.value});
    };

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
            <NavBar/>
            <Box display={"flex"}  flexDirection={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
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
                    >Add Order</Button>
                </Box>

                <Box display={"flex"} component="form" alignItems={"center"}
                            justifyContent={"center"} onSubmit={saveOrder} width={400} margin={"auto"} paddingTop={5}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        multiline={true}
                        rows={12}
                    />
                </Box>
            </Box>
        </div>

    );
}