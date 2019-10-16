<template>
    <div>
        <h2>List Of All Products {{products.length}}</h2>
        <b-container class="bv-example-row">
         <b-row>
         <b-col v-for="product in products" :key="product._id">
           <product-view :product="product"></product-view>
         </b-col>
       </b-row>
       </b-container>
    </div>
</template>


<script>
import { Api } from "@/Api";
import ProductView from "@/components/ProductView";

export default {
    name: 'ListProducts',
    data(){
        return{
            products: []
        }
    },
    mounted(){
        this.getAllProducts()

    },
    created(){
        this.adminId = this.$route.params.id
    },
    methods: {
        getAllProducts(){
            Api.get('/admins/'+ this.adminId + '/products')
            .then(response => {
            this.products = response.data.products  
            })
            .catch(error => {
            this.products = []
            console.log(error)
            })
      }

    },
    components: {
        ProductView

    }

}
</script>
<style scoped>
table, th, td{
    border: 1px solid black;
    padding: 5px;
}
table{
    border-spacing: 5px; 
}

</style>
