# ES6

- 箭头函数：没有自己的this, 只有一个参数可以省略括号，只有一个语句的返回，可以省略花括号

- class:  用于定义一个类，实际上在转换为es5的时候，还是Function, 要注意contructor

- 增强对象字面量

  - ```javascript
    class {
      methodA() { //这种写法就是增强对象字面量
        
      }
    }
    ```

- 模板字符串

- 解构赋值, 参数默认值，扩展运算符

  - ```javascript
    const obj = {x: 1, y: 2, z: 3, a: 4}
    const { x } = obj // x = obj.x
    console.log(x) // 1
    
    const { y: yy } = obj // yy = obj.y
    console.log(yy) // 2
    
    const { x, ...rest } = obj
    console.log(rest) // {y:2, z: 3, a: 4}
    
    const { xxx = 10 } = obj
    console.log(xxx) // 10
    
    const arr = [1, 2, 3, 5]
    const [first] = arr
    console.log(first) // 1
    
    // 函数的参数也可以解构
    const fn = ({x = 5}) => {
      return x**2
    }
    
    fn({x: 2, y: 1})
    ```

- let, const: 没有变量提升，const所定义的变量不能使用 = 号重新赋值，经常用let来解决异步循环

- generator: 只是一个过渡，现在都使用async/await

- 模块化: export / import

- Map/Set

- 代理 (proxy): vue3.0就不再是Object.defineProperty，而是用这个

- Symbols

- class的继承extends

- 新的数学、数字、字符串、数组、对象的api

- promise