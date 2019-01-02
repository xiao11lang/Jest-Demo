test('greater',function(){
    expect(1).toBeGreaterThan(0)
})//pass
test('greater or equal',function(){
    expect(1).toBeGreaterThanOrEqual(0)
})//pass
test('less',function(){
    expect(1).toBeLessThan(0)
})//failed
test('less or equal',function(){
    expect(1).toBeLessThanOrEqual(0)
})//failed