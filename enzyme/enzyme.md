### enzyme

enzyme提供了三种渲染React组件的方式，对应于不同的需求。

#### Shallow Rendering

浅渲染不需要真实的dom环境，而是将React组件渲染为虚拟dom，但是仅渲染第一层，对于组件的子组件，并不会进行渲染，所以浅渲染的速度较快。

#### Full Dom Rendering

完全渲染会将组件渲染加载成一个真实的DOM节点，用来测试DOM API的交互和组件的生命周期，由于测试环境不具备Dom，因此用到了jsdom来模拟浏览器环境 。

#### Static Rendering

静态渲染将React组件渲染成静态的HTML字符串，然后使用cheerio这个库解析这段字符串，并返回一个Cheerio的实例对象，可以用来分析组件的html结构。 