const mockFn=jest.fn()
const mockFnImplementation=jest.fn(function(arg){
    console.log(arg)
}).mockImplementationOnce(function(arg){
    console.log(arg+'once')
})
const mock=require('./module')
jest.mock('./module.js')

test('mockFn default return',function(){
    expect(mockFn()).toBeUndefined()
})

test('mockFn return value',function(){
    mockFn.mockReturnValue('mock')
    expect(mockFn()).toBe('mock')
})

test('mockFn return value once',function(){
    mockFn.mockReturnValueOnce('mockOnce')
    expect(mockFn()).toBe('mockOnce')
})
test('mock implementation',function(){
    mockFnImplementation('mock implementation ')
    mockFnImplementation('mock implementation')
    //print mock implementation
})

test('mock module',function(){
    mock.get.mockResolvedValue('mock module')
    return mock.get().then(function(res){
        expect(res).toBe('mock module')
    })
})