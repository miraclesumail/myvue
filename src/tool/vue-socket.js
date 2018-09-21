
export default class Socket{
     constructor(config){
          this.ws = null;
          this.platformId = 8;
          this.url = config.url;
          // 尝试连接次数
          this.tryCount = 0;
          // 记录socket消息传递次数
          this.count = 1;
          // 截至目前为止 用该ws获得的连接数
          this.connectCount=0;
          this.isOpen=false;
          this.callback={};
          this.fromCallBack = {};
          this.delayQueue = [];
          this.init();
     }

     init(){
          this.ws = new WebSocket(this.url);
          this.tryCount++;

          this.ws.onopen = this.onOpenCallback.bind(this);
          // this.ws.onerror = this.onErrorCallback.bind(this);
          //this.ws.onclose = this.onCloseCallback.bind(this);
          this.ws.onmessage = this.onMessageCallback.bind(this);
          this.isOpen=true;
     }

     onOpenCallback(){
          this.connectCount++;
          this.tryCount = 0;
          this.delayQueue.length>0 && this.delayQueue.map((item,index)=>{
			this.load(item)
	      })
          this.delayQueue=[];
     }

     onMessageCallback(res){
        let respData = JSON.parse(res.data);
        let name = respData.requestId || null;
        
        if(!name){
		
        }
        let callback = this.callback[name]

        callback.promise.resolve(respData['data']);
			delete this.callback[name];
     }

     promiseFun(resolve, reject){
          this.resolve = resolve;
          this.reject = reject;
     }

     createPromise(){
          let promise = new Promise(this.promiseFun.bind(this))
          promise.resolve = this.resolve;
          promise.reject = this.reject;
          return promise
     }

     send(opt){
         let promise = this.createPromise()
         if (this.ws.readyState != WebSocket.OPEN) {
			!this.delayQueue.includes([opt,promise]) && this.delayQueue.push([opt,promise]);
			// if(!this.isOpen){
			// 	this.init();
			// }
			return promise;
	 	 }
		 this.load([opt,promise]);
		 return promise; 
     }

     load(arr){
        let index = 'RQ' + this.count,sendData=arr[0];
		this.callback[index] = {};
		if(!sendData.data){
			sendData['data'] = {};
        }
        
        sendData['data']['requestId']=index;
        sendData['data']['platformId']=this.platformId;

        this.callback[index]['promise'] = arr[1];
		this.callback[index]['data'] = arr[0];
	
		this.ws.send(JSON.stringify(arr[0]));
		this.count++;
		return arr[1];
     }
}