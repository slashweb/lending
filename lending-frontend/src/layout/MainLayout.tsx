import React, { PropsWithChildren } from "react";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    return (
        <>
        <Navbar />
        {children}
        </>
    )
}