<template>
  <div>
    <div class="header">
      <div class="black_50"></div>
      <div class="grey_25"></div>
      <div class="container">
        <div class="row">
          <img src="./assets/dslogo.jpg" class="dslogo" />
        </div>
      </div>
    </div>
    <div class="container">
      <router-view/> 
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>

</style>
