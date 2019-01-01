test('string',function(){
    expect('jest').toBe('jest')
})//pass

test('number',function(){
    expect(1).toBe(1)
})//pass

test('boolean',function(){
    expect(true).toBe(true)
})//pass

test('undefined',function(){
    expect(undefined).toBe(undefined)
})//pass

test('null',function(){
    expect(null).toBe(null)
})//pass

test('array',function(){
    expect([1,2,3]).toBe([1,2,3])
})//failed

test('object',function(){
    expect({a:1}).toBe({a:1})
})//failed