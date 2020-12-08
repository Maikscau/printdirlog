const { readdir, getFileContentToArray } = require('../utils/index.js')

/* 长路径转换为短路径 */
const getShortPath = (path, entry) => {
  const start = entry.length
  const relativePath = path.substring(start + 1)
  return relativePath
}

/* 短路径转换为多维数组 */
const getTreeDirs = (dirs) => {
	// 最终输出树形对象
	const objDirs = {}
	dirs = dirs.map((i) => i.split('\\'))
	dirs.forEach(itemArr => {
		// 数组各项转化为树形对象中对应属性key
		if (!objDirs[itemArr[0]]) {
			if (itemArr.length > 1) {
				objDirs[itemArr[0]] = setTreeKey1(itemArr.slice(1))
			} else {
				objDirs[itemArr[0]] = itemArr[0]
			}
		} else {
			objDirs[itemArr[0]] = setTreeKey2(objDirs[itemArr[0]], itemArr.slice(1))
		}
	})

	return objDirs
}

/* objDirs不存在对应属性 */
const setTreeKey1 = (arr) => {
	const obj = {}
	if (arr.length > 1) {
		obj[arr[0]] = setTreeKey1(arr.slice(1))
	} else {
		obj[arr[0]] = arr[0]
	}
	return obj
}

/* objDirs存在对应属性 */
const setTreeKey2 = (objKey, arr) => {
	const obj = objKey

	if (obj[arr[0]]) {
		// 已存在该属性
		obj[arr[0]] = setTreeKey2(obj[arr[0]], arr.slice(1))
	} else {
		// 不存在该属性
		if (arr.length > 1) {
			obj[arr[0]] = setTreeKey1(arr.slice(1))
		} else {
			obj[arr[0]] = arr[0]
		}
	}

	return obj
}

/* 输出目录树 */
const printTree = (tree, max, indent = 0) => {
	const maxLineLength = max

	for (let i in tree) {
		if (indent === 1) indent ++
		let space = new Array(indent).join('  ')
		const mainLine = `${space}|--${i}`
		const leftLength = maxLineLength - mainLine.length > 1 
			? maxLineLength - mainLine.length
			: 2
		const finalLine = `${mainLine}${new Array(leftLength).join(' ')}#`
		// 打印路径，必须！
		console.log(finalLine)
		if (typeof tree[i] === 'object') {
			const nextIndent = indent + 1
			printTree(tree[i], max, nextIndent)
		}
	}
}

const printDirectory = async (entry, max = 30) => {
	// 获取gitignore
	const filename = `${entry}/.gitignore`
	const ignore = await getFileContentToArray(filename)

  // 获取目录的绝对路径数组
	const absoluteDirs = readdir(entry, ignore)

  // 长路径转换为短路径
  const shortDirs = absoluteDirs.map((i) => getShortPath(i, entry))

  // 短路径转换为多维数组
  const treeDirs = getTreeDirs(shortDirs)
	
	// 输出目录树
	printTree(treeDirs, max)

}

module.exports = {
  printDirectory,
}

