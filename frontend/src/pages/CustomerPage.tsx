import Logout from "../components/Logout";
import {useEffect } from "react";
import getMe from "../hooks/getMe";

export default function CustomerPage () {

    useEffect(() => {
        (async () => {
            const user = await getMe();
            if (user.role === "BASIC") {
                console.log("You are logged in as a basic user!");
            }
        })();
    }, []);




    return (
        <div className="HomePage">
            <h1>Customer</h1>

            <Logout/>
        </div>
    );
}