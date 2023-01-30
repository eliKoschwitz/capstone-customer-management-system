import Logout from "../components/Logout";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import getMe from "../hooks/getMe";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Customer from "../types/customer";

export default function AddCustomersPage () {
    const [customer, setCustomer] = useState<Customer>({
        firstName: "",
        lastName: "",
        telefonNr: "",
        email: "",
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
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const saveCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrors([]);
            try {
                await axios.post("/api/customer", customer);
                navigate("/" );
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [customer, navigate]
    );

    return (
        <div className="add-customers">
            <h1>Add - Customers</h1>
            <form onSubmit={saveCustomer}>
                <div>
                    <input
                        placeholder={"FirstName"}
                        value={customer.firstName}
                        name={"firstName"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"LastName"}
                        value={customer.lastName}
                        name={"lastName"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"TelefonNr"}
                        value={customer.telefonNr}
                        name={"telefonNr"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"E-Mail"}
                        value={customer.email}
                        name={"email"}
                        onChange={handleChange}
                    />
                </div>
                <button>Save Customer</button>
            </form>
            <Logout/>
        </div>
    );
}