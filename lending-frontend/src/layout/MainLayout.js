import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setHasAccount, setInitialState } from '../redux/reducers/app';
import { useGetUserById, useGetUserByWallet, useGetCurrentUser } from "../hooks/useCustomContract";
import { useState } from "react";
// import Contract from "../components/Contract";
import useWalletConnect from "../hooks/useWalletConnect";
import Loader from "../components/Loader";

export default function MainLayout({ children }) {
    const { address } = useWalletConnect();

    const { userId, hasAccount } = useSelector((state) => ({
        userId: state.app.userId,
        hasAccount: state.app.hasAccount,
    }))

    const dispatch = useDispatch();

    const getUserByWallet = useGetUserByWallet(address);
    const getCurrentUser = useGetCurrentUser(userId);

    useEffect(() => {
        getCurrentUser.refetch().then((resp) => {
            dispatch(setProfile(resp.data));
        });
        //dispatch(setInitialState());
        if (!userId && address) {
            getUserByWallet.refetch().then((resp) => {
                const { data } = resp;
                if (data.wallets.length > 0) {
                    dispatch(setHasAccount(true));
                    dispatch(setProfile(data));
                }
            }).catch((err) => {
                console.log({ err })
            });
        }

        
    }, [userId, address]) 
    
    return (
        <>
            <Loader />
            <Navbar />
            {children}
        </>
    )
}