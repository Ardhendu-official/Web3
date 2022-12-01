const express = require('express');
const axios = require("axios")
const router = express.Router();


router.get("/", async (req, res) => {
    res.send({ data: 'swap' });
});

/////////////////////////////// CURRENCY //////////////////////////////

router.get("/curency/", async (req, res) => {
    let curency_name = req.query.name;
    const API_KEY = '8747d152-4e27-41ea-a80e-dd02dd214c9d'
    axios.get(`https://api.simpleswap.io/get_currency?api_key=${API_KEY}&symbol=${curency_name}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// ALL CURRENCY //////////////////////////////

router.get("/curency/all/", async (req, res) => {
    const API_KEY = '8747d152-4e27-41ea-a80e-dd02dd214c9d'
    axios.get(`https://api.simpleswap.io/get_all_currencies?api_key=${API_KEY}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// PAIR //////////////////////////////

router.get("/pair/", async (req, res) => {
    let curency_name = req.query.name;
    let fixed = req.query.fixed;
    const API_KEY = '8747d152-4e27-41ea-a80e-dd02dd214c9d'
    axios.get(`https://api.simpleswap.io/get_pairs?api_key=${API_KEY}&fixed=${fixed}&symbol=${curency_name}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// ALL PAIR (NOT RECOMENDED) //////////////////////////////

router.get("/pair/all/", async (req, res) => {
    let fixed = req.query.fixed;
    const API_KEY = '8747d152-4e27-41ea-a80e-dd02dd214c9d'
    axios.get(`https://api.simpleswap.io/get_all_pairs?api_key=${API_KEY}&fixed=${fixed}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// ESTIMATED //////////////////////////////

router.get("/estimated/", async (req, res) => {
    let fixed = req.query.fixed;
    let currency_from = req.query.currency_from;
    let currency_to = req.query.currency_to;
    let amount = req.query.amount;
    const API_KEY = '8747d152-4e27-41ea-a80e-dd02dd214c9d'
    axios.get(`https://api.simpleswap.io/get_estimated?api_key=${API_KEY}&fixed=${fixed}&currency_from=${currency_from}&currency_to=${currency_to}&amount=${amount}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

/////////////////////////////// RANGE //////////////////////////////

router.get("/range/", async (req, res) => {
    let fixed = req.query.fixed;
    let currency_from = req.query.currency_from;
    let currency_to = req.query.currency_to;
    let amount = req.query.amount;
    const API_KEY = '8747d152-4e27-41ea-a80e-dd02dd214c9d'
    axios.get(`https://api.simpleswap.io/get_ranges?api_key=${API_KEY}&fixed=${fixed}&currency_from=${currency_from}&currency_to=${currency_to}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})


/////////////////////////////// CHECK //////////////////////////////

router.get("/check/", async (req, res) => {
    axios.get(`https://api.simpleswap.io/check_exchanges`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

router.get("/all/pair/", async (req, res) => {
    let page_size = req.query.page_size;
    let page_num = req.query.page_num;
    let ver = req.query.ver;
    axios.get(`https://openapi.sun.io/v2/allpairs?page_size=${page_size}&page_num=${page_num}&ver=${ver}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

router.get("/pair/add/", async (req, res) => {
    let page_size = req.query.page_size;
    let page_num = req.query.page_num;
    let ver = req.query.ver;
    let token_address = req.query.token_address;
    axios.get(`https://openapi.sun.io/v2/allpairs?page_size=${page_size}&page_num=${page_num}&ver=${ver}&token_address=${token_address}`).then((data) => {
        res.status(200)
        res.set('content-type', 'application/json')
        res.send(data.data)
    }).catch((e) => { console.log(e) })
})

module.exports = router;