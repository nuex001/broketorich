import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSendTransaction, useWalletClient } from "wagmi";
import { ABI, CONTRACT_ADDRESS } from "./utils/Constant";
import { useEthersSigner } from "./utils/ethers";
import { ethers } from "ethers";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { errorMsgs, successMsg } from "./utils/utils";

function App() {
  const { data: walletClient } = useWalletClient();
  const [stage, setStage] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const signer = useEthersSigner();
  const { sendTransactionAsync, data } = useSendTransaction();

  const buyIntoPresle = async (e) => {
    e.preventDefault();
    try {
      const BNB_AMOUNT = parseFloat(e.target[0].value);
      if (!BNB_AMOUNT || isNaN(BNB_AMOUNT) || BNB_AMOUNT <= 0) {
        errorMsgs("Please enter a valid BNB amount.");
        return;
      }
      if (!signer) {
        errorMsgs("Wallet not connected or signer not available.");
        return;
      }
      const tx = await sendTransactionAsync({
        to: CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(String(BNB_AMOUNT)),
      });
      setTokenAmount(0);
      successMsg("Presale successful! Tokens will be sent to your wallet.");
      setStage(2);
    } catch (error) {
      console.log(error);
      errorMsgs("Transaction failed. Please try again.");
      setStage(0);
    }
  };

  const backFunc = (e) => {
    e.preventDefault();
    setStage(1);
  };

 
const onchangeFunc = (e) => {
  const bnbAmount = e.target.value;

  if (!bnbAmount || isNaN(bnbAmount)) {
    setTokenAmount("0");
    return;
  }

  // Convert input to wei
  const bnbInWei = ethers.utils.parseUnits(bnbAmount.toString(), "ether");

  // 100,000 tokens per BNB, with 18 decimals
  const tokenPerBNB = ethers.BigNumber.from("100000").mul(ethers.constants.WeiPerEther);

  // Calculate token amount in wei
  const tokens = bnbInWei.mul(tokenPerBNB).div(ethers.constants.WeiPerEther);

  // Format for UI (remove 18 decimals)
  const formattedTokens = ethers.utils.formatUnits(tokens, 18);

  setTokenAmount(formattedTokens); // this will now show "7000.0" instead of huge raw value
  console.log(`User gets ${formattedTokens} BTR`);
};

  const moveToNext = (e)=>{
    e.preventDefault();
    if (walletClient) {
      setStage(1);
    } else {
      errorMsgs("Please connect your wallet first.");
    }
  }
  useEffect(() => {
    if (walletClient) {
      setStage(1);
    } else {
      setStage(0);
    }
    setTokenAmount(0);
  }, [walletClient]);

  return (
    <div className="container">
      <ToastContainer />
      <h1>PRESALE SECTION</h1>
      {stage === 0 ? (
        <div className="first_Section">
          <h2>Welcome to the Presale!</h2>
          <p>Connect your wallet to participate.</p>
          <ConnectButton />
          <button onClick={moveToNext}>Next</button>
        </div>
      ) : stage === 1 ? (
        <form className="second_Section" onSubmit={buyIntoPresle}>
         <h2>Price: 1 BTR = 0.00001 BNB</h2>
         <h3>You will receive {tokenAmount}BTR</h3>
          <input
            type="tel"
            placeholder="Enter BNB amount (e.g. 0.1)"
            onChange={onchangeFunc}
            required
          />

          <button>Buy</button>
          {/* <ConnectButton /> */}
        </form>
      ) : (
        <div className="success_cont">
          <FaHeartCircleCheck className="icon" />
          <h2>Presale bought Successfully!</h2>
          <p>✓Thank you for Joining the movement.</p>
          <p>Stay tuned for more updates.</p>
          <button className="back_btn" onClick={backFunc}>
            Back
          </button>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}

export default App;
/**
 * 
 * <div className="second_Section">
        <h2>Presale is Live!</h2>
        <p>Thank you for connecting your wallet.</p>
        <p>Stay tuned for more updates.</p>
        <ConnectButton />
      </div>
 */
