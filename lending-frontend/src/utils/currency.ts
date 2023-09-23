import Web3 from 'web3';

export const wToEth = (amount: number): string => Web3.utils.fromWei(amount, 'ether');
    