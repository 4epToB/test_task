<template>
    <div class="product">
        <span class="product_code">Код:{{product.code}}</span>
        <div class="product_status_wrap">
            <span class="product_status">Наличие</span>
        </div>
        <div class="product_photo">
            <a href="#" class="product_link">
                <!-- <img :src="imgPreset(product.primaryImageUrl)"> --> 
                <img :src="imgPreset(product.primaryImageUrl,'_220x220_1')">
                <!-- в 9 строке не указано разрешения изображения,что бы просто увидеть отрисованную всю страницу. в 10 строке вариант с указанием разрешения
                и подгрузки соответсвующих изображений -->
            </a>                                    
        </div>
        <div class="product_description">
            <a href="#" class="product_link">{{product.title}}</a> 
        </div>
        <div class="product_tags">
            <p>Могут понадобиться: </p>
            <a  href="#" 
                class="url--link"
                v-for="(assocProduct,index) in splited"
                :key="index"
                >{{assocProduct}},</a>
        </div>
        <div class="product_units" v-if="this.product.unitFull.includes('упак')">
            <div class="unit_wrapper">
                <div class="unit_select" :class="{unit_active:showPrice}" @click="swap(showPrice)">
                    <p class="ng_binding" :class="{ng_binding_active:showPrice}">За м. кв.</p>
                </div>
                <div class="unit_select" :class="{unit_active:showAltPrice}" @click="swap(showAltPrice)">
                    <p class="ng_binding" :class="{ng_binding_active:showAltPrice}">За упаковку</p>
                </div>
            </div>
        </div>
        <p class="product_price_club_card" >
            <span class="product_price_club_card_text">По карте<br>клуба</span>
            <span class="goldPrice">{{showGoldPrice}}</span>
        </p>
        <p class="product_price_default" >
            <span class="retailPrice">{{showRetailPrice}}</span>
        </p>
        <div class="product_price_points">
            <p class="ng-binding">Можно купить за {{bonusPrice}}</p>
        </div>
        <div class="list--unit-desc">
            <div class="unit--info">
                <div class="unit--desc-i"></div>
                <div class="unit--desc-t">
                    <p>
                        <span class="ng-binding">{{unitSell}}</span>
                        <span class="unit--infoInn">{{unitSellPrice}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="product__wrapper">
            <div class="product_count_wrapper">
                <div class="stepper">
                    <input class="product__count stepper-input" type="text" :value="cart.length">
                    <span class="stepper-arrow up" @click="addToCart(product.productId)"></span>
                    <span class="stepper-arrow down" @click="removeFromCart"></span>                                            
                </div>
            </div>
            <span class="btn btn_cart" data-url="/cart/" :data-product-id="product.productId">
                <svg class="ic ic_cart">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                </svg>
                <span class="ng-binding">В корзину</span>
            </span>
        </div>
        
    </div>
</template>

<script>    
export default {
  data(){
    return{
        cart:[],
        showAltPrice:false,
        showPrice:true
    }
  },
  components:{
    
  },
  computed:{
    splited(){
        return this.product.assocProducts.split(";",(this.product.assocProducts.split(";").length-1)).map((tag)=>{return tag.trim()})
    },
    unitSell(){
        if (this.product.unitFull.includes('упак')){
            return 'Продается упаковками:'
        } else {
            return 'Продается поштучно'
        }
    },
    unitSellPrice(){
        if (this.product.unitFull.includes('упак')){
            return this.product.unitRatio+' '+ this.product.unit+' = '+ (Math.ceil((this.product.unitRatioAlt)*100)/100)+' '+ this.product.unitAlt
        } else {
            return '' 
        }
    },
    bonusPrice(){
        return Math.floor(this.product.priceGold/1.2) + ' ' + 'балл.'
    },
    showGoldPrice(){
        if (this.showPrice){
            return this.$filters.formatPrice(this.product.priceGold)
        } else {
             return this.$filters.formatPrice(this.product.priceGoldAlt)
        }
    },
    showRetailPrice(){
        if (this.showPrice){
            return this.$filters.formatPrice(this.product.priceRetail)
        } else {
             return this.$filters.formatPrice(this.product.priceRetailAlt)
        }
    },

  },
  methods:{
    addToCart: function(id){
        this.cart.push(id);
    },
    removeFromCart: function(){
        this.cart.splice(0,1);
    },    //т.к. корзины на верстке нет, то решил это немного влоб, но по условию задачи. Могу отдельно добавить корзину и тогда функционал кнопок будет больше похож на настоящий.
    swap(price){
        if(price==this.showAltPrice){
            this.showAltPrice=true
            this.showPrice=false
        }else {
            this.showAltPrice=false
            this.showPrice=true
        }
        
    },
    imgPreset(imgLink,resol){
        if (!resol) {return imgLink}
        else {
            let link=imgLink.split('.')[1]
            let ext=imgLink.split('.')[2]
            return "/img/"+link.match(/[^/]*[a-z]*$/)[0]+resol+'.'+ext
        }
    }    
  },
  props:["product"],  
  
}

</script>

<style>
*{
    box-sizing: border-box;
}
.container{
    margin: 0 auto;
}
.coloumn{
    width: 1000px;
    margin: 20px auto 14px;
    position: relative;
}
.product_area{
    display: table;
    width: 100%;
}
.product{
    height: 304px;
    display: table;
    float: none;
    width: 99%;
    border: 1px solid #e0e0e0;
    margin: 10px 5px 0;
    padding: 10px 10px 18px;
    position: relative;
}
.product_code{
    position: absolute;
    top: 11px;
    left: 248px;
    font-size: 12px;
    color: #666;
}
.product_status_wrap{
    float: right;
    margin-top: 0;
}
.product_status{
    cursor: pointer;
    color: #093;
    border-bottom: 1px dotted #093;
    text-decoration: none;
}
.product_status:hover{
    border-bottom: none;

}
.product_photo{
    float: left;
    margin: 0;
    text-align: center;
    position: relative;
    width: 220px;
    height: 220px;
}
.product_link img{
    max-width: 160px;
    max-height: 160px;
    height: auto;
    vertical-align: middle;
}
.product_description{
    float: left;
    padding: 28px 70px 0 19px;
    width: 505px;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
    display: block;
    min-height: 90px;
    font-weight: 700;
}
.product_description a{
    text-decoration: none;
    color: #000;
    outline: none;
    transition: text-decoration .15s ease-in-out;
}
.product_description a:hover{
    text-decoration: underline;
}
.product_tags {
    float: left;
    padding: 0 0 65px 20px;
    width: 505px;
    font-size: 16px;
    line-height: 17px;
}
.product_tags p {
    display: inline-block;
    font-size: 13px;
    line-height: 16px;
    color: #545454;
    font-weight: 700;
    margin: 0;
}
.product_tags a {
    text-decoration: none;
    display: inline;
    font-size: 13px;
    line-height: 16px;
    color: #666;
    cursor: pointer;
}
.product_tags a:hover{
    text-decoration: underline;
}
.product_units{
    top: 95px;
    position: absolute;
    right: 12px;
    bottom: inherit;
}   
.unit_wrapper{
    display: table;
    width: 100%;
}
.unit_select{
    float: left;
    padding: 3px 5px;
    margin: 0 0 0 5px;
    cursor: pointer;
}
.unit_active{
    background: #000;
    cursor: default;
}
.ng_binding {
    font-size: 13px;
    line-height: 13px;
    color: #707070;
    border-bottom: 1px dotted #707070;
    transition: .2s;
    -webkit-transition: .2s;
}
.unit_active{
    background: #000;
    cursor: default;
}
.ng_binding_active{
    color: #fff;
    border-bottom: 1px solid transparent
}
.product_price_club_card {
    bottom: 164px;
    font-size: 25px;
    font-weight: 700;
    color: #000;
    margin: 0;
    position: absolute;
    right: 8px;
}
.product_price_club_card_text {
    font-weight: 400;
    font-size: 14px;
    display: inline-block;
    text-align: right;
    line-height: 17px;
    margin-right: 16px;
}
.rouble__i {
    width: 27px;
    height: 20px;
}
.product_price_default {
    color: #a7a7a7;
    font-size: 25px;
    margin: 0;
    position: absolute;
    bottom: 134px;
    right: 8px;
}
.product_price_points {
    top: 75px; 
    display: block;
    position: absolute;
    right: 12px;
}
.product_price_points p {
    font-size: 12px;
    line-height: 17px;
    color: #999;
}
.list--unit-desc {
    position: absolute;
    width: 222px;
    right: 12px;
    bottom: 85px;
    margin: 10px 0 5px;
    padding: 5px 10px;
    background: #fff;
    border: 1px solid #ccc;
}
.list--unit-desc:after, .list--unit-desc:before {
    content: '';
    position: absolute;
    bottom: -7px;
    border-top: 8px solid;
    display: block;
    width: 0;
    height: 0;
}

.list--unit-desc:before {
    margin-bottom: -1px;
    border-color: #ccc;
    color: #ccc;
    left: 13px;
    border-left: 8px solid transparent!important;
    border-right: 8px solid transparent!important;
}
.list--unit-desc:after {
    border-color: #fff!important;
    left: 14px;
    border-left: 7px solid transparent!important;
    border-right: 7px solid transparent!important;
}
.list--unit-desc .unit--desc-t p {
    font-size: 13px;
    line-height: 15px;
    margin-bottom: 0;
}
.list--unit-desc .unit--desc-t p span {
    display: block;
}
.list--unit-desc .unit--desc-t {
    display: inline-block;
}
.list--unit-desc .unit--desc-i {
    display: inline-block;
    vertical-align: top;
    width: 15px;
    height: 15px;
    margin: 8px 10px 0 0;
    background: url(../assets/img/unit--i.png) 50% no-repeat;
    background-size: cover;
}
.product_count_wrapper {
    left: auto;
    right: 164px;
    line-height: 37px;
    height: 40px;
    width: 67px;
    display: inline-block;
    position: absolute;
    bottom: 50px;
    border: 1px solid #ccc;
    background: #fff;
}
.stepper {
    margin: 0 0 10px;
    overflow: hidden;
    position: relative;
}
.stepper .stepper-input {
    border: none;
    color: #333;
    font-size: 13px;
    line-height: 1.2;
    margin: 0;
    overflow: hidden;
    padding: 12px 0 10px;
    width: 40px;
    z-index: 49;
    text-align: center;
}
.stepper-arrow.up {
    background-position: -28px 0;
    border-bottom: none;
    border-top: none;
    border-right: none;
    top: 0;
}
.stepper-arrow.up:hover {
    background-color: #666;
    background-position: -1px 0;
}
.stepper-arrow.down {
    background-position: -28px -20px;
    border-bottom: none;
    border-right: none;
    bottom: 0;
}
.stepper-arrow.down:hover:hover {
    background-color: #666;
    background-position: -1px -20px;
}
.stepper-arrow {
    background: #fff url(../assets/img/count--i.png) no-repeat;
    border: 1px solid #ccc;
    cursor: pointer;
    display: block;
    height: 50%;
    position: absolute;
    right: 0;
    width: 25px;
}
.product .btn_cart {
    position: absolute;
    right: 10px;
    bottom: 50px;
    width: 148px;
    padding: 0 0 0 20px;
    cursor: pointer;
    background: #f90;
}
.btn {
    height: 40px;
    line-height: 40px;
    text-transform: uppercase;
    text-align: center;
    border: none;
    display: inline-block;
    vertical-align: middle;
    padding: 0 25px;
    font: 14px/40px Arial,Helvetica,sans-serif;
    text-decoration: none;
}
.btn, .btn:hover {
    color: #fff;
}
.btn_cart:hover {
    background: #333;
}
.ic_cart {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background: none;
    fill: #fff;
}
.ic {
    display: inline-block;
    vertical-align: middle;
    transform: translate(0);

}
.btn:hover {
    color: #fff;
}
@media (max-width: 999px) and (min-width: 0px){
    .container {
        width: 768px;
    }
    .coloumn {
        width: 500px;
        margin-top: 0;
        margin-left: auto;
    }
    .product {
        display: block;
        float: left;
        width: 240px;
        height: 545px;
    }
    .product_code {
        position: static;
    }
    .product_status_wrap {
        position: static;
    }
    .product_photo {
        float: none;
        margin: 10px 0 4px;
    }
    .product_description {
        padding: 0;
        width: auto;
        font-size: 14px;
        line-height: 20px;
        float: none;
    }
    .product_tags {
        padding: 0;
        width: auto;
        font-size: 14px;
        line-height: 22px;
        float: none;
        display: none;
    }
    .product_units {
        position: absolute;
        right: 15px;
        top: inherit;
        bottom: 95px;
    }
    .product_price_club_card {
        font-size: 28px;
        bottom: 160px;
        right: 8px;
    }   
    .product_price_default {
        font-size: 26px;
        bottom: 134px;
        right: 8px;
    }
    .product_price_points {
        display: none;
    }
    .list--unit-desc {
        display: none;
        width: 219px;
        bottom: 95px;
        right: 9px;
    }
    .btn_cart {
        right: 10px;
        bottom: 50px;
    }
}

@media (min-width: 1000px){
    .product_price_default {
        top: 80px;
        bottom: inherit;
    }
    .product_price_club_card {
        top: 40px;
        bottom: inherit;
    }
}

@media (max-width: 1249px) and (min-width: 1000px){
    .product_photo {
        width: 160px;
        height: 160px;
    }
    .product {
        height: 26  0px;
    }
    .container {
        width: 1000px;
    }
    .coloumn {
        width: 750px;
        margin-left: auto;
    }
    .product_code {
        top: 10px;
        left: 180px;
    }
    .product_status_wrap {
        position: absolute;
        top: 8px;
        left: 267px;
    }
    .product_description {
        padding: 30px 20px 0 12px;
        width: 330px;
        font-size: 14px;
        line-height: 22px;
    }
    .product_tags {
        padding: 3px 0 65px 11px;
        width: 330px;
        font-size: 14px;
        line-height: 18px;
    }
    .product_tags a, .product_tags span {
        font-size: 12px;
        line-height: 14px;
    }
    .product_price_club_card {
        
        right: 10px;
        top: 5px;
    }   
    .product_price_club_card_text {
        margin-right: 5px;
    }
    .product_price_default {
        top: 45px;
        right: 10px;
    }
    .product_count_wrapper {
        right: 167px;
        bottom: 40px;
    }
    .product .btn_cart {
        right: 13px;
        bottom: 40px;
    }
}
@media (min-width: 1250px){
    .product_units {
        top: 130px;
    }
    .container {
        width: 1250px;
    }
    .list--unit-desc {
        bottom: 95px;
        right: 10px;
    }
    .product_price_points {
        top: 110px;
    }
}

</style>
