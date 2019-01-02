test('array contain',function(){
    const arr=['jest','test']
    expect(arr).toContain('jest')
})//pass
test('array contain object',function(){
    const arr=['jest',{a:1}]
    expect(arr).toContain({a:1})
})//pass
test('array contain object',function(){
    const obj={a:1}
    const arr=['jest',obj]
    expect(arr).toContain(obj)
})//pass
