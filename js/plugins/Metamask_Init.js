//----------------------------------------------------------------------------------------------------------------------
//MetaMask_Init.js
//----------------------------------------------------------------------------------------------------------------------
// v1.0 (23.09.2024) - release
/*:
 * @plugindesc This plugin allows to connect your RPG to a MetaMask wallet.
 * @author FrankCoin
 * @target MV
 *
 * @param MetaMask Wallet Address
 * @desc The variable where the MetaMask wallet address will be stored.
 * @default 1
 * @type variable
 *
 * @help This plugin allows to connect your browser deployed RPG to a 
 * MetaMask wallet. 
 * In an event, use the following script call to initiate the MetaMask connection:
 * this.pluginCommand_iniweb3();
 * 
 * In an event, use the following script call to send the tokens:
 * this.pluginCommand_sendwgas();
 * 
 * [Terms of Use] 
 * MIT License: Free for commercial and non-commercial use
 * No need to give credit
 * Feel free to modify or distribute this plugin
 */

(() => {
  function initializeWeb3() {
    var parameters = PluginManager.parameters("MetaMask_Init");
    var WalletAddressVariable = Number(parameters["MetaMask Wallet Address"] || 1);
    if (typeof window.ethereum !== "undefined") {
      window.web3 = new Web3(window.ethereum);
      ethereum.request({ method: "eth_requestAccounts" })
        .then(accounts => {
          console.log("Connected account:", accounts[0]);
          $gameVariables.setValue(WalletAddressVariable, accounts[0]);
          const metamasktrue = "Connected with\n" + $gameVariables.value(WalletAddressVariable);
          $gameMessage.add(metamasktrue);
        })
        .catch(error => {
          console.error("MetaMask connection failed:", error);
        });
    } else {
      console.warn("MetaMask is not installed. Please install MetaMask to use Web3 features.");
      const nometamask= "MetaMask is not installed.\nPlease install MetaMask to use Web3 features."
      $gameMessage.add(nometamask);
    }
  }

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/web3@4.13.0/dist/web3.min.js";
  script.onload = () => {
    console.log("Web3.js loaded successfully");
  };
  document.head.appendChild(script);
  Game_Interpreter.prototype.pluginCommand_iniweb3 = function() {
    initializeWeb3();
  };
})();


const contractABI = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "CALLBACK_SUCCESS",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "PERMIT_TYPEHASH",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
          }
      ],
      "name": "approveAndCall",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "deploymentChainId",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          }
      ],
      "name": "depositTo",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
          }
      ],
      "name": "depositToAndCall",
      "outputs": [
          {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "flashFee",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "contract IERC3156FlashBorrower",
              "name": "receiver",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
          }
      ],
      "name": "flashLoan",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "flashMinted",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "maxFlashLoan",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "nonces",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
          },
          {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
          },
          {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
          },
          {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
          }
      ],
      "name": "permit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
          }
      ],
      "name": "transferAndCall",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address payable",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "withdrawFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address payable",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "withdrawTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
];
const tokenAddress = "0x1CE16390FD09040486221e912B87551E4e44Ab17";
async function sendToken() {
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const sender = accounts[0];
    const recipient = "0x4c1f0D4b26019eC365a50f98D21efE682f70ab36";
    const tokenAmount = 0.1;
    const decimals = 18;
    const weiAmount = web3.utils.toWei(tokenAmount.toString(), "ether"); 
    // Ether means 18 decimal points

    const tokenContract = new web3.eth.Contract(contractABI, tokenAddress);
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Gas Price:", gasPrice);

    const gasEstimate = await tokenContract.methods.transfer(recipient, weiAmount).estimateGas({ from: sender });
    console.log("Estimated Gas:", gasEstimate);

    const tx = await tokenContract.methods.transfer(recipient, weiAmount)
      .send({
        from: sender,
        gas: gasEstimate,
        gasPrice: gasPrice
      });
    
    console.log("Transaction Hash:", tx.transactionHash);
    $gameMessage.add("Transaction Successful! Tx Hash:\n" + tx.transactionHash);
  } catch (error) {
    console.error("Transaction Failed:", error);
    $gameMessage.add("Transaction Failed!");
  }
}
Game_Interpreter.prototype.pluginCommand_sendwgas = function() {
  sendToken();
}