import { useState } from "react";
import { Web3Storage } from "web3.storage";

const useWeb3Storage = () => {
    const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_TOKEN ?? "" });
    const [cid, setCid] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const uploadFiles = async (
        files: Array<File>,
        onSuccess?: (cid: string) => any
    ) => {
        try {
            setIsUploading(true);
            const uploadedCid = await client.put(files);
            setCid(uploadedCid);
            setIsUploading(false);

            if (onSuccess) {
                await onSuccess(uploadedCid)
            }
        } catch (e) {
            console.error(e);
            setIsUploading(false);
        }
    }

    return { cid, isUploading, uploadFiles }
}

export default useWeb3Storage;