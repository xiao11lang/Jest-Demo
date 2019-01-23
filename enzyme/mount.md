# Full Rendering API (`mount(...)`)

如果组件需要和DOM API交互或者被高阶组件所包裹，那么完全的DOM渲染将是理想的方案。

完全DOM渲染要求在全局范围内提供完整的DOM API。这意味着它必须在至少“看起来像”浏览器环境的环境中运行。如果您不想在浏览器中运行测试，建议使用mount方法，它以jsdom为依赖，本质上是完全在JS中实现浏览器环境。

注意：与浅层或静态渲染不同，完全渲染会将组件挂载至DOM中，这意味着如果不同的组件测试时都使用相同的DOM，可能会相互影响。在编写测试时要记住这一点，必要时可以使用.unmount方法。 

```jsx
import { mount } from 'enzyme';
import sinon from 'sinon';
import Foo from './Foo';

describe('<Foo />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((
      <Foo onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
```

## `mount(node[, options]) => ReactWrapper`

#### 参数

1. `node` (`ReactElement`): 将渲染的节点
2. `options` (`Object` [optional]):
- `options.context`: (`Object` [optional]): 传递给组件的上下文对象
- `options.attachTo`: (`DOMElement` [optional]): 组件附加到的DOM元素
- `options.childContextTypes`: (`Object` [optional]): 合并子元素的contextTypes 

#### 返回

`ReactWrapper`: ReactWrapper的一个实例

## ReactWrapper API

#### [`.find(selector) => ReactWrapper`](ReactWrapper/find.md)

找到渲染树中所有匹配给定选择器的节点

#### [`.findWhere(predicate) => ReactWrapper`](ReactWrapper/findWhere.md)

找到渲染树中使得给定函数返回true的所有节点

#### [`.filter(selector) => ReactWrapper`](ReactWrapper/filter.md)

移除当前wrapper中不匹配给定选择器的节点

#### [`.filterWhere(predicate) => ReactWrapper`](ReactWrapper/filterWhere.md)

移除当前wrapper中使得给定函数返回false的节点

#### [`.hostNodes() => ReactWrapper`](ReactWrapper/hostNodes.md)

移除非宿主节点，这将只返回html节点

#### [`.contains(nodeOrNodes) => Boolean`](ReactWrapper/contains.md)

如果给定的节点或节点数组在渲染树中，就返回true

#### [`.containsMatchingElement(node) => Boolean`](ReactWrapper/containsMatchingElement.md)

r如果给定的React元素存在于渲染树中,就返回true

#### [`.containsAllMatchingElements(nodes) => Boolean`](ReactWrapper/containsAllMatchingElements.md)

如果所有给定的一组React元素都存在于渲染树中，就返回true

#### [`.containsAnyMatchingElements(nodes) => Boolean`](ReactWrapper/containsAnyMatchingElements.md)

如果所有给定的一组React元素有一个存在于渲染树中，就返回true

#### [`.equals(node) => Boolean`](ReactWrapper/equals.md)
如果给定的节点渲染的结果与当前渲染树匹配，就返回true

#### [`.hasClass(className) => Boolean`](ReactWrapper/hasClass.md)

如果当前节点包含给定的类名，就返回true

#### [`.is(selector) => Boolean`](ReactWrapper/is.md)

如果当前节点匹配给定的选择器，就返回true

#### [`.exists([selector]) => Boolean`](ReactWrapper/exists.md)

如果当前节点存在就返回true，也可传入一个选择器，此时如果选择器匹配，将返回true

#### [`.isEmptyRender() => Boolean`](ReactWrapper/isEmptyRender.md)

如果当前组件返回假值，就返回true

#### [`.not(selector) => ReactWrapper`](ReactWrapper/not.md)

移除当前wrapper中与给定的选择器不匹配的节点

#### [`.children() => ReactWrapper`](ReactWrapper/children.md)

返回以当前wrapper的子节点组成的新的wrapper

#### [`.childAt(index) => ReactWrapper`](ReactWrapper/childAt.md)

返回确定索引处的子节点组成的新wrapper

#### [`.parents() => ReactWrapper`](ReactWrapper/parents.md)

返回当前节点的祖先节点组成的新wrapper

#### [`.parent() => ReactWrapper`](ReactWrapper/parent.md)

返回当前节点的直接父节点组成的新wrapper

#### [`.closest(selector) => ReactWrapper`](ReactWrapper/closest.md)
返回当前节点最近的一个匹配给定选择器的祖先节点

#### [`.render() => CheerioWrapper`](ReactWrapper/render.md)
返回当前节点子树的CheerioWrapper

#### [`.renderProp(key)() => ReactWrapper`](ReactWrapper/renderProp.md)
返回用给定prop渲染的节点的wrapper

#### [`.text() => String`](ReactWrapper/text.md)

返回当前渲染树中文本节点的字符串表示形式

#### [`.html() => String`](ReactWrapper/html.md)

返回当前节点的静态HTML呈现 

#### [`.get(index) => ReactElement`](ReactWrapper/get.md)

返回当前wrapper在给定索引处的节点。

#### [`.getDOMNode() => DOMComponent`](ReactWrapper/getDOMNode.md)
返回当前wrapper最外部的DOM组件

#### [`.at(index) => ReactWrapper`](ReactWrapper/at.md)

返回当前wrapper在给定索引处的节点组成的新wrapper

#### [`.first() => ReactWrapper`](ReactWrapper/first.md)

返回当前wrapper的首个节点组成的wrapper

#### [`.last() => ReactWrapper`](ReactWrapper/last.md)

返回当前wrapper的最后一个节点组成的wrapper

#### [`.state([key]) => Any`](ReactWrapper/state.md)

返回根组件的状态

#### [`.context([key]) => Any`](ReactWrapper/context.md)

返回根组件的上下文

#### [`.props() => Object`](ReactWrapper/props.md)

返回当前节点的props

#### [`.prop(key) => Any`](ReactWrapper/prop.md)

返回当前节点props中以key为键名的键值

#### [`.key() => String`](ReactWrapper/key.md)

返回当前节点的key

#### [`.simulate(event[, data]) => ReactWrapper`](ReactWrapper/simulate.md)

模拟当前节点上的事件 

#### [`.setState(nextState) => ReactWrapper`](ReactWrapper/setState.md)

手动设置根组件的状态 

#### [`.setProps(nextProps[, callback]) => ReactWrapper`](ReactWrapper/setProps.md)

手动设置根组件的props

#### [`.setContext(context) => ReactWrapper`](ReactWrapper/setContext.md)

手动设置根组件的上下文

#### [`.instance() => ReactComponent`](ReactWrapper/instance.md)

返回根组件实例

#### [`.unmount() => ReactWrapper`](ReactWrapper/unmount.md)
卸载组件

#### [`.mount() => ReactWrapper`](ReactWrapper/mount.md)
挂载组件

#### [`.update() => ReactWrapper`](ReactWrapper/update.md)

在根组件上调用`.forceUpdate()` 

#### [`.debug() => String`](ReactWrapper/debug.md)

返回当前浅渲染树的字符串表示形式，以便进行调试。 

#### [`.type() => String|Function|null`](ReactWrapper/type.md)

返回wrapper当前节点的类型

#### [`.name() => String`](ReactWrapper/name.md)

返回wrapper当前节点的名字

#### [`.forEach(fn) => ReactWrapper`](ReactWrapper/forEach.md)

以给定的函数遍历wrapper的每个节点

#### [`.map(fn) => Array`](ReactWrapper/map.md)

将当前节点数组映射到另一个数组

#### [`.matchesElement(node) => Boolean`](ReactWrapper/matchesElement.md)
如果给定的React元素匹配当前渲染树，就返回true

#### [`.reduce(fn[, initialValue]) => Any`](ReactWrapper/reduce.md)

在当前节点数组使用reduce

#### [`.reduceRight(fn[, initialValue]) => Any`](ReactWrapper/reduceRight.md)

在当前节点数组使用reduce，从右至左遍历数组

#### `.slice([begin[, end]]) => ReactWrapper`

以给定的开始和结束索引截取一个新的节点数组组成wrapper

#### [`.tap(intercepter) => Self`](ReactWrapper/tap.md)

进入wrapper的方法链

#### [`.some(selector) => Boolean`](ReactWrapper/some.md)

如果wrapper中有节点匹配给定的选择器，就返回true

#### [`.someWhere(predicate) => Boolean`](ReactWrapper/someWhere.md)

如果wrapper中有任意节点通过给定的函数，就返回true

#### [`.every(selector) => Boolean`](ReactWrapper/every.md)

如果wrapper的所有节点都匹配给定的选择器，就返回true

#### [`.everyWhere(predicate) => Boolean`](ReactWrapper/everyWhere.md)

如果wrapper中所有节点通过给定的函数，就返回true

#### [`.ref(refName) => ReactComponent | HTMLElement`](ReactWrapper/ref.md)
返回和给定ref名匹配的节点

#### [`.detach() => void`](ReactWrapper/detach.md)
将组件从与其关联的DOM元素上卸载
