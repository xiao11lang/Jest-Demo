### `mockFn.getMockName()`

返回通过调用mockFn.mockName(value)设置的mock函数名 

### `mockFn.mock.calls`

一个数组，包含对此mock函数进行的所有调用时传入的参数。数组中的每个项都是调用时传递的参数数组。 

例如: mock函数`f` 被调用两次, 参数分别为`f('arg1', 'arg2')`, 和`f('arg3', 'arg4')`, 此时`mockFn.mock.calls`为：

```javascript
[['arg1', 'arg2'], ['arg3', 'arg4']];
```

### `mockFn.mock.results`

一个包含对此模拟函数进行的所有调用的结果的数组。此数组中的每个元素具有type和value属性，type属性的值是以下结果之一：

- `'return'` - 表示函数调用正常返回
- `'throw'` - 表示函数调用抛出一个值
- `'incomplete'` - 表示调用为完成

```javascript
[
  {
    type: 'return',
    value: 'result1',
  },
  {
    type: 'throw',
    value: {
    },
  },
  {
    type: 'return',
    value: 'result2',
  },
];
```

### `mockFn.mock.instances`

一个包含用new从此mock函数实例化的所有对象实例的数组 

```javascript
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true
```

### `mockFn.mockClear()`

重置存储在 `mockFn.mock.calls`和`mockFn.mock.instances` 数组中的信息，常用于在两个断言之间清理模拟的使用数据。

### `mockFn.mockReset()`

执行`mockFn.mockClear()`所做的一切，并删除mock函数的返回值或实现，常用于想要将模拟完全重置回它的初始状态时

### `mockFn.mockRestore()`

执行`mockFn.mockReset()`所做的一切， 并保存mock函数原始的实现，常用于希望在其他测试中回复原始实现时，仅对jest.spyOn 生成的mock函数有效。

### `mockFn.mockImplementation(fn)`

用给定的函数fn覆盖默认的实现

```javascript
const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar);
// or: jest.fn(scalar => 42 + scalar);
const a = mockFn(0);
const b = mockFn(1);
a === 42; // true
b === 43; // true
mockFn.mock.calls[0][0] === 0; // true
mockFn.mock.calls[1][0] === 1; // true
```

```javascript
// SomeClass.js
module.exports = class SomeClass {
  m(a, b) {}
};

// OtherModule.test.js
jest.mock('./SomeClass'); // this happens automatically with automocking
const SomeClass = require('./SomeClass');
const mMock = jest.fn();
SomeClass.mockImplementation(() => {
  return {
    m: mMock,
  };
});

const some = new SomeClass();
some.m('a', 'b');
console.log('Calls to m: ', mMock.mock.calls);
```

### `mockFn.mockImplementationOnce(fn)`

用给定的函数fn覆盖默认的实现一次

```javascript
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val)); // true

myMockFn((err, val) => console.log(val)); // false
```

```javascript
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

### `mockFn.mockName(value)`

接收在测试结果输出中使用的字符串，而不是“jest.fn()”，以指示正在引用哪个mock函数

```javascript
const mockFn = jest.fn().mockName('mockedFunction');
// mockFn();
expect(mockFn).toHaveBeenCalled();
```

上述代码会导致以下错误：

```javascript
    expect(mockedFunction).toHaveBeenCalled()

    Expected mock function to have been called.
```

### `mockFn.mockReturnThis()`

如下调用的语法糖

```javascript
jest.fn(function() {
  return this;
});
```

### `mockFn.mockReturnValue(value)`

接收mock函数调用时返回的值

```javascript
const mock = jest.fn();
mock.mockReturnValue(42);
mock(); // 42
mock.mockReturnValue(43);
mock(); // 43
```

### `mockFn.mockReturnValueOnce(value)`

接收mock函数调用时返回的值，仅失效一次，可以多次调用

```javascript
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call');

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

### `mockFn.mockResolvedValue(value)`

如下调用的语法糖：

```javascript
jest.fn().mockImplementation(() => Promise.resolve(value));
```

常用于测试异步代码

```javascript
test('async test', async () => {
  const asyncMock = jest.fn().mockResolvedValue(43);

  await asyncMock(); // 43
});
```

### `mockFn.mockResolvedValueOnce(value)`

如下调用的语法糖：

```javascript
jest.fn().mockImplementationOnce(() => Promise.resolve(value));
```

常用于为多个异步测试提供不同的返回值

```javascript
test('async test', async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValue('default')
    .mockResolvedValueOnce('first call')
    .mockResolvedValueOnce('second call');

  await asyncMock(); // first call
  await asyncMock(); // second call
  await asyncMock(); // default
  await asyncMock(); // default
});
```

### `mockFn.mockRejectedValue(value)`

如下调用的语法糖：

```javascript
jest.fn().mockImplementation(() => Promise.reject(value));
```

常用于创建始终拒绝的mock函数

```javascript
test('async test', async () => {
  const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));

  await asyncMock(); // throws "Async error"
});
```

### `mockFn.mockRejectedValueOnce(value)`

如下调用的语法糖：

```javascript
jest.fn().mockImplementationOnce(() => Promise.reject(value));
```

```javascript
test('async test', async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValueOnce('first call')
    .mockRejectedValueOnce(new Error('Async error'));

  await asyncMock(); // first call
  await asyncMock(); // throws "Async error"
});
```