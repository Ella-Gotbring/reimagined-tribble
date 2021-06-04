<template>
<div>
    <h2>kanaler</h2>
      <ul class="tags">
        <li v-for="stream in streams" :key="stream._id">
          <span @click="addTag(stream)">{{ stream.tags }}</span>
        </li>
      </ul>
  
      <div>
  
      <input type="text" placeholder="stream..." />
      <button class="delete" @click="deleteMe">Shit they're on to mee!!</button>
      </div>
      <br>
      <router-link to="/flow">go back</router-link> 
</div>
    
</template>

<script>
import axios from "axios";
export default {
  name:"Settings",
  async created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("auth")}`;
    const res = await axios.get("http://localhost:3000/api/flow");
    this.streams = res.data;
    console.log(res.data);
  },
  data() {
    return {
      userID: null,
      streams: [],
    };
  },
  methods: {
    addTag(stream) {
      return axios.post("/api/tags", stream).then(() => {
        this.$router.go(-1);
      });
    },
    deleteMe() {
      return axios
        .delete("/api/user", {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then(() => {
          sessionStorage.removeItem("auth");
          this.$router.push({ name: "Login" });
        });
    },
  },
};
    
</script>

<style scoped>



</style>
