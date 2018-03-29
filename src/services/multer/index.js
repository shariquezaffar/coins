var multer  = require('multer')
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		// console.log(file)
		callback(null,  Date.now() + file.originalname)
	}
})
export const upload  = multer({ storage: storage })