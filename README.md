## 一、npm包介绍
用于快速打印输出对应目录下的目录结构，自动读取.gitignore文件忽略相对应的文件

## 二、使用
1.安装 `npm i printdirlog -g`

2.使用 `printdir -d <需打印的目录根路径> [-t] [len]`

    注意：win系统和Linux系统的路径分隔符有区别

| 参数 | 说明 |
| :-------- | :--------|
| -d  | 必选，标识参数后的字符为需要打印的目录根路径 |
| -t  | 可选，在当前命令行运行目录下生成打印目录内容的txt文件（因系统编码原因，请使用编辑器打开，而不是记事本） |
| len | 可选，注释标识符#距离行首的位置 |

\
3.输出的目录结构放到 `markdown文件的代码块` 中（否则格式混乱）

4.输出的目录结构txt文件dirlog.txt在运行当前命令的目录下

## 三、示例：
在目录 C:\Users\desktop 执行命令

`printdir -d E:\myproject\printDir -t 30`


### 输出：

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

### 目录结构文件：

    C:\Users\desktop\dirlog.txt
