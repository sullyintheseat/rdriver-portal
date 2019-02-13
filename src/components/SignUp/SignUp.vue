<template>
  <div id="signup">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <div class="sectionHeader">
          <h1>SIGN UP</h1>
        </div>
        <div class="sectionContent">
          <p>Welcome to the Digital Seat Rideshare advertising platform</p>
          <p>To sign up please enter the invite code that was sent to you from the beta signup, if you signed up and forgot or did not receive your code, please click the retrieve code button.</p>
        </div>
        <div class="input-group input-group-lg" style="margin:0 15%;">          
          <input type="text" class="form-control"  v-model="input.invite" placeholder="INVITE CODE" aria-describedby="basic-addon1">
          <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-th"></i></span>
        </div>
        <br/>
        <div style="margin:0 15%;" class="centered">
          <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="lookup()">USE CODE</button>
        </div>
        <br/>
        <div class="input-group input-group-lg" style="margin:0 15%;">          
          <input type="text" class="form-control"  v-model="input.email" placeholder="EMAIL ADDRESS" aria-describedby="basic-addon1">
          <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-envelope"></i></span>
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
import {storage} from '../../utils/storage.js'

export default {
  name : "SignUp",
  data () {
    return {
      input: {
         invite: "",
         email: ""
      },
      userTemp: null
    }
  },
  created: function () {
    if(storage.getValue('acct')){
      this.$router.push('Account');
    } else {
      if(storage.getValue('userTemp')){
        this.$router.push('Account');
      } else {
        
      }
    }
  },
  methods: 
  {
    lookup() {
      let invite = this.input.invite;
      if(invite !== "") {
        api.getRawSpec(`https://rideshare.digitalseat.io/code/${invite}`)
          .then(
            response => {
              this.userTemp = response.data;
              storage.storeValue('userTemp', this.userTemp);
              this.$router.push('Account');
            })
          .catch(error => {
            alert('No match for that ID')
          });
      } else {
        alert('Please enter a valid code');
      } 
    },
    retrieve() {
      if(this.input.email === ""){
        alert('A valid email is required;');
      } else {
        api.rawPostSpec('https://rideshare.digitalseat.io/tagId', {email : this.input.email})
        .then(
          response => {
            this.input.invite = response.data;
          }
        )
        .catch(error => {
          this.input.invite = "";
          alert('No match for that email')
        });
      }
    }
  }
}
</script>

<style>

</style>
