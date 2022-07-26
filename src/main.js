import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Swipe,SwipeItem, Lazyload,Badge,Sidebar, SidebarItem,Collapse, CollapseItem,Tab, Tabs,Card,Image as VanImage, Tag, Button, Form, Field,SubmitBar,CheckboxGroup,SwipeCell,Stepper,Checkbox,Icon, AddressEdit,AddressList,Popup, Grid, GridItem, PullRefresh,List, Cell, CellGroup  } from 'vant';
import 'vant/lib/index.css';
createApp(App).use(Swipe).use(SwipeItem).use(Lazyload, {loading:require('./assets/image/default.png')}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form).use(Field).use(Checkbox).use(Stepper).use(SwipeCell).use(CheckboxGroup).use(SubmitBar).use(Icon).use(AddressEdit).use(AddressList).use(Popup).use(Grid).use(GridItem).use(PullRefresh).use(List).use(Cell).use(CellGroup).use(store).use(router).mount('#app')
