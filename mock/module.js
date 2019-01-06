function Mock(){
    this.get=function(params) {
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve(params)
            },2000)
        })
    }
}
let mock=new Mock()
module.exports=mock