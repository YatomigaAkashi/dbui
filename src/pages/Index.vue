<template>
  <div id="app">
    <el-container class="main">
      <el-aside class="aside">
        <el-col class="col">
          <h5 class="title">明石</h5>
          <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo nav"
                  @select="select"
                  background-color="#020633"
                  text-color="#ffffff"
                  router>

            <el-menu-item index='1' route="/index/student">
              <i class="el-icon-user"/>
              <span slot="title">学生信息</span>
            </el-menu-item>
            <el-menu-item index='2' route="/index/teacher">
              <i class="el-icon-s-custom"/>
              <span slot="title">教师信息</span>
            </el-menu-item>
            <el-menu-item index='3' route="/index/course">
              <i class="el-icon-reading"/>
              <span slot="title">课程信息</span>
            </el-menu-item>
            <el-menu-item index='4' route="/index/class">
              <i class="el-icon-files"/>
              <span slot="title">班级信息</span>
            </el-menu-item>
            <el-menu-item index='5' route="/index/sm">
              <i class="el-icon-magic-stick"/>
              <span slot="title">学生会信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-container class="container">
        <el-header class="header" height="80px">
          <i class="el-icon-s-fold" style="margin-right: 15px"/>
          <span>西安电子科技大学学生管理系统</span>
        </el-header>

        <el-main class="content">
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  export default {
    methods: {
      select: () => {
      }
    }
  }
</script>

<style>

  /*公共样式*/

  * {
    margin: 0;
    padding: 0;
  }

  html, body, #app{
    height: 100%;
  }

  /*-----------------------------------*/
  /*-----------------------------------*/

  /*具体样式*/
  .main {
    height: 100%;
  }

  .main el-container, .main .aside {
    height: 100%;
  }

  .main .aside .col {
    width: 100%;
    height: 100%;
    background-color: #020633;
  }

  .main .aside .col .title {
    width: 100%;
    height: 80px;
    background-color: #333887;
    font-size: 22px;
    line-height: 80px;
    text-align: center;
    color: #0ac871;
  }

  .main .aside .col .nav {
    font-size: 20px;
    color: white;
    border-right: 0;
  }

  .main .container {
    width: 100%;
    height: 100%;
  }

  .main .container .header {
    width: 100%;
    background-color: #fcfcfc;
    font-size: 22px;
    line-height: 80px;
  }
</style>
