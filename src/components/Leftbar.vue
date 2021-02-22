<template>
  <div
    class="sidebar-left"
    :class="{ 'mini-devide': closeSideLeft }"
    id="sidebar-main"
  >
    <div class="logo">
      <img
        @click="closeSideLeft = !closeSideLeft"
        id="tog-left-bar"
        src="@/assets/icon/icon-left-header.png"
      />
      <a class="logo-img" href="#"><img src="@/assets/icon/logo-text.png"/></a>
    </div>
    <ul>
      <li @click="activate(1)" :class="{ sidebaractive: active_el == 1 }">
        <a href="#">
          <img src="@/assets/icon/icon-left-header.png" />
          <span>Nhân viên</span></a
        >
      </li>
    </ul>
  </div>
</template>
<style>
.sidebar-left a {
  color: #fff;
  text-decoration: none;
}

.sidebar-left {
  width: 200px;
  font-weight: 600;
  border-right: solid 2px #e5e5e5;
  height: 130vh;
  transition: width 1s;
  opacity: 1;
  background-color: #0973b9;
  /* transition-delay: 1s; */
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.logo img {
  height: 21px;
}
.logo {
  padding: 12px 0px 0px 20px;
  display: flex;
}
.sidebar-left ul li {
  list-style: none;
  padding-bottom: 15px;
  padding-left: 20px;
  border-left: 3px solid transparent;
}
.sidebar-left ul li a {
  display: flex;
}
.sidebar-left ul li span {
  position: relative;
  top: 6px;
  opacity: 1;
  display: block;
  /* transition: opacity 10s; */
  animation: fadein 3s ease-out;
}
.sidebar-left img {
  padding-right: 7px;
}
.sidebar-left ul img {
  height: 25px;
  position: relative;
  top: 8px;
}
.sidebar-left ul {
  padding: 0px;
  transition: width 2s;
  padding-top: 10px;
}
.logo > img {
  height: 26px;
  /* position: relative;
  top: 4px; */
  cursor: pointer;
}
.logo > a {
  padding-right: 25px;
}
.sidebar-left ul li:hover {
  background-color: #ff6600;
}
.sidebaractive {
  background-color: #0099ff;
  border-left-color: #6191bb !important;
}
@media screen and (max-width: 600px) {
  .sidebar-left ul li {
    list-style: none;
    padding-bottom: 15px;
    padding-left: 9px;
    width: 48px;
  }
  .sidebar-left ul li a span {
    display: none;
  }
  .logo {
    padding-left: 9px;
  }
}
/* Khi nhan toggle side bar left */

.mini-devide.sidebar-left ul li a span {
  opacity: 0;
  display: none;
  /* transition: opacity 5s; */
}
@keyframes slide-down {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}
.mini-devide {
  width: 71px;
}
.mini-devide .logo-img {
  display: none;
}
/* .mini-devide ul li {
  list-style: none;
  padding-bottom: 15px;
  padding-left: 20px;
  width: 48px;
} */
</style>
<script>
export default {
  data() {
    return {
      closeSideLeft: false,
      active_el: 1,
    };
  },
  methods: {
    activate: function(el) {
      this.active_el = el;
    },
  },
};
</script>
