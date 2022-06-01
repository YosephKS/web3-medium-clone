Moralis.Cloud.define("getMetaData", async (request) => {
  const query = new Moralis.Query("MintedNFTs");
  const results = await query.find();
  const logger = Moralis.Cloud.getLogger();

  const promises = results.map(async (result) => {
    const uri = result.get("tokenURI");
    const owner = result.get("owner");
    const httpResponse = await Moralis.Cloud.httpRequest({ url: uri });
    logger.info(httpResponse.text);
    return { httpResponse: httpResponse, owner: owner };
  });

  const data = await Promise.all(promises);
  const metaDatas = data.map((metaData) => {
    const { httpResponse, owner } = metaData;
    return { ...httpResponse.data, owner: owner };
  });
  return metaDatas;
});

Moralis.Cloud.define("getMetaDataByAccount", async (request) => {
  const query = new Moralis.Query("MintedNFTs");
  query.equalTo("owner", request.params.owner);
  const results = await query.find();
  const logger = Moralis.Cloud.getLogger();

  const promises = results.map(async (result) => {
    const uri = result.get("tokenURI");
    const owner = result.get("owner");
    //return uri;
    const httpResponse = await Moralis.Cloud.httpRequest({ url: uri });
    logger.info(httpResponse.text);
    return { httpResponse: httpResponse, owner: owner };
  });

  const data = await Promise.all(promises);
  const metaDatas = data.map((metaData) => {
    const { httpResponse, owner } = metaData;
    return { ...httpResponse.data, owner: owner };
  });
  return metaDatas;
});
