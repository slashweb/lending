import { useState, useEffect } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect, useNetwork } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import { useSwitchNetwork } from 'wagmi'


import { useSelector, useDispatch } from 'react-redux';
import { AppState, setUserId } from '../redux/reducers/app';


const useWalletConnect = () => {
    const { open: openModal } = useWeb3Modal();
    const { address, isConnected, isDisconnected } = useAccount({
        onConnect: () => verifyUserProfile({ address }),
    });
    const { disconnect } = useDisconnect();
    const [balance, setBalance] = useState<string>('0');
    const { chain, chains } = useNetwork();
    const { switchNetwork } = useSwitchNetwork()

    const { userId } = useSelector((state: { app: AppState }) => ({
        userId: state.app.userId,
    }))

    useEffect(() => {
        if (address) getBalance(address);
    }, [address, chain]);

    const verifyUserProfile = ({ address }: { address?: `0x${string}` | undefined }) => {
        
    }

    const getBalance = async (address: `0x${string}`) => {
        const balance = await fetchBalance({ address })
        setBalance(`${balance.formatted.slice(0, 8)} ${balance.symbol}`);
    }

    const changeNetwork = async (chainId: number) => {
        switchNetwork?.(chainId)
    }

    return {
        openModal,
        disconnect,
        address,
        isConnected,
        isDisconnected,
        balance,
        chain,
        chains,
        changeNetwork
    }
}

export default useWalletConnect;
