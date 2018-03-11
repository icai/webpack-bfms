<template>
  <el-card class="login-card">
    <div slot="header">
      <img :src="logo" class="logo-img">
      <span class="logo-text">Login System</span>
    </div>
    <el-form class="login" :rules="rules" ref="ruleForm" :model="ruleForm" label-width="100px" >
      <el-form-item label="Phone" prop="userName">
        <el-input placeholder="Please enter phone number" icon="my-phone" v-model="ruleForm.userName" type="tel" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input placeholder="Please enter password" icon="my-password" v-model="ruleForm.password" type="password" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import logo from 'assets/img/logo.png'
  import ajax from 'ajax';

  export default {
    data () {
      return {
        logo: logo,
        ruleForm: {
          phone: '',
          password: ''
        },
        rules: {
          userName: [
             { required: true, message: 'Phone required', trigger: 'blur' }
          ],
          password: [
             { required: true, message: 'Password required', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      login () {
        const me = this;
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) {
            return
          }
          ajax.post('/login', this.ruleForm)
          .then(function(res) {
            let data = res.data;
            if(data.status == 1) {
              location.assign('../user/index.html')
            } else {
              me.$notify({
                message: data.message,
                duration: 3000
              })
            }
          })

        })
      }
    }
  }
</script>

<style>
  .login-card {
    width: 800px;
    margin: 100px auto;
  }
  .login {
    display: block;
    width: 400px;
    margin: 100px auto;
  }
  .logo-img {
    width: 90px;
  }
  .logo-text {
    margin-left: 20px;
  }
</style>
