const express=require('express')
const app=express();

require('dotenv').config();
const port=8000;



const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");



const privateKey = process.env.PRIVATE_KEY;
const keyPairId = process.env.KEY_PAIR_ID;



app.get('/',  async(req, res) => {
    try {
      const signedUrl = getSignedUrl({
        url: `http://do2lrnf2jhdxm.cloudfront.net/car2.jpg`,
        dateLessThan:new Date(Date.now()+1000*60*5),
        privateKey,
        keyPairId,
      });
      console.log(signedUrl);
      res.status(200).send("Hi there!");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

app.listen(port,()=>{
    console.log(`running on port${port}..`)
})