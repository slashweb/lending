import React from 'react';

import MainLayout from '../layout/MainLayout';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
    return (
        <MainLayout>
            <ProductGrid title={"Products"} />
        </MainLayout>
    );
};

export default Home;