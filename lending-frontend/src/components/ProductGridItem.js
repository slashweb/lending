import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import IconButton from './IconButton'
import CreateProductModal from './modals/CreateProductModal'
import { useSelector } from 'react-redux';
import { useGetAllProducts } from '../hooks/useCustomContract';
import CustomButton from './CustomButton';
import { useDispatch } from 'react-redux';
import { setProduct } from '../redux/reducers/lending';
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductGridItem({ product }) {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="relative border-b border-r border-gray-200 p-4 sm:p-6">
          <div className="aspect-h-1 aspect-w-1 rounded-lg bg-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="pb-4 pt-10 text-center">
            <h3 className="text-sm font-medium text-gray-900">
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name} -
                {product.description}
            </h3>
            <div className="mt-3 flex flex-col items-center">
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <CustomButton>
                Rent
              </CustomButton>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p>
            </div>
            <p className="mt-4 text-base font-medium text-gray-900">Rent price ${Number(product.price)}</p>
            <p className="mt-4 text-base font-medium text-gray-900">All value ${Number(product.prodValue)}</p>
          </div>
        </div>
      </Link>
    )
}