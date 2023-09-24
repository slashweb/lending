import React, { useEffect } from 'react';

import MainLayout from '../layout/MainLayout';
import ProductDetailItem from '../components/ProductDetailItem';
import { useProfile } from '@lens-protocol/react-web';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
    const { profile } = useSelector((state) => ({
        profile: state.app.profile
    }))

    const { id } = useParams()

    if (profile && profile.lensHandle) {
        // const { data, loading, error } = useProfile({ handle: `${profile.lensHandle}.lens`});
        // console.log({ data, loading, error })
    }
    

    return (
        <MainLayout>
            <ProductDetailItem id={id} />
        </MainLayout>
    );
};