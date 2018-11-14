<template>
  <div>
    <el-table :data="goods" border align="center" style="width: 90%; text-align: center">

      <el-table-column fixed align="center" prop="memberPrice" label="MemberPrice" >
        <template slot-scope="scope">
          <el-input class="edit-input" size="small" v-model="scope.row.member_price"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="price" label="Price" >
        <template slot-scope="scope">
          <el-input class="edit-input" size="small" v-model="scope.row.price"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="stockNumber" label="StockNumber" >
        <template slot-scope="scope">
          <el-input class="edit-input" size="small" v-model="scope.row.stock"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="commission" label="Commission" >
        <template slot-scope="scope">
          <el-input class="edit-input" size="small" v-model="scope.row.commission"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="integral" label="Integral" >
        <template slot-scope="scope">
          <el-input class="edit-input" size="small" v-model="scope.row.integral"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="status" width="100px" prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === false ? 'warning':'success'">{{scope.row.status === false ? "offline":"online"}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="status" label="Operation" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="updateSkuStatus(scope.$index, scope.row)">{{scope.row.status === false ? "offline":"online"}}</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    export default {
      props: {
        dialogFormVisible: Boolean,
        goods: Object,
        dialogStatus: String,
      },
      name: 'goods-property',
      data () {
        return{
        }
      },
      methods:{
        handleClose(tag){
        },
        updateSkuStatus(index, row){
          console.log(index, row);
          this.$emit('updateSkuStatus', index)
        },

      }
    }
</script>

<style scoped>


</style>
