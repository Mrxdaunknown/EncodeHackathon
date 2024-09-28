//----------------------------------------------------------------------------------------------------------------------
//MetaMask_Init.js
//----------------------------------------------------------------------------------------------------------------------
// v1.0 (29.09.2024) - first release
/*:
 * @plugindesc This plugin allows to connect your RPG to a MetaMask wallet.
 * It also allows to send gold to the player in exchange for tokens.
 * @author FrankCoin
 * @target MV
 *
 * @param MetaMask Wallet Address
 * @desc The variable where the MetaMask wallet address will be stored.
 * @default 1
 * @type variable
 *
 * @param Token Contract Address
 * @desc The contract address of the token the player should send.
 * Must be a token using 18 decimals.
 * @type string
 * @default 0xdE41591ED1f8ED1484aC2CD8ca0876428de60EfF
 * 
 * @param Recipient Wallet Address
 * @desc The address to send the players tokens to.
 * "Your wallet address" if you want to earn with your game.
 * @type string
 * @default 0x4c1f0D4b26019eC365a50f98D21efE682f70ab36
 * 
 * @param Gold Amount
 * @desc The gold amount a player will receive for their tokens 
 * after a successful transaction.
 * @type number
 * @default 1000
 * 
 * @param Token Amount
 * @desc The token amount a player needs to send to receive the gold amount.
 * @type text
 * @default 0.1
 * 
 * @help This plugin allows to connect your browser-deployed RPG to a MetaMask wallet.
 * 
 * In an event use the following script call to initiate the MetaMask connection:
 * this.pluginCommand_iniweb3();
 * 
 * In Plugin Parameters you can change the variable which is storing the 
 * connected MetaMask wallet address. By default its variable 1.
 * 
 * ----- 2nd plugin part (sending ERC20-tokens and player receiving gold) -----
 *
 * In an event, use the following script call to send the tokens:
 * this.pluginCommand_sendtokens();
 * 
 * In Plugin Parameters you can change:
 * The Token Contract Address (You can decide which token the player should send)
 * It must be a token with 18 decimals. USDT for example is using 6 decimals and
 * would not work. Also it must be a ERC20-token!
 * By default its the contract of WGAS10 for the Neo X blockchain.
 * 
 * The Recipient Wallet Address (Your wallet which should receive the tokens)
 * By default its my wallet address :).
 * 
 * The Gold Amount the player will receive for their tokens after a transaction.
 * By default its 1000 gold.
 * 
 * The Token Amount the player needs to send to receive the gold amount.
 * By default its 0.1 token.
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

// Second plugin part
const contractABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
(() => {
    var parameters = PluginManager.parameters("MetaMask_Init");
    var tokenAddress = parameters["Token Contract Address"] || "0xdE41591ED1f8ED1484aC2CD8ca0876428de60EfF";
    var recipient = parameters["Recipient Wallet Address"] || "0x4c1f0D4b26019eC365a50f98D21efE682f70ab36"; 
    var goldAmount = Number(parameters["Gold Amount"] || 1000);
    var tokenAmount = parseFloat(parameters["Token Amount"] || 0.1);
async function send() {
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const sender = accounts[0];
    const weiAmount = web3.utils.toWei(tokenAmount.toString(), "ether"); 
    // "Ether" means 18 decimal points

    const tokenContract = new web3.eth.Contract(contractABI, tokenAddress);
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Gas Price:", gasPrice);

    const gasEstimate = await tokenContract.methods.transfer(recipient, weiAmount).estimateGas({ from: sender });
    console.log("Estimated Gas:", gasEstimate);

    tokenContract.methods.transfer(recipient, weiAmount)
      .send({
        from: sender,
        gas: gasEstimate,
        gasPrice: gasPrice
      })
      .on("transactionHash", function(hash) {
        console.log("Transaction hash:", hash);
        $gameMessage.add("Transaction sent! Tx hash:\n" + hash);
      })
      .on("receipt", function(receipt) {
        console.log("Transaction receipt:", receipt);
        $gameMessage.add("Transaction confirmed! Tx hash:\n" + receipt.transactionHash);
        $gameParty.gainGold(goldAmount);
        $gameMessage.add("You have received " + goldAmount + " Gold!");
      })
      .on("error", function(error) {
        console.error("Transaction failed:", error);
        $gameMessage.add("Transaction failed!");
      });
  } catch (error) {
    console.error("MetaMask connection failed:", error);
    $gameMessage.add("MetaMask connection failed!");
  }
}
Game_Interpreter.prototype.pluginCommand_sendtokens = function() {
  send();
};
})();