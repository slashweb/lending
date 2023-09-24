import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import IconButton from './IconButton'
import CreateProductModal from './modals/CreateProductModal'
import { useSelector } from 'react-redux';
import { useGetCurrentUser } from '../hooks/useCustomContract';
import CustomButton from './CustomButton';
import { useDispatch } from 'react-redux';
import { setProduct } from '../redux/reducers/lending';
import { Link } from "react-router-dom";
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductGridItem({ product }) {
    if (!product) return null;
    const [owner, setOwner] = useState();

    const { refetch: refetchGetOwner } = useGetCurrentUser(product?.userId);
    useEffect(() => {
      refetchGetOwner().then(res => {
        console.log('owner', res.data)
        setOwner(res.data)
    })
    }, [product])

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
            {owner && owner.worldCoinId !== '' &&
              <div className='flex border-2 border-blue-800 p-2 mt-2 rounded-md justify-between items-center'>
                <span className='text-blue-800'>Human verified by Worldcoin ID</span>
                <ShieldCheckIcon
                      className="mr-2 h-6 w-6 flex-shrink-0 text-blue-800 ml-4"
                      aria-hidden="true"
                      color='text-blue-800'
                />
              </div>
            }
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