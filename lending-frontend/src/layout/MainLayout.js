import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

import { useSelector, useDispatch } from 'react-redux';
import { AppState, setUserId } from '../redux/reducers/app';
import { useGetUserById, useGetUserByWallet } from "../hooks/contract/useGetUserById";
import { useState } from "react";
// import Contract from "../components/Contract";
import useWalletConnect from "../hooks/useWalletConnect";

export default function MainLayout({ children }) {
    const { address } = useWalletConnect();

    const { userId } = useSelector((state) => ({
        userId: state.app.userId,
    }))

    const getUserByWallet = useGetUserByWallet(address);

    useEffect(() => {
        
        console.log({
            userId, address
        })
        if (!userId && address) {
            getUserByWallet.refetch().then((resp) => {
                const { data } = resp;
                if (data.wallets.length > 0) {
                    const { id } = data.wallets[0].user;
                    setUserId(id);
                }
                
            }).catch((err) => {
                console.log({ err })
            });
        }
        
    }, [userId, address]) 

    const corneta = () => {

    }
    
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}