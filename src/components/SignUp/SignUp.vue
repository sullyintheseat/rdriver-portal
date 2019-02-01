<template>
  <div id="signup">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <div class="sectionHeader">
          <h1>SIGN UP</h1>
        </div>
        <div class="sectionContent">
          <p>Welcome to the Digital Seat Rideshare advertising platform</p>
          <p>To sign up please enter the invoite code that was sent to you from the beta signup, if you sigmned up and forgot or did not receive your code, please click the retrieve code button.</p>
        </div>
        <div class="input-group input-group-lg" style="margin:0 15%;">          
          <input type="text" class="form-control"  v-model="input.invite" placeholder="Invite Code" aria-describedby="basic-addon1">
          <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-th"></i></span>
        </div>
        <br/>
        <div style="margin:0 15%;" class="centered">
          <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="lookup()">USE CODE</button>
        </div>
        <br/>
        <div style="margin:0 15%;" class="centered">
          <button type="button" class="btn btn-orange btn-lg btn-block centered"  v-on:click="retrieve()">RETRIEVE CODE</button>
        </div>
        <div style="margin-top:32px; border-bottom:solid 1px #aaa;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from '../../utils/api.js'
import Profile from './Profile'

export default {
  name : "SignUp",
  data () {
    return {
      input: {
         invite: ""
      },
      userTemp: null
    }
  },
  methods: 
  {
    lookup() {
      let invite = this.input.invite;
      api.getRaw(`/code/${invite}`)
        .then(
          response => {
            this.userTemp = response.data; 
          })
        .catch(error => {
          alert('No match for that ID')
        })      
    },
    retrieve() {
      
      console.log(this.userTemp);
    }
  }
}
</script>

<style>

</style>
