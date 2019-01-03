test('callback',function(){
    function callback(arg){
        expect(arg).toBe('callback')
    }
    setTimeout(function(){
        callback('callback')
    })
})//pass

test('callback with arg',function(done){
    function callback(arg){
        expect(arg).toBe('callback')
    }
    setTimeout(function(){
        callback('callback ')
    })
})//failed

test('promise',function(){
    return new Promise(function(resolve,reject){
        resolve('promise')
    }).then(function(res){
        expect(res).toBe('promise')
    })
})//pass

test('promise with assertion',function(){
    expect.assertions(2)
    return new Promise(function(resolve,reject){
        resolve('promise')
    }).then(function(res){
        expect(res).toBe('promise')
    })
})//failed
 
test('promise use resolves',function(){
    expect.assertions(1)
    return expect(new Promise(function(resolve,reject){
        resolve('promise')
    })).resolves.toBe('promise')
})//pass

test('async await',async function(){
    expect.assertions(1)
    const data=await new Promise(function(resolve,reject){
        resolve('async')
    })
    expect(data).toBe('async')
})//pass

test('async await with error',async function(){
    expect.assertions(1)
    try{
        await new Promise(function(resolve,reject){
            reject('error')
        })
    }catch(e){
        expect(e).toBe('error')
    }
})//pass