`expect.extend(matchers)`

自定义匹配器，matchers为一个对象，属性名为匹配器名，值为一个函数。函数的第一个参数为expect方法接收的参数，之后的参数为匹配器本身接收的参数。函数需返回一个对象，对应于断言通过和失败。该对象包含一个message(字符串)属性和一个pass(布尔值)属性。

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

test('numeric ranges', () => {
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({apples: 6, bananas: 3}).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});
```

#### Async Matchers

`expect.extend` 也支持异步匹配器。

```javascript
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const externalValue = await getExternalValueFromRemoteSource();
    const pass = received % externalValue == 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      };
    }
  },
});

test('is divisible by external value', async () => {
  await expect(100).toBeDivisibleByExternalValue();
  await expect(101).not.toBeDivisibleByExternalValue();
});
```

在自定义匹配器中，this上将具有以下方法和属性:

#### `this.isNot`

expect().not调用时为true

#### `this.promise`

异步测试中，返回promise时，expect()后紧接的修饰符

- `'rejects'` expect().rejects
- `'resolves'` expect().rejects
- `''` 匹配器未调用promise

#### `this.equals(a, b)`

如果两个对象具有相同的值（递归），则返回`true`。

#### `this.expand`

命令行中执行jest时带--expand即为true

#### `this.utils`

在`this.utils`上有一些有用的工具，主要由[`jest-matcher-utils`](https://github.com/facebook/jest/tree/master/packages/jest-matcher-utils)导出。

### `expect.anything()`

匹配除了null和undefined之外的值。

```javascript
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});
```

### `expect.any(constructor)`

匹配指定构造函数的任意实例

```javascript
function randocall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn();
  randocall(mock);
  expect(mock).toBeCalledWith(expect.any(Number));
});
```

### `expect.arrayContaining(array)`

array是expect实际接收数组的子集

```javascript
describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});
```

```javascript
describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
  const expected = [1, 2, 3, 4, 5, 6];
  it('matches even with an unexpected number 7', () => {
    expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
      expect.arrayContaining(expected),
    );
  });
  it('does not match without an expected number 2', () => {
    expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
      expect.arrayContaining(expected),
    );
  });
});
```

### `expect.assertions(number)`

验证在测试期间是否调用了一定数量的断言。用于测试异步的代码，以确保回调中的断言确实被调用。 

```javascript
test('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }

  doAsync(callback1, callback2);
});
```

### `expect.hasAssertions()`

验证在测试期间是否至少调用了一个断言。用于测试异步的代码，以确保回调中的断言确实被调用。 

```javascript
test('prepareState prepares a valid state', () => {
  expect.hasAssertions();
  prepareState(state => {
    expect(validateState(state)).toBeTruthy();
  });
  return waitOnState();
});
```

### `expect.not.arrayContaining(array)`

array不是expect实际接收数组的子集

```javascript
describe('not.arrayContaining', () => {
  const expected = ['Samantha'];

  it('matches if the actual array does not contain the expected elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(
      expect.not.arrayContaining(expected),
    );
  });
});
```

### `expect.not.objectContaining(object)`

object不是expect实际接收对象的子集

```javascript
describe('not.objectContaining', () => {
  const expected = {foo: 'bar'};

  it('matches if the actual object does not contain expected key: value pairs', () => {
    expect({bar: 'baz'}).toEqual(expect.not.objectContaining(expected));
  });
});
```

### `expect.not.stringContaining(string)`

expect接收的不是字符串或string不是接收的字符串的子串

```javascript
describe('not.stringContaining', () => {
  const expected = 'Hello world!';

  it('matches if the received value does not contain the expected substring', () => {
    expect('How are you?').toEqual(expect.not.stringContaining(expected));
  });
});
```

### `expect.not.stringMatching(string | regexp)`

expect接收的不是字符串或不匹配给定的字符串或正则

```javascript
describe('not.stringMatching', () => {
  const expected = /Hello world!/;

  it('matches if the received value does not match the expected regex', () => {
    expect('How are you?').toEqual(expect.not.stringMatching(expected));
  });
});
```

### `expect.objectContaining(object)`

object是expect实际接收对象的子集，object的属性值可使用expect.any()而不是实际的字面量

```javascript
test('onPress gets called with the right thing', () => {
  const onPress = jest.fn();
  simulatePresses(onPress);
  expect(onPress).toBeCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }),
  );
});
```

### `expect.stringContaining(string)`

string是expect实际接收字符串的子串

### `expect.stringMatching(string | regexp)`

expect 接收的字符串匹配给定的字符串或正则

```javascript
describe('stringMatching in arrayContaining', () => {
  const expected = [
    expect.stringMatching(/^Alic/),
    expect.stringMatching(/^[BR]ob/),
  ];
  it('matches even if received contains additional elements', () => {
    expect(['Alicia', 'Roberto', 'Evelina']).toEqual(
      expect.arrayContaining(expected),
    );
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Roberto', 'Evelina']).not.toEqual(
      expect.arrayContaining(expected),
    );
  });
});
```

### `expect.addSnapshotSerializer(serializer)`

添加一个用于序列化数据结构的方法，替代jest内部的默认实现

```javascript
import serializer from 'my-serializer-module';
expect.addSnapshotSerializer(serializer);

// affects expect(value).toMatchSnapshot() assertions in the test file
```

### `.not`

接收的值非预期的值

```javascript
test('the best flavor is not coconut', () => {
  expect(bestLaCroixFlavor()).not.toBe('coconut');
});
```

### `.resolves`

在测试返回promise时，用于promise解决的情况

```javascript
test('resolves to lemon', () => {
  // make sure to add a return statement
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});
```

```javascript
test('resolves to lemon', async () => {
  await expect(Promise.resolve('lemon')).resolves.toBe('lemon');
  await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus');
});
```

### `.rejects`

在测试返回promise时，用于promise拒绝的情况

```javascript
test('rejects to octopus', () => {
  // make sure to add a return statement
  return expect(Promise.reject(new Error('octopus'))).rejects.toThrow(
    'octopus',
  );
});
```

```javascript
test('rejects to octopus', async () => {
  await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus');
});
```

### `.toBe(value)`

比较基本类型值或对象实例的引用，内部使用Object.is 

```javascript
const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});
```

### `.toHaveBeenCalled()`

别名: `.toBeCalled()`

断言mock函数被调用

```javascript
describe('drinkAll', () => {
  test('drinks something lemon-flavored', () => {
    const drink = jest.fn();
    drinkAll(drink, 'lemon');
    expect(drink).toHaveBeenCalled();
  });

  test('does not drink something octopus-flavored', () => {
    const drink = jest.fn();
    drinkAll(drink, 'octopus');
    expect(drink).not.toHaveBeenCalled();
  });
});
```

### `.toHaveBeenCalledTimes(number)`

别名: `.toBeCalledTimes(number)`

断言mock函数被调用了确切的次数

```javascript
test('drinkEach drinks each drink', () => {
  const drink = jest.fn();
  drinkEach(drink, ['lemon', 'octopus']);
  expect(drink).toHaveBeenCalledTimes(2);
});
```

### `.toHaveBeenCalledWith(arg1, arg2, ...)`

别名: `.toBeCalledWith()`

断言mock函数调用时传入了特定的参数

```javascript
test('registration applies correctly to orange La Croix', () => {
  const beverage = new LaCroix('orange');
  register(beverage);
  const f = jest.fn();
  applyToAll(f);
  expect(f).toHaveBeenCalledWith(beverage);
});
```

### `.toHaveBeenLastCalledWith(arg1, arg2, ...)`

别名: `.lastCalledWith(arg1, arg2, ...)`

断言mock函数最后一次调用时传入了特定的参数

```javascript
test('applying to all flavors does mango last', () => {
  const drink = jest.fn();
  applyToAllFlavors(drink);
  expect(drink).toHaveBeenLastCalledWith('mango');
});
```

### `.toHaveBeenNthCalledWith(nth, arg1, arg2, ....)`

断言mock函数第nth次调用时传入了特定的参数

```javascript
test('drinkEach drinks each drink', () => {
  const drink = jest.fn();
  drinkEach(drink, ['lemon', 'octopus']);
  expect(drink).toHaveBeenNthCalledWith(1, 'lemon');
  expect(drink).toHaveBeenNthCalledWith(2, 'octopus');
});
```

### `.toHaveReturned()`

别名: `.toReturn()`

断言mock函数至少成功返回一次

```javascript
test('drinks returns', () => {
  const drink = jest.fn(() => true);
  drink();
  expect(drink).toHaveReturned();
});
```

### `.toHaveReturnedTimes(number)`

别名: `.toReturnTimes(number)`

断言mock函数成功返回(没有抛出错误)确切的次数，mock函数的任何抛出错误的调用都不被计算为函数返回的次数 

```javascript
test('drink returns twice', () => {
  const drink = jest.fn(() => true);
  drink();
  drink();
  expect(drink).toHaveReturnedTimes(2);
});
```

### `.toHaveReturnedWith(value)`

别名: `.toReturnWith(value)`

断言mock函数返回特定的值

```javascript
test('drink returns La Croix', () => {
  const beverage = {name: 'La Croix'};
  const drink = jest.fn(beverage => beverage.name);
  drink(beverage);
  expect(drink).toHaveReturnedWith('La Croix');
});
```

### `.toHaveLastReturnedWith(value)`

别名: `.lastReturnedWith(value)`

断言mock函数最后一次调用时返回特定的值

```javascript
test('drink returns La Croix (Orange) last', () => {
  const beverage1 = {name: 'La Croix (Lemon)'};
  const beverage2 = {name: 'La Croix (Orange)'};
  const drink = jest.fn(beverage => beverage.name);
  drink(beverage1);
  drink(beverage2);
  expect(drink).toHaveLastReturnedWith('La Croix (Orange)');
});
```

### `.toHaveNthReturnedWith(nth, value)`

别名: `.nthReturnedWith(nthCall, value)`

断言mock函数第nth次调用时返回特定的值

```javascript
test('drink returns expected nth calls', () => {
  const beverage1 = {name: 'La Croix (Lemon)'};
  const beverage2 = {name: 'La Croix (Orange)'};
  const drink = jest.fn(beverage => beverage.name);
  drink(beverage1);
  drink(beverage2);
  expect(drink).toHaveNthReturnedWith(1, 'La Croix (Lemon)');
  expect(drink).toHaveNthReturnedWith(2, 'La Croix (Orange)');
});
```

### `.toBeCloseTo(number, numDigits)`

断言expect接收的数与一个浮点数相等，额外的numDigits参数为小数点后的位数，默认为2位

```javascript
test('adding works sanely with simple decimals', () => {
  expect(0.2 + 0.1).toBe(0.3); // Fails!
});
```

```javascript
test('adding works sanely with simple decimals', () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
});
```

### `.toBeDefined()`

断言一个值不是undefined

```javascript
test('there is a new flavor idea', () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});
```

### `.toBeFalsy()`

断言一个值可以通过类型转换为false

```javascript
drinkSomeLaCroix();
if (!getErrors()) {
  drinkMoreLaCroix();
}
```

```javascript
test('drinking La Croix does not lead to errors', () => {
  drinkSomeLaCroix();
  expect(getErrors()).toBeFalsy();
});
```

js中的6个假值: `false`, `0`, `''`, `null`, `undefined`, and `NaN`

### `.toBeGreaterThan(number)`

断言expect接收的值大于预期的值

```javascript
test('ounces per can is more than 10', () => {
  expect(ouncesPerCan()).toBeGreaterThan(10);
});
```

### `.toBeGreaterThanOrEqual(number)`

断言expect接收的值大于或等于预期的值

```javascript
test('ounces per can is at least 12', () => {
  expect(ouncesPerCan()).toBeGreaterThanOrEqual(12);
});
```

### `.toBeLessThan(number)`

断言expect接收的值小于预期的值

```javascript
test('ounces per can is less than 20', () => {
  expect(ouncesPerCan()).toBeLessThan(20);
});
```

### `.toBeLessThanOrEqual(number)`

断言expect接收的值小于或等于预期的值

```javascript
test('ounces per can is at most 12', () => {
  expect(ouncesPerCan()).toBeLessThanOrEqual(12);
});
```

### `.toBeInstanceOf(Class)`

断言一个对象是某个类的实例

```javascript
class A {}
expect(new A()).toBeInstanceOf(A);
expect(() => {}).toBeInstanceOf(Function);
expect(new A()).toBeInstanceOf(Function); // throws
```

### `.toBeNull()`

断言一个值为null

```javascript
function bloop() {
  return null;
}

test('bloop returns null', () => {
  expect(bloop()).toBeNull();
});
```

### `.toBeTruthy()`

断言一个值可以通过类型转换为true

```javascript
drinkSomeLaCroix();
if (thirstInfo()) {
  drinkMoreLaCroix();
}
```

```javascript
test('drinking La Croix leads to having thirst info', () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
});
```

### `.toBeUndefined()`

断言一个值是undefined

```javascript
test('the best drink for octopus flavor is undefined', () => {
  expect(bestDrinkForFlavor('octopus')).toBeUndefined();
});
```

### `.toBeNaN()`

断言一个值为NaN

```javascript
test('passes when value is NaN', () => {
  expect(NaN).toBeNaN();
  expect(1).not.toBeNaN();
});
```

### `.toContain(item)`

断言数组中包含某个元素或字符串包含某个子串

```javascript
test('the flavor list contains lime', () => {
  expect(getAllFlavors()).toContain('lime');
});
```

### `.toContainEqual(item)`

递归的比较预期对象中的所有属性是否存在于数组的某个元素中，并非比较对象是否为同一个引用

```javascript
describe('my beverage', () => {
  test('is delicious and not sour', () => {
    const myBeverage = {delicious: true, sour: false};
    expect(myBeverages()).toContainEqual(myBeverage);
  });
});
```

### `.toEqual(value)`

递归地比较对象实例的所有属性是否，基本类型使用Object.is()比较 

```javascript
const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2);
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });
});
```

### `.toHaveLength(number)`

断言数组或对象具有length属性且值为给定的number

```javascript
expect([1, 2, 3]).toHaveLength(3);
expect('abc').toHaveLength(3);
expect('').not.toHaveLength(5);
```

### `.toMatch(regexpOrString)`

断言字符串匹配给定的正则表达式或字符串

```javascript
describe('an essay on the best flavor', () => {
  test('mentions grapefruit', () => {
    expect(essayOnTheBestFlavor()).toMatch(/grapefruit/);
    expect(essayOnTheBestFlavor()).toMatch(new RegExp('grapefruit'));
  });
});
```

```javascript
describe('grapefruits are healthy', () => {
  test('grapefruits are a fruit', () => {
    expect('grapefruits').toMatch('fruit');
  });
});
```

### `.toMatchObject(object)`

object对象的属性是expect接收对象属性的子集，若传入数组，则对于数组的每个元素均使用此比较方法。

```javascript
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
  },
};
const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    wallColor: expect.stringMatching(/white|yellow/),
  },
};

test('the house has my desired features', () => {
  expect(houseForSale).toMatchObject(desiredHouse);
});
```

```javascript
describe('toMatchObject applied to arrays arrays', () => {
  test('the number of elements must match exactly', () => {
    expect([{foo: 'bar'}, {baz: 1}]).toMatchObject([{foo: 'bar'}, {baz: 1}]);
  });

  // .arrayContaining "matches a received array which contains elements that
  // are *not* in the expected array"
  test('.toMatchObject does not allow extra elements', () => {
    expect([{foo: 'bar'}, {baz: 1}]).toMatchObject([{foo: 'bar'}]);
  });

  test('.toMatchObject is called for each elements, so extra object properties are okay', () => {
    expect([{foo: 'bar'}, {baz: 1, extra: 'quux'}]).toMatchObject([
      {foo: 'bar'},
      {baz: 1},
    ]);
  });
});
```

### `.toHaveProperty(keyPath, value)`

断言传入的对象具有给定的属性，值为value，对于嵌套的属性，可使用点语法或字符串数组。

```javascript
// Object containing house features to be tested
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
    'nice.oven': true,
  },
  'ceiling.height': 2,
};

test('this house has my desired features', () => {
  // Simple Referencing
  expect(houseForSale).toHaveProperty('bath');
  expect(houseForSale).toHaveProperty('bedrooms', 4);

  expect(houseForSale).not.toHaveProperty('pool');

  // Deep referencing using dot notation
  expect(houseForSale).toHaveProperty('kitchen.area', 20);
  expect(houseForSale).toHaveProperty('kitchen.amenities', [
    'oven',
    'stove',
    'washer',
  ]);

  expect(houseForSale).not.toHaveProperty('kitchen.open');

  // Deep referencing using an array containing the keyPath
  expect(houseForSale).toHaveProperty(['kitchen', 'area'], 20);
  expect(houseForSale).toHaveProperty(
    ['kitchen', 'amenities'],
    ['oven', 'stove', 'washer'],
  );
  expect(houseForSale).toHaveProperty(['kitchen', 'amenities', 0], 'oven');
  expect(houseForSale).toHaveProperty(['kitchen', 'nice.oven']);
  expect(houseForSale).not.toHaveProperty(['kitchen', 'open']);

  // Referencing keys with dot in the key itself
  expect(houseForSale).toHaveProperty(['ceiling.height'], 'tall');
});
```

### `.toMatchSnapshot(propertyMatchers, snapshotName)`

断言传入的值匹配最近的快照

### `.toMatchInlineSnapshot(propertyMatchers, inlineSnapshot)`

断言传入的值匹配最近的快照，不同于toMatchSnapshot将生成单独的快照文件，而仅在本文件内生成快照

### `.toStrictEqual(value)`

断言给定的值类型和结果均相同

与`.toEqual`不同:

- 检查值为undefined的键，例如：{a: undefined, b: 2}和{b: 2}不匹配
- 检查稀疏数组，例如`[, 1]` 和[undefined, 1]不匹配
- 检查对象类型，例如 具有`a` 和`b` 属性类的实例 和具有`a` 和`b` 属性的对象字面量不匹配

```javascript
class LaCroix {
  constructor(flavor) {
    this.flavor = flavor;
  }
}

describe('the La Croix cans on my desk', () => {
  test('are not semantically the same', () => {
    expect(new LaCroix('lemon')).toEqual({flavor: 'lemon'});
    expect(new LaCroix('lemon')).not.toStrictEqual({flavor: 'lemon'});
  });
});
```

### `.toThrow(error)`

别名: `.toThrowError(error)`

断言函数在调用时抛出错误

```javascript
test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus');
  }).toThrow();
});
```

要测试抛出特定错误，可以提供一个参数： 

- 正则表达式: 错误信息匹配该表达式
- 字符串: 错误信息包含该子字符串
- 错误对象: 错误信息和该对象的message匹配
- 错误类: 错误对象是类的一个实例

```javascript
function drinkFlavor(flavor) {
  if (flavor == 'octopus') {
    throw new DisgustingFlavorError('yuck, octopus flavor');
  }
  // Do some other stuff
}
```

```javascript
test('throws on octopus', () => {
  function drinkOctopus() {
    drinkFlavor('octopus');
  }

  // Test that the error message says "yuck" somewhere: these are equivalent
  expect(drinkOctopus).toThrowError(/yuck/);
  expect(drinkOctopus).toThrowError('yuck');

  // Test the exact error message
  expect(drinkOctopus).toThrowError(/^yuck, octopus flavor$/);
  expect(drinkOctopus).toThrowError(new Error('yuck, octopus flavor'));

  // Test that we get a DisgustingFlavorError
  expect(drinkOctopus).toThrowError(DisgustingFlavorError);
});
```

### `.toThrowErrorMatchingSnapshot()`

断言函数调用时抛出的错误匹配最近的快照

```javascript
function drinkFlavor(flavor) {
  if (flavor == 'octopus') {
    throw new DisgustingFlavorError('yuck, octopus flavor');
  }
  // Do some other stuff
}
```

```javascript
test('throws on octopus', () => {
  function drinkOctopus() {
    drinkFlavor('octopus');
  }

  expect(drinkOctopus).toThrowErrorMatchingSnapshot();
});
```

```javascript
exports[`drinking flavors throws on octopus 1`] = `"yuck, octopus flavor"`;
```

### `.toThrowErrorMatchingInlineSnapshot()`

断言函数调用时抛出的错误匹配最近的快照，不同于toThrowErrorMatchingSnapshot将生成单独的快照文件，而仅在本文件内生成快照