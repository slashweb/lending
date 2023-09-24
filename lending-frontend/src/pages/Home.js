import { useEffect } from 'react';

import MainLayout from '../layout/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { useSelector } from 'react-redux' 
import { useGetAllProducts, useGetCurrentUser, useGetProductById, useGetProductsByIds, useGetUserById } from '../hooks/useCustomContract';


const Home = () => {


    const { profile } = useSelector(state => ({ profile: state.app.profile }))
    const { data } = useGetAllProducts() 
    let products = []
    const ids = data.map(id => Number(id)).filter(id => !profile.products.includes(id))
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
              <h1 className='text-3xl'>There are not products available</h1>
            </div>
          </>
        ) : (
          <ProductGrid products={products} title={"Products"} />
        )}
      </MainLayout>
    );
};

export default Home;