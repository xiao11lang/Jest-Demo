let count=1;
beforeAll(function(){
    console.log('test start')
})
afterAll(function(){
    console.log('test end')
})
beforeEach(function(){
    console.log('test'+count+'start')
})
afterEach(function(){
    console.log('test'+count+'end')
    count++;
})
test('test1',function(){
    expect(count).toBe(1)
})
test('test2',function(){
    expect(count).toBe(2)
})