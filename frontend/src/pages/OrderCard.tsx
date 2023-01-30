import React from "react";
import {Card, CardContent, Container, Typography} from "@mui/material";
import "../styles/customer-card.css";
import {Link} from "react-router-dom";
import Order from "../types/order";

export default function OrderCard ({order}:{order:Order}) {
    console.log("OrderCard - Here DB-ID ",order.id);

    return (
        <div className="customer-card">
            <Container maxWidth={"md"}>
                <Link to={"/detailed-order/"+order.id} style={{ textDecoration: 'none' }}>
                    <Card >
                        <CardContent >
                            <Typography gutterBottom variant={"h6"}>
                                <div>
                                    {order.customerId}
                                    {order.id}
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