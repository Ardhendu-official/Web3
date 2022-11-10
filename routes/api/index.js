const express = require('express');
const router = express.Router();

// const cameraRoutes = require('./cameras');
// const recordingsRoutes = require('./recordings');
// const statusRoutes = require('./status');
const home = require('./home');
const tron = require('./tron');

// router.use('/cameras', cameraRoutes);
// router.use('/recordings', recordingsRoutes);
// router.use('/status', statusRoutes);

router.use('/', home)
router.use('/tron', tron)

module.exports = router;