import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TextInput from '../TextInput'
import CustomButton from '../CustomButton'
import useWalletConnect from "../../hooks/useWalletConnect";
import TextArea from '../TextArea';
import { useCreateProduct } from "../../hooks/useCustomContract";
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/app';

export default function CreateProductModal({ close }) {
  const [open, setOpen] = useState(true)

  const { address } = useWalletConnect();

  const { userId } = useSelector((state) => ({
    userId: state.app.userId
  }))

  const dispatch = useDispatch();

  const [name, setName] = useState('Bicicleta');
  const [description, setDescription] = useState('soy una bicicleta');
  const [price, setPrice] = useState(5);
  const [value, setValue] = useState(120);
  const [imageURL, setImageURL] = useState('https://www.oxfordstore.cl/media/catalog/product/cache/e2b750e3a1f8d67cf5cdd4eb0e9445ad/6/0/608bf1219ha080_0_1.jpg');
  const [latitude, setLatitude] = useState('40.74749012267321');
  const [longitude, setLongitude] = useState('-73.9872347180572');
 
  const { data, write } = useCreateProduct(userId, latitude, longitude, name, description, value, price, imageURL);

  const handleCreate = async () => {
    dispatch(setIsLoading(true));
    try {
      await write({
        onSuccess: () => {
          console.log('finished created product')
          close?.();
        },
      });
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (data) {
      dispatch(setIsLoading(false));
      close?.();
    }
  }, [data])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {/* <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                        {imageURL ? <img src={imageURL} width={200} /> :(<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />)}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={imageChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div> */}
                <TextInput label={'Product Name'} onChange={(e) => setName(e.target.value)} value={name} />
                <TextArea  label={'Product Description'} onChange={(e) => setDescription(e.target.value)} value={description} />
                <TextInput label={'Product Image URL'} onChange={(e) => setImageURL(e.target.value)} value={imageURL} />
                <TextInput label={'Latitude'} onChange={(e) => setLatitude(e.target.value)} value={latitude} />
                <TextInput label={'Longitude'} onChange={(e) => setLongitude(e.target.value)} value={longitude} />
                <TextInput type='number' label={'Rent price'} onChange={(e) => setPrice(e.target.value)} value={price}/>
                <TextInput type='number' label={'Full price (in case of an incident)'} onChange={(e) => setValue(e.target.value)} value={value} />
                <div className="mt-5 sm:mt-6">
                  <CustomButton disabled={!name || !imageURL || !latitude || !longitude || !price || !value} onClick={handleCreate}>
                    Create Product
                  </CustomButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
