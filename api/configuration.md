jest可以通过`package.json`或`jest.config.js`以及--config <path/to/js|json>选项进行配置。

```json
{
  "name": "my-project",
  "jest": {
    "verbose": true
  }
}
```

```javascript
// jest.config.js
module.exports = {
  verbose: true,
};
```

使用`--config`配置选项时，JSON 文件不能有"jest"键值︰

```
{
  "bail": 1,
  "verbose": true
}
```

## 选项

### Defaults

检索Jest的默认选项以展开它们： 

```javascript
// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
};
```

------

## 参考

### `automock` [boolean]

默认值︰`false`

是否对导入的模块进行自动模拟

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
//__tests__/automocking.test.js
import utils from '../utils';

test('if utils mocked automatically', () => {
  // Public methods of `utils` are now mock functions
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized.mock).toBeTruthy();

  // You can provide them with your own implementation
  // or just pass the expected return value
  utils.authorize.mockReturnValue('mocked_token');
  utils.isAuthorized.mockReturnValue(true);

  expect(utils.authorize()).toBe('mocked_token');
  expect(utils.isAuthorized('not_wizard')).toBeTruthy();
});
```

注意: 核心模块不会自动模拟

### `bail` [number | boolean]

Default: `0`

By default, Jest runs all tests and produces all errors into the console upon completion. The bail config option can be used here to have Jest stop running tests after `n` failures. Setting bail to `true` is the same as setting bail to `1`.

### `browser` [boolean]

默认值︰`false`

当解析模块时，是否遵循在 `package.json` 中的 Browserify 的 [`"browser"` 字段](https://github.com/substack/browserify-handbook#browser-field)。 有些模块会导出不一样的版本，这取决于你是在 Node 还是在一个浏览器中进行操作。

### `cacheDirectory` [string]

默认值︰ `"/tmp/<path>"`

Jest用来储存依赖信息缓存的目录。

Jest 尝试去扫描你的依赖树一次（前期）并且把依赖树缓存起来，其目的就是抹去某些在运行测试时需要进行的文件系统排序。 这一配置选项让你可以自定义Jest将缓存数据储存在磁盘的那个位置。

### `clearMocks` [boolean]

默认值︰`false`

Automatically clear mock calls and instances between every test. Equivalent to calling `jest.clearAllMocks()` between each test. This does not remove any mock implementation that may have been provided.

### `collectCoverage` [boolean]

默认值︰`false`

指出是否收集测试时的覆盖率信息。 由于要带上覆盖率搜集语句重新访问所有执行过的文件，这可能会让你的测试执行速度被明显减慢。

### `collectCoverageFrom` [array]

默认值：`undefined`

An array of [glob patterns](https://github.com/jonschlinkert/micromatch) indicating a set of files for which coverage information should be collected. If a file matches the specified glob pattern, coverage information will be collected for it even if no tests exist for this file and it's never required in the test suite.

示例：

```javascript
{
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
}
```

This will collect coverage information for all the files inside the project's `rootDir`, except the ones that match `**/node_modules/**` or `**/vendor/**`.

*注意：该选项要求 collectCoverage 被设成true，或者通过 --coverage 参数来调用 Jest。*

Help:

### `coverageDirectory` [string]

默认值：`undefined`

Jest输出覆盖信息文件的目录。

### `coveragePathIgnorePatterns` [数组]

默认值︰`["node_modules"]`

An array of regexp pattern strings that are matched against all file paths before executing the test. If the file path matches any of the patterns, coverage information will be skipped.

These pattern strings match against the full path. Use the `<rootDir>` string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: `["<rootDir>/build/", "<rootDir>/node_modules/"]`.

### `coverageReporters` [数组]

Default: `["json", "lcov", "text", "clover"]`

A list of reporter names that Jest uses when writing coverage reports. Any [istanbul reporter](https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib) can be used.

*Note: Setting this option overwrites the default values. Add "text" or "text-summary" to see a coverage summary in the console output.*

### `coverageThreshold` [object]

默认值：`undefined`

This will be used to configure minimum threshold enforcement for coverage results. Thresholds can be specified as `global`, as a [glob](https://github.com/isaacs/node-glob#glob-primer), and as a directory or file path. 如果没有达到阈值，Jest 执行测试时将会失败。 Thresholds specified as a positive number are taken to be the minimum percentage required. Thresholds specified as a negative number represent the maximum number of uncovered entities allowed.

For example, with the following configuration jest will fail if there is less than 80% branch, line, and function coverage, or if there are more than 10 uncovered statements:

```javascript
{
  ...
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    }
  }
}
```

If globs or paths are specified alongside `global`, coverage data for matching paths will be subtracted from overall coverage and thresholds will be applied independently. 通配符模式设置的阈值将应用到所匹配的所有文件上并单独计算。 If the file specified by path is not found, error is returned.

例如，基于下面的配置：

```javascript
{
  ...
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 50,
        "functions": 50,
        "lines": 50,
        "statements": 50
      },
      "./src/components/": {
        "branches": 40,
        "statements": 40
      },
      "./src/reducers/**/*.js": {
        "statements": 90
      },
      "./src/api/very-important-module.js": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    }
  }
}
```

Jest 在以下情况下将失败：

- The `./src/components` directory has less than 40% branch or statement coverage.
- One of the files matching the `./src/reducers/**/*.js` glob has less than 90% statement coverage.
- 文件 `./src/api/very-important-module.js` 的任意一种覆盖率低于 100%
- 所有剩下的文件的任意一种覆盖率总计低于 50% (根据 `global`)

### `dependencyExtractor` [string]

默认值：`undefined`

This option allows the use of a custom dependency extractor. It must be a node module that exports an object with an `extract` function. E.g.:

```javascript
const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  extract(code, filePath, defaultExtract) {
    const deps = defaultExtract(code, filePath);
    // Scan the file and add dependencies in `deps` (which is a `Set`)
    return deps;
  },
  getCacheKey() {
    return crypto
      .createHash('md5')
      .update(fs.readFileSync(__filename))
      .digest('hex');
  },
};
```

The `extract` function should return an iterable (`Array`, `Set`, etc.) with the dependencies found in the code.

That module can also contain a `getCacheKey` function to generate a cache key to determine if the logic has changed and any cached artifacts relying on it should be discarded.

### `errorOnDeprecated` [boolean]

默认值︰`false`

Make calling deprecated APIs throw helpful error messages. Useful for easing the upgrade process.

### `extraGlobals` [数组]

默认值：`undefined`

Test files run inside a [vm](https://nodejs.org/api/vm.html), which slows calls to global context properties (e.g. `Math`). With this option you can specify extra properties to be defined inside the vm for faster lookups.

For example, if your tests call `Math` often, you can pass it by setting `extraGlobals`.

```javascript
{
  ...
  "jest": {
    "extraGlobals": ["Math"]
  }
}
```

### `forceCoverageMatch` [数组]

Default: `['']`

Test files are normally ignored from collecting code coverage. With this option, you can overwrite this behavior and include otherwise ignored files in code coverage.

For example, if you have tests in source files named with `.t.js` extension as following:

```javascript
// sum.t.js

export function sum(a, b) {
  return a + b;
}

if (process.env.NODE_ENV === 'test') {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
}
```

你可以通过设置 `forceCoverageMatch` 从这些文件中收集覆盖率。

```javascript
{
  ...
  "jest": {
    "forceCoverageMatch": ["**/*.t.js"]
  }
}
```

### `globals` [object]

默认值：`{}`

一组全局变量，在所有测试环境下都可以访问。

例如，下面这段代码将为所有测试环境创建一个值为`true`的全局变量`__DEV__`：

```javascript
{
  ...
  "jest": {
    "globals": {
      "__DEV__": true
    }
  }
}
```

注意，如果你在这指定了一个全局引用值（例如，对象或者数组），之后在测试运行中有些代码改变了这个被引用的值，这个改动对于其他测试*不会*生效。 In addition the `globals` object must be json-serializable, so it can't be used to specify global functions. 要实现这种功能，应该使用 `setupFiles`。

### `globalSetup` [string]

默认值：`undefined`

This option allows the use of a custom global setup module which exports an async function that is triggered once before all test suites. This function gets Jest's `globalConfig` object as a parameter.

*Note: A global setup module configured in a project (using multi-project runner) will be triggered only when you run at least one test from this project.*

*Note: Any global variables that are defined through globalSetup can only be read in globalTeardown. You cannot retrieve globals defined here in your test suites.*

*Note: While code transformation is applied to the linked setup-file, Jest will \**not** transform any code in node_modules. This is due to the need to load the actual transformers (e.g. babel or typescript) to perform transformation.*

示例：

```javascript
// setup.js
module.exports = async () => {
  // ...
  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;
};
```

```
// teardown.js
module.exports = async function() {
  await global.__MONGOD__.stop();
};
```

### `globalTeardown` [string]

默认值：`undefined`

This option allows the use of a custom global teardown module which exports an async function that is triggered once after all test suites. This function gets Jest's `globalConfig` object as a parameter.

*Note: A global teardown module configured in a project (using multi-project runner) will be triggered only when you run at least one test from this project.*

_Node: The same caveat concerning transformation of `node_modules_ as for`globalSetup`applies to`globalTeardown`.

### `moduleDirectories` [数组]

默认值︰`["node_modules"]`

An array of directory names to be searched recursively up from the requiring module's location. Setting this option will *override* the default, if you wish to still search `node_modules` for packages include it along with any other options: `["node_modules", "bower_components"]`

### `moduleFileExtensions` [数组]

Default: `["js", "json", "jsx", "ts", "tsx", "node"]`

An array of file extensions your modules use. If you require modules without specifying a file extension, these are the extensions Jest will look for, in left-to-right order.

We recommend placing the extensions most commonly used in your project on the left, so if you are using TypeScript, you may want to consider moving "ts" and/or "tsx" to the beginning of the array.

### `moduleNameMapper` [object<string, string>]

默认值︰`null`

A map from regular expressions to module names that allow to stub out resources, like images or styles with a single module.

Modules that are mapped to an alias are unmocked by default, regardless of whether automocking is enabled or not.

Use `<rootDir>` string token to refer to [`rootDir`](https://jestjs.io/docs/zh-Hans/configuration#rootdir-string) value if you want to use file paths.

Additionally, you can substitute captured regex groups using numbered backreferences.

示例：

```javascript
{
  "moduleNameMapper": {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
    "module_name_(.*)": "<rootDir>/substituted_module_$1.js"
  }
}
```

The order in which the mappings are defined matters. Patterns are checked one by one until one fits. The most specific rule should be listed first.

*Note: If you provide module name without boundaries ^$ it may cause hard to spot errors. E.g. relaywill replace all modules which contain relay as a substring in its name: relay, react-relay and graphql-relay will all be pointed to your stub.*

### `modulePathIgnorePatterns` [数组]

默认值：`[]`

An array of regexp pattern strings that are matched against all module paths before those paths are to be considered 'visible' to the module loader. If a given module's path matches any of the patterns, it will not be `require()`-able in the test environment.

These pattern strings match against the full path. Use the `<rootDir>` string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: `["<rootDir>/build/"]`.

### `modulePaths` [数组]

默认值：`[]`

An alternative API to setting the `NODE_PATH` env variable, `modulePaths` is an array of absolute paths to additional locations to search when resolving modules. Use the `<rootDir>` string token to include the path to your project's root directory. Example: `["<rootDir>/app/"]`.

### `notify` [boolean]

默认值︰`false`

Activates notifications for test results.

### `notifyMode` [string]

Default: `failure-change`

Specifies notification mode. Requires `notify: true`.

#### Modes

- `always`: always send a notification.
- `failure`: send a notification when tests fail.
- `success`: send a notification when tests pass.
- `change`: send a notification when the status changed.
- `success-change`: send a notification when tests pass or once when it fails.
- `failure-change`: send a notification when tests fail or once when it passes.

### `preset` [string]

默认值：`undefined`

A preset that is used as a base for Jest's configuration. A preset should point to an npm module that has a `jest-preset.json` or `jest-preset.js` file at the root.

For example, this preset `foo-bar/jest-preset.js` will be configured as follows:

```javascript
{
  "preset": "foo-bar"
}
```

Presets may also be relative filesystem paths.

```javascript
{
  "preset": "./node_modules/foo-bar/jest-preset.js"
}
```

### `prettierPath` [string]

Default: `'prettier'`

Sets the path to the [`prettier`](https://prettier.io/) node module used to update inline snapshots.

### `projects` [数组<string | projectconfig>]

默认值：`undefined`

When the `projects` configuration is provided with an array of paths or glob patterns, Jest will run tests in all of the specified projects at the same time. This is great for monorepos or when working on multiple projects at the same time.

```javascript
{
  "projects": ["<rootDir>", "<rootDir>/examples/*"]
}
```

This example configuration will run Jest in the root directory as well as in every folder in the examples directory. You can have an unlimited amount of projects running in the same Jest instance.

The projects feature can also be used to run multiple configurations or multiple [runners](https://jestjs.io/docs/zh-Hans/configuration#runner-string). For this purpose you can pass an array of configuration objects. For example, to run both tests and ESLint (via [jest-runner-eslint](https://github.com/jest-community/jest-runner-eslint)) in the same invocation of Jest:

```javascript
{
  "projects": [
    {
      "displayName": "test"
    },
    {
      "displayName": "lint",
      "runner": "jest-runner-eslint",
      "testMatch": ["<rootDir>/**/*.js"]
    }
  ]
}
```

*Note: When using multi project runner, it's recommended to add a displayName for each project. This will show the displayName of a project next to its tests.*

### `reporters` [数组<modulename | [modulename, options]>]

默认值：`undefined`

Use this configuration option to add custom reporters to Jest. A custom reporter is a class that implements `onRunStart`, `onTestStart`, `onTestResult`, `onRunComplete` methods that will be called when any of those events occurs.

If custom reporters are specified, the default Jest reporters will be overridden. To keep default reporters, `default` can be passed as a module name.

This will override default reporters:

```javascript
{
  "reporters": ["<rootDir>/my-custom-reporter.js"]
}
```

This will use custom reporter in addition to default reporters that Jest provides:

```javascript
{
  "reporters": ["default", "<rootDir>/my-custom-reporter.js"]
}
```

Additionally, custom reporters can be configured by passing an `options` object as a second argument:

```javascript
{
  "reporters": [
    "default",
    ["<rootDir>/my-custom-reporter.js", {"banana": "yes", "pineapple": "no"}]
  ]
}
```

Custom reporter modules must define a class that takes a `GlobalConfig` and reporter options as constructor arguments:

Example reporter:

```javascript
// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('Custom reporter output:');
    console.log('GlobalConfig: ', this._globalConfig);
    console.log('Options: ', this._options);
  }
}

module.exports = MyCustomReporter;
```

Custom reporters can also force Jest to exit with non-0 code by returning an Error from `getLastError()` methods

```javascript
class MyCustomReporter {
  // ...
  getLastError() {
    if (this._shouldFail) {
      return new Error('my-custom-reporter.js reported an error');
    }
  }
}
```

For the full list of methods and argument types see `Reporter` type in [types/TestRunner.js](https://github.com/facebook/jest/blob/master/types/TestRunner.js)

### `resetMocks` [boolean]

默认值︰`false`

Automatically reset mock state between every test. Equivalent to calling `jest.resetAllMocks()`between each test. This will lead to any mocks having their fake implementations removed but does not restore their initial implementation.

### `resetModules` [boolean]

默认值︰`false`

By default, each test file gets its own independent module registry. Enabling `resetModules` goes a step further and resets the module registry before running each individual test. This is useful to isolate modules for every test so that local module state doesn't conflict between tests. This can be done programmatically using [`jest.resetModules()`](https://jestjs.io/docs/zh-Hans/configuration#jest-resetmodules).

### `resolver` [string]

默认值：`undefined`

This option allows the use of a custom resolver. This resolver must be a node module that exports a function expecting a string as the first argument for the path to resolve and an object with the following structure as the second argument:

```javascript
{
  "basedir": string,
  "browser": bool,
  "extensions": [string],
  "moduleDirectory": [string],
  "paths": [string],
  "rootDir": [string]
}
```

The function should either return a path to the module that should be resolved or throw an error if the module can't be found.

### `restoreMocks` [boolean]

默认值︰`false`

Automatically restore mock state between every test. Equivalent to calling `jest.restoreAllMocks()`between each test. This will lead to any mocks having their fake implementations removed and restores their initial implementation.

### `rootDir` [string]

Default: The root of the directory containing your jest's [config file](https://jestjs.io/docs/zh-Hans/configuration#) *or* the `package.json` *or* the [`pwd`](http://en.wikipedia.org/wiki/Pwd) if no `package.json` is found

The root directory that Jest should scan for tests and modules within. If you put your Jest config inside your `package.json` and want the root directory to be the root of your repo, the value for this config param will default to the directory of the `package.json`.

Oftentimes, you'll want to set this to `'src'` or `'lib'`, corresponding to where in your repository the code is stored.

*Note that using '<rootDir>' as a string token in any other path-based config settings will refer back to this value. So, for example, if you want your setupFiles config entry to point at the env-setup.js file at the root of your project, you could set its value to ["<rootDir>/env-setup.js"].*

### `roots` [数组]

默认值︰`["<rootDir>"]`

A list of paths to directories that Jest should use to search for files in.

There are times where you only want Jest to search in a single sub-directory (such as cases where you have a `src/` directory in your repo), but prevent it from accessing the rest of the repo.

*Note: While rootDir is mostly used as a token to be re-used in other configuration options, roots is used by the internals of Jest to locate \**test files and source files**. This applies also when searching for manual mocks for modules from node_modules (__mocks__ will need to live in one of the roots).*

*Note: By default, roots has a single entry <rootDir> but there are cases where you may want to have multiple roots within one project, for example roots: ["<rootDir>/src/", "<rootDir>/tests/"].*

### `runner` [string]

Default: `"jest-runner"`

This option allows you to use a custom runner instead of Jest's default test runner. Examples of runners include:

- [`jest-runner-eslint`](https://github.com/jest-community/jest-runner-eslint)
- [`jest-runner-mocha`](https://github.com/rogeliog/jest-runner-mocha)
- [`jest-runner-tsc`](https://github.com/azz/jest-runner-tsc)
- [`jest-runner-prettier`](https://github.com/keplersj/jest-runner-prettier)

*Note: The runner property value can omit the jest-runner- prefix of the package name.*

To write a test-runner, export a class with which accepts `globalConfig` in the constructor, and has a `runTests` method with the signature:

```javascript
async runTests(
  tests: Array<Test>,
  watcher: TestWatcher,
  onStart: OnTestStart,
  onResult: OnTestSuccess,
  onFailure: OnTestFailure,
  options: TestRunnerOptions,
): Promise<void>
```

If you need to restrict your test-runner to only run in serial rather then being executed in parallel your class should have the property `isSerial` to be set as `true`.

### `setupFiles` [array]

默认值：`[]`

A list of paths to modules that run some code to configure or set up the testing environment. Each setupFile will be run once per test file. Since every test runs in its own environment, these scripts will be executed in the testing environment immediately before executing the test code itself.

It's also worth noting that `setupFiles` will execute *before* [`setupFilesAfterEnv`](https://jestjs.io/docs/zh-Hans/configuration#setupFilesAfterEnv-array).

### `setupFilesAfterEnv` [array]

默认值：`[]`

A list of paths to modules that run some code to configure or set up the testing framework before each test. Since [`setupFiles`](https://jestjs.io/docs/zh-Hans/configuration#setupfiles-array) executes before the test framework is installed in the environment, this script file presents you the opportunity of running some code immediately after the test framework has been installed in the environment.

If you want a path to be [relative to the root directory of your project](https://jestjs.io/docs/zh-Hans/configuration#rootdir-string), please include `<rootDir>` inside a path's string, like `"<rootDir>/a-configs-folder"`.

For example, Jest ships with several plug-ins to `jasmine` that work by monkey-patching the jasmine API. If you wanted to add even more jasmine plugins to the mix (or if you wanted some custom, project-wide matchers for example), you could do so in these modules.

*Note: setupTestFrameworkScriptFile is deprecated in favor of setupFilesAfterEnv.*

### `snapshotResolver` [string]

默认值：`undefined`

The path to a module that can resolve test<->snapshot path. This config option lets you customize where Jest stores snapshot files on disk.

Example snapshot resolver module:

```javascript
module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace('__tests__', '__snapshots__') + snapshotExtension,

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace('__snapshots__', '__tests__')
      .slice(0, -snapshotExtension.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'some/__tests__/example.test.js',
};
```

### `snapshotSerializers` [数组]

默认值：`[]`

A list of paths to snapshot serializer modules Jest should use for snapshot testing.

Jest has default serializers for built-in JavaScript types, HTML elements (Jest 20.0.0+), ImmutableJS (Jest 20.0.0+) and for React elements. See [snapshot test tutorial](https://jestjs.io/docs/zh-Hans/tutorial-react-native#snapshot-test) for more information.

Example serializer module:

```javascript
// my-serializer-module
module.exports = {
  print(val, serialize, indent) {
    return 'Pretty foo: ' + serialize(val.foo);
  },

  test(val) {
    return val && val.hasOwnProperty('foo');
  },
};
```

`serialize` is a function that serializes a value using existing plugins.

To use `my-serializer-module` as a serializer, configuration would be as follows:

```javascript
{
  ...
  "jest": {
    "snapshotSerializers": ["my-serializer-module"]
  }
}
```

Finally tests would look as follows:

```javascript
test(() => {
  const bar = {
    foo: {
      x: 1,
      y: 2,
    },
  };

  expect(bar).toMatchSnapshot();
});
```

Rendered snapshot:

```javascript
Pretty foo: Object {
  "x": 1,
  "y": 2,
}
```

To make a dependency explicit instead of implicit, you can call [`expect.addSnapshotSerializer`](https://jestjs.io/docs/zh-Hans/expect#expectaddsnapshotserializerserializer) to add a module for an individual test file instead of adding its path to `snapshotSerializers` in Jest configuration.

### `testEnvironment` [string]

默认值︰`"jsdom"`

The test environment that will be used for testing. The default environment in Jest is a browser-like environment through [jsdom](https://github.com/tmpvar/jsdom). If you are building a node service, you can use the `node` option to use a node-like environment instead.

By adding a `@jest-environment` docblock at the top of the file, you can specify another environment to be used for all tests in that file:

```javascript
/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
```

You can create your own module that will be used for setting up the test environment. The module must export a class with `setup`, `teardown` and `runScript` methods. You can also pass variables from this module to your test suites by assigning them to `this.global` object – this will make them available in your test suites as global variables.

*Note: TestEnvironment is sandboxed. Each test suite will trigger setup/teardown in their own TestEnvironment.*

示例：

```javascript
// my-custom-environment
const NodeEnvironment = require('jest-environment-node');

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
  }

  async setup() {
    await super.setup();
    await someSetupTasks(this.testPath);
    this.global.someGlobalObject = createGlobalObject();
  }

  async teardown() {
    this.global.someGlobalObject = destroyGlobalObject();
    await someTeardownTasks();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
```

```javascript
// my-test-suite
let someGlobalObject;

beforeAll(() => {
  someGlobalObject = global.someGlobalObject;
});
```

*Note: Jest comes with JSDOM@11 by default. Due to JSDOM 12 and newer dropping support for Node 6, Jest is unable to upgrade for the time being. However, you can install a custom testEnvironment with whichever version of JSDOM you want. E.g. jest-environment-jsdom-thirteen, which has JSDOM@13.*

### `testEnvironmentOptions` [Object]

默认值：`{}`

Test environment options that will be passed to the `testEnvironment`. The relevant options depend on the environment. For example you can override options given to [jsdom](https://github.com/tmpvar/jsdom) such as `{userAgent: "Agent/007"}`.

### `testMatch` [数组]

(default: `[ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]`)

The glob patterns Jest uses to detect test files. By default it looks for `.js`, `.jsx`, `.ts` and `.tsx` files inside of `__tests__` folders, as well as any files with a suffix of `.test` or `.spec` (e.g. `Component.test.js` or `Component.spec.js`). It will also find files called `test.js` or `spec.js`.

See the [micromatch](https://github.com/jonschlinkert/micromatch) package for details of the patterns you can specify.

See also [`testRegex` [string | Array\]](https://jestjs.io/docs/zh-Hans/configuration#testregex-string), but note that you cannot specify both options.

### `testPathIgnorePatterns` [数组]

默认值︰`["node_modules"]`

An array of regexp pattern strings that are matched against all test paths before executing the test. If the test path matches any of the patterns, it will be skipped.

These pattern strings match against the full path. Use the `<rootDir>` string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: `["<rootDir>/build/", "<rootDir>/node_modules/"]`.

### `testRegex` [string | Array]

Default: `(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$`

The pattern or patterns Jest uses to detect test files. By default it looks for `.js`, `.jsx`, `.ts` and `.tsx`files inside of `__tests__` folders, as well as any files with a suffix of `.test` or `.spec` (e.g. `Component.test.js` or `Component.spec.js`). It will also find files called `test.js` or `spec.js`. See also [`testMatch` [array\]](https://jestjs.io/docs/zh-Hans/configuration#testmatch-array-string), but note that you cannot specify both options.

The following is a visualization of the default regex:

```javascript
├── __tests__
│   └── component.spec.js # test
│   └── anything # test
├── package.json # not test
├── foo.test.js # test
├── bar.spec.jsx # test
└── component.js # not test
```

*Note: testRegex will try to detect test files using the \**absolute file path** therefore having a folder with name that match it will run all the files as tests*

### `testResultsProcessor` [string]

默认值：`undefined`

This option allows the use of a custom results processor. This processor must be a node module that exports a function expecting an object with the following structure as the first argument and return it:

```javascript
{
  "success": bool,
  "startTime": epoch,
  "numTotalTestSuites": number,
  "numPassedTestSuites": number,
  "numFailedTestSuites": number,
  "numRuntimeErrorTestSuites": number,
  "numTotalTests": number,
  "numPassedTests": number,
  "numFailedTests": number,
  "numPendingTests": number,
  "openHandles": Array<Error>,
  "testResults": [{
    "numFailingTests": number,
    "numPassingTests": number,
    "numPendingTests": number,
    "testResults": [{
      "title": string (message in it block),
      "status": "failed" | "pending" | "passed",
      "ancestorTitles": [string (message in describe blocks)],
      "failureMessages": [string],
      "numPassingAsserts": number,
      "location": {
        "column": number,
        "line": number
      }
    },
    ...
    ],
    "perfStats": {
      "start": epoch,
      "end": epoch
    },
    "testFilePath": absolute path to test file,
    "coverage": {}
  },
  ...
  ]
}
```

### `testRunner` [string]

默认值︰`jasmine2`

This option allows use of a custom test runner. The default is jasmine2. A custom test runner can be provided by specifying a path to a test runner implementation.

The test runner module must export a function with the following signature:

```javascript
function testRunner(
  config: Config,
  environment: Environment,
  runtime: Runtime,
  testPath: string,
): Promise<TestResult>;
```

An example of such function can be found in our default [jasmine2 test runner package](https://github.com/facebook/jest/blob/master/packages/jest-jasmine2/src/index.js).

### `testURL` [string]

Default: `http://localhost`

This option sets the URL for the jsdom environment. It is reflected in properties such as `location.href`.

### `timers` [string]

默认值︰`real`

Setting this value to `fake` allows the use of fake timers for functions such as `setTimeout`. Fake timers are useful when a piece of code sets a long timeout that we don't want to wait for in a test.

### `transform` [object<string, string>]

默认值：`undefined`

A map from regular expressions to paths to transformers. A transformer is a module that provides a synchronous function for transforming source files. For example, if you wanted to be able to use a new language feature in your modules or tests that isn't yet supported by node, you might plug in one of many compilers that compile a future version of JavaScript to a current one. Example: see the [examples/typescript](https://github.com/facebook/jest/blob/master/examples/typescript/package.json#L16) example or the [webpack tutorial](https://jestjs.io/docs/zh-Hans/webpack).

Examples of such compilers include [Babel](https://babeljs.io/), [TypeScript](http://www.typescriptlang.org/) and [async-to-gen](http://github.com/leebyron/async-to-gen#jest).

*Note: a transformer is only run once per file unless the file has changed. During development of a transformer it can be useful to run Jest with --no-cache to frequently delete Jest's cache.*

*Note: if you are using the babel-jest transformer and want to use an additional code preprocessor, keep in mind that when "transform" is overwritten in any way the babel-jest is not loaded automatically anymore. If you want to use it to compile JavaScript code it has to be explicitly defined. See babel-jest plugin*

### `transformIgnorePatterns` [数组]

默认值︰`["node_modules"]`

An array of regexp pattern strings that are matched against all source file paths before transformation. If the test path matches any of the patterns, it will not be transformed.

These pattern strings match against the full path. Use the `<rootDir>` string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories.

Example: `["<rootDir>/bower_components/", "<rootDir>/node_modules/"]`.

Sometimes it happens (especially in React Native or TypeScript projects) that 3rd party modules are published as untranspiled. Since all files inside `node_modules` are not transformed by default, Jest will not understand the code in these modules, resulting in syntax errors. To overcome this, you may use `transformIgnorePatterns` to whitelist such modules. You'll find a good example of this use case in [React Native Guide](https://jestjs.io/docs/en/tutorial-react-native#transformignorepatterns-customization).

### `unmockedModulePathPatterns` [数组]

默认值：`[]`

An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them. If a module's path matches any of the patterns in this list, it will not be automatically mocked by the module loader.

This is useful for some commonly used 'utility' modules that are almost always used as implementation details almost all the time (like underscore/lo-dash, etc). It's generally a best practice to keep this list as small as possible and always use explicit `jest.mock()`/`jest.unmock()` calls in individual tests. Explicit per-test setup is far easier for other readers of the test to reason about the environment the test will run in.

It is possible to override this setting in individual tests by explicitly calling `jest.mock()` at the top of the test file.

### `verbose` [boolean]

默认值︰`false`

Indicates whether each individual test should be reported during the run. All errors will also still be shown on the bottom after execution.

### `watchPathIgnorePatterns` [数组]

默认值：`[]`

An array of RegExp patterns that are matched against all source file paths before re-running tests in watch mode. If the file path matches any of the patterns, when it is updated, it will not trigger a re-run of tests.

These patterns match against the full path. Use the `<rootDir>` string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: `["<rootDir>/node_modules/"]`.

### `watchPlugins` [数组<string | [string, object]>]

默认值：`[]`

This option allows you to use a custom watch plugins. Read more about watch plugins [here](https://jestjs.io/docs/zh-Hans/watch-plugins).

Examples of watch plugins include:

- [`jest-watch-master`](https://github.com/rickhanlonii/jest-watch-master)
- [`jest-watch-select-projects`](https://github.com/rogeliog/jest-watch-select-projects)
- [`jest-watch-suspend`](https://github.com/unional/jest-watch-suspend)
- [`jest-watch-typeahead`](https://github.com/jest-community/jest-watch-typeahead)
- [`jest-watch-yarn-workspaces`](https://github.com/cameronhunter/jest-watch-directories/tree/master/packages/jest-watch-yarn-workspaces)

*Note: The values in the watchPlugins property value can omit the jest-watch- prefix of the package name.*

### `//` [string]

No default

This option allow comments in `package.json`. Include the comment text as the value of this key anywhere in `package.json`.

示例：

```javascript
{
  "name": "my-project",
  "jest": {
    "//": "Comment goes here",
    "verbose": true
  }
}
```