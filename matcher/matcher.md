### 匹配器

在jest中，使用匹配器用来测试某一值是否满足某个条件。

#### 精确匹配

expect().toBe()在内部使用[Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)方法判断两个值是否相等，故一般用来测试基本数据类型（主要是数值和字符串）是否精确相等。虽然可以用来比较数组和对象，但必须是相同的引用测试才能通过，这并无意义。

#### Truthiness

在js中，==运算符会将两边的值作隐式转换后进行比较，这意味着null=='',null==undefined,false==''此类表达式的值为true，若需要精确的区分某个值是null，undefined或false，可以使用以下匹配器

- `toBeNull` 只匹配 `null`
- `toBeUndefined` 只匹配 `undefined`
- `toBeDefined` 与 `toBeUndefined` 相反
- `toBeTruthy` 匹配任何 `if` 语句为真
- `toBeFalsy` 匹配任何 `if` 语句为假

js中为falsy的值共6个：0，null，undefined，false，''，NaN

#### 数字

除了使用toBe或toEqual对数字进行比较之外，还可以使用以下匹配器比较数字

- toBeGreaterThan
- toBeGreaterThanOrEqual
- toBeLessThan
- toBeLessThanOrEqual

以上匹配器使用十分方便，从命名就能看出用途。需要注意的是，比较两个浮点数是否相等，需要用toBeCloseTo 匹配器，这是js对浮点数的处理方式造成的，在js中 0.1+0.2==0.3，这个表达式的结果将是false

#### 字符串

toMatch匹配器可以检查某个字符串是否匹配给定的正则表达式

#### 数组

toContain匹配器用来验证某个数组是否包含特定元素

注意，对于数组元素若为数组或对象，仅当引用相同时，测试才能通过

#### 自定义匹配器

```javascript
expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
  });
```

上述代码中，使用expect.extend()方法自定义了一个匹配器。extend方法接收一个对象作为参数，对象的键即为自定义匹配器的名称，值为一个函数。函数的第一个参数为使用匹配器时传递给expect的参数，之后的参数为匹配器自身的参数。函数需要返回一个对象，对象具有message（string）和pass（boolean）字段，用于给出在测试通过或失败的提示信息以及是否通过测试。