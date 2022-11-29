const express = require('express');
const router = express.Router();

// const cameraRoutes = require('./cameras');
// const recordingsRoutes = require('./recordings');
// const statusRoutes = require('./status');
const home = require('./home');
const tron = require('./tron');
const swap = require('./swap');

// router.use('/cameras', cameraRoutes);
// router.use('/recordings', recordingsRoutes);
// router.use('/status', statusRoutes);

router.use('/', home)
router.use('/tron', tron)
router.use('/swap', swap)

module.exports = router;