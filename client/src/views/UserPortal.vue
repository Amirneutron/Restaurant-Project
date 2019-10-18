<template>
  <div>
    <h1>User : {{active}}</h1>
    <hr>
    <button @click="getReviews"> Get my Reviews</button>
    <hr>
    <button @click="createReview"> Create a new review</button>
    <hr>
    <button @click="getReviews"> Delete my review(s)</button>
    <hr>
    <button @click="getAllProducts"> Get all products</button>
    <hr>
    <button @click="getReviews"> Edit my posted review</button>
    <hr>
    <button @click="getReviews">Delete my review(s)</button>
    <hr>
    <button @click="deleteUser"> Delete my account</button>
    <hr>

  </div>
</template>

<script>
    import { Api } from '@/Api'

    export default{
        name: 'User-Profile',
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
                 this.$router.push(`/products`)
            },
             createReview(userID){
             this.$router.push({name: 'createReview'});
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
