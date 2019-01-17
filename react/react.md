### React组件测试

对于React组件，一般结合enzyme。如果使用create-react-app脚手架搭建react项目，则无需安装相应的依赖。否则，需要以下依赖包：

```javascript
{
    "babel-core": "*",
    "babel-jest": "*",
    "babel-preset-env": "*",
    "babel-preset-react": "*",
    "enzyme": "*",
    "enzyme-adapter-react-16": "*",
    "react-dom": "*",
    "react-test-renderer": "*",
}
```

以上依赖中，babel相关的负责jsx、es6新语法的编译，react-test-renderer在快照测试中用到，react-dom为enzyme间接依赖，enzyme-adapter-react-16为适配器包。对应不同的react版本，具体的映射关系可见[npm官网](https://www.npmjs.com/package/enzyme)。在测试文件顶部，应首先写入以下代码：

```javascript
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })
```

