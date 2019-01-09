const games={
    'moba':'lol',
    'fps':'cf'
}
function request(type){
    return new Promise(function(resolve,reject){
        process.nextTick(function(){
            resolve(games[type])
        })
    })
}
module.exports=request