import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {IconButton, Stack, Typography} from "@mui/material";
import "../styles/customer-page.css";
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import {ThemeConfig} from "../config/Theme";
import Order from "../types/order";
import OrderCard from "./OrderCard";
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SearchBar from "../components/SearchBar";
import NavBarOrdersAndCustomersPage from "../components/NavBarOrdersAndCustomersPage";
import Box from "@mui/material/Box";

export default function OrdersPage() {

    const [orderList, setOrderList] = useState<Order[]>([]);
    const [customerList, setCustomerList] = useState<Order[]>([]);
    const [inputForFilter, setInputForFilter] = useState<string>("");
    let orderListFiltered: Order[];


    const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputForFilter(value);
        console.log("OrdersPage change event", value);
    }


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

    if (inputForFilter !== "") {
        const query = inputForFilter;
        const re = RegExp(`.*${query.toLowerCase().split("").join(".*")}.*`);
        orderListFiltered = orderList.filter(order => order.customerId.toLowerCase().match(re));
    } else {
        orderListFiltered = orderList.map(order => order);
    }

    const navigate = useNavigate();


    // @ts-ignore
    return (
        <div>
            <NavBarOrdersAndCustomersPage/>
            <SearchBar getInput={getInput}/>
            <Stack className="customers" display={"flex"} flexDirection={"column"} justifyContent={"center"}
                   alignItems={"center"}>
                <Stack maxWidth={"md"} display={"flex"} justifyContent={"center"}>
                    <Typography>
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} color={"gray"}
                        fontSize={1} marginLeft={0.5}>

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
                                <p className={"customer-card-details"}>Customer</p>
                            </div>
                            <div className={"email"}>
                                <AccessTimeFilledIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>Open Time</p>
                            </div>
                        </Box>
                    </Typography>
                </Stack>
                {
                    orderListFiltered.map(order => <OrderCard key={order.id} order={order}/>)
                }
                {(customerList.length > 0) &&(
                    <div className={"add-customer"}>
                        <IconButton size={"large"} color={"inherit"} aria-label={"logo"}
                                    onClick={() => navigate("/add-order")}>
                            <AddIcon/>
                        </IconButton>
                    </div>)
                }

                <ThemeConfig>
                    <></>
                </ThemeConfig>
            </Stack>
        </div>

    )
}