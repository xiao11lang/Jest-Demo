### `afterAll(fn, timeout)`

在此文件中的所有测试完成后运行指定的函数fn。如果函数返回promise，则Jest将在继续之前等待该promise解决。可以提供额外的timeout参数，这用来指定中止前等待的时间，默认超时时间为5秒。 

### `beforeAll(fn, timeout)`

在此文件中的所有测试前运行指定的函数fn，其它行为与afterAll一致

### `afterEach(fn, timeout)`

在此文件中的每个测试完成后运行指定的函数fn，其它行为与afterAll一致

`beforeEach(fn, timeout)`

在此文件中的每个测试之前运行指定的函数fn，其它行为与afterAll一致

### `describe(name, fn)`

在一个测试文件中，将相关的测试组织在一个块中。在此块中定义上述的钩子函数将仅作用于块中的测试，但是外部定义的钩子函数仍将影响内部的测试。

### `describe.each(table)(name, fn, timeout)`

用于使用不同的数据进行相同的测试。table是一个二维数组，子数组元素为每次传递给fn的参数，name是每组数据测试的名称。name字符串可以传递以下占位符：

- `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format).
- `%s`- 字符串.
- `%d`- 数字.
- `%i` - 整数.
- `%f` - 浮点数.
- `%j` - JSON.
- `%o` - 对象.
- `%#` - 测试数据的索引.
- `%%` - 百分号转义

### `describe.only(name, fn)`

仅运行此块中的测试代码

### `describe.only.each(table)(name, fn)`

仅运行此块中的测试代码,使用多组数据重复测试

### `describe.skip(name, fn)`

跳过此块中的测试代码

#### `describe.skip.each(table)(name, fn)`

跳过此块中的测试代码

### `test(name, fn, timeout)`

与describe类似，但可额外指定一个超时时间用于测试返回promise的情况

### `test.each(table)(name, fn, timeout)`

### `test.only(name, fn, timeout)`

### `test.only.each(table)(name, fn)`

### `test.skip(name, fn)`

### `test.skip.each(table)(name, fn)`

以上几个api与describe具有相同的行为，describe块便于组织相关的测试。