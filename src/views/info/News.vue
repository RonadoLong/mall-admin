<template>
    <div class="app-container">

        <el-table :data="userList" v-loading="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column fixed prop="id" label="NO" align="center" width="80">
            </el-table-column>
            <el-table-column prop="title" align="center" label="title" min-width="120">
            </el-table-column>

            <el-table-column align="center" label="avatar">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="height: 40px"/>
                </template>
            </el-table-column>

            <!-- <el-table-column  align="center" label="thumb_url">
              <template slot-scope="scope">
                <img :src="scope.row.thumb_url" style="height: 50px"/>
              </template>
            </el-table-column> -->

            <el-table-column prop="author" align="center" label="author">
            </el-table-column>

            <el-table-column prop="source_type_name" align="center" label="source">
            </el-table-column>

            <el-table-column prop="category" align="center" label="category" width="80">
            </el-table-column>

            <el-table-column align="center" label="createTime" width="155">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="updateTime" width="155">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column width="100" align="center" prop="status" label="status">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === 1 ?'success':'danger'"
                               size="mini"
                               @click="handleUpdateStatus(scope.row)">
                        {{scope.row.status === 1 ?'onLine':'offLine'}}
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column label="operation" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               size="small" circle>

                    </el-button>

                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" icon="el-icon-delete"
                               size="small" circle>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 10px;text-align: center;background-color: white; padding: 10px">
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
    import * as BaseAPI from '../../api/info/info'
    import moment from 'moment'

    export default {
        name: "News",
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
                BaseAPI.getNewsList(this.currentPage, this.pageSize).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.total = res.data.total;
                        this.userList = res.data.content;
                    }
                })
            },

            handleDelete(index, rows) {
                this.$confirm('Danger action, go on delete ?', 'Tip', {
                    confirmButtonText: 'sure',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    BaseAPI.delNews(rows.id).then(res => {
                        this.listLoading = false;
                        if (res.code === 200) {
                            this.getList();
                            this.$notify({
                                title: 'tip',
                                message: 'delete success',
                                type: 'success',
                                duration: 2000
                            })
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel success'
                    });
                });

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.listLoading = true;
                this.getList();
            },
            handleUpdateStatus(row) {
                this.listLoading = true;
                BaseAPI.newsUpdateStatus(row.id).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.getList();
                        this.$notify({
                            title: 'tip',
                            message: 'update success',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })
            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

