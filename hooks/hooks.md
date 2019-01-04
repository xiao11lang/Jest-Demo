### 钩子函数

在jest中，可以在测试之前做一些准备工作，测试之后，可以做另外的清理工作。这主要通过以下钩子函数实现。

#### 全局钩子函数

全局钩子函数仅在测试开始前或结束时运行一次

- 前置钩子beforeAll
- 后置钩子afterAll

#### 局部钩子函数

局部钩子函数在每个测试开始前或结束时均会运行

- 前置钩子beforeEach
- 后置钩子afterEach

```javascript
let count=1;
beforeAll(function(){
    console.log('test start')
})
afterAll(function(){
    console.log('test end')
})
beforeEach(function(){
    console.log('test'+count+' start')
})
afterEach(function(){
    console.log('test'+count+' end')
    count++
})
test('test1',function(){
    expect(count).toBe(1)
})
test('test2',function(){
    expect(count).toBe(2)
})
/*输出结果*/
/*
	test start
	test1 start
	test1 end
	test2 start 
	test2 end 
	test end
*/
```

注意，若需要在钩子函数中运行代码，可以采用和测试异步代码同样的方法。

- 给回调函数传入done参数
- 返回promise

#### 作用域

默认情况下，before和after钩子函数将应用到代码中的所有测试。如果希望对不同的测试运行不同的钩子函数，可以使用describe将测试分组。describe内部的before和after钩子函数仅会应用到当前describe块中的测试。

```javascript
beforeAll(() => console.log('global test start'));
afterAll(() => console.log('global test end'));
beforeEach(() => console.log('outer test start'));
afterEach(() => console.log('outer test end'));
test('outer', () => console.log('outer test'));
describe('Scoped  Nested block', () => {
  beforeAll(() => console.log('describe test start'));
  afterAll(() => console.log('describe test end'));
  beforeEach(() => console.log('inner test start'));
  afterEach(() => console.log('inner test start'));
  test('inner', () => console.log('inner test'));
});
    /*输出结果*/
   /*
        global test start
        outer test start
        outer test
        outer test end
        describe test start
        outer test start
        inner test start
        inner test
        inner test start
        outer test end
        describe test end
        global test end
    */
```

注意，以上代码输出中，在describe块之外注册的钩子函数，在describe块里的测试运行时也会执行，且优先于内部注册的同名钩子函数执行。