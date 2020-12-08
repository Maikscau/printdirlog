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
			printDirectory(commands[index + 1], commands[index + 2] || 30)
			break
	}
})
