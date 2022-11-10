const express = require('express');
const Web3 = require("web3");
const TronWeb = require('tronweb');
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
    let data = await tronWeb.createAccount();
    res.send(data);
})

router.post("/wallet", async (req, res) => {
    let data = await tronWeb.createRandom({ path: "m/44'/195'/0'/0/0", extraEntropy: '', locale: 'en' });
    res.send(data);
})

router.post("/wallet/details", async (req, res) => {
    let url = `https://apilist.tronscan.org/api/account?address=${req.body.address}`;

    if(tronWeb.isAddress(req.body.address)){
        tronWeb.trx.getBalance(req.body.address).then((result) => {
            let data = result
            console.log(data);
            res.send(JSON.parse(data));
        })
    }
})

router.post("/wallet/import", async (req, res) => {
    let mKey = req.body.mkey;
    let data = await tronWeb.fromMnemonic(mKey)
    res.send(data);
})

module.exports = router;