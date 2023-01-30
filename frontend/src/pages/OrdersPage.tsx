import Logout from "../components/Logout";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AppBar, Toolbar, Typography} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import "../styles/customer-page.css"
import OrderCard from "./OrderCard";
import Order from "../types/order";

export default function OrdersPage() {

    const [orderList, setOrderList] = useState<Order[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/order");
                setOrderList(response.data);
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
                        <Typography variant={"h6"}>
                            <CallIcon/>
                            <Link to={"/"} style={{textDecoration: 'none'}} className="link">
                                Customer
                            </Link>
                            <Link to={"/order"} style={{textDecoration: 'none'}} className="link">
                                Order
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="customers">
                <Typography variant={"h4"}>
                    Order
                </Typography>
                {orderList.map(order => <OrderCard order={order}/>)}

                <Link to={"/add-order"} style={{textDecoration: 'none'}}>
                    <Button variant="contained" disableElevation>Add Order</Button>
                </Link>
                <Logout/>
            </div>
        </div>
    );
}