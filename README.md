# nilswg-rollup-typescript-demo
a rollup typescript demo

# rollup with typescript


### 目錄結構
![](https://i.imgur.com/WFuvviL.png)


### 設置 package.json
```
npm init -y

// 下載套件
npm i -D rollup-plugin-typescript2 typescript rollup nodemon ts-node @types/node
```

```.json
// 加入命令
"scripts": {
  "start": "ts-node ./src/index.ts",
  "dev": "nodemon ./src/index.ts",
  "build": "rollup -c rollup.config.js"
},
```

### 設置 tsconfig.json
```
tsc --init
```

此處務必使用預設設定，不然 ts-node 無法順利運作。
```json=
{
  "module": "commonjs"  
}
```

完整配置可以參考如下
```json=
{
  "compilerOptions": {
    "target": "es2017",                       /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     // ts-node:commonjs: rollup: es2015 可以覆寫
    "lib": [
      "es2019",
      "DOM"
    ],
    "rootDir": "./src",
    "strict": true,                           /* Enable all strict type-checking options. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true,  /* Disallow inconsistently-cased references to the same file. */
    "experimentalDecorators": true
  }
}

```

### 設置rollup.config.js
```javascript=
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist'
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
        },
      },
    }),
  ],
};

```

### 設置nodemon.json
```json=
{
  "watch": ["src/**/*.ts"],
  "ignore": ["src/**/*.spec.ts"]
}
```

### 測試
```typescript=
// math.ts
export function sum(a:number, b:number):number{
  return a + b;
}


// index.ts
import { sum } from './math'
console.log(sum(100,200))
```

```
npm run start  // 測試 ts-node 是否可以直接執行 .ts檔
npm run dev    // 開發模式，啟動nodemon去監聽整個 src 底下的檔案
               // 目前發現 rollup 也有watch功能 🤔
npm run build  // 透過rollup 去生成 bundler.js
```


### 安裝 terser 
terser 能讓我們產出的JS代碼進行壓縮與醜化(本身功能取代uglify)
```
npm i -D rollup-plugin-terser 
```

因此可以分別產出一隻正常大小壓縮過體積的JS
```json=
// rollup.config.js
  output: [
    { file: './dist/app.js' },
    { file: './dist/app.min.js', plugins: [terser()] },
  ],
```