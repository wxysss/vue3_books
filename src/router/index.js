import {
  createRouter,
  createWebHistory
} from 'vue-router'
import { Store } from 'vuex'

// 首页相关
const Home = () => import('../views/home/Home.vue')
// 分类相关
const Category = () => import('../views/category/Categroy.vue')
const Detil = () => import('../views/detail/Detail.vue')
// 个人中心相关
const Profile = () => import('../views/profile/Profile.vue')
const Address = ()=>import ('../views/profile/Address.vue')
const AddressEdit = ()=>import ('../views/profile/AddressEdit.vue')

const AboutUs = ()=>import ('../views/profile/AboutUs.vue')
// 购物车相关
const ShopCart = () => import('../views/shopcar/ShopCar.vue')
const CreateOrder = ()=>import ('../views/order/CreateOrder.vue')
const Order = ()=>import ('../views/order/Order.vue')
const OrderDetail = ()=>import ('../views/order/OrderDetail.vue')
// 登陆注册相关
const Register = ()=>import ('../views/profile/Register.vue')
const Login = ()=>import ('../views/profile/Login.vue')






import { Notify } from "vant";
import store from '../store'
const routes = [
  // 首页相关
  {
    path: '',
    name: 'home',
    component: Home, // 默认缺省路由
    meta: {
      title: '图书-首页'
    }
  },
  {
    path: '/home',
    name: 'DefaultHome',
    component: Home, // 首页
    meta: {
      title: '图书-首页'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category, // 分类
    meta: {
      title: '图书-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detil',
    component: Detil, // 详情页
    meta: {
      title: '图书-详情页'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile, // 个人中心
    meta: {
      title: '图书-个人中心',
      isAuthRequired:true
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart, // 购物车
    meta: {
      title: '图书-购物车',
      isAuthRequired:true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address, // 地址列表
    meta: {
      title: '图书-地址列表',
      isAuthRequired:true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit, // 地址编辑
    meta: {
      title: '图书-地址编辑',
      isAuthRequired:true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: CreateOrder, // 创建订单
    meta: {
      title: '图书-创建订单',
      isAuthRequired:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order, // 订单
    meta: {
      title: '图书-订单',
      isAuthRequired:true
    }
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: OrderDetail, // 订单详情
    meta: {
      title: '图书-订单详情',
      isAuthRequired:true
    }
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs, // 订单详情
    meta: {
      title: '图书-订单详情',
      isAuthRequired:true
    }
  },
  // 登录注册相关
  {
    path: '/register',
    name: 'Register',
    component: Register, // 注册
    meta: {
      title: '图书-用户注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, // 登录
    meta: {
      title: '图书-用户登录'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // hash: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // 如果没有登录，跳转去login
  if(to.meta.isAuthRequired&&store.state.user.isLogin === false){
    Notify('您还没有登录, 请先登录')
    return next('/login')
  }else{
    next();
  }

  // 控制路由跳转时路径变化和标签页名字
  document.title = to.meta.title
})
export default router