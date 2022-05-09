
import './App.css';
import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import  bankArtifact from './artifacts/contracts/Bank.sol/Bank.json';
import  shibArtifact from './artifacts/contracts/Shib.sol/Shib.json';
import  piroArtifact from './artifacts/contracts/piro.sol/Piro.json';
import  dogeArtifact from './artifacts/contracts/doge.sol/Doge.json';
import  Modal from './Modal.js';

function App() {

    // const[provider, setProvider] = useState(undefined);
    // const[signer, setSigner] = useState(undefined);
    // const[signerAddress,setSignerAddress] = useState(undefined);
    // const[bankContract, setBankContract] = useState(undefined);
    // const[tokenContracts, setTokenContracts] = useState({});
    // const[tokenBalances, setTokenBalances] = useState({});
    // const[tokenSymbols, setTokenSymbols] = useState([]);

    // const[amount, setAmount] = useState(0);
    // const[showModal, setShowModal] = useState(false);
    // const[selectedSymbol, setSelectedSymbols] = useState(undefined);
    // const[isDeposit, setIsDeposit] = useState(true);

    // const toBytes32 = text => { ethers.utils.formatBytes32String(text) };             
    // const toString = bytes32 => { ethers.utils.parseBytes32String(bytes32) };         
    // const toWei = ether => { ethers.utils.parseEther(ether) };                        
    // const toEth = wei => { ethers.utils.formatEther(wei).toString() };               
    // const toRound = num => { Number(num).toFixed(2) };                               

    // useEffect(() =>{
    //     const init = async () => {
    //         // META MASK PROVIDER
    //         const provide = await new ethers.providers.Web3Provider(window.ethereum);
    //         setProvider(provide);
    //         // Creating Bank contract Instance
    //         const bankcontract = await new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3" , bankArtifact.abi);
    //         setBankContract(bankcontract);
             
    //         bankContract.connect(provider).getWhitelistedSymbols()
    //         .then((result) =>{
    //             // Setting the symbols
    //             const symbols = result.map(s => toString(s));
    //             setTokenSymbols(symbols);
    //             getTokenContracts(symbols, bankContract, provider);
    //         })
    //     }
    //     init();
    // },[]);
       
    // const getTokenContract = async (symbol, bankContract, provider) =>{
    //     const address = await bankContract.connect(provider).getWhitelistedTokenAddress( toBytes32(symbol) );
    //     const abi = symbol === 'PIRO' ? piroArtifact.abi : ( symbol === 'DOGE' ? dogeArtifact.abi : shibArtifact.abi);
    //     const tokenCont = new ethers.Contract(address,abi);
    //     return tokenCont;
    // }

    // const getTokenContracts = async (symbols, bankContract, provider ) => {
    //     symbols.map( async symbol =>{
    //         const contract = await getTokenContract(symbol, bankContract, provider);
    //         setTokenContracts( prev => ({ ...prev, [symbol]:contract}));
    //     })
         
    // }

    // const isConnected = () => ( signer !== undefined);

    // const getSigner = async provider =>{
    //     provider.send("eth_requestAccounts", []);
    //     const signer = provider.getSigner();

    //     signer.getAddress()
    //     .then( address => {
    //         setSignerAddress(address);
    //     })

    //     return signer;
    // }

    // const connect = ()=>{
    //     getSigner(provider)
    //     .then( signer => {
    //         setSigner(signer);
    //         getTokenBalances(signer);
    //     })
    // }

    // const getTokenBalance = async( symbol, signer) =>{
    //     const balance  = await bankContract.connect(signer).getTokenBalance( toBytes32(symbol) );
    //     return toEth(balance);
    // }

    // const getTokenBalances = (signer) =>{
    //     tokenSymbols.map(async symbol => {
    //         const balance = await getTokenBalance(symbol, signer);
    //         setTokenBalances(prev => ({...prev, [symbol]: balance.toString() }));
    //     });
    // }

    // const displayModal = (symbol) => {
    //     setSelectedSymbols(symbol);
    //     setShowModal(true);
    // }

    // const depositTokens = (wei, symbol) => {
    //     if( symbol==='Eth'){
    //       signer.sendTransaction({
    //           to: bankContract.address,
    //           value: wei
    //       })
    //     }
    //     else{
    //         const tokenContract = tokenContracts[symbol];
    //         tokenContract.connect(signer).approve(bankContract.address,wei)
    //         .then(() => {
    //             bankContract.connect(signer).depositTokens(wei, toBytes32(symbol));
    //         })

    //     }
    // }

    // const depositOrWithdraw =( e, symbol) => {
    //     e.preventDefault();
    //     const wei = toWei(amount);

    //     if( isDeposit) {
    //         depositTokens(wei, symbol);
    //     }
    //     else{
    //         withdrawTokens(wei, symbol);
    //     }
    // }

    // const withdrawTokens = (wei, symbol) =>{
    //     if( symbol ===  'Eth')
    //     {
    //         bankContract.connect(signer).withdrawEther(wei);
    //     }
    //     else{
    //         bankContract.connect(signer).withdrawTokens(wei, toBytes32(symbol));
    //     }
    // }

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [bankContract, setBankContract] = useState(undefined);
  const [tokenContracts, setTokenContracts] = useState({});
  const [tokenBalances, setTokenBalances] = useState({});
  const [tokenSymbols, setTokenSymbols] = useState([]);

  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(undefined);
  const [isDeposit, setIsDeposit] = useState(true);

  const toBytes32 = text => ( ethers.utils.formatBytes32String(text) );               // return normal strings to Bytes32 
  const toString = bytes32 => ( ethers.utils.parseBytes32String(bytes32) );           // return bytes 32 strings to human readable strings
  const toWei = ether => ( ethers.utils.parseEther(ether) );                          // Convert Ether to Wei
  const toEther = wei => ( ethers.utils.formatEther(wei).toString() );                // Convert Wei to Ether
  const toRound = num => ( Number(num).toFixed(2) );                                  // Round Of the number for reader only

  useEffect(() => {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider);

      const bankContract = await new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", bankArtifact.abi);
      setBankContract(bankContract);

      bankContract.connect(provider).getWhitelistedSymbols()
        .then((result) => {
          const symbols = result.map(s => toString(s))
          setTokenSymbols(symbols)
          getTokenContracts(symbols, bankContract, provider)
        })
    }
    init();
  }, [])

  const getTokenContract = async (symbol, bankContract, provider) => {
    const address = await bankContract.connect(provider).getWhitelistedTokenAddress( toBytes32(symbol) )
    const abi = symbol === 'PIRO' ? piroArtifact.abi : ( symbol === 'DOGE' ? dogeArtifact.abi : shibArtifact.abi);
    const tokenContract = new ethers.Contract(address, abi);
    return tokenContract;
  }

  const getTokenContracts = async (symbols, bankContract, provider) => {
    symbols.map(async symbol => {
      const contract = await getTokenContract(symbol, bankContract, provider)
      setTokenContracts(prev => ({...prev, [symbol]:contract}))
    })
  }

  const isConnected = () => (signer !== undefined)

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    signer.getAddress()
      .then(address => {
        setSignerAddress(address)
      })

    return signer
  }

  const connect = () => {
    getSigner(provider)
      .then(signer => {
        setSigner(signer)
        getTokenBalances(signer)
      })
  }

  const getTokenBalance = async (symbol, signer) => {
    const balance = await bankContract.connect(signer).getTokenBalance( toBytes32(symbol) )
    return toEther(balance)
  }

  const getTokenBalances = (signer) => {
    tokenSymbols.map(async symbol => {
      const balance = await getTokenBalance(symbol, signer)
      setTokenBalances(prev => ({...prev, [symbol]: balance.toString()}))
    })
  }

  const displayModal = (symbol) => {
    setSelectedSymbol(symbol)
    setShowModal(true)
  }

  const depositTokens = (wei, symbol) => {
    if (symbol === 'Eth') {
      signer.sendTransaction({
        to: bankContract.address,
        value: wei
      })
    } else {
      const tokenContract = tokenContracts[ symbol ];
      tokenContract.connect(signer).approve(bankContract.address, wei)
        .then(() => {
          bankContract.connect(signer).depositTokens(wei, toBytes32(symbol));
        })
    }
  }

  const withdrawTokens = (wei, symbol) => {
    if (symbol === 'Eth') {
      bankContract.connect(signer).withdrawEther(wei)
    } else {
      bankContract.connect(signer).withdrawTokens(wei, toBytes32(symbol));
    }
  }

  const depositOrWithdraw = (e, symbol) => {
    e.preventDefault();
    const wei = toWei(amount)

    if(isDeposit) {
      depositTokens(wei, symbol)
    } else {
      withdrawTokens(wei, symbol)
    }
  }




  return (
      <>

    <div className="App">
      <header className="App-header">
      <p> Banking Dapp</p>
        {isConnected() ? (
            <div>
                <p>
                    Welcome { signerAddress?.substring(0,10)}... Buddy
                </p>
                <div>
              <div className="list-group">
                <div className="list-group-item">
                  {Object.keys(tokenBalances).map((symbol, idx) => (
                    <div className=" row d-flex py-3" key={idx}>

                      <div className="col-md-3">
                        <div>{symbol.toUpperCase()}</div>
                      </div>

                      <div className="d-flex gap-4 col-md-3">
                        <small className="opacity-50 text-nowrap">{toRound(tokenBalances[symbol])}</small>
                      </div>

                      <div className="d-flex gap-4 col-md-6">
                        <button onClick={ () => displayModal(symbol) } className="btn btn-primary">Deposit/Withdraw</button>
                        <Modal
                          show={showModal}
                          onClose={() => setShowModal(false)}
                          symbol={selectedSymbol}
                          depositOrWithdraw={depositOrWithdraw}
                          isDeposit={isDeposit}
                          setIsDeposit={setIsDeposit}
                          setAmount={setAmount}
                        />
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            </div>
        )    : (
            <div>
                <p>
                    You are not connected
                </p>
                <button className='btn btn-primary' onClick={connect} >Connect Metamask </button>
            </div>

        )}

      </header>
      <footer className='Apheader '>
        <p> Shivang  was  here </p>
    </footer>
    </div>
 
    </>
  );
}

export default App;
