<template>
    <div id="app">
        <div class="container">
            <img src="@/assets/login.png" alt="">
            <div class="panel">
                <div class="content" :class="active?'login':''">
                    <div class="switch">
                        <span id="login" @click="active=true" :class="active?'active':''">登录</span>
                        <span>/</span>
                        <span id="signup" @click="active=false" :class="!active?'active':''">注册</span>
                    </div>
                    <form>
                        <div class="input" id="email" placeholder="电子邮箱" :class="focus.email?'focus':''" @mouseenter="focus.email=true" @mouseleave="mouseLeave('email')"><input type="text" v-model="form.email"></div>
                        <div class="input" id="username" placeholder="用户名" :class="focus.username?'focus':''" @mouseenter="focus.username=true" @mouseleave="mouseLeave('username')"><input type="text" v-model="form.username"></div>
                        <div class="input" id="password" placeholder="密码" :class="focus.password?'focus':''" @mouseenter="focus.password=true" @mouseleave="mouseLeave('password')"><input type="password" v-model="form.password"></div>
                        <div class="input" id="repeat" placeholder="重复密码" :class="focus.repeat?'focus':''" @mouseenter="focus.repeat=true" @mouseleave="mouseLeave('repeat')"><input type="password" v-model="form.repeat"></div>
                        <span>忘记？</span>
                        <button @click="login">login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                active: true,
                focus: {
                    email: false,
                    username: false,
                    password: false,
                    repeat: false
                },
                form: {
                    email: '',
                    username: '',
                    password: '',
                    repeat: ''
                }
            }
        },
        computed: {
            email() {
                return this.form.email
            },
            username() {
                return this.form.username
            },
            password() {
                return this.form.password
            },
            repeat() {
                return this.form.repeat
            },
        },
        watch: {
            email(val) {
                if(val !== '') {
                    this.focus.email = true
                    return
                }
                this.focus.email = false
            },
            username(val) {
                if(val !== '') {
                    this.focus.username = true
                    return
                }
                this.focus.username = false
            },
            password(val) {
                if(val !== '') {
                    this.focus.password = true
                    return
                }
                this.focus.password = false
            },
            repeat(val) {
                if(val !== '') {
                    this.focus.repeat = true
                    return
                }
                this.focus.repeat = false
            },
        },
        methods: {
            mouseLeave(name) {
                if(this.form[name] === '') {
                    this.focus[name] =  false
                }
            },
            async login() {
                let data = await this.$axios.post('/user/login', this.form)
                data = data.data
                if (data.code !== '001') {
                    this.$message({
                        type: 'error',
                        message: data.msg
                    });
                    return
                }
                this.$message({
                    type: 'sucess',
                    message: data.msg
                });
                localStorage.setItem('token', data.data.tk) //存储token
                localStorage.setItem('user', data.data.username) //存储用户
                this.$store.commit('LOGIN', {
                    token: data.data.tk,
                    user: data.data.user
                })
                await this.$router.push('/index')
            }
        }
    }
</script>

<style scoped>
    /*配色方案
        背景： rgb(224, 207, 254), rgb(255, 239, 255)
        按钮： rgb(181, 154, 254), rgb(245, 189, 253)
     */

    * {
        margin: 0;
        padding: 0;
    }

    html, body, #app{
        width: 100%;
        height: 100%;
    }

    #app {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(45deg, rgb(181, 154, 254), rgb(245, 189, 253));
    }

    .container {
        position: relative;
        width: 70rem;
    }

    .container img {
        width: 70rem;
        transform: scale(0.9);
    }

    .panel {
        width: 40%;
        margin-top: 10rem;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        justify-content: center;
    }

    .switch span {
        color: #ccc;
        font-size: 1.4rem;
        cursor: pointer;
    }

    .switch span.active {
        color: rgb(181, 154, 254);
    }

    form {
        width: 12rem;
        margin: 2rem 0 0;
    }

    form .input {
        position: relative;
        opacity: 1;
        height: 2rem;
        width: 100%;
        margin: 2rem 0;
        transition: 0.6s;
    }

    .input input {
        outline: none;
        width: 100%;
        border: none;
        border-bottom: .1rem solid rgb(181, 154, 254);
    }

    .input::after {
        content: attr(placeholder);
        position: absolute;
        left: 0;
        top: -20%;
        font-size: 1.3rem;
        color: rgb(129, 101, 207);
        transition: .3s;
    }

    .input.focus::after {
        top: -70%;
        font-size: 1rem;
    }

    .login .input#email,
    .login .input#repeat{
        margin: 0;
        height: 0;
        opacity: 0;
    }

    form span {
        display: block;
        color: rgb(110, 89, 167);
        font-size: .8rem;
        cursor: pointer;
    }

    form button {
        border: none;
        outline: none;
        margin: 2rem 0 0;
        width: 100%;
        height: 3.5rem;
        border-radius: 3rem;
        background: linear-gradient(90deg, rgb(181, 154, 254), rgb(245, 189, 253));
        box-shadow: 0 0 8px rgb(181, 154, 254);
        cursor: pointer;
    }
</style>