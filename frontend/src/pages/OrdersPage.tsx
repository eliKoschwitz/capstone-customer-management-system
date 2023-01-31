import Logout from "../components/Logout";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AppBar, Container, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import "../styles/customer-page.css";
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import AddIcon from '@mui/icons-material/Add';
import {ThemeConfig} from "../config/Theme";
import Order from "../types/order";
import OrderCard from "./OrderCard";

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

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <AppBar position="relative" >
                    <Toolbar>
                        <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}>
                            <DomainVerificationIcon/>
                        </IconButton>
                        <Typography variant={"h6"} sx={{flexGrow: 1}}>
                            ORGANIZE
                        </Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Button color={"inherit"} onClick={() => navigate("/")}>Customer</Button>
                            <Button color={"inherit"} onClick={() => navigate("/order")}>Order</Button>
                            <Logout/>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
                <p></p>
            </div>
            <div className="customers">
                <Container maxWidth={"md"}>
                    <Typography>
                        <div className={"header"}>
                            <div className={"first-last-name"}>
                                <GroupIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>Order Name</p>
                            </div>
                            <div className={"telefon-nr"}>
                                <CallIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>TelefonNr</p>
                            </div>
                            <div className={"email"}>
                                <EmailIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>E-Mail</p>
                            </div>
                        </div>
                    </Typography>
                </Container>
                {
                    orderList.map(order => <OrderCard order={order}/>)
                }
                <div className={"add-customer"}>
                    <IconButton size={"large"} color={"inherit"} aria-label={"logo"} onClick={() => navigate("/add-order")}>
                        <AddIcon/>
                    </IconButton>
                </div>



                <ThemeConfig>
                    <button></button>
                </ThemeConfig>
            </div>
        </div>

    )
}