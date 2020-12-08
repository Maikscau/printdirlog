## 一、npm包介绍
用于快速输出对应目录下的目录结构，自动读取.gitignore文件忽略相对应的文件

## 二、使用
1.安装 `npm i printdirlog -g`

2.使用 `printdir {目录的系统路径} [每行的长度]`

3.输出的目录结构放到`markdown文件的代码块`中（否则格式混乱）

### 示例：
命令： `printdir -d E:\myproject\printDir 30`

输出：

```
|--commands                  # 此处写注释
  |--directory.js            #
  |--version.js              #
|--utils                     #
  |--index.js                #
|--.gitignore                #
|--index.js                  #
|--package-lock.json         #
|--package.json              #
|--README.md                 #
```
