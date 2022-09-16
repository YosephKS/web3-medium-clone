import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import { Web3Storage, Blob, File } from "web3.storage";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN ?? "" });

app.get("/getAllBlogsByUserAddress", async (req: Request, res: Response) => {
  try {
    const { query } = req ?? {};
    const { address } = query ?? {};

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      // @ts-ignore
      address,
      chain: EvmChain.MUMBAI,
      tokenAddresses: ["0x3007f9e235363eEa58F0ed684a261AAC8523A420"],
    });

    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/getAllBlogs", async (req: Request, res: Response) => {
  try {
    const response = await Moralis.EvmApi.nft.getContractNFTs({
      address: "0x3007f9e235363eEa58F0ed684a261AAC8523A420",
      chain: EvmChain.MUMBAI,
    });

    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/requestAuth", async (req: Request, res: Response) => {
  try {
    const { body } = req ?? {};
    const { address } = body ?? {};

    const response = await Moralis.Auth.requestMessage({
      domain: "web3.medium",
      chain: EvmChain.MUMBAI,
      address,
      network: "evm",
      statement: "Please sign this message to confirm your identity.",
      uri: "https://web3.medium",
      timeout: 15,
    });
    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/verifyAuth", async (req: Request, res: Response) => {
  try {
    const { body } = req ?? {};
    const { message, signature } = body ?? {};

    const response = await Moralis.Auth.verify({
      message,
      signature,
      network: "evm",
    });
    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/uploadWeb3Storage", async (req: Request, res: Response) => {
  try {
    const { body } = req ?? {};
    const { blog } = body ?? {};
    const blob = new Blob(
      [
        JSON.stringify({
          ...blog,
          image: "https://filecoin.io/uploads/moralis-hackathon.png",
        }),
      ],
      {
        type: "application/json",
      }
    );
    const cid = await client.put([new File([blob], "metadata.json")]);
    res.send({ cid });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, async () => {
  await Moralis.start({
    apiKey: "test",
    // ...and any other configuration
  });
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
