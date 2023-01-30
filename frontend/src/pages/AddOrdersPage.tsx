import Logout from "../components/Logout";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import getMe from "../hooks/getMe";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Order from "../types/order";

export default function AddOrdersPage () {
    const [order, setOrder] = useState<Order>({
        customerId:"",
        website:"",
        startTime:"",
        endTime:"",
        description:"",
        createdBy: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const user = await getMe();
            if (user.role === "BASIC") {
                console.log("You are logged in as a basic user!");
            }
        })();
    }, []);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setOrder({...order, [name]: value});
        },
        [order, setOrder]
    );

    const saveCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrors([]);
            try {
                await axios.post("/api/order", order);
                navigate("/order" );
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [order, navigate]
    );

    return (
        <div className="add-customers">
            <h1>Add - Orders</h1>

            <form onSubmit={saveCustomer}>
                <div>
                    <input
                        placeholder={"Website"}
                        value={order.website}
                        name={"website"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Description"}
                        value={order.description}
                        name={"description"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"StartTime"}
                        value={order.startTime}
                        name={"startTime"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"EndTime"}
                        value={order.endTime}
                        name={"endTime"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Customer"}
                        value={order.customerId}
                        name={"customerId"}
                        onChange={handleChange}
                    />
                </div>
                <button>Save Order</button>
            </form>

            <Logout/>

        </div>
    );
}