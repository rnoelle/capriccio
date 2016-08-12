var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + file.originalname);
  }
});
var uploading = multer({ storage: storage});

module.exports = {
  composerUpload: uploading.fields([
    {name: 'submissionScore', maxCount:1},
    {name:'submissionParts', maxCount: 1},
    {name:'cover', maxCount: 1}
  ]),
  adminUpload: {}
};
