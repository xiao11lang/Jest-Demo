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

