<template>
  <div class="container">
    <h1>Edit <span> Review </span></h1>
    <form @submit.prevent="submitProduct">
      <label for="name"><b>Change Comment</b></label>
      <input v-model="newReview.comment" class="input" type="text" :placeholder="review.comment">
      <label for="name"><b>Change Rating</b></label>
      <input v-model="newReview.rating" class="input" type="number" :placeholder="review.price">
      <hr>
      <b-button class="editButton" type="submit" >Update Review </b-button>
    </form>
  </div>
</template>

<script>
    import { Api } from '@/Api'
    export default {
        name: 'EditProduct',
        data() {
            return {
                review: {},
                newReview: {}
            }
        },
        created() {
            this.reviewId = this.$route.params.id
        },
        mounted() {
            this.getReview()
        },
        methods: {
            getReview() {
                Api.get('/reviews/' + this.productId)
                    .then(reponse => {
                        this.review = reponse.data
                    })
                    .catch(error => {
                        this.review = null;
                        console.log(error)
                    })
                    .then(() => {
                        // This code is always executed (after success or error).
                    })
            },
            submitProduct() {
                Api.patch('/reviews/' + this.reviewId, this.newReview)
                    .then(response => {
                        console.log(response.data)
                        alert("The product has been updated successfully")
                        this.$router.push('/reviews/')
                    })
                    .catch(error => {
                        console.log(error)
                    })

            }
        }
    }
</script>

<style scoped>

  /* Add padding to containers */
  .container {
    padding: 16px;
  }
  /* Full-width input fields */
  input[type=text], input[type=number]{
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
  }
  input[type=text]:focus, input[type=number]:focus{
    background-color: #ddd;
    outline: none;
  }
  /* Overwrite default styles of hr */
  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
  }
  /* Set a style for the submit/register button */
  .editButton {
    background-color: #dc3545;
    color: white;
    padding: 16px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }
  .registerbtn:hover {
    opacity:1;
  }
</style>
