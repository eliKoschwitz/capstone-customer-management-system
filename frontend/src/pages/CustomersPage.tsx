import Logout from "../components/Logout";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Customer from "../types/customer";
import CustomerCard from "./CustomerCard";
import {AppBar, Toolbar, Typography} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import "../styles/customer-page.css"

export default function CustomersPage() {

    const [customerList, setCustomerList] = useState<Customer[]>([]);

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
                    <Toolbar >
                        <Typography variant={"h6"}>
                            <CallIcon/>
                            <Link to={"/"} style={{textDecoration:'none'}} className="link">
                                Customer
                            </Link>
                            <Link to={"/order"} style={{textDecoration:'none'}} className="link">
                                Order
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="customers">
                <Typography variant={"h4"}>
                    Customer
                </Typography>
                {customerList.map(customer => <CustomerCard customer={customer}/>)}

                <Link to={"/add-customer"} style={{textDecoration: 'none'}}>
                    <Button variant="contained" disableElevation>Add Customer</Button>
                </Link>
                <Logout/>
            </div>
        </div>
    );
}