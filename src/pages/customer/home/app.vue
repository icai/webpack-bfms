<template>
  <div id="app">
    <el-card class="index-card">
      <div slot="header">
        Home
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
      <el-button @click.native="startHacking">Let's do it</el-button>
    </el-card>
  </div>
</template>

<script>
import logo from 'assets/img/logo.png'
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
      logoImg: logo
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style lang="postcss">
  body {
    background-color: #f5f5f5;
  }
  :root h1 {
   --color: red;
   display: flex;
   color: var(--color);
  }
  .text-center {
    text-align:center;
  }
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
