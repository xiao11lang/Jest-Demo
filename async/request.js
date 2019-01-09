const games={
    'moba':'lol',
    'fps':'cf'
}
function request(type){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(games[type])
        },2000)
    })
}
module.exports=request