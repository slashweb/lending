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

    const { profile, hasAccount } = useSelector((state) => ({
        profile: state.app.profile,
        hasAccount: state.app.hasAccount,
    }))

    const userId = profile.userId;
    const dispatch = useDispatch();

    const { refetch } = useGetCurrentUser(profile.userId)


    useEffect(() => {
        refetch().then(res => {
            const newProfile = res.data 
            newProfile.products = newProfile.products.map(id => Number(id)) || [] 
            //dispatch(setProfile(newProfile));
        })
    }, [])

    useEffect(() => {
        if (!userId && address) {   
            refetch().then((resp) => {
                const { data } = resp;
                console.log('data here', data, resp)
                if (data.wallets.length > 0) {
                    console.log('was here')
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