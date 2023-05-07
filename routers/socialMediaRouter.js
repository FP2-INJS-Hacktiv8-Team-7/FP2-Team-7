const router = require("express").Router()

const socialMediaController = require('../controllers/socialMediaController')

router.post('/',socialMediaController.createsocialmedia)
router.get('/',socialMediaController.readsocialmedia)
router.put('/',socialMediaController.updatesocialmedia)
router.delete('/:socialMediaId',socialMediaController.deletesocialmedia)

module.exports = router
