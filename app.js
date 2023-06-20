const express=require('express')
const app=express();

require('dotenv').config();
const port=8000;



const { getSignedUrl } = require("@aws-sdk/cloudfront-signer"); // CJS


// const s3ObjectKey = "private-content/private.jpeg";
// const url = `d5uga16mdp5g1.cloudfront.net/car3.jpeg`;
// const dateLessThan = Math.floor(Date.now() / 1000) + 300 
const privateKey = process.env.PRIVATE_KEY;
const keyPairId = process.env.KEY_PAIR_ID;



app.get('/',  async(req, res) => {
    try {
    
      // const signedUrl = await getSignedUrl({
      //   url: "https://d5uga16mdp5g1.cloudfront.net/car3.jpeg",
      //   dateLessThan:new Date(Date.now()+1000*60*5),
      //   keyPairId,
      //   privateKey,
      // });
      const expires = Math.floor(Date.now() / 1000) + 300; // 5 minutes
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