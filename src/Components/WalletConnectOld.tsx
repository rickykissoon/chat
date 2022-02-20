import React, {useState, useEffect} from 'react';
//import SpaceShapes from './SpaceShapesRefactor';
import {ethers} from 'ethers';
//import spaceshapes_abi from '../Contracts/spaceshapes_abi.json';

declare let window: any;

/*interface WalletConnectProps {
    contractAddress: string;
}*/

const WalletConnect = () => {
    const [userAddress, setUserAddress] = useState("");

    async function connect(onConnected: any) {
        if(!window.ethereum) {
            alert("Get MetaMask");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        onConnected(accounts[0]);
    }

    async function isWalletConnected(onConnected: any ){
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(accounts.length > 0) {
                const account = accounts[0];
                onConnected(account);
                return;
            }
        }
    }

    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                connect(setUserAddress);
            });
        }
    });

    useEffect(() => {
        isWalletConnected(setUserAddress);
        updateEthers();
    }, []);

    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    const [contract, setContract] = useState<any>(null);
    const [provider, setProvider] = useState<any>(null);
    const [signer, setSigner] = useState<any>(null);

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        let tempSigner = tempProvider.getSigner();
        //let tempContract = new ethers.Contract(contractAddress, spaceshapes_abi, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        //setContract(tempContract);
    }

    useEffect(() => {
        if(window.ethereum) {
            //console.log('ethereum exists');
        }
        if (contract != null) {
            //console.log(contract);
            //updateBalance();
        }
    }, [contract]);

    if (userAddress) {
        return(
            <>
                <div className='section'>
                    <div>Connected with: {userAddress}</div>
                    <div>Successfully connected to: {contractAddress}</div>
                </div>
                {/*<SpaceShapes contract={contract}  address={userAddress}/>}*/}
            </>
        )
    }
    
    return (
        <button onClick={() => connect(setUserAddress)} >
            Connect to MetaMask
        </button>
    );
}

export default WalletConnect;