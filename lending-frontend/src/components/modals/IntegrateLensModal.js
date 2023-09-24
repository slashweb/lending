import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import TextInput from '../TextInput'
import CustomButton from '../CustomButton'
import { useAssignLensToUser } from "../../hooks/useCustomContract";
import useWalletConnect from "../../hooks/useWalletConnect";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/app';

export default function IntegrateLensModal({ close }) {
  const [open, setOpen] = useState(true)
  const [handle, setHandle] = useState('');
  const { address } = useWalletConnect();

  const { userId } = useSelector((state) => ({
    userId: state.app.profile.userId
  }))

  const { data, write } = useAssignLensToUser(userId, handle);

  const dispatch = useDispatch();

  const handleCreate = async () => {
    dispatch(setIsLoading(true));

    try {
      await write({
        onSuccess: () => {
          console.log('finished')
          dispatch(setIsLoading(false));
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
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <TextInput label={'Handle'} onChange={(e) => setHandle(e.target.value)} value={handle} />
                <div className="mt-5 sm:mt-6">
                  <CustomButton disabled={!handle.length} onClick={handleCreate}>
                    Integrate with Lens
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
