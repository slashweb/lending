import React, { useEffect } from 'react';

import MainLayout from '../layout/MainLayout';
import ProductDetailItem from '../components/ProductDetailItem';
import { useProfile } from '@lens-protocol/react-web';

export default function ProductDetails() {
    const { data: profile, loading, error } = useProfile({ handle: 'vicl9403.lens'});
    console.log({ profile, loading, error })

    return (
        <MainLayout>
            <ProductDetailItem />

        </MainLayout>
    );
};