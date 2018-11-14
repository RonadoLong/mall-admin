<template>
    <div v-loading="listLoading" class="app-container">

        <el-table :data="userList" border fit highlight-current-row style="width: 100%">

            <el-table-column fixed prop="id" label="NO" align="center" min-width="140">
            </el-table-column>

            <el-table-column prop="name" align="center" label="username">
            </el-table-column>

            <el-table-column align="center" label="pics">
                <template slot-scope="scope">
                    <img :src="scope.row.banner[0]" style="width: 100%"/>
                </template>
            </el-table-column>

            <el-table-column prop="classname" align="center" label="classname">
            </el-table-column>

            <el-table-column prop="email" align="center" label="email">
            </el-table-column>

            <el-table-column prop="state" align="center" label="state">
            </el-table-column>

            <el-table-column prop="city" align="center" label="city">
            </el-table-column>

            <el-table-column align="center" label="createTime" min-width="140">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_at) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="updateTime" min-width="140">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_at) }}</span>
                </template>
            </el-table-column>

            <el-table-column width="100" align="center" prop="status" label="status">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 1 ? 'primary' : 'success'"
                            close-transition>{{handleStatus(scope.row.status)}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="operation" fixed="right" align="center" min-width="140">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" :disabled='scope.row.status !== "1"' icon="el-icon-delete"
                               circle @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 60px;text-align: center">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next"
                    :page-size="pageSize"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>
<script>
    import * as BaseAPI from '../../api/service/service'
    import moment from 'moment'

    export default {
        name: "Service",
        data() {
            return {
                userList: [],
                listLoading: true,
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                BaseAPI.getList(this.currentPage, this.pageSize).then(res => {
                    console.log(res)
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.total = res.data.total;
                        this.userList = res.data.content;
                    }
                })
            },
            updateSkuActive(index, row) {

            },
            handleEdit(index, rows) {

            },
            handleDelete(index, rows) {
                let status = rows.status === "0" ? "1" : "0"
                this.listLoading = true;
                BaseAPI.updateStatus(rows.id, status).then(res => {
                    console.log(res)
                    this.$notify({
                        title: 'success',
                        message: 'update success',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList()
                })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.listLoading = true;
                this.getList();
            },
            handleStatus(status) {

                if (status === "0") {
                    return "NO_PAL"
                }

                if (status === "1") {
                    return "ONLINE"
                }

                if (status === "2") {
                    return "EXPIRE"
                }
            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

