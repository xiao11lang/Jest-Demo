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
  test('', () => console.log('inner test'));
});