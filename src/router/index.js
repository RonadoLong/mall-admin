import Vue from 'vue'
import Router from 'vue-router'
import Personal from './personal'

Vue.use(Router)


let RouteList = [
    {
        path: '/',
        component: resolve => require(['~/views/Layout/App.vue'], resolve),
        meta: {
            title: 'Home',
            keepAlive: false,
        },
        children: [
            {
                path: '/',
                name: 'Dashboard',
                meta: {
                    title: 'Home',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Home/Main.vue'], resolve),
            },
            // #main
            {
                path: '/main_carousel',
                name: 'MainCarousel',
                meta: {
                    title: 'MainCarousel',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Home/MainCarousel.vue'], resolve),
            },
            {
                path: '/main_nav',
                name: 'MainNav',
                meta: {
                    title: 'MainNav',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Home/MainCat.vue'], resolve),
            },
            // #goods
            {
                path: '/goods_manage',
                name: 'GoodsList',
                meta: {
                    title: 'GoodsList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/goods/Goods.vue'], resolve),
            },
            {
                path: '/class_manage',
                name: 'ClassList',
                meta: {
                    title: 'ClassList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/goods/GoodsClass.vue'], resolve),
            },
            {
                path: '/add_goods',
                name: 'AddGoods',
                meta: {
                    title: 'AddGoods',
                    keepAlive: false
                },
                component: resolve => require(['~/views/goods/AddProduct.vue'], resolve),
            },
            {
                path: '/news_manage',
                name: 'NewsList',
                meta: {
                    title: 'NewsList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/info/News.vue'], resolve),
            },
            {
                path: '/news_class_manage',
                name: 'NewsClassList',
                meta: {
                    title: 'NewsClassList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/info/NewsCategory.vue'], resolve),
            },
            {
                path: '/video_manage',
                name: 'VideoList',
                meta: {
                    title: 'NewsList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/info/Video.vue'], resolve),
            },
            {
                path: '/video_class_manage',
                name: 'VideoClassList',
                meta: {
                    title: 'VideoClassList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/info/VideoCategory.vue'], resolve),
            },
            {
                path: '/service_manage',
                name: 'ServiceList',
                meta: {
                    title: 'ServiceList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/service/Service.vue'], resolve),
            },
            {
                path: '/service_class_manage',
                name: 'ServiceClassList',
                meta: {
                    title: 'ServiceClassList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/service/ServiceClass.vue'], resolve),
            },
            {
                path: '/service_setting_manage',
                name: 'ServiceSetting',
                meta: {
                    title: 'ServiceSetting',
                    keepAlive: false
                },
                component: resolve => require(['~/views/service/ServiceSetting.vue'], resolve),
            },
            {
                path: '/service_Payment_manage',
                name: 'ServicePayment',
                meta: {
                    title: 'ServicePayment',
                    keepAlive: false
                },
                component: resolve => require(['~/views/service/ServicePaymentSetting.vue'], resolve),
            },
            {
                path: '/order_list',
                name: 'OrderList',
                meta: {
                    title: 'OrderList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/order/Order.vue'], resolve),
            },
            {
                path: '/user_list',
                name: 'UserList',
                meta: {
                    title: 'UserList',
                    keepAlive: false
                },
                component: resolve => require(['~/views/user/UserCenter.vue'], resolve),
            },
            {
                path: '/permission_list',
                name: 'PermissionList',
                meta: {
                    title: '权限列表',
                    keepAlive: true
                },
                component: resolve => require(['~/views/PermissionManage/Permission/Index.vue'], resolve),
            },
            //个人中心，可能有修改密码，头像修改等路由
            Personal.index,
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '后台登录',
            keepAlive: false
        },
        components: {
            blank: resolve => require(['~/views/Login/Login.vue'], resolve),
        }
    },

]


RouteList[0].children.push({
    path: '/build_code',
    name: 'BuildCode',
    meta: {
        title: '构建代码',
        keepAlive: true
    },
    component: resolve => require(['~/views/DevelopmentTool/Build.vue'], resolve),
});

export default new Router({routes: RouteList})


