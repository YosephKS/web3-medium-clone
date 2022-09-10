"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const moralis_1 = __importDefault(require("moralis"));
const evm_utils_1 = require("@moralisweb3/evm-utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/getAllBlogsByUserAddress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req !== null && req !== void 0 ? req : {};
    const { address } = body !== null && body !== void 0 ? body : {};
    const response = yield moralis_1.default.EvmApi.nft.getWalletNFTs({
        address,
        chain: evm_utils_1.EvmChain.POLYGON,
        token_addresses: ["0xd4509bc86bf5c3ec2be928be5248ae80de95a398"],
    });
    res.send(response);
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield moralis_1.default.start({
        apiKey: "test",
        // ...and any other configuration
    });
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
}));
