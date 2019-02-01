## Mock Modules

### `jest.disableAutomock()`

禁用模块加载器中的自动模拟

调用此方法后，require方法将返回每个模块的真实版本(而不是模拟的版本)。 

```javascript
{
  "automock": true
}
```

```javascript
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
};
```

```javascript
// __tests__/disableAutomocking.js
import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
  // now we have the original implementation,
  // even if we set the automocking in a jest configuration
  expect(utils.authorize()).toBe('token');
});
```

### `jest.enableAutomock()`

启用模块加载器中的自动模拟

```javascript
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
  isAuthorized: secret => secret === 'wizard',
};
```

```javascript
// __tests__/disableAutomocking.js
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
  // now we have the mocked implementation,
  expect(utils.authorize._isMockFunction).toBeTruthy();
  expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});
```

### `jest.genMockFromModule(moduleName)`

使用自动模拟系统生成模块的模拟版本，`moduleName`为模块名

```javascript
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
  isAuthorized: secret => secret === 'wizard',
};
```

```javascript
// __tests__/genMockFromModule.test.js
const utils = jest.genMockFromModule('../utils').default;
utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.genMockFromModule', () => {
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized('not wizard')).toEqual(true);
});
```

### `jest.mock(moduleName, factory, options)`

调用此方法后，require一个模块时将得到其模拟的版本

```javascript
// banana.js
module.exports = () => 'banana';

// __tests__/test.js
jest.mock('../banana');

const banana = require('../banana'); // banana will be explicitly mocked.

banana(); // will return 'undefined' because the function is auto-mocked.
```

第二个参数用于覆盖模块的实现

```javascript
jest.mock('../moduleName', () => {
  return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';
```

第三个参数用于创建虚拟模拟-对系统中任何地方都不存在的模块的模拟： 

```javascript
jest.mock(
  '../moduleName',
  () => {
    /*
     * Custom implementation of a module that doesn't exist in JS,
     * like a generated module or a native module in react-native.
     */
  },
  {virtual: true},
);
```

使用`jest.mock`模拟的模块只对调用`jest.mock`的文件进行模拟。导入模块的另一个文件将获得原始实现，即使它在模拟模块的测试文件之后运行。 

### `jest.unmock(moduleName)`

调用此方法后，require方法返回的模块将是原始版本而不是mock后的

### `jest.doMock(moduleName, factory, options)`

调用此方法可以在同一文件中对同一模块进行不同的模拟

```javascript
beforeEach(() => {
  jest.resetModules();
});

test('moduleName 1', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 1);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(1);
});

test('moduleName 2', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 2);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(2);
});
```

### `jest.dontMock(moduleName)`

使用`babel-jest`时，调用`unmoke`将作用于整个文件，此方法可以暂时不模拟模块

### `jest.setMock(moduleName, moduleExports)`

显式地提供模块系统应该为指定模块返回的模拟对象

### `jest.requireActual(moduleName)`

返回实际的而不是模拟的模块

### `jest.requireMock(moduleName)`

返回模拟的而不是实际的模块

### `jest.resetModules()`

重置模块注册表-所有所需模块的缓存，调用此方法后，每次require得到的是不同的实例 

```javascript
const sum1 = require('../sum');
jest.resetModules();
const sum2 = require('../sum');
sum1 === sum2;
// > false (Both sum modules are separate "instances" of the sum module.)
```

```javascript
beforeEach(() => {
  jest.resetModules();
});

test('works', () => {
  const sum = require('../sum');
});

test('works too', () => {
  const sum = require('../sum');
  // sum is a different copy of the sum module from the previous test.
});
```

### `jest.isolateModules(fn)`

此方法回调中require的模块将和其它地方require的模块隔离

```javascript
let myModule;
jest.isolateModules(() => {
  myModule = require('myModule');
});

const otherCopyOfMyModule = require('myModule');
```

## Mock functions

### `jest.fn(implementation)`

返回新的`mock`函数

```javascript
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;
```

### `jest.isMockFunction(fn)`

确定给定函数是否为`mock`函数

### `jest.spyOn(object, methodName, accessType?)`

`jest.spyOn()`方法同样创建一个mock函数，但是该mock函数不仅能够捕获函数的调用情况，还可以正常的执行被spyOn的函数，`mock`方法返回的mock函数对于原始实现内部的代码并不执行。第三个参数`accessType` 值可以是`'get'`或`'set',` 用于对`get`或`set`属性的捕获

```javascript
const video = {
  play() {
    return true;
  },
};

module.exports = video;
```

```javascript
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});
```



```javascript
const video = {
  // it's a getter!
  get play() {
    return true;
  },
};

module.exports = video;

const audio = {
  _volume: false,
  // it's a setter!
  set volume(value) {
    this._volume = value;
  },
  get volume() {
    return this._volume;
  },
};

module.exports = audio;
```

```javascript
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play', 'get'); // we pass 'get'
  const isPlaying = video.play;

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});

const audio = require('./audio');

test('plays audio', () => {
  const spy = jest.spyOn(audio, 'volume', 'set'); // we pass 'set'
  audio.volume = 100;

  expect(spy).toHaveBeenCalled();
  expect(audio.volume).toBe(100);

  spy.mockRestore();
});
```

### `jest.clearAllMocks()`

清除所有模拟的`mock.calls`和`mock.instances`属性,等同于对每个mock函数调用`mockClear()`

### `jest.resetAllMocks()`

重置所有模拟的状态，等同于对每个mock函数调用`mockReset()`

Returns the `jest` object for chaining.

### `jest.restoreAllMocks()`

将所有的模拟还原回原来的值，等同于对每个模拟函数调用`mockRestore()`。仅对`jest.spyOn`创建的mock函数时工作

## Mock timers

### `jest.useFakeTimers()`

指示`jest`使用假的标准计时器函数(`setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `nextTick`, `setImmediate` and `clearImmediate`).

### `jest.useRealTimers()`

指示`jest`使用真实的标准计时器函数

### `jest.runAllTicks()`

执行微任务队列中所有的任务

### `jest.runAllTimers()`

执行宏任务队列中所有的任务

### `jest.runAllImmediates()`

执行`setImmediate()`创建的任务队列中所有的任务 

### `jest.advanceTimersByTime(msToRun)`

别名: `.runTimersToTime()`

将宏任务队列 提前执行

### `jest.runOnlyPendingTimers()`

只执行当前挂起的宏任务

### `jest.clearAllTimers()`

从计时器系统中移除所有挂起的计时器 ，这意味着，如果任何计时器已在任务队列中(但尚未执行)，则它们将被清除，并将永远没有机会在将来执行。 

### `jest.getTimerCount()`

返回仍需运行的假计时器的数量 

## Misc

### `jest.setTimeout(timeout)`

设置before/after 钩子函数的默认超时间隔

```javascript
jest.setTimeout(1000); // 1 second
```

### `jest.retryTimes(n)`

运行失败的测试n次，直到它们通过或直到最大重试次数耗尽为止 

```javascript
jest.retryTimes(3);
test('will fail', () => {
  expect(true).toBe(false);
});
```

