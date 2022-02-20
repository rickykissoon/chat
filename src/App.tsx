import React, { useEffect, useState } from 'react';
import WalletConnect from './Components/WalletConnect';
//import './App.css';

import contract_abi from './ContractABI/chat_abi.json';

function App() {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if(contract) {
      console.log(contract);
    }
  }, [contract]);

  return (
    <div className="App">
        <WalletConnect 
          contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3"
          contract_abi={contract_abi}
          setContract={setContract}
        />
    </div>
  );
}



export default App;
