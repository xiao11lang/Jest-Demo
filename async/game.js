const request=require('./request')
function getGame(name){
    return request(name)
}
module.exports=getGame