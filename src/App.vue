<template>
  <div>
    <div class="header">
      <div class="black_50"></div>
      <div class="grey_25"></div>
      <div class="container">
        <div class="row">
          <img src="./assets/dslogo.jpg" class="dslogo"  v-on:click="home()"/>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view/> 
    </div>
  </div>
</template>

<script>

import {storage} from './utils/storage'
import {api} from './utils/api'

export default {
  name: 'App',
  data () {
    return {
      account: storage.getValue('acct'),
      loggedIn: false
    }
  },
  mounted: function () {
    let token = storage.getValue('token');
    api.get(`/amvalid`).then(
      response => {
        if(response.data.value === "ok"){
          this.loggedIn = true;
          storage.storeValue('isGood', 'yes');
          this.$router.push('LeaderBoard');
        };
      })
    .catch(error => {
      this.loggedIn = false;
      storage.storeValue('isGood', 'no');
    });
  },
  methods: 
  {
    home() {
      let token = storage.getValue('token');
      api.get(`/amvalid`).then(
        response => {
          if(response.data.value === "ok"){
            this.$router.push('LeaderBoard');
          };
        })
      .catch(error => {
        this.$router.push('/');
      });
    }
  }
}

</script>

<style>

</style>
