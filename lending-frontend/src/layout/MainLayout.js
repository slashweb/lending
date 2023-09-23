import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setHasAccount } from '../redux/reducers/app';
import { useGetUserById, useGetUserByWallet } from "../hooks/useCustomContract";
import { useState } from "react";
// import Contract from "../components/Contract";
import useWalletConnect from "../hooks/useWalletConnect";

export default function MainLayout({ children }) {
    const { address } = useWalletConnect();

    const { userId, hasAccount } = useSelector((state) => ({
        userId: state.app.userId,
        hasAccount: state.app.hasAccount,
    }))
    const dispatch = useDispatch();

    const getUserByWallet = useGetUserByWallet(address);

    useEffect(() => {
        if (!userId && address) {
            getUserByWallet.refetch().then((resp) => {
                const { data } = resp;
                if (data.wallets.length > 0) {
                    dispatch(setHasAccount(true));
                    dispatch(setUserId(data.userId));
                }
            }).catch((err) => {
                console.log({ err })
            });
        }
        
    }, [userId, address]) 
    
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}