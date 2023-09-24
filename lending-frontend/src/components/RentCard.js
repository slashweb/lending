import { useEffect, useState } from "react";
import { useApproveRent, useGetProductById, useGetUserById } from "../hooks/useCustomContract"
import { useDispatch } from 'react-redux'
import { setIsLoading } from "../redux/reducers/app";

export default function RentCard({ rent, reloadRents }) {
    // const { data: owner } = useGetUserById(rent.owner);
    // const { data: rendedBy } = useGetUserById(rent.rendedBy);
    const [product, setProduct] = useState()
    const { refetch } = useGetProductById(Number(rent.productId));

    const { data: dataApprove, write: writeApprove } = useApproveRent(rent.id);
    const dispatch = useDispatch();

    useEffect(() => {
        refetch().then((resp) => {            
            setProduct(resp.data)
        });
    }, [])

    const handleApprove = async () => {
      dispatch(setIsLoading(true));
      await writeApprove();
      dispatch(setIsLoading(false));
      reloadRents?.();
    }

    if (!product) return null;

    return (
      <span className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {product.name}
              </h3>
            </div>
            <p className="mt-1 truncate text-sm text-gray-500">
              {product.description}
            </p>
          </div>
          <img
            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
            src={product.image}
            alt=""
          />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-600">
            {rent.isApproved && rent.isReturned && (
              <div className="flex text-indigo-500 w-0 flex-1 justify-center mt-4">
                <span>Completed</span>
              </div>
            )}
            {rent.isApproved && !rent.isReturned && (
              <div className="flex w-0 flex-1 justify-center mt-4">
                <span>Waiting for return</span>
              </div>
            )}
            {!rent.isApproved && (
              <>
                <div className="flex w-0 flex-1">
                  <button
                    onClick={handleApprove}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    Accept
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    onClick={() => {}}
                    className="bg-red-400 relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white"
                  >
                    Reject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </span>
    );
}