<template>
    <div>
        <h2>List Of All Users {{users.length}}</h2>
        <button type="button" @click="deleteAllUsers" class="btn btn-danger">Delete All Users</button>
      
         <user-item v-for="user in users" :key="user._id" :user="user" @delete-user="deleteUser"></user-item>
    </div>
</template>


<script>
import { Api } from "@/Api";
import UserItem from "@/components/UserItem";

export default {
		name:'Users',
		data (){
			return{
          users:[]
			}
    },
    mounted(){
        this.getAllUsers();
        this.logInCheck();

    },
    methods: {
      getAllUsers(){
        Api.get('/admins/users')
        .then(response => {
          this.users = response.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
      },
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

    },logInCheck(){

            if(document.cookie === ""){
                this.$router.push('/adminLogin');
            }

    },
    deleteAllUsers(){
          Api.delete('/users')
        .then(response => {
          alert("Are you sure you want to delete all users ?")
          this.users = []
        })
        .catch(error => {
          console.log(error)
        })

      }
    }
    },
    components:{
      UserItem
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
