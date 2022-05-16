import { FC, useState } from "react";
import { Modal, Button, useNotification } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

interface ChildProps {
  ipfsUrl: string;
  isVisible: boolean;
  setVisible: () => void;
}
const ModalComp: FC<ChildProps> = ({ ipfsUrl, isVisible, setVisible }) => {
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Nice! You just mint a Nft!!`,
      title: "Miniting Succesful",
      position: "topL",
    });
  };
  console.log("ipfs in Modal", ipfsUrl);
  const handleError = (msg: string) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Miniting Failed",
      position: "topL",
    });
  };
  const mint = async () => {
    console.log("minited", ipfsUrl);
    console.log(account);
    let options = {
      contractAddress: "0x19089c2F05AE286F21467d131e0679902eeffC13",
      functionName: "safeMint",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        to: account,
        uri: ipfsUrl,
      },
      msgValue: Moralis.Units.ETH(1),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess();
      },
      onError: (error) => {
        console.log("error message", error.message);
        // @ts-ignore
        handleError(error.message);
      },
    });
    setVisible();
  };
  const closeButtonHandler = () => {
    setVisible();
  };

  return (
    <>
      <div>
        <div>
          <Modal
            isVisible={isVisible}
            hasCancel={false}
            onCloseButtonPressed={closeButtonHandler}
            hasFooter={false}
            isCentered={true}
            title={
              <div style={{ display: "flex", gap: 10 }}>
                <h3 color="#68738D">Publish Success.</h3>
              </div>
            }
          >
            <div
              style={{
                display: "grid",
                placeItems: "center",
                width: "100%",
                padding: "10px",
              }}
            >
              <div>
                <Button text="Mint" onClick={mint} />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ModalComp;
