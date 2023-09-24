import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setHasAccount, setInitialState } from '../redux/reducers/app';
import { useGetUserById, useGetUserByWallet, useGetCurrentUser, useAssignWorldCoinIdToUser } from "../hooks/useCustomContract";
import { useState } from "react";
// import Contract from "../components/Contract";
import useWalletConnect from "../hooks/useWalletConnect";
import Loader from "../components/Loader";
import IconButton from "../components/IconButton";
import { environment } from "../utils/environment";
import { IDKitWidget } from '@worldcoin/idkit'

export default function MainLayout({ children }) {
    const { address } = useWalletConnect();

    const { profile, hasAccount } = useSelector((state) => ({
        profile: state.app.profile,
        hasAccount: state.app.hasAccount,
    }))

    const { write } = useAssignWorldCoinIdToUser();

    const handleSuccess = async (data) => {
        const worldCoinId = data.merkle_root || null;
        if (profile && profile.userId && worldCoinId) {
            console.log(worldCoinId, profile.userId)
            await write({
                args: [worldCoinId, profile.userId]
            })
        }
    }

    const handleVerify = (data) => {
        console.log('handleVerify', { data })
    }

    const userId = profile.userId;
    const dispatch = useDispatch();

    const { refetch } = useGetCurrentUser(profile.userId);
    
    const usrByWallet = useGetUserByWallet(address)

    useEffect(() => {
        refetch?.().then(res => {
            const newProfile = { ...res.data }
            if (!newProfile) return;

            newProfile.products = newProfile?.products.map(id => Number(id));
            dispatch(setProfile(newProfile));
        })
    }, [])

    useEffect(() => {
        if (!userId && address) {   
            
            usrByWallet.refetch().then((resp) => {
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
            <div>
                <IDKitWidget
                    app_id={environment.WORLDCOIN.APP_ID}
                    action="some-action"
                    onSuccess={handleSuccess}
                    handleVerify={handleVerify}
                    credential_types={["orb"]}
                >
                    {({ open }) => (
                        <div className="fixed right-10 bottom-10 p-2 bg-green-200 w-10 rounded-full justify-center" onClick={open}>
                            <img
                                className="self-center"
                                width={72}
                                src="https://images.prismic.io/worldcoin-company-website/80f08f79-ecb6-44d9-915f-85d40a9d98b9_logo.png?auto=compress,format"
                            ></img>
                        </div>
                    )}
                </IDKitWidget>
            </div>
        </>
    )
}