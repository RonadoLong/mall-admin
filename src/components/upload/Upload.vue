<template>
    <el-upload v-loading="loading"
               action="//up-na0.qiniup.com"
               :data="form"
               drag
               :multiple="false"
               :on-success="handleAvatarSuccess"
               :show-file-list="false"
               :before-upload="beforeUpload">
        <div >
            <img v-if="img_url" :src="img_url" class="avatar"/>
            <div class="el-icon-upload"><em>Click Upload</em></div>
        </div>
    </el-upload>
</template>


<script>
    import {getToken} from '../../api/qiniu'

    // 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk
    const host = "http://p28bmumza.bkt.gdipper.com/";

    export default {
        props: {
            img_url: "",
            isSmall: true
        },
        data() {
            return {
                form: {
                    token: '',
                    key: ''
                },
                fileList: [],
                loading: false
            }
        },
        methods: {
            beforeUpload(file) {
                console.log(file)
                this.loading = true
                return new Promise((resolve, reject) => {
                    getToken().then(response => {
                        console.log(response)
                        this.form = {
                            key: response.data.key,
                            token: response.data.token
                        }
                        resolve(true)
                    }).catch(err => {
                        console.log(err)
                        reject(false)
                    })
                })
            },

            handleAvatarSuccess(res, file, fileList) {
                this.loading = false
                console.log(res)
                let image_uri = host + res.key
                this.$emit("uploadSuccess", image_uri)
            },
        }
    }
</script>


<style scoped>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 160px !important;
        width: 160px !important;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar {
        display: block;
        text-align: center;
        margin: 0 auto;
        padding-top: 40px;
    }
    .el-upload-dragger {
        line-height: 180px !important;
        width: 325px !important;
    }
    .el-icon-upload {
        font-size: 20px;
        color: rgba(20, 19, 20, 0.88);
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 0;
    }



</style>
