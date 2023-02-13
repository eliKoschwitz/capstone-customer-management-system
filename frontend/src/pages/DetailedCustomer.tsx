import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Customer from "../types/customer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import {ThemeConfig} from "../config/Theme";
import NavBarForDetailCustomer from "../components/NavBarForDetailCustomer";

export default function DetailedCustomer() {

    const [customer, setCustomer] = useState<Customer>({
        id:"",
        firstName: "",
        lastName: "",
        telefonNr: "",
        email: "",
        createdBy: ""
    });

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
        try {
            await axios.post("/api/customer/", customer);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    // DELETE A CUSTOMER
    const deleteCustomer = async () => {
        try {
            await axios.delete("/api/customer/" + objId.id);
            navigate("/");
        } catch (e) {
                console.log("Invalid user data", e);
        }
    }

    return (
        <div className="add-customers">
            <NavBarForDetailCustomer deleteCustomerOrOrder={deleteCustomer}/>

            <div>
                <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                     justifyContent={"center"} onSubmit={editCustomer} width={400} margin={"auto"} paddingTop={5}>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <EditIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Edit Customer
                    </Typography>
                <ThemeConfig>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="FirstName"
                        name="firstName"
                        onChange={handleChange}
                        value={customer.firstName}
                    />
                </ThemeConfig>

                <ThemeConfig>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="LastName"
                        name="lastName"
                        onChange={handleChange}
                        value={customer.lastName}
                    />
                </ThemeConfig>

                <ThemeConfig>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="TelefonNr"
                        name="telefonNr"
                        onChange={handleChange}
                        value={customer.telefonNr}
                    />
                </ThemeConfig>

                <ThemeConfig>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="E-Mail"
                        name="email"
                        onChange={handleChange}
                        value={customer.email}
                    />
                </ThemeConfig>

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