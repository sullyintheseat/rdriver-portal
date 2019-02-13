<template>
  <div class="bump64">
    <div class="row">
      <div class="col-xs-12">
        <div class="sectionHeader">
          <div style="text-align:right">LEADERBOARD | <router-link to="DashBoard" >SCAN TRACKER</router-link> |  <router-link to="Profile" >ACCOUNT SETTINGS</router-link> |  <router-link to="Contact" >CONTACT</router-link> | <a v-on:click="signOut()">SIGN OUT</a></div>
          <h1>THANKS</h1>
        </div>
      </div>
    </div>
    <br/>
     <div class="row">
      <div class="col-xs-12">
        <p>Your information has been succesfully submitted and you will receive a response in the next 24 to 48 hours.</p>
      </div>
     </div>
  </div>
</template>

<script>

import {api} from '../../utils/api.js'
import {storage} from '../../utils/storage.js'

export default {
  name: 'ThankYou',
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