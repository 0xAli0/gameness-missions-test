"use client"
import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from "wagmi";
import { motion } from 'framer-motion';
import { formatAddress } from '@/libs/utils';

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address: account, isConnected } = useAccount();

  const buttonVariants = {
    initial: { scale: 1 },
    whileTap: { scale: 0.99 },
  };

  return (
    <div className='flex items-center gap-2'>
      <motion.button 
        onClick={() => open()} 
        className={`py-3 w-full text-white/90 rounded-full font-primary text-sm ${isConnected ? 'bg-primary/80' : 'bg-primary'}`}
        variants={buttonVariants}
        initial="initial"
        whileTap="whileTap"
      >
          {account ? formatAddress(account) : "Connect Wallet"}
      </motion.button>
    </div>
  )
}

export default ConnectButton;