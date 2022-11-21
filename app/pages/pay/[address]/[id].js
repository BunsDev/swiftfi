import React, { useEffect, useState } from "react";
import SwiftPayRequest from "../../../components/SwiftPayRequest";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/dist/client/router";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  payments_data,
  paymentRequest_data,
} from "../../../constants/constants";
import { id } from "ethers/lib/utils";
import { fetchIPFS } from "../../../functionality/fetchIPFS";
import { ethers } from "ethers";
// import { fetchPriceFeeds } from "../../../functionality/fetchPriceFeeds";
/// for payment Request

export default function Id() {
  const [userAddress, setUserAddress] = useState("");
  const [details, setdetails] = useState({});
  const [id, setId] = useState(0);
  const [requestData, setRequestData] = useState("");
  const [amount$, setAmount$] = useState(0);
  const [amountMatic, setAmountMatic] = useState(0);
  const router = useRouter();
  const _address = router.query.address;
  const _id = router.query.id;

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Payments_Contract = useContract({
    address: payments_data.address,
    abi: payments_data.abi,
    signerOrProvider: signer || provider,
  });

  const PaymentsRequest_Contract = useContract({
    address: paymentRequest_data.address,
    abi: paymentRequest_data.abi,
    signerOrProvider: signer || provider,
  });

  // const amountinUSD = fetchPriceFeeds(requestData.AmountinMatic);

  const fetchRequest = async (address_, id_) => {
    try {
      console.log("Fetching the request");
      const data = await PaymentsRequest_Contract.getRequest(id_, address_);
      console.log(data);

      const response = await fetch(data[2]);
      const ipfsData = await response.json();
      console.log(ipfsData);
      const _amount = ethers.utils.formatEther(
        parseInt(data.amount).toString()
      );
      setAmountMatic(_amount);
      const request = {
        PayerName: ipfsData.Payer,
        Note: ipfsData.Message,
        AmountinWei: data.amount,
        AmountinMatic: _amount,
        RequestId: id,
        RecieverAddress: userAddress,
      };
      console.log(request);
      setRequestData(request);
    } catch (err) {
      console.log(err);
    }
  };

  // const convertUSDtoMatic = async (amountInMatic) => {
  //   try {
  //     const maticUSD = await fetchPriceFeeds();
  //     const amountInUSD = maticUSD * amountInMatic;
  //     console.log(amountInUSD);
  //     setAmount$(amountInUSD);
  //     return amountInUSD;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    setUserAddress(_address);
    setId(_id);
    console.log(_id, _address);
    if (_id) {
      fetchRequest(_address, _id);
    }
  }, [_id]);

  // useEffect(async () => {
  //   // convertUSDtoMatic(amountMatic);
  // }, [amountMatic]);

  return (
    <div
      className={`${styles.bg} px-6 min-h-screen bg-[#0000008b] flex items-center justify-center flex-wrap`}
    >
      <div
        className={`${styles.paylink} flex flex-col items-center justify-start w-full `}
      >
        <h1 className="pt-6 pb-2 text-lg md:text-2xl font-semibold text-center">
          gm{" "}
          <span className="text-xl md:text-2xl font-semibold">
            {requestData.PayerName}
          </span>
          !!! this payment page was created with{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://swiftfi.vercel.app"
          >
            <u>SwiftFi</u>
          </a>{" "}
          🚀
        </h1>
        <h1 className="text-lg lg:text-xl mx-auto pb-8  text-center">
          <span className="text-lg font-semibold">
            {`${requestData.RecieverAddress}`.slice(0, 20)}...
          </span>{" "}
          has requested you{" "}
          <span className="text-lg font-semibold">
            {requestData.AmountinMatic} Matic
          </span>
        </h1>
        <div>
          <SwiftPayRequest
            id={requestData.RequestId}
            address={requestData.RecieverAddress}
            amount={requestData.AmountinWei}
          />
        </div>
        <div className="max-w-[700px] md:mt-[50px]">
          <h1 className="text-3xl  font-semibold pb-8 text-center">
            <span className="underline">Here&#39;s a note for you</span>🫡
          </h1>
          <p className="text-center px-4 pb-8">{requestData.Note}</p>
        </div>
      </div>

      {/* <div className={styles.align}>
        <Phone />
      </div> */}
    </div>
  );
}
