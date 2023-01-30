import React from "react";
import {Card, CardContent, Container, Typography} from "@mui/material";
import "../styles/customer-card.css";
import {Link} from "react-router-dom";
import Order from "../types/order";

export default function OrderCard ({order}:{order:Order}) {
    console.log("OrderCard - Order ID",order.orderId);

    return (
        <div className="customer-card">
            <Container maxWidth={"md"}>
                <Link to={"/detailed-order/"+order.orderId} style={{ textDecoration: 'none' }}>
                    <Card >
                        <CardContent >
                            <Typography gutterBottom variant={"h6"}>
                                <div>
                                    {order.customerId}
                                    {order.orderId}
                                </div>
                                <div>
                                    {order.website}
                                </div>

                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Container>
        </div>
    );
}