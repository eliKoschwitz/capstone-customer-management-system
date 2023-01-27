import {Route, Routes, useSearchParams} from "react-router-dom";
import NoAuth from "./components/NoAuth";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Auth from "./components/Auth";
import HomePage from "./pages/HomePage";
import React, {useMemo} from "react";
import CustomerPage from "./pages/CustomerPage";

export default function Root () {
    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );

    return (
        <>
            <Routes>
                <Route path="/signup" element={
                    <NoAuth redirect={redirect}>
                        <SignUpPage/>
                    </NoAuth>
                }/>
                <Route path="/login" element={
                    <NoAuth redirect={redirect}>
                        <LoginPage/>
                    </NoAuth>
                }/>
                <Route path="/" element={
                    <Auth>
                        <HomePage/>
                    </Auth>
                }/>
                <Route path="/customer" element={
                    <Auth>
                        <CustomerPage/>
                    </Auth>
                }/>
            </Routes>
        </>
    )
}