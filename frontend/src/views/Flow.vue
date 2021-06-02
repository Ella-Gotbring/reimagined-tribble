<template>
<div>
    <h2>kanaler</h2>
    <div class="list">
      <ul>
        <li class="list-item" v-for="stream in streams" :key="stream._id">
          <p>{{ stream.date }}</p>
          <p>{{ stream.content }}</p>
          <p>{{ stream.tags }}</p>
        </li>
      </ul>
</div>
<br>
<router-link to="/settings">lägg till kanaler</router-link>
</div>
</template>

<script>
import axios from  "axios";
export default {
 name: "Flow",
 async created() {
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
 
};

</script>

<style scoped>

</style>