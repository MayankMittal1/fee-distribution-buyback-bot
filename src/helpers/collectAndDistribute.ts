import { ethers } from "ethers";
import { ABI } from "../../types/FeeManagerABI"

const FEE_MANAGER_ADDRESS = process.env.FEE_MANAGER_ADDRESS as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

export const collectAndDistribute = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const signer = new ethers.Wallet(PRIVATE_KEY, provider)
    const feeManager = new ethers.Contract(FEE_MANAGER_ADDRESS, ABI, signer)
    const collectTx = await feeManager.collect();
    await collectTx.wait();
    const distributeTx = await feeManager.distribute();
    await distributeTx.wait();
    console.log("Fees collected and distributed successfully")
}