<template>
  <div>
    <!-- <template v-for="(item, i) in model">
      <el-submenu
        :index="item.path + ''"
        :key="item.id"
        :class="iscollapse ? 'el_submenu_small': 'el_submenu_large'">
        <template slot="title">
          <i :class="['iconfont', iconlist[i]]"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item
          :index="'/' + subitem.path"
          v-for="subitem in item.children"
          :key="subitem.id">
          <i class="el-icon-menu"></i>
          {{subitem.authName}}
          <Item class="item asdasd" :model="subitem.children"  v-if="subitem.children&&subitem.children.length"></Item>
        </el-menu-item>
      </el-submenu>
    </template> -->
    <template v-for="list in this.model">  
            <el-submenu  v-if="list.children.length>0" :key="list.id" :index="list.path"  > 
              <template slot="title"  style="padding-left:10px" >
                <i class="el-icon-menu"></i>
                <span slot="title">{{ list.authName}}</span>
              </template>
              <Item :model="list.children"></Item> 
            </el-submenu>
            <el-menu-item v-else :index="list.path"  :key="list.id" style="padding-left: 50px;">
              <span>{{list.authName}}</span>
            </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: {
    model: Array
  },
  data: function() {
    return {
      iconlist: [
        "icon-users",
        "icon-tijikongjian",
        "icon-shangpin",
        "icon-danju",
        "icon-baobiao"
      ],
      // 是否被折叠， 默认为 false
      iscollapse: false
    };
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    // toggle: function() {
    //   if (this.isFolder) {
    //     this.open = !this.open;
    //   }
    // }
    // changeType: function() {
    //   if (!this.isFolder) {
    //     Vue.set(this.model, "children", []);
    //     this.addChild();
    //     this.open = true;
    //   }
    // },
    // addChild: function() {
    //   this.model.children.push({
    //     name: "new stuff"
    //   });
    // }
  }
};
</script>

<style>
</style>