### 模拟函数

使用mock函数的原因在于，测试某些模块时，此模块有可能依赖于其他的模块。但是对于当前测试来说，只应关注测试的模块是否如预期执行，其依赖模块的内部实现并不重要。因此，为了方便测试，可以采用mock函数模拟实际的依赖。

在jest中，有两种模拟函数的方法，一种是在测试代码中使用mock函数，另一种是手动编写覆盖本身的依赖实现。

#### jset.fn

使用jest.fn()创建mock函数时一种最常用的方式，默认情况下，此方法返回undefined

#### jest.mock

在测试中，某些模块的方法中可能执行异步的方法，请求远程的数据。此时若对真实的api进行访问，在得到数据后测试，会相应地延长测试的时间。因此，jest提供了mock方法，使得对于整个js模块的mock成为可能。

mock方法接收需要被mock的mok的路径，当执行mock方法后，该模块命名空间下的所有方法均会成为mock函数，这意味着可以使用mockReturnValue此类方法为其指定返回值。

##### mock返回值

```javascript
const mockFn=jest.fn()
test('mockFn default return',function(){
    expect(mockFn()).toBeUndefined()
})
test('mockFn return value',function(){
    mockFn.mockReturnValue('mock')
    expect(mockFn()).toBe('mock')
})
test('mockFn return value once',function(){
    mockFn.mockReturnValueOnce('mockOnce')
    expect(mockFn()).toBe('mockOnce')
})
```

- 使用mockReturnValueOnce和mockReturnValue为mock函数指定返回值。mockReturnValueOnce方法可以多次调用，并指定不同的返回值。
- 使用mockReturnValueOnce指定的返回值会在mock函数调用时按照指定的顺序优先返回，但对于每个指定的值只会返回一次。
- 若mock函数调用次数和mockReturnValueOnce方法指定返回值数目相同，返回值将被耗尽。此时mock函数会使用mockReturnValue方法指定的返回值，若mockReturnValue未用来指定返回值，返回值为undefined。

##### mock实现

可以给jest.fn()传入一个函数用于重写mock函数的行为，可以将传入的函数视作mock函数的函数体。

```javascript
const mockFnImplementation=jest.fn(function(arg){
    console.log(arg)
}).mockImplementationOnce(function(arg){
    console.log(arg+'once')
})
test('mock implementation',function(){
    mockFnImplementation('mock implementation ')
    mockFnImplementation('mock implementation')
})
/*
	mock implementation once
	mock implementation
*/
```

- mock实现和mock返回值规则相似，分为单次mock和默认的mock，分别使用mockImplementationOnce和mockImplementation 方法
- 由jest.fn()创建的mock函数可直接传入函数参数作为mock函数的默认实现，jest.mock()创建的mock函数需使用mockImplementation 方法指定默认的实现

##### mock属性

```javascript
/*
    mockFn.mock.calls：二维数组，mock函数被调用时传入的参数，如mockFn.mock.calls[n][m]代表第n次调用时的	第m个参数
    mockFn.mock.results:一维数组，每个元素的value属性代表mock函数的返回值
    mockFn.mock.instances：一维数组，每个元素代表mock函数的实例
*/
```

