
//import sizeof from 'object-sizeof'
function Cache(maxSize, loader){
    var self = this;
    this.map = new Map();
    this.maxSize = maxSize;
    this.size = 0;
    this.loader = loader;

    function get(key, signal){
        return self.loader.load(key, signal);
        /*return new Promise((resolve, reject)=>{
            let object = self.map.get(key);
            if(!object){
                resolve(self.loadFunction(key, signal).then(result=>{
                    let sizeLocal = 1;
                    if(!self.map.has(key)){
                        self.map.set(key, {"size":sizeLocal, "value": result});
                        self.size+=sizeLocal;
                        checkSize();
                    }
                    return result;
                }).catch(error=>{
                    throw error;
                }));
            }else{
                resolve(object.value);
            }
        })*/

        //return self.loadFunction(key, signal);
        
    }

    function checkSize(){
        for (let [key, val] of self.map){
            if (self.size>self.maxSize){
                self.map.delete(key);
                self.size -= val.size;
            }else{
                break;
            }
        }
    }
    return{"get":get};
}

export {Cache};