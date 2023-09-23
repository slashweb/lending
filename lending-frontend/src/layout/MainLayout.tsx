import * as React from "react";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}