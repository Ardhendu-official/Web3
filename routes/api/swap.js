const express = require('express');
const axios = require("axios")
const router = express.Router();


router.get("/", async (req, res) => {
    res.send({ data: 'swap' });
});

/////////////////////////////// CURRENCY //////////////////////////////

router.get("/curency/", async (req, res) => {
    let curency_name = req.query.name;
    const API_KEY = 'a3879857-ae84-4062-bc87-8bd5fe6b7b0e'
    axios.get(`https://api.simpleswap.io/get_currency?api_key=${API_KEY}&symbol=${curency_name}`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// ALL CURRENCY //////////////////////////////

router.get("/curency/all/", async (req, res) => {
    const API_KEY = 'a3879857-ae84-4062-bc87-8bd5fe6b7b0e'
    axios.get(`https://api.simpleswap.io/get_all_currencies?api_key=${API_KEY}`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// PAIR //////////////////////////////

router.get("/pair/", async (req, res) => {
    let curency_name = req.query.name;
    let fixed = req.query.fixed;
    const API_KEY = 'a3879857-ae84-4062-bc87-8bd5fe6b7b0e'
    axios.get(`https://api.simpleswap.io/get_pairs?api_key=${API_KEY}&fixed=${fixed}&symbol=${curency_name}`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// ALL PAIR (NOT RECOMENDED) //////////////////////////////

router.get("/pair/all/", async (req, res) => {
    let fixed = req.query.fixed;
    const API_KEY = 'a3879857-ae84-4062-bc87-8bd5fe6b7b0e'
    axios.get(`https://api.simpleswap.io/get_all_pairs?api_key=${API_KEY}&fixed=${fixed}`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// ESTIMATED //////////////////////////////

router.get("/estimated/", async (req, res) => {
    let fixed = req.query.fixed;
    let currency_from = req.query.currency_from;
    let currency_to = req.query.currency_to;
    let amount = req.query.amount;
    const API_KEY = 'a3879857-ae84-4062-bc87-8bd5fe6b7b0e'
    axios.get(`https://api.simpleswap.io/get_estimated?api_key=${API_KEY}&fixed=${fixed}&currency_from=${currency_from}&currency_to=${currency_to}&amount=${amount}`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// RANGE //////////////////////////////

router.get("/range/", async (req, res) => {
    let fixed = req.query.fixed;
    let currency_from = req.query.currency_from;
    let currency_to = req.query.currency_to;
    let amount = req.query.amount;
    const API_KEY = 'a3879857-ae84-4062-bc87-8bd5fe6b7b0e'
    axios.get(`https://api.simpleswap.io/get_ranges?api_key=${API_KEY}&fixed=${fixed}&currency_from=${currency_from}&currency_to=${currency_to}`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})


/////////////////////////////// CHECK //////////////////////////////

router.get("/check/", async (req, res) => {
    axios.get(`https://api.simpleswap.io/check_exchanges`).then((data) => {
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})


module.exports = router;