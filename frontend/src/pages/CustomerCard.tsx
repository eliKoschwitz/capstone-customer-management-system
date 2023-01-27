import React from "react";
import Customer from "../types/customer";

export default function CustomerCard ({customer}:{customer:Customer}) {


    return (
        <div className="customers">
            <div>
                {customer.firstName}
                {customer.lastName}
            </div>
            <div>
                {customer.telefonNr}
            </div>
            <div>
                {customer.email}
            </div>
        </div>
    );
}