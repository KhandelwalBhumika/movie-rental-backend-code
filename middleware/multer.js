const multer = require('multer');

const fileStorageEngine = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + '---' + file.originalname)
    },
})

module.exports = upload = multer({
    storage: fileStorageEngine
})