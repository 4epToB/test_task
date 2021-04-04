import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$filters = {
	formatPrice: function(val){
		if(!parseInt(val)) return '';
		let arr = (Math.ceil((val)*100)/100).toString().split(".");//Сначала округление цены до сотых,потом к строке,потом сплит
        let rub=arr[0].split("")
        let kop=arr[1]
		let index = 3;
		while(rub.length> index){
			rub.splice(rub.length - index, 0, " ");
			index += 4;
		}
        if(!kop){
            return rub.join("") + ' ' + String.fromCharCode(8381);
        }else {
            return rub.join("") +','+kop+ ' ' + String.fromCharCode(8381);
        }
		
	}
};
app.mount('#app')
