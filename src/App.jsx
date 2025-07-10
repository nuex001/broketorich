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

function App() {
  const { data: walletClient } = useWalletClient();
  const [stage, setStage] = useState(0);
  const signer = useEthersSigner();
  const { sendTransactionAsync, data } = useSendTransaction();

  const buyIntoPresle = async (e) => {
    e.preventDefault();
    try {
      const BNB_AMOUNT = e.target[0].value;
      if (!BNB_AMOUNT || isNaN(BNB_AMOUNT) || BNB_AMOUNT <= 0) {
        alert("Please enter a valid BNB amount.");
        return;
      }
      if (!signer) {
        alert("Wallet not connected or signer not available.");
        return;
      }
      const tx = await sendTransactionAsync({
        to: CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(BNB_AMOUNT),
      });

      alert("Presale successful! Tokens will be sent to your wallet.");
      setStage(2);
    } catch (error) {
      console.log(error);
      setStage(0);
    }
  };

  const backFunc = (e) =>{
    e.preventDefault();
    setStage(1);
  }

  useEffect(() => {
    if (walletClient) {
      setStage(2);
    } else {
      setStage(0);
    }
  }, [walletClient]);

  return (
    <div className="container">
      <h1>PRESALE SECTION</h1>
      {stage === 0 ? (
        <div className="first_Section">
          <h2>Welcome to the Presale!</h2>
          <p>Connect your wallet to participate.</p>
          <ConnectButton />
        </div>
      ) : stage === 1 ? (
        <form className="second_Section" onSubmit={buyIntoPresle}>
          <h2>0.00001 BNB per 1 BTR</h2>
          <input
            type="tel"
            placeholder="Enter BNB amount (e.g. 0.1)"
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
          <button className="back_btn" onClick={backFunc}>Back</button>
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
