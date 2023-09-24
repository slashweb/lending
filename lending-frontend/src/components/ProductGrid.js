import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { useGetAllProducts } from '../hooks/useCustomContract';
import ProductGridItem from './ProductGridItem';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductGrid({ title, products }) {
    
    const { hasAccount } = useSelector((state) => ({
        hasAccount: state.app.hasAccount,
    }))

    const getAllProducts = useGetAllProducts();

    useEffect(() => {

    }, [])

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductGridItem product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    )
}