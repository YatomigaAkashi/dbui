<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/index/student' }">学生信息</el-breadcrumb-item>
            <el-breadcrumb-item>查询课程</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="scs">
            <el-table-column prop="Cno" label="课程号" width="180" />
            <el-table-column prop="Cname" label="课程名" width="140" />
            <el-table-column prop="Tname" label="教师" width="100" />
            <el-table-column prop="Grade" label="分数" width="100" />
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "queryCourse",
        data() {
            return {
                scs: [],
                Sno: '',
            }
        },
        created() {
            this.getCourses()
        },
        methods: {
            async getCourses() {
                this.Sno = this.$route.query.Sno
                let result = await this.$axios.get('/sc/getScs?Sno=' + this.Sno)
                if (result.data.code === "001") {
                    this.scs = result.data.data
                }
            }
        }
    }
</script>

<style scoped>

</style>