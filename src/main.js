import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Swipe,SwipeItem, Lazyload,Badge,Sidebar, SidebarItem,Collapse, CollapseItem,Tab, Tabs,Card,Image as VanImage, Tag, Button, Form, Field   } from 'vant';
import 'vant/lib/index.css';
createApp(App).use(Swipe).use(SwipeItem).use(Lazyload, {loading:require('./assets/image/default.png')}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form).use(Field).use(store).use(router).mount('#app')
