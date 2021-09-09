<template>
  <div>
    <sidebar-menu
        width="250px"
        :menu="menu"
        :collapsed="collapsed"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
    />
    <div
        v-if="isOnMobile && !collapsed"
        class="sidebar-overlay"
        @click="collapsed = true"
    />
  </div>
</template>
<script lang="ts">
import '@fortawesome/fontawesome-free/js/all.js';
import { Component, Vue, Watch } from 'vue-property-decorator';

function addToList (list: string[], item: string) {
  if (list.findIndex(v => v === item) < 0) {
    list.push(item);
  }
}
function removeFromList (list: string[], item: string) {
  const index = list.findIndex(v => v === item);
  if (index >= 0) {
    list.splice(index, 1);
  }
}

@Component({})
export default class Main extends Vue {
  public refRootMain!: HTMLElement | null;
  public collapsed = false;
  public isOnMobile = false;

  public isLogon = false;

  mounted () {
    this.refRootMain = document.getElementById('root_main');
    this.onResize();
    window.addEventListener('resize', this.onResize);
    this.updateLogon();
  }

  onToggleCollapse (collapsed: boolean) {
    console.log(collapsed);
    this.collapsed = collapsed;
  }

  onResize () {
    if (window.innerWidth <= 767) {
      this.isOnMobile = true;
      this.collapsed = true;
    } else {
      this.isOnMobile = false;
      this.collapsed = false;
    }
  }

  @Watch('collapsed')
  @Watch('isOnMobile')
  public onChanged () {
    if (this.refRootMain) {
      const classList: string[] = [];
      classList.push(...this.refRootMain.classList);
      if (this.collapsed) addToList(classList, 'collapsed');
      else removeFromList(classList, 'collapsed');
      if (this.isOnMobile) addToList(classList, 'onmobile');
      else removeFromList(classList, 'onmobile');
      this.refRootMain.className = classList.join(' ');
    }
  }

  public updateLogon () {
    const autoToken = window.sessionStorage.getItem('auth_token');
    if (autoToken) {
      this.isLogon = true;
    } else {
      this.isLogon = false;
    }
  }

  public get menu (): any[] {
    const items: any[] = [
      {
        header: 'Main Navigation',
        hiddenOnCollapse: true
      }
    ];
    items.push(this.isLogon ? {
      href: '/dashboard',
      title: 'Dashboard',
      icon: 'fa fa-user'
    } : {
      href: '/login',
      title: 'Login',
      icon: 'fa fa-user'
    });
    if (this.isLogon) {
      items.push({
        href: '/account',
        title: '내 계정',
        icon: 'fa fa-user'
      });
    }
    return items;
  }
}
</script>
<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}
#root_main {
  padding-left: 280px;
  transition: 0.3s ease;
}
#root_main.collapsed {
  padding-left: 50px;
}
#root_main.onmobile {
  padding-left: 50px;
}
</style>
<style lang="scss" scoped>
.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}
</style>
