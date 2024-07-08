## ESLint问题说明

如果使用`yarn create vite`创建的项目，没有生成.eslintrc文件，则可以继续看`ESLint配置讲解`这一节课，如果当前创建的项目默认已经生成了eslintrc文件，则只需要看我们当前这节课即可，`ESLint配置讲解`这节课可以跳过。

###### 通过yarn create vite后，自动生成了eslint，我还需要在安装eslint吗

不需要了，使用框架默认eslint即可，只需要配置rules规则



###### .eslintrc.cjs报错

在eslintrc.cjs文件中，找到env对象，添加：node: true，设置node环境即可

> 如果你的文件不报错，可以忽略。

###### .tsconfig.json报错

```js
"moduleResolution": "bundler",
```

Typescript发布5.0以后，默认模块的解析策略是bundler，是一种兼容妥协方案，当前只有vscode最新版本的软件是支持的，比如：1.78，所以我们需要升级vscode软件即可，当然，我们也可以修改它，把bundler修改为node，因为以前使用最多的是node解析。

参考文档：https://zhuanlan.zhihu.com/p/617501026

###### .tsconfig.node.json报错

报错原因同上，只需要修改moduleResolution的值为node即可，或者升级vscode软件。

###### main.tsx文件报错

`An import path cannot end with a '.tsx' extension. Consider importing 'components/ui/Card/Card' instead.ts(2691)`



是因为新版本在导入模块时，可以不添加`.tsx`扩展名，我们删除即可。

比如：

`import App from './App.tsx'`修改为：`import App from './App'`



###### main.tsx React导入时报错

需要在tsconfig.json文件中添加`"allowSyntheticDefaultImports": true,` 并删除 `allowImportingTsExtensions`配置，或者直接升级到最新版本的vscode软件。
