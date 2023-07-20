const router = require('express').Router();
const upload = require('../middleware/multerConfig');
const auth = require("../middleware/auth");
const acl = require('express-acl');


router.post('/',auth, acl.authorize, upload.array('file', 10), function (req, res, next) {

    const fileNames = req.files.map(file => file.filename)
    const urls = fileNames.map(filename => `${process.env.URL_SITE}/file/${filename}`)
    res.json({urls});

})


module.exports = router;