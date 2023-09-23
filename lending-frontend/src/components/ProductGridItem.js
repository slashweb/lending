import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import IconButton from './IconButton'
import CreateProductModal from './modals/CreateProductModal'
import { useSelector } from 'react-redux';
import { useGetAllProducts } from '../hooks/useCustomContract';
import CustomButton from './CustomButton';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductGridItem({ product }) {
    return (
      <div key={product.id} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="pb-4 pt-10 text-center">
          <h3 className="text-sm font-medium text-gray-900">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
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
          <p className="mt-4 text-base font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    )
}