# Shallow Rendering API

浅渲染可以确保测试不会断言子组件的行为，这对于将测试约束在一个组件中很有用。

```jsx
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Foo from './Foo';

describe('<MyComponent />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});

```

`shallow(node[, options]) => ShallowWrapper`

#### 参数

1. `node` (`ReactElement`): 将渲染的节点
2. `options` (`Object` [optional]):
  - `options.context`: (`Object` [optional]): 传递给组件的上下文对象
  - `options.disableLifecycleMethods`: (`Boolean` [optional]): I如果设为true，声明周期函数`componentDidMount`
  将不会调用, 并且在设置props和context后，生命周期函数`componentDidUpdate` 也不会调用，默认为false。

#### 返回

`ShallowWrapper`: ShallowWrapper的一个实例


## ShallowWrapper API

#### [`.find(selector) => ShallowWrapper`](ShallowWrapper/find.md)
找到渲染树中所有匹配给定选择器的节点

#### [`.findWhere(predicate) => ShallowWrapper`](ShallowWrapper/findWhere.md)
找到渲染树中使得给定函数返回true的所有节点

#### [`.filter(selector) => ShallowWrapper`](ShallowWrapper/filter.md)
移除当前wrapper中不匹配给定选择器的节点

#### [`.filterWhere(predicate) => ShallowWrapper`](ShallowWrapper/filterWhere.md)
移除当前wrapper中使得给定函数返回false的节点

#### [`.hostNodes() => ShallowWrapper`](ShallowWrapper/hostNodes.md)
移除非宿主节点，这将只返回html节点

#### [`.contains(nodeOrNodes) => Boolean`](ShallowWrapper/contains.md)
如果给定的节点或节点数组在渲染树中，就返回true

#### [`.containsMatchingElement(node) => Boolean`](ShallowWrapper/containsMatchingElement.md)
r如果给定的React元素存在于渲染树中,就返回true

#### [`.containsAllMatchingElements(nodes) => Boolean`](ShallowWrapper/containsAllMatchingElements.md)
如果所有给定的一组React元素都存在于渲染树中，就返回true

#### [`.containsAnyMatchingElements(nodes) => Boolean`](ShallowWrapper/containsAnyMatchingElements.md)
如果所有给定的一组React元素有一个存在于渲染树中，就返回true

#### [`.equals(node) => Boolean`](ShallowWrapper/equals.md)
如果给定的节点渲染的结果与当前渲染树匹配，就返回true

#### [`.matchesElement(node) => Boolean`](ShallowWrapper/matchesElement.md)
如果给定的React元素匹配渲染树，就返回true

#### [`.hasClass(className) => Boolean`](ShallowWrapper/hasClass.md)
如果当前节点包含给定的类名，就返回true

#### [`.is(selector) => Boolean`](ShallowWrapper/is.md)
如果当前节点匹配给定的选择器，就返回true

#### [`.exists([selector]) => Boolean`](ShallowWrapper/exists.md)
如果当前节点存在就返回true，也可传入一个选择器，此时如果选择器匹配，将返回true

#### [`.isEmptyRender() => Boolean`](ShallowWrapper/isEmptyRender.md)
如果当前组件返回假值，就返回true

#### [`.not(selector) => ShallowWrapper`](ShallowWrapper/not.md)
移除当前wrapper中与给定的选择器不匹配的节点

#### [`.children() => ShallowWrapper`](ShallowWrapper/children.md)
返回以当前wrapper的子节点组成的新的wrapper

#### [`.childAt(index) => ShallowWrapper`](ShallowWrapper/childAt.md)
返回确定索引处的子节点组成的新wrapper

#### [`.parents() => ShallowWrapper`](ShallowWrapper/parents.md)
返回当前节点的祖先节点组成的新wrapper

#### [`.parent() => ShallowWrapper`](ShallowWrapper/parent.md)
返回当前节点的直接父节点组成的新wrapper

#### [`.closest(selector) => ShallowWrapper`](ShallowWrapper/closest.md)
返回当前节点最近的一个匹配给定选择器的祖先节点

#### [`.shallow([options]) => ShallowWrapper`](ShallowWrapper/shallow.md)
浅渲染当前节点

#### [`.render() => CheerioWrapper`](ShallowWrapper/render.md)
返回当前节点子树的CheerioWrapper

#### [`.renderProp(key)() => ShallowWrapper`](ShallowWrapper/renderProp.md)
返回用给定prop渲染的节点的wrapper

#### [`.unmount() => ShallowWrapper`](ShallowWrapper/unmount.md)
卸载所有的组件

#### [`.text() => String`](ShallowWrapper/text.md)
返回当前渲染树中文本节点的字符串表示形式

#### [`.html() => String`](ShallowWrapper/html.md)
返回当前节点的静态HTML呈现 

#### [`.get(index) => ReactElement`](ShallowWrapper/get.md)
返回当前wrapper在给定索引处的节点。 

#### [`.getElement() => ReactElement`](ShallowWrapper/getElement.md)
返回包装后的React元素

#### [`.getElements() => Array<ReactElement>`](ShallowWrapper/getElements.md)
返回包装后的React元素数组

#### [`.at(index) => ShallowWrapper`](ShallowWrapper/at.md)
返回当前wrapper在给定索引处的节点组成的新wrapper

#### [`.first() => ShallowWrapper`](ShallowWrapper/first.md)
返回当前wrapper的首个节点组成的wrapper

#### [`.last() => ShallowWrapper`](ShallowWrapper/last.md)
返回当前wrapper的最后一个节点组成的wrapper

#### [`.state([key]) => Any`](ShallowWrapper/state.md)
返回根组件的状态

#### [`.context([key]) => Any`](ShallowWrapper/context.md)
返回根组件的上下文

#### [`.props() => Object`](ShallowWrapper/props.md)
返回当前节点的props

#### [`.prop(key) => Any`](ShallowWrapper/prop.md)
返回当前节点props中以key为键名的键值

#### [`.key() => String`](ShallowWrapper/key.md)
返回当前节点的key

#### [`.simulate(event[, data]) => ShallowWrapper`](ShallowWrapper/simulate.md)
模拟当前节点上的事件 

#### [`.setState(nextState) => ShallowWrapper`](ShallowWrapper/setState.md)
手动设置根组件的状态 

#### [`.setProps(nextProps[, callback]) => ShallowWrapper`](ShallowWrapper/setProps.md)
手动设置根组件的props

#### [`.setContext(context) => ShallowWrapper`](ShallowWrapper/setContext.md)
手动设置根组件的上下文

#### [`.instance() => ReactComponent`](ShallowWrapper/instance.md)
返回根组件实例

#### [`.update() => ShallowWrapper`](ShallowWrapper/update.md)
在根组件上调用`.forceUpdate()` 

#### [`.debug() => String`](ShallowWrapper/debug.md)
返回当前浅渲染树的字符串表示形式，以便进行调试。 

#### [`.type() => String|Function|null`](ShallowWrapper/type.md)
返回wrapper当前节点的类型

#### [`.name() => String`](ShallowWrapper/name.md)
返回wrapper当前节点的名字

#### [`.forEach(fn) => ShallowWrapper`](ShallowWrapper/forEach.md)
以给定的函数遍历wrapper的每个节点

#### [`.map(fn) => Array`](ShallowWrapper/map.md)
将当前节点数组映射到另一个数组

#### [`.reduce(fn[, initialValue]) => Any`](ShallowWrapper/reduce.md)
在当前节点数组使用reduce

#### [`.reduceRight(fn[, initialValue]) => Any`](ShallowWrapper/reduceRight.md)
在当前节点数组使用reduce，从右至左遍历数组

#### `.slice([begin[, end]]) => ShallowWrapper`
以给定的开始和结束索引截取一个新的节点数组组成wrapper

#### [`.tap(intercepter) => Self`](ShallowWrapper/tap.md)
进入wrapper的方法链

#### [`.some(selector) => Boolean`](ShallowWrapper/some.md)
如果wrapper中有节点匹配给定的选择器，就返回true

#### [`.someWhere(predicate) => Boolean`](ShallowWrapper/someWhere.md)
如果wrapper中有任意节点通过给定的函数，就返回true

#### [`.every(selector) => Boolean`](ShallowWrapper/every.md)
如果wrapper的所有节点都匹配给定的选择器，就返回true

#### [`.everyWhere(predicate) => Boolean`](ShallowWrapper/everyWhere.md)
如果wrapper中所有节点通过给定的函数，就返回true

#### [`.dive([options]) => ShallowWrapper`](ShallowWrapper/dive.md)
浅当前wrapper中不是Dom的子元素并返回新的wrapper
