<template>
  <div>
    <button @click="getAllUsers"> Get all users</button>
    <hr>
    <button @click="createProduct"> Create a new product</button>
    <hr>
    <button> Edit product</button>
    <hr>
    <button> Get all products</button>
    <hr>
    <button> Delete admin my account</button>
    <hr>
    <button> Delete a specific user</button>
    <hr>
    <button>Delete a product</button>   
  </div>
</template>

<script>
export default{
    name: 'Master',  
		data (){
			return{
        title:'Master'
      }
    }
    ,methods: {
      getAllUsers(){
        this.$router.push({name: 'usersList'});
      },
      createProduct(){
        var adminId = this.$router.params.id
        this.$router.push({name: 'createProduct', params:{id:adminId}});
      }
    }
	}
</script>

<style scoped>


button{
  position: relative;
  top: 20%;
  background-color: #dc3545;
  border: 2px solid white;
  font-size: 1rem;
  padding:0.5rem 1.5rem;
  color: aliceblue
}

</style>
