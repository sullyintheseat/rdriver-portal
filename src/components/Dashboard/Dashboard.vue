<template>
  <div class="bump64">
    <div class="row">
      <div class="col-xs-12">
        <div class="sectionHeader">
          <div style="text-align:right"><router-link to="LeaderBoard" >LEADERBOARD</router-link> | SCAN TRACKER |  <router-link to="Profile" >ACCOUNT SETTINGS</router-link> |  <router-link to="Contact" >CONTACT</router-link> | <a v-on:click="signOut()">SIGN OUT</a></div>
          <h1>SCAN TRACKER</h1>
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-xs-12">
        <p>Welcome to your Scan Tracker! This section is where you can track the number of unique scans for your vehicle. At the moment you are only able to see the number of scans for the beta test period of March 1st through May 1st, but future updates will allow you to view scans by day, week, month, or all time.</p>
      </div>
     </div>
  </div>
</template>

<script>

import {api} from '../../utils/api.js'
import {storage} from '../../utils/storage.js'

export default {
  name: 'DashBoard',
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