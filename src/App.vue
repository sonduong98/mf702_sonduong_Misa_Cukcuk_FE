<template>
  <div id="app">
    <div>
      <Leftbar />
    </div>
    <div style="width:100%">
      <Topbar />
      <Employee />
    </div>
  </div>
</template>

<script>
import Employee from "./components/Employee.vue";
import Topbar from "./components/Topbar.vue";
import Leftbar from "./components/Leftbar.vue";
// import EmployeeForm from "./components/EmployeeForm.vue";

export default {
  name: "App",
  components: {
    Employee,
    Topbar,
    Leftbar,
    // EmployeeForm,
  },
};
</script>

<style>
@font-face {
  font-family: Tahoma_Regular;
  src: url(/assets/font/Tahoma_Regular.woff);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
body {
  margin: 0px;
  font-family: Tahoma_Regular;
  font-size: 13px;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  color: #fff !important;
  text-decoration: none;
}
</style>
