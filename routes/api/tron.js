const express = require('express');
const Web3 = require("web3");
const TronWeb = require('tronweb');
const hdWallet = require('tron-wallet-hd');
const keyStore=hdWallet.keyStore;
const utils=hdWallet.utils;
const axios = require("axios")
const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
const privateKey = '6db106d7432c4bf7dbaad30959d66b6aacfa4664bd9511375a8c71ea829bdee1';
const API_Key = 'a0cbfe14-63dc-4b6f-9399-8abecf55adbd'
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
tronWeb.setHeader({ "TRON-PRO-API-KEY": API_Key });
const router = express.Router();

router.get("/", async (req, res) => {
    res.send({ data: 'Ether' });
});

router.post("/account", async (req, res) => {
    let seed = await utils.generateMnemonic();
    let accounts = await utils.generateAccountsWithMnemonic(seed,1);
    let data = {
        "account": {
            "privateKey": accounts[0].privateKey,
            "address": accounts[0].address
        },
        "phase": seed
    }
    res.send(data);
})

router.post("/wallet", async (req, res) => {
    let data = await tronWeb.createRandom({ path: "m/44'/195'/0'/0/0", extraEntropy: '', locale: 'en' });
    let final_data = {
        "mnemonic": {
          "phrase": data.mnemonic.phrase,
          "path": "m/44'/195'/0'/0/0",
          "locale": "en"
        },
        "privateKey": tronWeb.fromUtf8(data.privateKey),
        "publicKey": tronWeb.toAscii(data.publicKey),
        "privateey": tronWeb.toUtf8(tronWeb.fromUtf8(data.privateKey)),
        "publicey": tronWeb.fromAscii(tronWeb.toAscii(data.publicKey)),
        "address": data.address
    }
    res.send([final_data, data]);
})

router.post("/wallet/details", async (req, res) => {
    let url = `https://apilist.tronscan.org/api/account?address=${req.body.address}`;

    if(tronWeb.isAddress(req.body.address)){
        tronWeb.trx.getAccount(req.body.address).then((result) => {
            let data = result
            console.log(data);
            res.send(data)
        })
    }
})

router.post("/wallet/import", async (req, res) => {
    // let pKey = req.body.pkey;
    // let data = await tronWeb.address.fromPrivateKey(pKey)
    let mKey = req.body.mkey;
    let data = await tronWeb.fromMnemonic(mKey)
    res.send(data);
})

router.post("/wallet/import/private", async (req, res) => {
    let pKey = req.body.pkey;
    let key = await tronWeb.address.toHex(pKey)
    let data = await tronWeb.address.fromPrivateKey(key);
    // let data = await utils.getAccountFromPrivateKey(pKey);
    res.send(data);
})

router.post("/wallet/details", async (req, res) => {
    let url = `https://apilist.tronscan.org/api/account?address=${req.body.address}`;
    // let url = `https://apilist.tronscan.org/api/account?address=${req.body.address}`;

    if(tronWeb.isAddress(req.body.address)){
        tronWeb.trx.getAccount(req.body.address).then((result) => {
            let data = result
            console.log(data);
            res.send(data)
        })
    }
})

router.post("/wallet/send", async (req, res) => {
    // const privateKey = "0x6acf29c540a0c29899c898e6c31a7d318a97dfcba0148760c951f51d9dbc9dfb"; 
    // var fromAddress = "TGNFDPZimQ33UiQvjF6MH7dZdJ2dWpUncb"; //address _from
    // var toAddress = "TRs3FRfbN9cV8NY53TBqCRcytRMyw53r7p"; //address _to
    // var amount = 10; //amount
    // //Creates an unsigned TRX transfer transaction
    // tradeobj = await tronWeb.transactionBuilder.sendTrx(
    //     toAddress,
    //     amount,
    //     fromAddress
    // );
    // let signedtxn = await tronWeb.trx.sign(
    //     tradeobj,
    //     privateKey
    // );
    // let receipt = await tronWeb.trx.sendRawTransaction(
    //     signedtxn
    // ).then(output => {console.log('- Output:', output, '\n');});
    let data = await tronWeb.transactionBuilder.sendTrx("TRs3FRfbN9cV8NY53TBqCRcytRMyw53r7p", 100, "TGNFDPZimQ33UiQvjF6MH7dZdJ2dWpUncb");
    res.send(data)
})

router.post("/wallet/balance", async (req, res) => {
    // const privateKey = "6db106d7432c4bf7dbaad30959d66b6aacfa4664bd9511375a8c71ea829bdee1"; 
    let address = "TGNFDPZimQ33UiQvjF6MH7dZdJ2dWpUncb";  
    //Get account information，Query the trx balance by the balance in the return value.
    tradeobj = await tronWeb.trx.getBalance(address) .then(output => {console.log('- Output:', output, '\n');});
    res.send(tradeobj)
})


module.exports = router;