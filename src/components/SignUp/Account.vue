<template>
  <div class="bump64">
    <div class="row">
      <div class="col-xs-12">
        <div class="sectionHeader">
          <h1>Profile Overview</h1>
        </div>
      </div>
    </div>
    <br/>
    <div class="row" v-if="!isAgreed()">
      <div class="col-xs-12">
        <h3>Please read and agree to the terms and services here</h3>
        <p><router-link to="Agreement"><button type="button" class="btn btn-orange btn-lg btn-block centered">READ AND SIGN AGREEMENT</button></router-link></p>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-4">
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">Account</h3>
          <div style="margin: 0 10%;">
            <input type="text" class="form-control" v-model="input.email" placeholder="EMAIL ADDRESS" readonly><br/>
            <input type="password" class="form-control" v-model="input.password" placeholder="PASSWORD"><br/>
            <input type="password" class="form-control" v-model="input.verify" placeholder="VERIFY PASSWORD"><br/>
          </div>
          <div style="margin:0 15%;" class="centered">      
            <br/>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">Profile</h3>
          <div style="margin: 0 10%;">
            <input type="text" class="form-control" v-model="input.firstName" placeholder="FIRST NAME"><br/>
            <input type="text" class="form-control" v-model="input.lastName" placeholder="LAST NAME"><br/>
            <input type="text" class="form-control" v-model="input.phone" placeholder="PHONE"><br/>
            <input type="text" class="form-control" v-model="input.address" placeholder="ADDRESS ONE"><br/>
            <input type="text" class="form-control" v-model="input.address_2" placeholder="ADDRESS TWO"><br/>
            <input type="text" class="form-control" v-model="input.city" placeholder="CITY"><br/>
            <input type="text" class="form-control" v-model="input.state" placeholder="STATE"><br/>
            <input type="text" class="form-control" v-model="input.zip" placeholder="ZIP"><br/>
            <p>Decal Collection</p>
            <p>
              <select v-model="selected">
                <option v-for="item in options" v-bind:value="item.value" v-bind:key="item.value">
                  {{ item.text }}
                </option>
              </select>
            </p>
          </div>
          <div style="margin:0 15%;" class="centered">
            <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="createUser()">UPDATE INFO</button>
            <br/>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div style="width:100%; background-color:#fff;">
          <h3 class="formhead">My Vehicles</h3>
          <div style="margin: 0 5%; padding-top:16px; border-top:solid 1px #000;" v-if="vehicles.length>1">
            <ul id="vehicles">
              <li v-for="vehicle in vehicles" v-bind:key="vehicle">
                {{ vehicle.year }} {{ vehicle.make }} {{vehicle.model}}
              </li>
            </ul>
          </div>
          <div style="margin: 0 5%; padding-top:16px; border-top:solid 1px #000;" v-if="profileComplete()">
            <div style="margin: 0 10%; ">
              <input type="text" class="form-control" v-model="vehicle.year" placeholder="YEAR"><br/>
              <input type="text" class="form-control" v-model="vehicle.make" placeholder="MAKE"><br/>
              <input type="text" class="form-control" v-model="vehicle.model" placeholder="MODEL"><br/>
              <input type="text" class="form-control" v-model="vehicle.plate" placeholder="PLATE"><br/>  
              <button type="button" class="btn btn-orange btn-lg btn-block centered" v-on:click="addVehicle()">ADD VEHICLE</button>
              <br/>
            </div>
          </div>
          <div style="margin: 0 10%;" v-else>
            <p>You must complete the registration process before adding vehicles.</p>
            <p><br/></p>
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
  name: 'Account',
  data () {
    return {
      input: {
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
         pickupMethod: ""
      },
      vehicles: [],
      vehicle : {
        year: "",
        make: "",
        model: "",
        plate: "",
        driverId: ""
      },
      userAccount: storage.getValue('acct'),
      userTemp: storage.getValue('userTemp'),
      selected: 'PICK_UP',
      options: [
        { text: 'PICK UP AT OFFICE', value: 'PICK_UP'},
        { text: 'SEND TO MY ADDRESS', value: 'SEND' },
      ]
    }
  },
  mounted: function () {

    if(storage.getValue('isGood') === 'yes'){
      this.$router.push('/');
    }
    
    if(!this.userAccount) {
      this.input.firstName = this.userTemp.firstName;
      this.input.lastName = this.userTemp.lastName;
      this.input.email = this.userTemp.email;
      this.input.phone = this.userTemp.phone;
      this.input.address = this.userTemp.address;
      this.input.address_2 = this.userTemp.address_2;
      this.input.city = this.userTemp.city;
      this.input.state = this.userTemp.state;
      this.input.zip = this.userTemp.zip;
      this.input.pickupMethod = this.selected;
    } else {
      if(this.userAccount) {
      api.getRaw(`/accountSettings/user/${this.userAccount}`).then(
      response => {
        this.input = response.data;
        if(response.data.vehicles){
          for(let i = 0; i < response.data.vehicles.length; i++){
            this.vehicles.push(response.data.vehicles[i])
          }
        }
        api.getRaw(`/accountSettings/user/${this.input.email}/email`).then(
        response => {
          if(response.data) {
            this.$router.push('/');
          }          
        })
        .catch(error => {
          
        });
      })
      .catch(error => {
        alert('error')
      });

      
      } else {
        
        api.getRaw(`/accountSettings/user/${this.userTemp.email}/email`).then(
          response => {
            this.input = response.data;
            if(response.data.vehicles){
              for(let i = 0; i < response.data.vehicles.length; i++){
                this.vehicles.push(response.data.vehicles[i])
              }
            }
          })
        .catch(error => {
          alert('error')
        });

      }
    } 
  },
  methods: 
  {
    createUser() {
      const vm = this;
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
        agreement: true,
        driverId: this.input.driverId
      };

      let match = true
      let valid = true;

      try {
        if(this.input.password.length < 8) {
          valid = false;
        }

        if(this.input.password != this.input.verify){
          match = false;
        }
      } catch(e) {
        match = false;
        valid = false;
      }

      if(match && valid){
        api.rawPost('/accountSettings/user',user).then(
          response => {
            vm.input = response.data;
            storage.storeValue('acct', response.data._id);
            storage.storeValue('userTemp', response.data);
          })
        .catch(error => {
          alert('error')
        });

        api.rawPost('/accountsettings/signup',{email: this.input.email, password: this.input.password}).then(
              response => {
                alert('Updated');
                this.$router.push('DashBoard');
              })
            .catch(error => {
              alert('error')
            });
      } else {
        alert('Password must match and length needs to be at least 8 characters');
      }
    },
    isAgreed() {
      if(!this.userAccount) {
        return this.userTemp.agreement;
      } else {
        return true;
      }
    },
    createAccount() {
      
    },
    registered() {
      if(!this.userAccount) {
        return this.userTemp.signedUp;
      } else {
        return true;
      }
    },
    profileComplete() {
      return true
      if(this.registered() && this.isAgreed()) {
        return true;
      } else {
        return false;
      }
    },
    addVehicle () {
      const vm = this;
      if(
        this.vehicle.year.length > 0 &&
        this.vehicle.make.length > 0 &&
        this.vehicle.model.length > 0 && 
        this.vehicle.plate.length > 0) {
        this.vehicle.driverId = this.userTemp._id;

        api.rawPost('/accountSettings/vehicle',this.vehicle ).then(
          response => {
            vm.vehicle = response.data;
            vm.vehicles.push(vm.vehicle);
            vm.vehicle = {
              year: "",
              make: "",
              model: "",
              plate: ""
            };
            alert('Updated');
          })
        .catch(error => {
          console.log(error)
          alert('error')
        });
        
        
      } else {
       alert('Please complete the vehicle information') 
      }
    }
  }
}
</script>

<style>

li { display: list-item }

</style>
