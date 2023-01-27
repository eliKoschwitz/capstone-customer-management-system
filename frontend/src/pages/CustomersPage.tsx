import Logout from "../components/Logout";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Customer from "../types/customer";
import CustomerCard from "./CustomerCard";

export default function CustomersPage () {

    const [customerList, setCustomerList] = useState<Customer[]>([]);

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

    return (
        <div className="customers">
            <h1>Customers</h1>
                {customerList.map(customer => <CustomerCard customer={customer}/>) }
                <Link to={"/add-customer"}> Add Customer </Link>
            <Logout/>
        </div>
    );
}