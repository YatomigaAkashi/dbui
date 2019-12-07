<template>
    <div >
        <div class="header">
            <div style="width: 400px; display: inline-block">
                <el-input placeholder="请输入搜索条件" v-model="input" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="select" style="width: 100px">
                        <el-option label="学号" value="Sno"/>
                        <el-option label="姓名" value="Sname"/>
                        <el-option label="性别" value="Ssex"/>
                        <el-option label="年龄" value="Sage"/>
                        <el-option label="班级" value="Clno"/>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"/>
                </el-input>
            </div>
            <div style="width: 20px; display: inline-block"></div>
            <el-button type="primary" plain style="display: inline-block;" @click="clear">清除过滤</el-button>
            <div style="width: 20px; display: inline-block"></div>
            <el-button type="primary" plain style="display: inline-block;" @click="addStudent">添加学生</el-button>
        </div>

        <el-table :data="showStudents">
            <el-table-column prop="Sno" label="学号" width="180" />
            <el-table-column prop="Sname" label="姓名" width="140" />
            <el-table-column prop="Ssex" label="性别" width="120" />
            <el-table-column prop="Sage" label="年龄" width="120" />
            <el-table-column prop="Clno" label="班级" width="160" />
            <el-table-column prop="Dname" label="系别" width="140" />
            <el-table-column label="操作" width="240" >
                <template slot-scope="edit">
                    <el-button size="small" @click="updateStudent(edit.row)">编辑</el-button>
                    <el-container style="display: inline-block; width: 30px"/>
                    <el-button size="small" type="danger" @click="deleteStudent(edit.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--添加框-->
        <addStudent :dialogFormVisible="studentDialog" :confirmType="dialogConfirmType" :form="studentDialogData" :Clnos="Clnos" @listenDialog="studentDialog=false" @addStudentReturn="addStudentReturn" @updateStudentReturn="updateStudentReturn" />
    </div>
</template>

<script>
    import addStudent from "../components/addStudent";

    export default {
        name: "Student",
        components: {
            addStudent,
        },
        data() {
            return {
                students: [],  // get students
                showStudents: [],  // show students
                select: '请选择',  // select students by condition
                input: '',  // search studentd
                studentDialog: false,  // show addStudent dialog
                studentDialogData: {},  // init addStudent dialog data
                Clnos: [],  //  get clnos
                dialogConfirmType: ''  // confirm type
            }
        },
        async beforeMount() {
            this.Clnos = await this.getClnos()
            this.updateStudentsData()
        },
        methods: {
            // get students
            async getStudents() {
                let data = await this.$axios.get('/student/getStudents')
                if (data.data.code === '001') {
                    data.data.msg.forEach((value, index) => {
                        if (value.Ssex === 'female') {
                            data.data.msg[index].Ssex = '女'
                        }
                        if (value.Ssex === 'male') {
                            data.data.msg[index].Ssex = '男'
                        }
                    })
                    return data.data.msg
                }
            },
            // get classes
            async getClnos() {
                let data = await this.$axios.get('/class/getClno')
                if (data.data.code === '001') {
                    return data.data.msg
                }
            },
            // add student
            async addStudent() {
                this.studentDialogData = {
                    Sno: '',
                    Sname: '',
                    Ssex: '',
                    Sage: null,
                    Clno: ''
                }
                this.dialogConfirmType = 'add'
                this.showAddStudent()
            },
            // add student return
            async addStudentReturn(data) {
                if (data.code !== '001') {
                    this.$message({
                        type: 'error',
                        message: '添加失败'
                    });
                }
                this.updateStudentsData()
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
            },
            // put student
            async updateStudent(data) {
                delete data.Dname
                this.studentDialogData = data
                this.dialogConfirmType = 'update'
                this.showAddStudent()
            },
            // put student return
            async updateStudentReturn(data) {
                if (data.code !== '001') {
                    this.$message({
                        type: 'error',
                        message: '更新失败'
                    });
                }
                this.updateStudentsData()
                this.$message({
                    type: 'success',
                    message: '更新成功!'
                });
            },
            // delete student
            async deleteStudent(data) {
                let result = await this.showConversation('确定删除' + data.Sname + '这名学生的信息么', '删除学生')
                if (!result) {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    return
                }
                result = await this.$axios.delete('/student/delete?Sno=' + data.Sno)
                if (result.data.code !== '001') {
                    this.$message({
                        type: 'error',
                        message: result.data.msg
                    });
                    return
                }
                this.updateStudentsData()
                this.$message({
                    type: 'success',
                    message: result.data.msg
                });
            },
            // update show students
            async updateStudentsData() {
                this.students =  await this.getStudents()
                this.showStudents = this.students
            },
            // 弹出添加学生表单
            showAddStudent() {
                this.studentDialog = true
            },
            // 搜索过滤
            search() {
                if (this.input.toString() === '男') {
                    this.input = 'male'
                } else if (this.input.toString() === '女') {
                    this.input = 'female'
                }
                this.showStudents = this.students.filter(value => value[this.select].toString().includes(this.input.toString()))
            },
            // 清除过滤条件
            clear() {
                this.input = ''
                this.select = '请选择'
                this.showStudents = this.students
            },
            // 弹出对话框
            showConversation(msg, title) {
                return new Promise(resolve => {
                    this.$confirm(msg, title, {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        resolve(true)
                    }).catch(() => {
                        resolve(false)
                    });
                })
            },
            // 弹出信息框
            // showMsg(msg, title) {
            //     return new Promise( resolve => {
            //         this.$alert(msg, title, {
            //             confirmButtonText: '确定',
            //             callback: () => {
            //                 resolve(true)
            //             }
            //         });
            //     })
            // },
            // 更新students数据
        }
    }
</script>

<style scoped>
</style>