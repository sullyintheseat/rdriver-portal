<template>
  <div class="bump64">
    <div class="row">
      <div class="col-xs-12">
        <div class="sectionHeader">
          <div style="text-align:right">LEADERBOARD | <router-link to="DashBoard" >SCAN TRACKER</router-link> |  <router-link to="Profile" >ACCOUNT SETTINGS</router-link> |  <router-link to="Contact" >CONTACT</router-link> | <a v-on:click="signOut()">SIGN OUT</a></div>
          <h1>LEADER BOARD</h1>
        </div>
      </div>
    </div>
    <br/>
     <div class="row">
      <div class="col-xs-12">
        <p>The leader board is where you will be able to track your statistics for connecting your passengers with advertising content</p>
      </div>
     </div>
  </div>
</template>

<script>

import {api} from '../../utils/api.js'
import {storage} from '../../utils/storage.js'

export default {
  name: 'LeaderBoard',
  mounted : function () {
    if(storage.getValue('isGood') === 'no'){
      this.$router.push('/');
    }
  },
  methods: {
    signOut() {
      storage.clearValue('acct');
      storage.clearValue('token');
      storage.clearValue('isGood');
      this.loggedIn = false;
      this.$router.push('/');
    }
  }
}

</script>

<style>
</style>