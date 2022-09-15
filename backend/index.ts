import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/getAllBlogsByUserAddress", async (req: Request, res: Response) => {
  const { body } = req ?? {};
  const { address, tokenAddresses } = body ?? {};

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain: EvmChain.POLYGON,
    tokenAddresses,
  });
  res.send(response);
});

app.get("/verifyAuth", async (req: Request, res: Response) => {});

app.get("/requestAuth", async (req: Request, res: Response) => {});

app.listen(port, async () => {
  await Moralis.start({
    apiKey: "test",
    // ...and any other configuration
  });
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
