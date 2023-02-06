import Logout from "../components/Logout";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AppBar, Container, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import "../styles/customer-page.css";
import GroupIcon from '@mui/icons-material/Group';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import AddIcon from '@mui/icons-material/Add';
import {ThemeConfig} from "../config/Theme";
import Order from "../types/order";
import OrderCard from "./OrderCard";
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function OrdersPage() {

    const [orderList, setOrderList] = useState<Order[]>([]);
    const [inputForFilter, setInputForFilter] = useState<string>("");
    let orderListFiltered: Order[];

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

    const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputForFilter(value);
    }

    if (inputForFilter !== "") {
        const query = inputForFilter;
        const re = RegExp(`.*${query.toLowerCase().split("").join(".*")}.*`);
        orderListFiltered = orderList.filter(order => order.customerId.toLowerCase().match(re));
    } else {
        orderListFiltered = orderList.map(order => order);
    }

    const navigate = useNavigate();


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
                            <Button color={"inherit"} onClick={() => navigate("/")}>Customer</Button>
                            <Button color={"inherit"} onClick={() => navigate("/order")}>Order</Button>
                            <Logout/>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </div>

            <div className="spacing-top">

            </div>

            <Container maxWidth={"md"}>
                <Typography>
                    <div className={"position-for-search"}>
                        <SearchIcon sx={{
                            marginRight: 0.5,
                            marginLeft: 0.5
                        }}/>
                        <div className="searchbar">
                            <input id="search" onChange={getInput}/>
                        </div>
                    </div>
                </Typography>
            </Container>

            <div className="spacing-under">
            </div>

            <div className="customers">
                <Container maxWidth={"md"}>
                    <Typography>
                        <div className={"header"}>
                            <div className={"first-last-name"}>
                                <WorkIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>Order Name</p>
                            </div>
                            <div className={"telefon-nr"}>
                                <GroupIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>From Customer</p>
                            </div>
                            <div className={"email"}>
                                <AccessTimeFilledIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>Open Time</p>
                            </div>
                        </div>
                    </Typography>
                </Container>
                {
                    orderListFiltered.map(order => <OrderCard order={order}/>)
                }
                <div className={"add-customer"}>
                    <IconButton size={"large"} color={"inherit"} aria-label={"logo"}
                                onClick={() => navigate("/add-order")}>
                        <AddIcon/>
                    </IconButton>
                </div>

                <ThemeConfig>
                    <></>
                </ThemeConfig>
            </div>
        </div>

    )
}