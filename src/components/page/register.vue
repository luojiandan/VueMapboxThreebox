<template>
  <div class="register">
    <div class="login_page fillcontain">
      <transition name="form-fade" mode="in-out">
        <section class="form_register" v-show="showLogin">
          <div class="manage_tip"></div>
          <div id="middle_register">
            <div id="formLogin_register">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <div class="regLogo" v-if="active>1">企业用户注册</div>
                <el-tab-pane label="个人用户注册" name="first">
                  <el-form :model="loginForm" :rules="rules" ref="loginForm" v-if="activeSelf==0">
                    <el-form-item prop="username">
                      <el-input v-model="loginForm.username" placeholder="请输入账号">
                        <template slot="prepend">账号</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        v-model="loginForm.password"
                        placeholder="请输入6-12位的字符"
                        type="password"
                      >
                        <template slot="prepend">密码</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="tel">
                      <el-input v-model="loginForm.tel" placeholder="请输入手机号">
                        <template slot="prepend">手机号</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="yzm">
                      <el-input v-model="loginForm.yzm" placeholder="请输入验证码">
                        <template slot="prepend">验证码</template>
                        <template slot="append">
                          <el-button class="btnPrimary" type="primary">获取验证码</el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item style="margin:50px 0 0;">
                      <el-button
                        type="primary"
                        @click="submitForm('loginForm')"
                        class="submit_btn"
                      >立即注册</el-button>
                    </el-form-item>
                  </el-form>
                  <div v-else class="regSucc">
                    <img src="../img/duigou.png" alt />
                    <p>注册成功</p>
                    <el-button
                    class="nextReg"
                    type="primary"
                    style="margin-top: 12px;"
                    @click="backLogin"
                  >返回登录页面</el-button>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="企业用户注册" name="second">
                  <el-steps
                    :active="active"
                    align-center
                    finish-status="success"
                    style="margin-bottom:26px;"
                  >
                    <el-step title="注册账号"></el-step>
                    <el-step title="填写公司信息"></el-step>
                    <el-step title="提交成功"></el-step>
                  </el-steps>
                  <div v-if="active === 1">
                    <el-form :model="loginFormStep1" :rules="rulesStep1" ref="loginFormStep1">
                      <el-form-item prop="username">
                        <el-input v-model="loginFormStep1.username" placeholder="请输入账号">
                          <template slot="prepend">账号</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="password">
                        <el-input
                          v-model="loginFormStep1.password"
                          placeholder="请输入6-12位的字符"
                          type="password"
                        >
                          <template slot="prepend">密码</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="tel">
                        <el-input v-model="loginFormStep1.tel" placeholder="请输入手机号">
                          <template slot="prepend">手机号</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="yzm">
                        <el-input v-model="loginFormStep1.yzm" placeholder="请输入验证码">
                          <template slot="prepend">验证码</template>
                          <template slot="append">
                            <el-button class="btnPrimary">获取验证码</el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div v-else-if="active === 2">
                    <el-form :model="loginFormStep2" :rules="rulesStep2" ref="loginFormStep2">
                      <el-form-item prop="username">
                        <el-input v-model="loginFormStep2.gsmc" placeholder="请输入公司名称">
                          <template slot="prepend">公司名称</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="password">
                        <el-input v-model="loginFormStep2.password" placeholder="请输入公司简称">
                          <template slot="prepend">公司简称</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="tel">
                        <el-input v-model="loginFormStep2.tel" placeholder="请输入公司地址">
                          <template slot="prepend">公司地址</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="tel">
                        <el-input v-model="loginFormStep2.lxr" placeholder="请输入联系人">
                          <template slot="prepend">联系人</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="yzm">
                        <el-input v-model="loginFormStep2.yyzz" placeholder="请上传营业执照">
                          <template slot="prepend">营业执照</template>
                          <template slot="append">
                            <el-button class="btnPrimary">上传营业执照</el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="tel">
                        <el-input v-model="loginFormStep2.tel" placeholder="请输入商品类型">
                          <template slot="prepend">商品类型</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="yzm">
                        <el-input v-model="loginFormStep2.yzm" placeholder="请上传许可证">
                          <template slot="prepend">许可证</template>
                          <template slot="append">
                            <el-button class="btnPrimary">上传附件</el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="form_step3" v-else>
                    <img src="../img/duigou.png" alt />
                    <p>{{xiexie}}</p>
                  </div>
                  <el-button
                    class="nextReg"
                    type="primary"
                    style="margin-top: 12px;"
                    @click="stepNext"
                  >{{stepName[active-1]}}</el-button>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <footer id="footer">
            技术支持：西安迈讯信息技术有限公司
            <br />makeintell.com
          </footer>
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
//@@@@最终校验字段要根据后台来改变
export default {
  data() {
    // var validateTel = (rule, value, callback) => {
    //   if (!/^1[3456789]\d{9}$/.test(value)) {
    //     callback(new Error("请输入正确的手机号"));
    //   } else {
    //     callback();
    //   }
    // };
    
    return {
      loginForm: {
        username: "",
        password: "",
        tel: "",
        yzm: ""
      },
      loginFormStep1: {
        username: "",
        password: "",
        tel: "",
        yzm: ""
      },
      loginFormStep2: {
        gsmc: "",
        lxr: "",
        yyzz: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            message: "只能输入字母和数字",
            trigger: "blur"
          },
          { min:6,max:20, message: "必须输入6到20位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            message: "只能输入字母和数字",
            trigger: "blur"
          },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },

      rulesStep1: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            message: "只能输入字母和数字",
            trigger: "blur"
          },
          { min:6,max:20, message: "必须输入6到20位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            message: "只能输入字母和数字",
            trigger: "blur"
          },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      rulesStep2: {
        //html v-model也未修改
         gsmc: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
          lxr: [{ required: true, message: "请输入联系人", trigger: "blur" }],
          yyzz: [{ required: true, message: "请上传营业执照", trigger: "blur" }],
      },
      showLogin: false,
      activeName: "first",
      active: 1,
      stepName: ["下一步", "提交审核", "返回登录页面"],
      xiexie:
        "您的注册信息已成功提交至管理员处审核，管理员将在3日内完成信息审核，并将审核结果通过短信发送到您的手机，谢谢！",
        activeSelf:0
    };
  },
  mounted() {
    this.showLogin = true;
  },
  computed: {},
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
     
        if (!valid) return;
        // 发起注册的请求
        // const { data: res } = await this.$axios.post("login", this.loginForm);
        // 注册失败
        // if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        // 注册成功
        this.$message.success("OK");
           this.activeSelf++
      });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    stepNext() {
      if (this.active == 1) {
        document.getElementsByClassName("el-tabs__header")[0].style.display =
          "none";
      } else if (this.active == 2) {
      } else {
        this.$router.push("/");
      }
      this.active++;
    },
    backLogin(){
      this.$router.push("/");
    }
  }
};
</script>
<style lang='less' >
.register {
  width: 100%;
  height: 100%;
  background: url("../img/regbg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.form_register {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .manage_tip {
    width: 667px;
    height: 46px;
    background: url("../img/titlereg.png") no-repeat;
    background-size: 100% 50px;
    margin: 62px auto;
  }
}
#footer {
  width: 405px;
  height: 68px;
  line-height: 36px;
  color: #409eff;
  font-size: 18px;
  margin: 50px auto;
  text-align: center;
  overflow: hidden;
}
#middle_register {
  width: 745px;
  min-height: 554px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 30px;
  overflow: hidden;
  margin: 0 auto;
  #formLogin_register {
    width: 600px;
    min-height: 500px;
    margin: 50px auto;

    .el-tabs {
      width: 100%;
      display: flex;
      height: 100%;
      flex-direction: column;
    }
    .el-tabs--card > .el-tabs__header {
      border: 0;

      margin-bottom: 36px;
      overflow: hidden;
      .el-tabs__nav-wrap {
        background: #fff;
        border-radius: 10px;
        border: 1px solid #ccc;
        overflow: hidden;
      }
    }
    .el-tabs__nav {
      width: 100%;
      height: 60px;
      text-align: center;
      border: 0;
      .el-tabs__item {
        width: 50%;
        height: 100%;
        line-height: 60px;
        font-size: 28px;
        color: #409eff;
      }
      .el-tabs__item.is-active {
        color: #fff;
        background: #409eff;
        border: 0;
      }
    }
    .el-tabs__content {
      flex: 1;
      .el-step__line {
        background: #fff;
        height: 8px;
        top: 26px;
      }
      .el-step__line-inner{
        border-width:4px!important;
      }
      .el-input-group__prepend {
        width: 88px;
        text-align: center;
        font-size: 18px;
        color: #333333;
      }
      .el-input-group__append {
        padding: 0 40px;
        border: 0;
        height: 100%;
      }
      .el-input__inner {
        height: 48px;
        padding-left: 30px;
        font-size: 18px;
        color: #999;
        border-color: #ccc;
      }
      .el-form-item {
        margin-bottom: 20px;
        border-radius: 5px;
        // border: 1px solid #999;
      }
      .btnPrimary {
        background: #409eff;
        color: #fff;
      }
      .submit_btn {
        width: 100%;

        height: 48px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 18px;
        border-radius: 6px;
      }
    }
    .nextReg {
      width: 100%;

      height: 48px;
      text-align: center;
      line-height: 20px;
      color: #fff;
      font-size: 18px;
      border-radius: 6px;
    }
    .regLogo {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #409eff;
      font-size: 28px;
      margin-bottom: 50px;
    }
    .form_step3 {
      text-align: center;
      img {
        margin: 20px;
      }
      p {
        font-size: 16px;
        line-height: 30px;
      }
    }
    .regSucc{
      text-align: center;
      img {
        margin:40px 20px 16px 20px;
      }
      p {
        font-size: 24px;
        line-height: 30px;
        color: #409eff;
        margin-bottom: 40px;
      }
    }
    .el-step__head.is-success {
      color: #fff;
      border-color: #409eff;
      .el-step__icon.is-text {
        background: #409eff;
      }
    }
     .el-step__icon.is-text {
        border: 0;
      }
    .el-step__title.is-success {
      color: #409eff;
    }
    .el-step__head.is-wait {
      color: #000;
      border-color: #fff;
    }
    .el-step__main .is-wait {
      color: #000;
    }
    .el-step__icon{
      width: 58px;
      height: 58px;
      font-size: 22px;
    }
    .el-step__title.is-process{
      font-weight: 500;
    }
  //     .el-form-item__error{
  //   color:#409EFF;
  // }
  }
}
</style>