#!/usr/bin/env node

const { printVersion } = require('./commands/version')
const { printDirectory } = require('./commands/directory')

// 获取命令参数
const { argv } = process
const commands = argv.slice(2)

commands.forEach((command, index) => {
	switch (command) {
		case '-v':
			printVersion()
			break
		case '-d':
			if (!commands[index + 1]) {
				console.log('缺少路径参数')
				return
			}
			const isTxt = commands.includes('-t')
			const parseCmd = parseInt(commands[index + 3])
			const maxlen = typeof parseCmd === 'number' 
				? Number.isNaN(parseCmd) 
					? 30
					: parseCmd
				: 30
			printDirectory(commands[index + 1], isTxt, maxlen)
			break
	}
})
