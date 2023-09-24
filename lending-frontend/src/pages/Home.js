import { useEffect } from 'react';

import MainLayout from '../layout/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { useSelector } from 'react-redux' 
import { useGetAllProducts, useGetCurrentUser, useGetProductById, useGetProductsByIds, useGetUserById } from '../hooks/useCustomContract';


const Home = () => {


    const { profile } = useSelector(state => ({ profile: state.app.profile }))
    const { data } = useGetAllProducts() 

    const ids = data.map(id => Number(id)).filter(id => !profile.products.includes(id))
    const {data: responses} = useGetProductsByIds(ids)
    let products = []
    if (Array.isArray(responses))
    products = responses.map(res => res.result) || []


    

    return (
        <MainLayout>
            <ProductGrid products={products} title={"Products"} />
        </MainLayout>
    );
};

export default Home;