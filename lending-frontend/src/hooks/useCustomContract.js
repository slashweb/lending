import { environment } from "../utils/environment"
import { useContractRead, useContractWrite } from 'wagmi'
import abi from '../artifacts/abi.json'

const useGetUserById = (id) => {
    const getUserById = useContractRead({
        address: environment.CONTRACT.key,
        abi: abi.abi,
        functionName: 'getUserById',
        args: [id],
        enabled: false,
    })

    return {
        getUserById
    }
}

const useGetUserByWallet = (wallet) => {
    const { refetch } = useContractRead({
        address: environment.CONTRACT.key,
        abi: abi.abi,
        functionName: 'getUserByWallet',
        args: [wallet],
        enabled: false,
    })

    return {
        refetch
    }
}

const useGetAllProducts = () => {
    const { refetch } = useContractRead({
        address: environment.CONTRACT.key,
        abi: abi.abi,
        functionName: 'getAllProducts',
        args: [],
        enabled: false,
    })

    return {
        refetch
    }
}

const useGetCurrentUser = (userId) => {
    const { refetch } = useContractRead({
        address: environment.CONTRACT.key,
        abi: abi.abi,
        functionName: 'getUserById',
        args: [userId],
        enabled: false,
    })

    return {
        refetch
    }
}

const useCreateAccount = (username, wallets) => {
    const { data, write } = useContractWrite({
        address: environment.CONTRACT.key,
        abi: abi.abi,
        functionName: 'createUserAccount',
        args: [username, wallets],
    })

    return {
        data,
        write
    }
}

const useCreateProduct = (userId, latitude, longitude, name, description, productValue, price, imageUrl) => {
    const { data, write } = useContractWrite({
        address: environment.CONTRACT.key,
        abi: abi.abi,
        functionName: 'createProduct',
        args: [userId, latitude, longitude, name, description, productValue, price, imageUrl],
    })

    return {
        data,
        write
    }
}


export { useGetUserById, useGetUserByWallet, useCreateAccount, useGetAllProducts, useCreateProduct, useGetCurrentUser }