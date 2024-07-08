## ESLint

官方链接：[Getting Started with ESLint - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/getting-started)

中文文档：[Configuring ESLint - ESLint中文文档](https://eslint.bootcss.com/docs/user-guide/configuring)

`Prettier` 都是为了解决**代码风格问题**，而 `ESLint` 是主要为了解决**代码质量问题**，它能在我们编写代码时就检测出程序可能出现的隐性BUG，通过 `eslint --fix` 还能自动修复一些代码写法问题，比如你定义了 `var a = 3` ，自动修复后为 `const a = 3` 。还有许多类似的强制扭转代码最佳写法的规则，在无法自动修复时，会给出红线提示，强迫开发人员为其寻求更好的解决方案。

#### 首先在项目中安装 `eslint` ：

```bash
 # npm
 npm init @eslint/config
 # 或者
 npx eslint --init

 # 使用yarn时，需要先安装eslint插件才可以执行命令
 yarn add eslint -D

 yarn eslint --init

 # pnpm
 pnpm eslint --init
复制代码
```

#### 初始化过程：

- How would you like to use ESLint?
  
  选择第三条 `To check syntax, find problems, and enforce code style` ，检查语法、检测问题并强制代码风格。

- What type of modules does your project use?
  
  采用的 ES6 模块系统导入导出，选择 `JavaScript modules (import/export)` 。

- Which framework does your project use?
  
  选择 `React` 。

- Does your project use TypeScript?
  
  选择 `Yes` 后生成的 `eslint` 配置文件会给我们默认配上支持 `Typescript` 的 `parse` 以及插件 `plugins` 等。

- Where does your code run?

    `Browser` 和 `Node` 环境都选上，之后可能会编写一些 `node` 代码。

- What format do you want your config file to be in?
  
  选择 `JavaScript` ，即生成的配置文件是 js 文件，配置更加灵活。

- Would you like to install them now with npm?
  
  当然 `Yes` 了～

在漫长的安装结束后，项目根目录下多出了新的文件 `.eslintrc.cjs` ，这便是我们的 `eslint` 配置文件了。其默认内容如下：

#### 配置语法

```js
module.exports = {
  parser: {},  // 解析器
  extends: [], // 继承的规则 [扩展]
  plugins: [], // 插件
  rules: {}    // 规则
};
```

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    /*
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        'react/react-in-jsx-scope': 'off',
        'no-console': 'error', // 禁止使用console
        'no-unused-vars': 'error',// 禁止定义未使用的变量
        'no-debugger': 'error', // 禁止使用debugger
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
    },
};
```

#### Prettier和ESLint冲突问题

安装插件  eslint-plugin-prettier eslint-config-prettier 

```bash
npm install eslint-plugin-prettier eslint-config-prettier -D
```

prettier 添加到 extends的最后
