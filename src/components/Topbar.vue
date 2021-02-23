<template>
  <div class="topbar">
    <div class="topbar-business-name" style="position:relative">
      <select>
        <option>Nhà Hàng Biển Đông</option>
        <option>Quán thần tiên tỉ tỉ</option>
      </select>
      <img class="img-toggle" src="@/assets/icon/default-small-arrow.png" />
    </div>
    <div class="topbar-user">
      <div style="position:relative">
        <select>
          <option>Tiếng việt(tiếng việt)</option>
        </select>
        <img
          class="img-toggle"
          style="    top: 6px;"
          src="@/assets/icon/default-small-arrow.png"
        />
      </div>

      <a href="#" class="noti"><img src="@/assets/icon/icon-noti-face.png"/></a>
      <a class="support" href="#"><img src="@/assets/icon/ic_support.svg"/></a>

      <a href="#"
        ><img src="@/assets/avatar-default.png" /><span>Nguyễn Sơn Dương</span>
      </a>

      <a href="#"
        ><img style="height: 20px;" src="@/assets/icon/default-small-arrow.png"
      /></a>
    </div>
  </div>
</template>
<style>
.img-toggle {
  height: 20px;
  height: 20px;
  position: absolute;
  top: 17px;
  right: 0px;
}
.topbar a {
  color: #fff;
  text-decoration: none;
}
.topbar-user {
  display: flex;
  align-items: center;
}
.topbar-user a img {
  height: 31px;
  padding-right: 10px;
  padding-left: 10px;
}
.topbar-user a img {
  padding-right: 6px;
  padding-left: 10px;
  margin-bottom: 2px;
}
.topbar-user .support img {
  height: 50px;
  padding: 0;
}
.topbar-user .noti img {
  height: 50px;
  padding: 0;
}
.support :hover {
  background-color: #6699ff;
}
.topbar-user select {
  color: #fff;
  background-color: #005082;
}
/* .topbar-user {
  float: right;
} */
.topbar-business-name {
  padding-top: 10px;
  padding-left: 15px;
}
.topbar-business-name select {
  /* font-family: "fontello"; */
  /* font-size: 17px; */

  color: #fff;
  background-color: #005082;
}

.topbar select {
  border: none;
  outline: none;
  height: 30px;
  min-width: 180px;
  /* padding: 8px; */
  padding-left: 8px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  /* padding: 15px 10px; */
  font-size: 12px;
  font-weight: 600;
  border-bottom: solid 2px #e5e5e5;
  /* height: 58px; */
  background-color: #0973b9;
}
.topbar-user span {
  position: relative;
  top: -1px;
}
.topbar-user a:last-child {
  position: relative;
  top: -1px;
}
</style>
