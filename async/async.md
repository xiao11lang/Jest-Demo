### 异步代码测试

异步代码的组织方式有三种，ES5之前的回调函数，ES6的Promise以及最新的Async、Await，针对这三种情况，jest分别有不同的处理方法

#### 回调函数

```javascript
/*test回调函数无参数*/
test('callback',function(){
  function callback(arg){
      expect(arg).toBe('callback')
  }
  setTimeout(function(){
      callback('callback ')
  },1000)
})
/*test回调函数带参数*/
test('callback',function(done){
  function callback(arg){
      expect(arg).toBe('callback')
      done()
  }
  setTimeout(function(){
      callback('callback ')
  },1000)
})
```

- test的回调函数无参数，expect断言在异步代码的回调中执行。尽管测试会通过，但并非预期的结果。此时即便expect的参数与toBe不同，测试一样不会报错。这是因为测试在setTimeout执行的瞬间就结束了，expect方法并未执行。
- 使用done作为test回调函数的参数，此时jest将等待done函数调用，才结束测试。若done函数从不调用，测试也会失败。

#### Promise

```javascript
test('promise',function(){
    return new Promise(function(resolve,reject){
        resolve('promise')
    }).then(function(res){
        expect(res).toBe('promise')
    })
})//pass

test('promise with assertion',function(){
    expect.assertions(2)
    return new Promise(function(resolve,reject){
        resolve('promise')
    }).then(function(res){
        expect(res).toBe('promise')
    })
})//failed
 
test('promise use resolves',function(){
    expect.assertions(1)
    return expect(new Promise(function(resolve,reject){
        resolve('promise')
    })).resolves.toBe('promise')
})//pass
```

- 在test的回调函数中返回一个promise，若promise完成，其then方法的回调中的断言将会执行。promise被拒绝状态下的断言置于catch方法的回调即可。
- 使用expect.assertions方法可以预测将有几个断言会被执行，若实际执行的断言数与预测的不同，测试将失败。
- 也可以将promise传递给expect，之后使用resolves匹配器进行断言。对于promise拒绝的情况，可以使用rejects匹配器。

#### Async Await

```javascript
test('async await',async function(){
    expect.assertions(1)
    const data=await new Promise(function(resolve,reject){
        resolve('async')
    })
    expect(data).toBe('async')
})//pass

test('async await with error',async function(){
    expect.assertions(1)
    try{
        await new Promise(function(resolve,reject){
            reject('error')
        })
    }catch(e){
        expect(e).toBe('error')
    }
})//pass
```

- async和await可以视为promise的语法糖，它使得异步的代码可以以同步的形式调用，避免了使用promise代码的横向扩展。如上代码所示，可以传递async关键字修饰的函数给test，在回调中，await将等待promise执行结束，await语句的值是promise的结果。
- 对于拒绝状态的promise，可以在try语句中使用await，之后再catch语句中捕获异常，执行断言函数。

