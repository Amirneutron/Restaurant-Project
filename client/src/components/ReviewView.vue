<template>

  <div id="Review">
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <p>{{review.comment}} <br>{{review.rating}} <br>{{review.reviewer.fName}}</p>


        </div>
        <button type="button" class="close" @click="$emit('delete-review', review._id)">Delete</button>
        <button type="button" class="close" @click="$emit('edit-review', review._id)">Edit</button>

      </a>
    </div>
  </div>
</template>
<script>

    import { Api } from '@/Api'

    export default {
        name: 'review-view',
        props: ['review']
    }
</script>

<style scoped>
  .close:hover{
    background-color: #dc3545;
  }
  #product{
    margin-top: 3rem;

  }
  .close{
    background-color: #dc3545;
    margin-right: 2em;
    border: 1px solid black;
    color: black;
  }

</style>
