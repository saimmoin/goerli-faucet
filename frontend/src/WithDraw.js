import './App.css';
import {ethers} from 'ethers'
import BankArtifact from "./artifacts/contracts/Bank.sol/Bank.json"
import { Link } from "react-router-dom";
import { ADDRESS } from './config'
const bankAddress = ADDRESS

function WithDraw() {

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  async function _initialContract(init) {
    const contract = new ethers.Contract(bankAddress, BankArtifact.abi, init);
    return contract;
  }

  async function WithDraw() {
    if(typeof window.ethereum !== 'undefined') {
      try{
      await requestAccount();
      // const amount = document.getElementById('value').value;
      const contract = await _initialContract(signer);
      const addMessage = await contract.withdraw(ethers.utils.parseEther("0.01"))
      document.getElementById('msg').value = "Transaction pending"
      await addMessage.wait();
      document.getElementById('msg').value = "WithDrawed 0.01 ETH successfully"
      }
      catch(error) {
        document.getElementById('msg').value = error
      }
    }
  }


  return (
    <div className="App">
      <div class="container">  
  <div id="contact">
    <h3>Goerli ETH Faucet</h3>
    <h4>A Faucet build on ethereum test blockchain (goerli).</h4>
    <fieldset>
      <input placeholder="Message" type="text" tabindex="1" id="msg" required autofocus disabled/>
    </fieldset>
    <fieldset>
      <button name="submit" onClick={WithDraw} id="contact-submit" data-submit="...Sending">Get 0.01 ETH</button>
      Please <Link to="/donate">donate</Link> some ETH so other developers can also use the faucet.
    </fieldset>
  </div>
</div>
    </div>

  )
}

export default WithDraw;