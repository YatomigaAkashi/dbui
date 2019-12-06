<template>
    <el-dialog title="添加学生" :visible.sync="show" @close="close">
        <el-form :model="form">
            <el-form-item label="学生学号" :label-width="formLabelWidth">
                <el-input v-model="form.Sno" autocomplete="off" maxLength="11"/>
            </el-form-item>
            <el-form-item label="学生姓名" :label-width="formLabelWidth">
                <el-input v-model="form.Sname" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" maxLength="2">
                <el-input v-model="form.Sage" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.Ssex" placeholder="请选择性别">
                    <el-option label="男" value="male"/>
                    <el-option label="女" value="female"/>
                </el-select>
            </el-form-item>
            <el-form-item label="班级" :label-width="formLabelWidth">
                <el-select v-model="form.Clno" placeholder="请选择班级">
                    <el-option v-for="value in Clnos" :label="value.Clno" :value="value.Clno"/>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "addStudent",
        props:{
            dialogFormVisible: Boolean,
            Clnos: Array,
            form: Object,
            confirmType: ''
        },
        data() {
            return {
                formLabelWidth: '120px',
                loading: {},
                show: false,
            };
        },
        watch: {
            dialogFormVisible(value) {
                this.show = value
            }
        },
        methods: {
            // confirm student
            confirm() {
                if (this.confirmType === 'add') {
                    this.addStudent()
                    return
                }
                this.updateStudent()
            },
            // add student
            async addStudent() {
                // this.openFullScreen()
                let data = await this.$axios.post('/student/add', this.form)
                // this.loading.close()
                this.$emit('addStudentReturn', data.data)
                this.close()
            },
            // put student
            async updateStudent() {
                let data = await this.$axios.put('/student/put', this.form)
                this.$emit('updateStudentReturn', data.data)
                this.close()
            },
            // 取消表单弹框
            cancel() {
                this.close()
            },
            // close dialog
            close() {
                this.$emit('listenDialog')
            }
            // 全屏加载遮罩显示 时间过短，闪烁问题弃用
            // openFullScreen() {
            //     this.loading = this.$loading({
            //         lock: true,
            //         text: 'Loading',
            //         spinner: 'el-icon-loading',
            //         background: 'rgba(0, 0, 0, 0.7)'
            //     });
            // }
        }
    }
</script>

<style scoped>

</style>