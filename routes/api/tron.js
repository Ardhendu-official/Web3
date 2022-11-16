const express = require('express');
const TronWeb = require('tronweb');
const hdWallet = require('tron-wallet-hd');
const keyStore = hdWallet.keyStore;
const utils = hdWallet.utils;
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
    res.send({ data: 'tron' });
});

/////////////////////////////// CREATE ACCOUNT WITH PHASE //////////////////////////////

router.post("/account", async (req, res) => {
    let seed = await utils.generateMnemonic();
    let accounts = await utils.generateAccountsWithMnemonic(seed, 1);
    let data = {
        "account": {
            "privateKey": accounts[0].privateKey,
            "address": accounts[0].address
        },
        "phase": seed
    }
    res.send(data);
})

/////////////////////////////// CREATE RANDOM WITH PHASE (DEPCRICATED) //////////////////////////////

router.post("/wallet", async (req, res) => {
    let data = await tronWeb.createRandom({ path: "m/44'/195'/0'/0/2", extraEntropy: '', locale: 'en' });
    let final_data = {
        "mnemonic": {
            "phrase": data.mnemonic.phrase,
            "path": "m/44'/195'/0'/0/2",
            "locale": "en"
        },
        "privateKey": tronWeb.fromUtf8(data.privateKey),
        "publicKey": tronWeb.toAscii(data.publicKey),
        "privateey": tronWeb.toUtf8(tronWeb.fromUtf8(data.privateKey)),
        "publicey": tronWeb.fromAscii(tronWeb.toAscii(data.publicKey)),
        "address": data.address
    }
    res.status(404)
    res.send({ status: 404, massage: "Reaquiest can't process" })
})

/////////////////////////////// GET DETAILS WITH ADDRESS //////////////////////////////

router.post("/wallet/details", async (req, res) => {
    let url = `https://apilist.tronscan.org/api/account?address=${req.body.address}`;
    if (tronWeb.isAddress(req.body.address)) {
        await axios.get(url).then((data) => {
            res.status(200)
            res.send(data.data)
        }).catch(e => {
            res.status(404)
            res.send({ status: 404, massage: "Enter Valid Address" })
            console.log(e)
        })
    } else {
        res.status(404)
        res.send({ status: 404, massage: "Wrong Address" })
    }
})

/////////////////////////////// GET DETAILS WITH PRIVATE KEY //////////////////////////////

router.post("/wallet/details", async (req, res) => {
    let addtess = await tronWeb.address.fromPrivateKey(req.body.privateKey);
    let url = `https://apilist.tronscan.org/api/account?address=${addtess}`;
    if (tronWeb.isAddress(req.body.address)) {
        await axios.get(url).then((data) => {
            let send_data = {
                'address': address,
                'details': data.data
            }
            res.status(200)
            res.send(send_data)
        }).catch(e => {
            res.status(404)
            res.send({ status: 404, massage: "Enter Valid Address" })
            console.log(e)
        })
    } else {
        res.status(404)
        res.send({ status: 404, massage: "Wrong Address" })
    }
})

/////////////////////////////// IMPORT WALLET FROM PHASE //////////////////////////////

router.post("/wallet/import/phase", async (req, res) => {
    let phase = req.body.phase;
    // let data = await tronWeb.address.fromPrivateKey(pKey)
    if (utils.validateMnemonic(phase)) {
        let data = await utils.getAccountAtIndex(phase)
        res.send(data);
    } else {
        res.status(404)
        res.send({ status: 404, massage: "Wrong Phase" })
    }
})

/////////////////////////////// IMPORT WALLET FROM PRIVATE KEY //////////////////////////////

router.post("/wallet/import/private", async (req, res) => {
    let pkey = req.body.pkey;
    if (utils.validatePrivateKey(pkey)) {
        let data = await utils.getAccountFromPrivateKey(pkey);
        let send_data = {
            "privateKey": pkey,
            "address": data
        }
        res.send(send_data);
    } else {
        res.status(404)
        res.send({ status: 404, massage: "Wrong Private Key" })
    }
})

/////////////////////////////// FETCH BALANCE FROM ADDRESS //////////////////////////////

router.post("/wallet/balance", async (req, res) => {
    let url = `https://apilist.tronscan.org/api/account?address=${req.body.address}`;
    if (tronWeb.isAddress(req.body.address)) {
        await axios.get(url).then((data) => {
            let send_data = {
                'address': req.body.address,
                'details': data.data.tokenBalances[0].amount
            }
            res.status(200)
            res.send(send_data)
        }).catch(e => {
            res.status(404)
            res.send({ status: 404, massage: "Enter Valid Address" })
            console.log(e)
        })
    } else {
        res.status(404)
        res.send({ status: 404, massage: "Wrong Address" })
    }
})

/////////////////////////////// SEND TRX (TESTING) //////////////////////////////

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
    let data = await tronWeb.transactionBuilder.sendTrx("TS3GQzrHfLD4vvP9HKuThg1RBiKBWkCoRk", 100, "TRs3FRfbN9cV8NY53TBqCRcytRMyw53r7p");
    res.send(data)
})

module.exports = router;