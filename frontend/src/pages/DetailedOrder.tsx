import React, {useEffect, useState} from "react";
import "../styles/customer-card.css";
import Order from "../types/order";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function DetailedOrder () {

    const [order, setOrder] = useState<Order>({
        id:"",
        customerId:"",
        website:"",
        startTime:"",
        endTime:"",
        description:"",
        createdBy: ""
    });

    const objId = useParams<{id : string}>();
    console.log("DetailedOrder - DB-ID",objId.id);


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/order/"+objId.id);
                setOrder(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [objId.id]);

    return (
        <div>
            {order.description}
            {order.id}
        </div>
    );
}