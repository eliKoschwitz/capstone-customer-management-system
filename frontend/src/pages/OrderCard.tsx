import React from "react";
import {Card, CardContent, Container} from "@mui/material";
import "../styles/customer-page.css";
import {Link} from "react-router-dom";
import Order from "../types/order";

export default function CustomerCard({order}: { order: Order }) {

    const today = new Date().getTime();
    const orderEndTime = new Date(order.endTime).getTime();
    const difference = orderEndTime - today;
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    return (
        <div>
            <Container maxWidth={"md"}>
                <Link to={"/detailed-order/"+order.id} style={{textDecoration: 'none'}}>
                    <Card sx={{
                        ":hover": {
                            boxShadow:"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        },
                        "&.MuiCard-root":{ height: 50, maxWidth:750},
                        "&.MuiPaper-root":{ marginBottom:0.75},
                    }}
                    >
                        <CardContent>
                            <div className={"card"}>
                                <div className={"card-first-last-name"}>
                                    {order.website}
                                </div>
                                <div className={"card-telefon-nr"}>
                                    {order.customerId}
                                </div>
                                <div className={"card-email"}>
                                    {TotalDays} Days left
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </Container>
        </div>
    );
}