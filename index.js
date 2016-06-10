var Jimp = require('jimp')
var fs = require('fs')
var path = require('path')

var srcPath = '..\\src'
var targetPath = '.\\target'

function convert(relativePath) {
	var readDir = srcPath + relativePath
	var targetDir = targetPath + relativePath
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir)
	}

	var files = fs.readdirSync(readDir).forEach(function (name) {
		var filePath = path.join(readDir, name)
		var fileTarget = path.join(targetDir, name)
		convertOne(filePath, fileTarget)	
	})
}

function convertOne(source, target) {
Jimp.read('background.jpg').then(function (background) {
	Jimp.read(source).then(function (image) {
		console.log('Converting ' + source + ' to 512x512 in ' + target)
		var w = image.bitmap.width
		var h = image.bitmap.height

		var targetW = w
		var targetH = h
		var targetX = 0
		var targetY = 0
		if (w > h) {
			targetW = 512
			targetH = Jimp.AUTO
			
		} else {
			targetW = Jimp.AUTO
			targetH = 512
		}

		var resized = image.resize(targetW, targetH)

		if (w > h) {
			targetX = 0
			targetY = (512 - resized.bitmap.height) / 2
		} else {
			targetX = (512 - resized.bitmap.width) / 2
			targetY = 0
		}

		background.blit(resized,targetX,targetY).write(target)	
	}).catch(function (err) {
		console.error(err)
	})
}).catch(function (err) {
	console.error(err)
})
}

convert('\\Chara')
convert('\\Place')
convert('\\Item')

