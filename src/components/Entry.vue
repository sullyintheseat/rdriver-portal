<template>
  <div class="hello">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 centered">
        <div id="loginBox">
          <div id="loginContainer">
            <h1>SIGN IN</h1>
            <br/>
            <div class="input-group input-group-lg" style="margin:0 15%;"> 
              <input type="text" class="form-control"  v-model="input.username" placeholder="EMAIL" aria-describedby="basic-addon1">
              <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-envelope"></i></span>
            </div>
            <br/>
            <div class="input-group input-group-lg" style="margin:0 15%;">
              <input type="password" class="form-control"  v-model="input.password" placeholder="PASSWORD" aria-describedby="basic-addon1">
              <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-lock"></i></span>
            </div>
            <br/>
            <div style="margin:0 15%;" class="centered">
              <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="login()">LOGIN</button>
            </div>
            <br/>
            <router-link to="SignUp" >GO TO SIGNUP</router-link>
            <router-view></router-view>
            <br/><br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from '../utils/api.js'
import {storage} from '../utils/storage.js'

export default {
  name: 'Entry',
  data() {
    return {
      input: {
          username: "",
          password: ""
      }
    }
  },
  created: function () {
    
  },
  methods: 
  {
    login() {
      let user = this.input.username;
      let pass = this.input.password;
      if(user != "" && pass != "") {
        api.rawPost(`/accountSettings/login`, {email: user, password: pass})
          .then( response => {
              this.userTemp = response.data;
              storage.storeValue('acct', this.userTemp._id);
              storage.storeValue('token', this.userTemp.token);
              //storage.storeValue('userTemp', this.userTemp);
              storage.storeValue('isGood', 'yes');
              this.$router.push('Dashboard');
            })
          .catch(error => {
            alert('No sser with that name exists')
          });
      } else {
        alert(`A username and password must be present`);
      }
    }
  }
}
</script>

<style scoped>
#loginContainer {
  width:100%;
  padding:16px 8px;
  background: url("../assets/signup.png") no-repeat;
}

a:visited {
  font-weight: 300;
  color:#fff; 
}
</style>

