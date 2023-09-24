import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MainLayout from '../layout/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { useGetProductById, useGetProductsByIds } from '../hooks/useCustomContract';
import { setUserProducts, clearStore } from '../redux/reducers/lending';

const MyProducts = () => {
    const { profile } = useSelector((state) => ({
        profile: state.app.profile,

    }))
    const dispatch = useDispatch();
    
    if (profile && profile.products) {
    
        // const { data } = useGetProductsByIds(profile.products);
        //const products = data.map((item) => item.result);
        //console.log('aaaa,',{ products })
        //dispatch(setUserProducts(products));
    }

    return (
        <MainLayout>
            <ProductGrid title={'My Products'} />
        </MainLayout>
    );
};

export default MyProducts;