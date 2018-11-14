<template>
    <div v-loading.body="listLoading" class="app-container">

        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="ALL Orders" name="first"></el-tab-pane>
            <el-tab-pane label="Waiting Pay" name="second"></el-tab-pane>
            <el-tab-pane label="Waiting Shipping" name="third"></el-tab-pane>
        </el-tabs>

        <el-table :data="goodsList" border fit highlight-current-row style="width: 100%">

            <el-table-column fixed prop="order_id" label="NO" align="center">
            </el-table-column>

            <el-table-column prop="user_id" align="center" label="user_id">
            </el-table-column>

            <el-table-column prop="username" align="center" label="username">
            </el-table-column>

            <el-table-column prop="userAddress.mobile" align="center" label="mobile">
            </el-table-column>

            <el-table-column prop="total_amount" align="center" label="total_amount">
            </el-table-column>

            <el-table-column prop="really_amount" align="center" label="really_amount">
            </el-table-column>

            <el-table-column width="100" align="center" prop="pay_type" label="pay_type">
                <template slot-scope="scope">
                    <el-tag type='success' close-transition>{{scope.row.pay_type}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="120" align="center" prop="status" label="status">
                <template slot-scope="scope">
                    <el-tag type='primary' close-transition>{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="160" align="center" label="createTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column width="160" align="center" label="updateTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="operation" fixed="right" align="center">
                <template slot-scope="scope">

                    <el-button v-if="status === 2" size="small" type="success"  circle @click="handleEdit(scope.$index, scope.row)">发货</el-button>

                    <el-button v-else size="small" type="success" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button> -->
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
    import * as BaseAPI from '../../api/order/order'
    import moment from 'moment'

    export default {
        name: "Order",
        data() {
            return {
                goodsList: [],
                listLoading: true,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                activeName: "first",
                status: 0,
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                BaseAPI.getList(this.status, this.currentPage, this.pageSize).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.total = res.data.total;
                        this.goodsList = res.data.content;
                    }else {
                        this.total = 0;
                        this.goodsList = [];
                    }
                })
            },
            handleClick(tab, event) {
                console.log(tab, event);
                this.status = Number(tab.index)
                this.getList()
            },
            handleEdit(index, rows) {

            },
            handleDelete(index, rows) {

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.listLoading = true;
                this.getList();
            },
            handleCreate() {

            },
            getOrderStatus(status) {
                console.log(status)
                if (status === 6) {
                    return "无效"
                }
            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>
