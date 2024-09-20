(() => {
  // Function to initialize Web3 after the library has loaded
  function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      // Request MetaMask account connection
      window.web3 = new Web3(window.ethereum);
      ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          console.log('Connected account:', accounts[0]);
          $gameVariables.setValue(1, accounts[0]);
          const metamasktrue = "Connected with\n" + $gameVariables.value(1);
          $gameMessage.add(metamasktrue);
        })
        .catch(error => {
          console.error('MetaMask connection failed:', error);
        });
    } else {
      console.warn('MetaMask is not installed. Please install MetaMask to use Web3 features.');
      const nometamask= "MetaMask is not installed.\nPlease install MetaMask to use Web3 features."
      $gameMessage.add(nometamask);
    }
  }

  // Create a script element to load the Web3.js library from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/web3@4.13.0/dist/web3.min.js';

  // Set up a callback to initialize Web3 once the script is loaded
  script.onload = () => {
    console.log('Web3.js loaded successfully');
  };
  // Append the script element to the <head> of the document to load it
  document.head.appendChild(script);
  Game_Interpreter.prototype.pluginCommand_iniweb3 = function() {
    initializeWeb3();
  };
})();