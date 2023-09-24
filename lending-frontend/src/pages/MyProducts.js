import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MainLayout from '../layout/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { useGetAllProducts, useGetProductById, useGetProductsByIds } from '../hooks/useCustomContract';
import { setUserProducts, clearStore } from '../redux/reducers/lending';
import Loader from '../components/Loader';

const MyProducts = () => {
    
    const { profile } = useSelector(state => ({ profile: state.app.profile }))
    const { data } = useGetAllProducts() 
    let products = []
    const ids = Array.isArray(data) ? data.map(id => Number(id)).filter(id => profile.products.includes(id) ?? []) : []
    const {data: responses} = useGetProductsByIds(ids)

    if (data) {
        if (Array.isArray(responses))
        products = responses.map(res => res.result) || []
    }

    return (
        <MainLayout>
            {products.length === 0 ? (
          <>
            <div className="justify-center text-center p-24 bg-gray-200">
              <h1 className='text-3xl'>You haven't published products yet</h1>
            </div>
          </>
        ) : (
          <ProductGrid products={products} title={"Products"} />
        )}
        </MainLayout>
    );
};

export default MyProducts;