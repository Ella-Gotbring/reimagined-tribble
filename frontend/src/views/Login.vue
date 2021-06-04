<template>
  <div>
    <img class="shui" alt="shui logo" src="../assets/shuilogo.jpg">
     <form method="get" @submit.prevent="checkSubmit">
      <input type="text" placeholder="ange användarnamn" v-model="check.username" />
      <br>
      <input type="password" placeholder="ange lösenord" v-model="check.password" />
      <br>
      <button>Logga in</button>
      <br>
      <router-link to="/reg" class="reg">Registrera ett konto</router-link>
    </form>
    <img class="water" alt="water logo" src="../assets/bottomlogo.jpg">
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
.shui{
  margin-top: 110px;
  margin-left: 110px;
  width: 150px;
  height: 100px;
}
.water{
 position: absolute;
 bottom: 0;
 right: 0;
 width: 100%; 
 height: 90px;  

}
form {
  display: grid;
  width: 300px;
  align-items: center;
  margin-left: 35px;
  }
  input {
    margin-left: 630px;
    padding:2px;
    /* margin:10px; */
    text-align: center;
    color: black;
    font-size: 20px;
    height: 44px;
    border: 5px solid black;
    text-align: center;
    background: transparent;
  }

button{
    outline: none;
    margin-left: 630px;
    background: #fff;
    font-size: 20px;
    border-radius: 8px;
    height: 29px;
    border: 4px solid black;
    font-weight: 600;
    text-align: center;
}
.reg{
    margin-left:630px;
}
</style>


