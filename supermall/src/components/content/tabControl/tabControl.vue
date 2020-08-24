<template>
  <div class="tab-control"  >
    <div class="tab-control-item" 
          v-for="(item,index) in titles" :key = 'index'
          :class ="{active : index === currentIndex}"
          @click = 'tabClick(index)'
    ><span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name : 'TabControl',
  props : {
    titles : {
      type : Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex : 0,
    }
  },
  methods : {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index);
    },
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    height: 40px;
    background-color: #fff;
    font-size: 15px;
    line-height: 40px;
    text-align : center;
  }
  .tab-control-item {
    flex : 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active > span {
    padding : 5px;
    border-bottom :3px solid var(--color-high-text);
  }
</style>