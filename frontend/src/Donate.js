import './App.css';
import {ethers} from 'ethers'
import { Link } from "react-router-dom";
import { ADDRESS } from './config'
import BankArtifact from "./artifacts/contracts/Bank.sol/Bank.json"
const bankAddress = ADDRESS;


function Donate() {

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  async function _initialContract(init) {
    const contract = new ethers.Contract(bankAddress, BankArtifact.abi, init);
    return contract;
  }

  async function Donate() {
    if(typeof window.ethereum !== 'undefined') {
      try{
      await requestAccount();
      const _value = document.getElementById('value').value;
      const contract = await _initialContract(signer);
      const depositEth = await contract.deposit({value: ethers.utils.parseEther(_value)})
      document.getElementById('msg').value = "Transaction pending"
      await depositEth.wait();
      document.getElementById('msg').value = "Thanks for donating"
      document.getElementById('value').value = ""
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
      <input placeholder="Amount" type="number" tabindex="1" id="value" required autofocus />
    </fieldset>
    <fieldset>
      <input placeholder="Message" type="text" tabindex="1" id="msg" required autofocus disabled/>
    </fieldset>
    <fieldset>
      <button name="submit" onClick={Donate} id="contact-submit" data-submit="...Sending">Donate</button>
      Get 0.01 every day by clicking <Link to="/">withdraw</Link>.
    </fieldset>
  </div>
</div>
    </div>
  )
}

export default Donate;