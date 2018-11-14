<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="dataForm" :model="temp"
             label-position="left" label-width="130px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="title" prop="title">
        <el-input v-model="temp.title"></el-input>
      </el-form-item>

        <el-form-item label="en_title" prop="en_title">
        <el-input v-model="temp.en_title"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">Sure</el-button>
      <el-button v-else type="primary" @click="updateData">Sure</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getTreeList} from '../../api/goods/goods'

  export default {
    props: {
      dialogFormVisible: Boolean,
      temp: Object,
      dialogStatus: String,
      goodsClassTreeList: Array
    },
    name: 'SaveGoodsClass',
    data(){
      return {
        parentId: null,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          title: [{ required: true, message: 'title is required', trigger: 'blur' }],
          en_title: [{ required: true, message: 'en_title is required', trigger: 'blur' }],
        },
      }
    },
    computed(){
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    methods: {
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$emit('addGoodsClass', this.temp)
          }
        })
      },
      updateData() {
        const tempData = Object.assign({}, this.temp)
        console.log(this.parentId);
        tempData.parentId = this.parentId;

        this.$emit('updateGoodsClass', tempData)

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {

          }
        })
      },
      handleItemChange(val) {
        console.log(this.temp.id);
        console.log(val);

        let parentId = val[val.length - 1];
        if (this.temp.id === parentId){
          this.$notify({
            title: 'fail operation',
            message: 'not allow operation',
            type: 'error',
            duration: 2000
          })
          return;
        }

        this.parentId = parentId;

      }
    }
  }
</script>

<style scoped>

</style>
