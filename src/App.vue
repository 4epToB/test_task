<template>
  <div class="container" >
          <div class="coloumn">
              <div class="product_area">
                    <product v-for="product in products"
                      :key="product.productId" 
                      :product="product"></product> 
              </div>
          </div>
  </div> 
</template>
<script>
import Product from './components/Product'
export default {
  data(){
    return{
      products:[],
      sitename: "Петрович"
    }
  },
components: {
			'product': Product,
		},
  computed:{
  },
  mounted(){ 
        fetch('./products.json')
						.then((response)=>{
							return response.json(); 
						}).then((data)=>{
							this.products = data;
						})
    },
}

</script>
<style>
body{
  font-family: Arial,Helvetica,sans-serif;
}
a{
  display: block;
}
p {
    font-size: 14px;
    line-height: 18px;
    margin: 0 0 18px;
}
p:last-child {
    margin-bottom: 0;
}
html {
    color: #222;
    font-size: 14px;
    line-height: 1.4;
}

</style>