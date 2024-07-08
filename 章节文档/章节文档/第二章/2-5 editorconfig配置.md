## EditorConfig

**项目根目录创建 .editorconfig 文件**

```js
# https://editorconfig.org
root = tue

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

**配置解读**

root=true 对所有文件生效

end_of_line= lf 不同操作系统换行符不同

```js
end_of_line
lf | cr | crlf (大小写不限）
复制代码
end_of_line设置的换行符的表示方式。先看一下这几个值是什么意思

lf：全拼Line Feed，意思是换行，用符号 \n 表示
cr: 全拼Carriage Return， 意思是回车， 用符号 \r 表示
crlf：cr 和 lf的结合，回车换行，用符号 \r\n
```

insert_final_newline = true 代码最后新增一行

trim_trailing_whitespace = true 修剪尾随空格
