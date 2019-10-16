<template>
  <div>
    <blockquote>
      <i>" {{review.comment}} " </i>
      <br>
      <p id="rating">Rating: <span v-for="rating in review.rating">⭐</span></p>
      <h6>-{{review.reviewer.fName}} {{review.reviewer.lName}}</h6>
    </blockquote>
  </div>

</template>

<script>

    export default {
        name: 'review-item',
        props: ['review']
    }
</script>

<style scoped>

</style>
