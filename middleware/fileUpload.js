const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './pictures')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = function (req, file, cb) {

    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    // fileFilter: fileFilter
});



module.exports = upload;