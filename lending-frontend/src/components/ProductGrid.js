import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import IconButton from './IconButton'
import CreateProductModal from './modals/CreateProductModal'
import { useSelector } from 'react-redux';
import { useGetAllProducts } from '../hooks/useCustomContract';
import ProductGridItem from './ProductGridItem';

const products = [
  {
    id: 1,
    name: 'Organize Basic Set (Walnut)',
    price: '$149',
    rating: 5,
    reviewCount: 38,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 2,
    name: 'Organize Pen Holder',
    price: '$15',
    rating: 5,
    reviewCount: 18,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 3,
    name: 'Organize Sticky Note Holder',
    price: '$15',
    rating: 5,
    reviewCount: 14,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 4,
    name: 'Organize Phone Holder',
    price: '$15',
    rating: 4,
    reviewCount: 21,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductGrid({ title }) {
    const [openProductCreationModal, setOpenProductCreationModal] = useState(false)

    const { hasAccount } = useSelector((state) => ({
        hasAccount: state.app.hasAccount,
    }))

    const getAllProducts = useGetAllProducts();

    useEffect(() => {
      // getAllProducts.refetch().then((resp) => {
      //   console.log({ resp })
      // }).catch((err) => {
      //   console.log({ err })
      // });
    }, [])

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <div className='flex justify-between'>
              <h2 className='font-bold text-3xl mb-10'>{title}</h2>
              {hasAccount && <IconButton onClick={() => {
                  setOpenProductCreationModal(true)
              }}>+</IconButton>}
              {openProductCreationModal && (<CreateProductModal close={() => setOpenProductCreationModal(false)} />)}
          </div>
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {/* {products.map((product) => (
              <ProductGridItem product={product} key={product.id} />
            ))} */}
          </div>
        </div>
      </div>
    )
}