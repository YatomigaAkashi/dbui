<template>
    <div>
        <el-table :data="showDepartments">
            <el-table-column prop="Dno" label="系号" width="120" />
            <el-table-column prop="Dname" label="系名" width="160" />
            <el-table-column prop="Office" label="系办公室" width="120" />
            <el-table-column prop="Dnum" label="系人数" width="140" />
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Department",
        data() {
            return {
                departments: [],
                showDepartments: [],
            }
        },
        async beforeMount() {
            this.updateDepartmentsData()
        },
        methods: {
            async getDepartments() {
                let data = await this.$axios.get('/department/getDepartments')
                if (data.data.code === '001') {
                    return data.data.data
                }
            },
            // update show students
            async updateDepartmentsData() {
                this.departments =  await this.getDepartments()
                this.showDepartments = this.departments
            }
        }
    }
</script>

<style scoped>

</style>