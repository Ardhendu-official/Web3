const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    res.send({ data: 'Puspendu' });
});

module.exports = router;