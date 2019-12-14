<template>
    <div>
        <el-table :data="showClasses">
            <el-table-column prop="Clno" label="班号" width="180" />
            <el-table-column prop="Pname" label="专业名" width="140" />
            <el-table-column prop="Dname" label="系名" width="120" />
            <el-table-column prop="Cnum" label="人数" width="120" />
            <el-table-column prop="Cyear" label="入校年份" width="160" />
        </el-table>
    </div>
</template>

<script>

    export default {
        name: "Class",
        components: {},
        data() {
            return {
                classes: [],  // get students
                showClasses: [],  // show students
            }
        },
        async beforeMount() {
            this.updateClassesData()
        },
        methods: {
            // get students
            async getClasses() {
                let data = await this.$axios.get('/class/getClasses')
                if (data.data.code === '001') {
                    return data.data.data
                }
            },
            // update show students
            async updateClassesData() {
                this.classes =  await this.getClasses()
                this.showClasses = this.classes
            },
        }
    }
</script>

<style scoped>

</style>