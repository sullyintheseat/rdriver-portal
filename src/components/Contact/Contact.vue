<template>
  <div class="bump64">
    <div class="row">
      <div class="col-xs-12">
        <div class="sectionHeader">
          <div style="text-align:right"><router-link to="LeaderBoard" >LEADERBOARD</router-link> | <router-link to="DashBoard" >SCAN TRACKER</router-link> |  <router-link to="Profile" >ACCOUNT SETTINGS</router-link> |  CONTACT | <a v-on:click="signOut()">SIGN OUT</a></div>
          <h1>CONTACT US</h1>   
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-xs-12">
        <p>Please fill out the following information and a Digital Seat representative will reach out to you.</p>
        <h3>REASON</h3>
        <p>
          <select v-model="selected">
            <option v-for="item in options" v-bind:value="item.value" v-bind:key="item.value">
              {{ item.text }}
            </option>
          </select>
        </p>
        <p>
          <textarea class="form-control" rows="8" v-model="input.message"></textarea>
        </p>
        <div style="width:100%; text-align:center;">
          <div class="centered">
            <br/>
            <button type="button" class="btn btn-orange btn-lg btn-block" v-on:click="sendMessage()">SUBMIT MESSAGE</button>
            <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {api} from '../../utils/api.js'
import {storage} from '../../utils/storage.js'

export default {
  name : 'Contact',
  data(){
      return {
      input: {
        message: ''
      },
      selected: 'GENERAL_INFORMATION',
      options: [
        { text: 'GENERAL INFORMATION', value: 'GENERAL_INFORMATION'},
        { text: 'TECHNICAL PROBLEMS', value: 'TECHNICAL_PROBLEMS' },
        { text: 'REQUEST A NEW DECAL SET', value: 'REQUEST_A_NEW_TAG_SET' }
      ]
    }
  },
  methods : {
    sendMessage () {
      let msg = {
        reason: this.selected,
        message: this.input.message
      };
      api.post('/msg', msg).then( response => {})
      .catch( error => {
        alert(error)
      });
      this.$router.push('/thanks');
    },
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
