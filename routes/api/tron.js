const express = require('express');
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const hdWallet = require('tron-wallet-hd');
const keyStore = hdWallet.keyStore;
const utils = hdWallet.utils;
const axios = require("axios")
const fullNode = 'https://api.trongrid.io';
const solidityNode = 'https://api.trongrid.io';
const eventServer = 'https://api.trongrid.io';
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

/////////////////////////////// IS PHASE //////////////////////////////

router.post("/isphase", async (req, res) => {
    if (utils.validateMnemonic(req.body.phase)) {
        res.status(200)
        res.send({ status: true, massage: "It's a Phase" })
    } else {
        res.status(400)
        res.send({ status: false, massage: "It's not a Phase" })
    }
})

/////////////////////////////// SEND TRX (TESTING) //////////////////////////////

// router.post("/wallet/send", async (req, res) => {
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
// let data = await tronWeb.transactionBuilder.sendTrx("TS3GQzrHfLD4vvP9HKuThg1RBiKBWkCoRk", 100, "TRs3FRfbN9cV8NY53TBqCRcytRMyw53r7p");
// res.send(data)
// })

/////////////////////////////// SEND TRX (TESTING) //////////////////////////////

async function sendTrx(fromAddress, toAddress, amount, privateKey, AppKey) {

    const tronWebSend = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    tronWebSend.setHeader({ "TRON-PRO-API-KEY": API_Key });

    console.log(tronWeb.address.toHex(fromAddress) + " => " + tronWeb.address.toHex(toAddress))

    const tradeobj = await tronWebSend.transactionBuilder.sendTrx(
        tronWeb.address.toHex(toAddress),
        amount,
        tronWeb.address.toHex(fromAddress)
    );
    await tronWebSend.transactionBuilder.sendTrx()
    console.log('tradeobj => ' + tradeobj)

    const signedtxn = await tronWebSend.trx.sign(
        tradeobj,
        privateKey
    );

    console.log('signedtxn => ' + signedtxn);

    const receipt = await tronWebSend.trx.sendRawTransaction(
        signedtxn
    );

    console.log('receipt => ' + receipt);
    
    return receipt;
}

async function sendTrxApi(fromAddress, toAddress, amount, privateKey, AppKey) {
    let axios = require("axios");

    let options = {
        method: 'POST',
        url: 'https://api.trongrid.io/wallet/createtransaction',
        headers: {
            'TRON-PRO-API-KEY': API_Key,
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:2352'
        },
        body: {
            to_address: tronWeb.address.toHex(toAddress),
            owner_address: tronWeb.address.toHex(fromAddress),
            amount: amount
        },
        json: true
    };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     console.log(body);
    //     return body;
    // });

    axios.post('https://api.trongrid.io/wallet/createtransaction', { body: options.body }, { headers: options.headers }).then((data) => {
        console.log(data.data);
        return data.data
    }).catch((e) => {
        console.log(e)
        return e
    })
}

// async function sendTrxNodeApi(fromAddress, toAddress, amount, privateKey, AppKey) {
//     const sdk = require('api')('@tron/v4.5.2#2rmgtmla6jxxz8');

//     sdk.gettransactionsign({
//         transaction: {
//             raw_data: '{"contract":[{"parameter":{"value":{"amount":1000,"owner_address":"41608f8da72479edc7dd921e4c30bb7e7cddbe722e","to_address":"41e9d79cc47518930bc322d9bf7cddd260a0260a8d"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"5e4b","ref_block_hash":"47c9dc89341b300d","expiration":1591089627000,"timestamp":1591089567635}',
//             raw_data_hex: '0a025e4b220847c9dc89341b300d40f8fed3a2a72e5a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a1541608f8da72479edc7dd921e4c30bb7e7cddbe722e121541e9d79cc47518930bc322d9bf7cddd260a0260a8d18e8077093afd0a2a72e'
//         },
//         privateKey: 'your private key'
//     })
//         .then(({ data }) => console.log(data))
//         .catch(err => console.error(err));
// }

router.post("/wallet/send", async (req, res) => {
    sendTrx(req.body.from_account, req.body.to_account, req.body.amount, req.body.privateKey, API_Key).then((data) => {
        console.log("ok" + data);
        res.status(200)
        res.send(data)
    })
        .catch((err) => {
            console.log("error:", err);
            res.status(400)
            res.send(err)
        });
})

module.exports = router;