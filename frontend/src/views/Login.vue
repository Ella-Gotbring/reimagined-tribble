<template>
  <div>
     <form method="get" @submit.prevent="checkSubmit">
      <input type="text" placeholder="ange användarnamn" v-model="check.username" />
      <input type="password" placeholder="ange lösenord" v-model="check.password" />
      <button>Logga in</button>
      <router-link to="/reg">Registrera ett konto</router-link>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return{
      check: {
        username:"",
        password:"",
      }
    }
  },
   methods: {
    async checkSubmit() {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/login`,
        this.check
      );
      if (response.data.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        sessionStorage.setItem("auth", response.data.token);
        this.$router.push({ name: "Flow" });
      }
    },
  },
};

 
</script>

<style scoped>

</style>


