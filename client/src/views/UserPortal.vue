<template>
  <div>
    <h1>User : {{active}}</h1>

    <hr>
    <button @click="getReviews"> Get my Reviews</button>
    <hr>
    <button @click="getAllUsers"> Delete a specific user</button>
    <hr>
    <button @click="createProduct"> Create a new product</button>
    <hr>
    <button @click="getAllProducts"> Get all products</button>
    <hr>
    <button> Edit product</button>
    <hr>
    <button>Delete a product</button>
    <hr>
    <button> Delete my account</button>
    <hr>

  </div>
</template>

<script>
    import { Api } from '@/Api'

    export default{
        name: 'User Profile',
        data (){
            return{
                title:'User',
                active: "Active",
                status: this.$route.params.id,
                Reviews:[]
            }
        }
        ,created(){
            var userId = this.$route.params.id
            this.id = this.$route.params.id
        }
        ,methods: {
            getReviews(){
                alert("I got clicked");
                alert(this.id);

                /*Api.get('/reviews').then(response=>{
                    alert(response.data[0].rating);
                    this.Reviews= response.data
                    alert(this.Reviews);
                }).catch(error=>{
                    console.log(error)
                })*/
                var userID = this.$route.params.id;
                this.$router.push(`/users/${userID}/reviews/`);

            },
            getAllUsers(){
                this.$router.push({name: 'usersList'});
            },
            deleteUser(){
                Api.delete('/users/' + this.id)
                    .then(response => {
                        console.log(response.data.message);
                        alert("Account has been deleted");
                        this.$router.push({name: 'login'});
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getAllProducts(){
                 userId = this.$route.params.id;
                this.$router.push(`/products`)
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
