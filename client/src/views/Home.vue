<template>
  <div>
    <div class="top-container">
      <img src="../assets/homepage.jpg" alt="Background Picture">
       <b-container class="bv-example-row">
         <b-row>
         <b-col v-for="product in products" :key="product._id">
           <product-item :product="product"></product-item>
         </b-col>
       </b-row>
       </b-container>

       
     <!-- <button><a href="/register" role="button" aria-pressed="true">SIGN UP</a></button>-->
    </div>

    <footer>
      #HERE COMES EVERYTHING RELATED TO THE FOOTER SECTION
    </footer>
  </div>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import axios from 'axios';
import ProductItem from "../components/ProductItem";

export default {
  name: 'home',
  data() {
    return {
      message: '',
        reviews: [],
        cooky:false,
        products:[]


    }
  },
  mounted() {
    this.getMessage();
    this.getProducts();
  },
  methods: {
    getMessage() {
      axios.get(`/`)
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = error
        })
    },
    getProducts(){
      Api.get('/products')
      .then(response => {
        this.products=response.data.products;
      }).catch(error =>{
        ths.message = error
      });
    }
  },
  components:{
    ProductItem
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Neucha&display=swap');
*{
  font-family: 'Montserrat', sans-serif;
}
.example-col {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: whitesmoke;
  border: 2px solid lightgray;
}

footer{
  background-color: #3c3d47;
  padding: 40px;
  color: white;
}
  .slogan{
    color:white;
    font-weight: bold;
    font-size: 5rem;
    position: absolute;
    top: 30%;
    left: 5%;
    background-color: rgba(0,0,0, 0.4);
    border: 3px solid #f1f1f1;
    width: 60%;
    font-family: 'Neucha', cursive;

  }
  img{
    position: relative;
    width:100%;
    height:650px;
    filter: blur(4px);
  }
  button{
    position: absolute;
    top:63%;
    left:30%;
    border: 2px solid black;
    background-color: #dc3545;
    font-size: 3rem;
    padding:0.5rem 1.5rem;

  }
  button a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .middle-container{
    background-color: #dc3545;
    height:300px;
    color: #3c3d47;
  }
  .middle-container h2{
    color: white;
    font-weight: bold;
    font-size: 3rem;
    font-family: 'Permanent Marker', cursive;
  }

</style>