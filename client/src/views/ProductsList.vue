<template>
    <div>
        <h2>List Of All Products</h2>
         <menu-item v-for="user in users" :key="user._id" :user="user" @delete-user="deleteUser"></menu-item>
    </div>
</template>


<script>
import { Api } from "@/Api";
import MenuItem from "@/components/MenuItem";

export default{
		name:'Users',
		data (){
			return{
                products:[]
			}
    },
    mounted(){
        this.getAllUsers();

    },
    methods: {
      getAllUsers(){
        Api.get('/admins/products')
        .then(reponse => {
          this.products = reponse.data.products  
        })
        .catch(error => {
          this.products = []
          console.log(error)
        })
      }
     /* ,
    deleteUser(id) {
      Api.delete(`/users/${id}`)
        .then(response => {
         // console.log(response.data.message)
          var index = this.users.findIndex(user => user._id === id)
          this.users.splice(index, 1)
          alert("User has been deleted");
        })
        .catch(error => {
          console.log(error)
        })
    }*/

    },
    components:{
      MenuItem
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
