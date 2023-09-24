import { useWalletLogin } from '@lens-protocol/react-web';
import { useAccount } from 'wagmi';
import useWalletConnect from '../hooks/useWalletConnect';

export default function LensAuth({ onAuth }) {

    const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();
    const {  address } = useWalletConnect();

    const signIn = async () => {
        const { value } = await login({ address })

        console.log('on value', value)
        if (value && value.handle) {
            onAuth(value.handle.split('.')[0])
        } else {
            onAuth()
        }
        
    }

    return (
      <>
        <div className='flex pt-4 mt-6 border-t border-gray-300'>
          <button
            onClick={() => signIn()}
            className="text-sm mr-2 p-2 bg-orange-600 rounded-lg text-white w-full"
          >
            Automatic Login
          </button>
        </div>
      </>
    );
}