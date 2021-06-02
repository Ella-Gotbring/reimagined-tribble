<template>
    <div>
      <form method="get" v-on:submit.prevent="checkSubmit">
      <input type="text" placeholder="ange användarnamn" v-model="check.username" />
      <input type="password" placeholder="ange lösenord" v-model="check.password" />
      <button>registrera ditt konto</button>
      <br>
      <br>
      <router-link to="/login">Har redan ett konto?</router-link>
    </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            check:{
                username:"",
                password:"",
            }
        }
    },
    methods: {
    async checkSubmit() {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/register`,
        this.check
      );
      if (response.data.token) {
        sessionStorage.setItem("auth", response.data.token);
      }
    },
  },
};

</script>

<style scoped>

</style>