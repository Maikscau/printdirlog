### [点击查看 中文文档](https://github.com/Maikscau/printdirlog/blob/master/README_Chinese.md)

## Introduction
***
Used to print corresponding project directory path quickly, read file '.gitignore' automatically to ignore corresponding files and path.

## Use
***
1.Install `npm i printdirlog -g`

2.Use command `printdir -d <path> [-t] [len]`

    Tips：There are differences in the path separator between Window system and Linux system.

| Parameter | Description |
| :-------- | :--------|
| -d  | required, enter the directory path at the back |
| -t  | optional, output txt file at current directory (Avoiding the differrences in system code, use code editor to open txt file, do not use system notepad) |
| len | optional, the distance from identifier '#' to the beginning of the line |
<br/>

3.Put the output directory structure on `code block in markdown file` (otherwise, the format will be confused)

4.The txt file 'dirlog.txt' with output directory structure is place at current directory

## Example
***
At directory path 'C:\Users\desktop' execute the command as follows

`printdir -d E:\myproject\printDir -t 30`


### Output:

```
|--commands                  # enter notes
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

### The txt file recording the target directory structure:

    C:\Users\desktop\dirlog.txt (please use code editor to open)
