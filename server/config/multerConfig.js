const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpeg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, './files')
    },
    filename :function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        const extension = MIME_TYPES[file.mimetype];
        cb(null, uniqueSuffix + '.' + extension)
    }
})

const upload = multer({ storage: storage })


module.exports = upload