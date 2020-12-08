const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { defaultIgnore } = require('./config')

/* 获取完整目录地址 */
const getCompletePath = (entry, file) => {
	const location = path.join(entry, file)
	const info = fs.statSync(location)
	return info
}

/* 读取目录并返回数组 */
const readdir = (entry, ignore = []) => {
	try {
		let dirs = []
		let sortDirs = []
		const dirInfo = fs.readdirSync(entry)

		// 排序整理目录(目录在前，文件在后)
		// 获取全部目录(非文件)
		for (let i = 0; i < dirInfo.length; i++) {
			const item = dirInfo[i]

			// 忽略默认配置的目录和文件
			const isDefaultIgnore = defaultIgnore.find(g => {
				return g.startsWith(item) && g.endsWith('/')
			})
			if (isDefaultIgnore) continue

			// 忽略.gitignore文件内的目录和文件
			const isIgnore = ignore.find(g => {
				return g.startsWith(item) && g.endsWith('/')
			})
			if (isIgnore) continue

			const info = getCompletePath(entry, item)
			if (info.isDirectory()) sortDirs.push(item)
		}

		// 获取全部文件(非目录)
		for (let i = 0; i < dirInfo.length; i++) {
			const item = dirInfo[i]

			// 忽略默认配置的目录和文件
			const isDefaultIgnore = defaultIgnore.find(g => {
				return g.startsWith(item) && !g.endsWith('/')
			})
			if (isDefaultIgnore) continue

			// 判断是否需要忽略
			const isIgnore = ignore.find(g => {
				return g.startsWith(item) && !g.endsWith('/')
			})
			if (isIgnore) continue

			const info = getCompletePath(entry, item)
			if (!info.isDirectory()) sortDirs.push(item)
		}

		sortDirs.forEach(item => {
			const location = path.join(entry, item)
			const info = fs.statSync(location)
			if (info.isDirectory()) {
				const items = readdir(location, ignore)
				dirs = [...dirs, ...items]
			} else {
				dirs.push(location)
			}
		})
		return dirs
	} catch (error) {
		console.log(error)
		console.log('路径参数错误！')
	}
}

/* 获取文件内容到数组 */
const getFileContentToArray = (filename) => {
	return new Promise((resolve) => {
		const arr = []
		// 判断文件是否存在
		if (!fs.existsSync(filename)) {
			resolve(arr)
		} else {
			const readObj = readline.createInterface({
				input: fs.createReadStream(filename)
			})
			readObj.on('line', function (line) {
				arr.push(line)
			})
			readObj.on('close', function () {
				resolve(arr)
			})
		}
	})
}

module.exports = {
	readdir,
	getFileContentToArray
}