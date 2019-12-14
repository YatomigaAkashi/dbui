<template>
    <div>
        <el-table :data="showMs">
            <el-table-column prop="Mno" label="学会号" width="180" />
            <el-table-column prop="Mname" label="学会名" width="140" />
            <el-table-column prop="Myear" label="成立年份" width="120" />
            <el-table-column prop="Maddr" label="地点" width="120" />
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "M",
        data() {
            return {
                ms: [],
                showMs: [],
            }
        },
        async beforeMount() {
            this.updateMsData()
        },
        methods: {
            async getMs() {
                let data = await this.$axios.get('/m/getMs')
                if (data.data.code === '001') {
                    return data.data.data
                }
            },
            async updateMsData() {
                this.Ms =  await this.getMs()
                this.showMs = this.Ms
            }
        }
    }
</script>

<style scoped>

</style>
