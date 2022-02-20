import React, {useState, useEffect} from 'react';
import './WalletConnect.css';
import {ethers} from 'ethers';

declare let window: any;

interface WalletConnectProps {
    contractAddress: string;
    contract_abi: any;
    setContract: any;
}

const WalletConnect = ({contractAddress, contract_abi, setContract}: WalletConnectProps) => {
    const [userAddress, setUserAddress] = useState<string>();

    async function connect() {
        if(!window.ethereum) {
            alert("Get MetaMask");
            return;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        setUserAddress(accounts[0]);
    }

    async function isWalletConnected() {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });

            if(accounts.length > 0) {
                setUserAddress(accounts[0])
                return;
            }
        }
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        let tempSigner = tempProvider.getSigner();
        let tempContract = new ethers.Contract(contractAddress, contract_abi, tempSigner);

        setContract(tempContract);
    }

    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                connect();
            });
        }
    });

    useEffect(() => {
        isWalletConnected();
        updateEthers();
    }, []);

    return(
        <>
            <div className='header'>
                {userAddress ? (
                    <div>User Address: {userAddress}</div>
                ) : (
                    <>
                        <div>Attempt to connect to: {contractAddress}</div>
                        <button className='button' onClick={() => connect()} >Connect MetaMask</button>
                    </>
                )}
            </div>
        </>
    )
}

export default WalletConnect;