const pages = {};
let timer ;

function checkCrash(){
	const now = Date.now();
	
	for(let id in pages){
		let page = pages[id]
		if((now - page.t) > 15000){
			// 上报crash
			console.log("页面发生了崩溃")
			delete pages[id]
		}
	}
	
	if(Object.keys(pages).length == 0){
		clearInterval(timer);
		timer = null
	}
}

this.addEventListener('message',(e) => {
	console.log("service worker 接受", e.data.type);
	const data = e.data;
	
	if(data.type === 'running'){ //正常的心跳
		pages[data.id] = {
			t:Date.now()
		}
		
		if(!timer){
			timer = setInterval(() => {
				checkCrash()
			},10000)
		}
	}else if(data.type === 'clear'){
		delete pages[data.id]
	}
})