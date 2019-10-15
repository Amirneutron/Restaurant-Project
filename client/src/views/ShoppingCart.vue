<template>
    <div class='container'>
    </div>
</template>
<style>
</style>

<script>
import { Api } from '@/Api'

export default {
    data(){
        return {
           userId: this.userId
        }
    },
    methods: {
        createOrder() {
         // Send to our server
        Api.post(`${window.endpoint}/orders`, request)
        .then((res) => {
        var error = res.data.error;
        if (error){
        console.error(error);
         } else {
        this.$router.push({ path: `orders/${response.data._id}` })
                        }
                    });
            }
        }
    }

</script>