# webpack-bfms

> react and vue multi page in one project



基于 https://github.com/icai/bfms 改进，
支持泛生态技术.

何为泛生态技术？

提问:

为什么一个项目不能同时使用Vue, React, ~~Angular~~？

当然一个项目用一种技术呈现是最好不过的，但是很多时候迫不得已。


不支持react vue 交叉使用, 如
https://github.com/akxcv/vuera (Vue in React, React in Vue. Seamless integration of the two.)

 

一个原则：

多页应用，多页应用更符合主流场景，转换单页应用 (N->1) 零成本


----

## 约定 


vue 不使用 jsx 语法  
react 使用 jsx语法

### .babelrc

```json
{
  "presets": [
    'react',
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-react-jsx", "transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["transform-react-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
    }
  }
}

```




----


## 参考

https://github.com/Plortinus/vue-multiple-pages   
https://github.com/webpack/webpack-dev-server   
https://github.com/nodeca/mincer   
https://github.com/vuejs/vue-cli   
https://github.com/vue-template/webpack   
https://github.com/facebook/create-react-app














