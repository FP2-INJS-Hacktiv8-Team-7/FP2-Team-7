const router = require("express").Router()

const socialMediaController = require('../controllers/socialMediaController')

router.post('/socialmedias',socialMediaController.createsocialmedia)
router.get('/socialmedias',socialMediaController.readsocialmedia)
router.put('/socialmedias',socialMediaController.updatesocialmedia)
router.delete('/socialmedias/:socialMediaId',socialMediaController.deletesocialmedia)

module.exports = router
