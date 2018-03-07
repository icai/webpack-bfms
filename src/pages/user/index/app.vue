<template>
  <div id="app">
    <el-card class="index-card">
      <div slot="header">
        Codeing
      </div>

      <div class="text-center">
        <img v-bind:src="logoImg">
      </div>
      <ul>
        <li>
          <a href="https://github.com/icai/webpack-bfms" target="_blank">
            webpack-bfms
          </a>
        </li>
        <li>
          <a href="https://github.com/vue-template" target="_blank">
            Vue template
          </a>
        </li>
      </ul>
      <el-button type="primary" @click="gogogo">To Customer Home Page</el-button>
      <el-button type="primary" plain @click="tototo">To User Login Page</el-button>
    </el-card>
  </div>
</template>

<script>
  import logo from 'assets/img/logo.png'
  import modal from 'components/modal.vue'
  export default {
    components: {
      modal
    },
    data () {
      return {
        msg: 'Use Vue 2.0 Today!',
        logoImg: logo
      }
    },
    methods: {
      gogogo () {
        location.assign('../customer/home.html')
      },
      tototo () {
        location.assign('../user/login.html')
      }
    }
  }
</script>

<style lang="postcss">
  .text-center {
    text-align:center;
  }
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
