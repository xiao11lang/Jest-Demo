jest.mock('./request.js')
const getGame=require('./game')
it('test async module mock',function(){
    expect.assertions(1)
    return expect(getGame('moba')).resolves.toEqual('lol')
})