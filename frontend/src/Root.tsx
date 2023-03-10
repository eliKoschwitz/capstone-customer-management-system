import {Route, Routes, useSearchParams} from "react-router-dom";
import NoAuth from "./components/NoAuth";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Auth from "./components/Auth";
import CustomersPage from "./pages/CustomersPage";
import AddCustomersPage from "./pages/AddCustomersPage";
import React, {useMemo} from "react";
import OrdersPage from "./pages/OrdersPage";
import AddOrdersPage from "./pages/AddOrdersPage";
import DetailedOrder from "./pages/DetailedOrder";
import DetailedCustomer from "./pages/DetailedCustomer";
import ErrorPage from "./pages/ErrorPage";
import OrderImgs from "./pages/OrderImgs";

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
                        <CustomersPage/>
                    </Auth>
                }/>
                <Route path="/add-customer" element={
                    <Auth>
                        <AddCustomersPage/>
                    </Auth>
                }/>
                <Route path="/order" element={
                    <Auth>
                        <OrdersPage/>
                    </Auth>
                }/>
                <Route path="/add-order" element={
                    <Auth>
                        <AddOrdersPage/>
                    </Auth>
                }/>
                <Route path="/detailed-order/:id" element={
                    <Auth>
                        <DetailedOrder/>
                    </Auth>
                }/>
                <Route path="/detailed-customer/:id" element={
                    <Auth>
                        <DetailedCustomer/>
                    </Auth>
                }/>
                <Route path="/order-imgs/:id" element={
                    <Auth>
                        <OrderImgs/>
                    </Auth>
                }/>

                <Route path={"*"} element={
                    <ErrorPage/>
                }/>
            </Routes>
        </>
    )
}