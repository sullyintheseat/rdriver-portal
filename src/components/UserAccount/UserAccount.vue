<template>
  <div class="bump64">
    <div class="row">
      <div class="col-xs-12">
        <div class="sectionHeader">
          <div style="text-align:right"><router-link to="LeaderBoard" >LEADERBOARD</router-link> | <router-link to="DashBoard" >SCAN TRACKER</router-link> |  ACCOUNT SETTINGS |  <router-link to="Contact" >CONTACT</router-link> | <a v-on:click="signOut()">SIGN OUT</a></div>
          <h1>ACCOUNT SETTINGS</h1>   
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-sm-4">
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">SIGN-IN SETTINGS</h3>
          <div style="margin: 0 10%;">
            <input type="text" class="form-control" v-model="input.email" placeholder="EMAIL ADDRESS" readonly><br/>
            <input type="password" class="form-control" v-model="input.current" placeholder="CURRENT PASSWORD" readonly><br/>
            <input type="password" class="form-control" v-model="input.password" placeholder="NEW PASSWORD" readonly><br/>
            <input type="password" class="form-control" v-model="input.verify" placeholder="VERIFY PASSWORD" readonly><br/>
          </div>
          <div style="margin:0 15%;" class="centered">
            <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="changePassword()">CHANGE PASSWORD</button>
            <br/>
          </div>
        </div>
        <br/>
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">DECAL INFORMATION</h3>
          <div style="margin: 0 10%;">
            <p>Once you have received your driver decal from Digital Seat, please input the code found on the lower right hand corner of the decals below:</p>
            <input type="text" class="form-control" v-model="input.driverId" placeholder="DECAL ID"><br/>
          </div>
          <div style="margin:0 15%;" class="centered">
            <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="updateUser()">ADD TAG</button>
            <br/>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div style="width:100%; background-color:#fff;">
          <div  v-if="editMode">
            <h3 class="formhead">USER PROFILE</h3>
            <div style="margin: 0 10%;">
              <input type="text" class="form-control" v-model="input.firstName" placeholder="FIRST NAME"><br/>
              <input type="text" class="form-control" v-model="input.lastName" placeholder="LAST NAME"><br/>
              <input type="text" class="form-control" v-model="input.phone" placeholder="PHONE"><br/>
              <input type="text" class="form-control" v-model="input.address" placeholder="ADDRESS ONE"><br/>
              <input type="text" class="form-control" v-model="input.address_2" placeholder="ADDRESS TWO"><br/>
              <input type="text" class="form-control" v-model="input.city" placeholder="CITY"><br/>
              <input type="text" class="form-control" v-model="input.state" placeholder="STATE"><br/>
              <input type="text" class="form-control" v-model="input.zip" placeholder="ZIP"><br/>
            </div>
            <div style="margin:0 15%;" class="centered">
              <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="updateUser()">UPDATE INFO</button>
              <br/>
            </div>
          </div>
          <div v-else>
            <h3 class="formhead">USER PROFILE</h3>
            <div style="margin: 0 10%;">
              <p>NAME:<br/>
              {{input.firstName}} {{input.lastName}}</p>
              <p>MOBILE: {{input.phone}}</p>
              <p>ADDRESS: {{input.address}}<br/>
              <span v-if="input.address_2">ADDRESS 2: {{input.address_2}}</span></p>
              <p>CITY: {{input.city}}</p>
              <p>STATE: {{input.state}}</p>
              <p>ZIP: {{input.zip}}</p>
            </div>
            <div style="margin:0 15%;" class="centered">
              <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="editUser()">EDIT INFO</button>
              <br/>
            </div>
          </div>
          <div style="margin: 0 10%;">
            <p style="text-align:left;">In the case of a damaged decal, or if you need to order replacement decals for your vehicle, please visit the <router-link to="Contact">Contact</router-link> page and submit a request.</p>
            <br/>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">MY VEHICLES</h3>
          <div style="margin: 0 5%; padding-top:16px; border-top:solid 1px #000;" v-if="vehicles.length>1">
            <ul id="vehicles">
              <li v-for="vehicle in vehicles" v-bind:key="vehicle">
                {{ vehicle.year }} {{ vehicle.make }} {{vehicle.model}}
              </li>
            </ul>
          </div>
          <div style="margin: 0 5%; padding-top:16px; border-top:solid 1px #000;">
            <div style="margin: 0 10%; ">
              <input type="text" class="form-control" v-model="vehicle.year" placeholder="YEAR"><br/>
              <input type="text" class="form-control" v-model="vehicle.make" placeholder="MAKE"><br/>
              <input type="text" class="form-control" v-model="vehicle.model" placeholder="MODEL"><br/>
              <input type="text" class="form-control" v-model="vehicle.plate" placeholder="PLATE"><br/>  
              <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="addVehicle()">ADD VEHICLE</button>
              <br/>
            </div>
          </div>
        </div>
        <br/>
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">DELETE MY ACCOUNT</h3>
          <div style="margin: 0 10%;">
            <p>Deleting your account cannot be undone and will remove all personal info from our system.</p>
            <div style="margin:0 15%;" class="centered">
              <button type="button" class="btn btn-danger btn-lg btn-block centered" v-on:click="deleteUser()">DELETE ACCOUNT</button>
              <br/>
            </div>
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
  name: 'UserAccount',
  data () {
    return {
      input: {
          driverId: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          address_2: "",
          city: "",
          state: "",
          zip: "",
          verify: "",
          current: ""
      },
      vehicles: [],
      vehicle : {
        year: "",
        make: "",
        model: "",
        plate: "",
        driverId: ""
      },
      editMode: false
    }
  },
  mounted : function () {
    if(storage.getValue('isGood') === 'no'){
      this.$router.push('/');
    } else {
      api.get(`/accountSettings/reguser`)
      .then( response => {
        this.input = response.data;
      })
      .catch( error => {

      })
    }
  },
  methods: 
  {
    changePassword() {

    },
    editUser() {
      this.editMode = true;
    },
    updateUser () {
      let user = {
        firstName: this.input.firstName,
        lastName: this.input.lastName,
        email: this.input.email,
        phone: this.input.phone,
        address: this.input.address,
        address_2: this.input.address_2,
        city: this.input.city,
        state: this.input.state,
        zip: this.input.zip,
        driverId: this.input.driverId
      };
      api.put('/accountsettings/reguser', user)
      .then (response => {
        this.input = response.data;
        this.editMode = false;
      })
      .catch( error => {
        alert('Update Failed');
      })
    },
    addVehicle() {

    },
    deleteUser() {

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