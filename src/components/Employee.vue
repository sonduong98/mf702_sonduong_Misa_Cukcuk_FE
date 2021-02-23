<template>
  <div class="content">
    <!-- <div class="content-title" id="customer">
      <p style="    font-size: 22px;"><strong>Danh sách khách hàng</strong></p>
      <a href="#" @click="show = true">
        <img src="@/assets/add.png" />
        <span>Thêm khách hàng</span>
      </a>
    </div>
    <div class="content-search">
      <div class="input-search">
        <img src="@/assets/search.png" />
        <input placeholder="Tìm kiếm theo mã,tên khách hàng" />
      </div>
      <div class="reset">
        <a href="#"><img src="@/assets/refresh.png"/></a>
      </div>
    </div> -->
    <div class="content-header">
      <div class="content-header-left">
        <h4>Danh mục</h4>
        <img src="@/assets/icon/page-next.png" />
        <a href="#">Nhân viên</a>
        <span>Lọc nhanh</span>
        <select @change="filterEmployee()" v-model="filterWork">
          <option value="0">--Tất cả--</option>
          <option :selected="filterWork" value="1">Đang làm việc</option>
          <option value="2">Chính thức</option>
          <option value="3">Thử việc</option>
          <option value="4">Nghỉ việc</option>
        </select>
      </div>
      <div class="content-header-right">
        <button>Quay lại thiết lập ban đầu</button>
        <button><img src="@/assets/icon/viewEmail.png" />Phản hồi</button>
      </div>
    </div>
    <div class="list-emp">
      <table class="table table-striped" style="background-color:#EEEEEE">
        <thead style="border-right: 1px solid #ddd;">
          <tr class="table-action" style="max-width: 200px;">
            <!-- <div @click="show = true"> -->

            <div @click.stop="addItem()">
              <img src="@/assets/icon/SaveAdd16.png" />
              <span>Thêm</span>
            </div>
            <div @click.stop="viewItem(2)">
              <p class="sprite-view"></p>
              <span>Xem</span>
            </div>
            <!-- <div>
              <p class="sprite-coppy"></p>
              <span>Nhân bản</span>
            </div> -->
            <div @click.stop="editItem(2)">
              <img src="@/assets/icon/Edit16.png" />
              <span>Sửa</span>
            </div>
            <div @click="deleteItem()">
              <img src="@/assets/icon/icons8-delete-26.png" />
              <span>Xóa</span>
            </div>
            <!-- <div>
              <p class="sprite"></p>
              <span>Nạp</span>
            </div> -->
          </tr>
          <tr>
            <th scope="col">Tên đăng nhập</th>
            <th scope="col">Tên nhân viên</th>
            <th scope="col">Số điện thoai</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Trang thái làm việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="emp-items"
            v-for="(item, index) in listEmploy.data"
            @dblclick.stop="viewItem(item.employeeId)"
            :key="index"
            @click="activate(item.employeeId, item.employeeCode)"
            :class="{
              sidebaractive: active_el == item.employeeId,
              sidebaractivehover: active_elhover == item.employeeId,
            }"
            @mouseover="activatehover(item.employeeId)"
            @mouseleave="unactivehover"
          >
            <td>{{ item.employeeCode }}</td>
            <td>{{ item.fullName }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ formatDate(item.dateOfBirth) }}</td>
            <td>{{ formatGender(item.gender) }}</td>
            <td>{{ formatWorkState(item.workState) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ConfirmDialog
      :visibleConfirm="showScheduleFormConfirm"
      @close1="close1"
      :item="itemDelete"
      :name="itemDeleteName"
      @loadData="loadData"
      :style="{ display: displayNone }"
    />
    <EmployeeForm
      :visible="showScheduleForm"
      @close="close"
      :obj="item"
      @loadData="loadData"
      :viewState="setDisableInput"
      :style="{ display: displayNone }"
      :hidePassword="setDisablePasswork"
    />
  </div>
</template>
<script>
import axios from "axios";
import EmployeeForm from "./EmployeeForm.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
export default {
  components: {
    EmployeeForm,
    ConfirmDialog,
  },
  data() {
    return {
      showScheduleForm: false,
      showScheduleFormConfirm: false,
      listEmploy: [],
      item: Object,
      active_el: -1,
      active_elhover: -1,
      filterWork: 1,
      itemDelete: Object,
      itemDeleteName: Object,
      setDisableInput: Object,
      setDisablePasswork: Object,
      displayNone: "none",
    };
  },
  async mounted() {
    var d = await axios.get(
      `https://localhost:44382/api/Employee?pageIndex=1&pageSize=100`
    );
    this.listEmploy = d.data;
  },

  methods: {
    close: function() {
      this.showScheduleForm = false;
      this.displayNone = "none";
    },
    close1: function() {
      this.displayNone = "none";
      this.showScheduleFormConfirm = false;
    },
    editItem: function() {
      this.item = this.active_el;
      this.showScheduleForm = true;
      this.displayNone = "block";
      this.setDisablePasswork = false;
      this.setDisableInput = false;
    },
    viewItem: function() {
      this.item = this.active_el;
      this.showScheduleForm = true;
      this.setDisableInput = true;
      this.displayNone = "block";
      this.setDisablePasswork = true;
    },
    addItem: function() {
      this.showScheduleForm = true;
      this.item = -5;
      this.displayNone = "block";
      this.setDisablePasswork = false;
      this.setDisableInput = false;
    },
    filterEmployee: async function() {
      // var workStatusId = event.target.value;
      console.log(this.filterWork);
      try {
        var employee = await axios.get(
          `https://localhost:44382/api/Employee?workState=${this.filterWork}`
        );
        this.listEmploy = employee.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatGender(gender) {
      var g = parseInt(gender);
      var genderName =
        g == 1 ? "Nữ" : g == 0 ? "Nam" : g == 2 ? "Khác" : "Không xác định";
      return genderName;
    },
    formatWorkState(wsid) {
      var g = parseInt(wsid);
      var workStateName =
        g == 1
          ? "Đang Làm việc"
          : g == 2
          ? "Chính thức"
          : g == 3
          ? "Thử việc"
          : g == 4
          ? "Nghỉ việc"
          : "Không xác định";
      return workStateName;
    },
    /**
     *Hàm định dạng lại ngày sinh
     * @param {string} d
     *
     */
    formatDate(d) {
      var date = new Date(d);
      var day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
      var month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      var year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    activate: function(el, nc) {
      this.active_el = el;
      this.itemDeleteName = nc;
    },
    activatehover: function(elhover) {
      this.active_elhover = elhover;
    },
    unactivehover: function() {
      this.active_elhover = -1;
    },
    loadData: async function() {
      var listUpdate = await axios.get(
        `https://localhost:44382/api/Employee?pageIndex=1&pageSize=100`
      );
      this.listEmploy = listUpdate.data;
    },
    deleteItem: function() {
      this.itemDelete = this.active_el;
      console.log(this.itemDelete);
      this.showScheduleFormConfirm = true;
      this.displayNone = "block";

      // this.deleteItem = this.listEmploy.find(
      //   (item) => item.employeeId === this.active_el
      // );

      // console.log(`https://localhost:44382/api/Employee?id=${this.active_el}`);

      // await axios.delete(
      //   `https://localhost:44382/api/Employee?id=${this.active_el}`,
      //   {
      //     id: this.active_el,
      //   }
      // );
      // var listUpdate = await axios.get(
      //   `https://localhost:44382/api/Employee?pageIndex=1&pageSize=50`
      // );
      // this.listEmploy = listUpdate.data;
    },
  },
};
</script>
<style scoped>
.sidebaractive {
  background-color: #c1ddf1 !important;
}
.sidebaractivehover {
  background-color: #c1ddf1 !important;
}
.sprite {
  background: url("../assets/icon/set-icon.png") no-repeat 0 -2586px;
  width: 16px;
  height: 13px;
}
.sprite-view {
  background: url("../assets/icon/set-icon.png") no-repeat -1px -705px;
  width: 14px;
  height: 14px;
}
.sprite-coppy {
  background: url("../assets/icon/set-icon.png") no-repeat -1px -1888px;
  width: 14px;
  height: 15px;
}
.list-emp td,
th {
  border: 1px solid #ddd;
}
.list-emp th {
  text-align: center;
}
.list-emp {
  margin: 0px 8px;
}
.sprite {
  background-image: url("/assets/icon/set-icon.png") no-repeat;

  background-position: 0 -2586px;
  width: 16px;
  height: 13px;
}
.table-action div img {
  height: 20px;
  padding-top: 5px;
}
.table-action {
  display: flex;
  padding: 8px;
  height: 40px;
}
.table-action div {
  display: flex;
  margin-left: 8px;
  padding: 0 4px;
  cursor: pointer;
}

.table-action div p {
  margin-top: 3px;
}
.table-action div span {
  padding-left: 8px;
}
.table-action :hover {
  background: #fff;
  /* border: 1px solid blue; */
}
.content {
  color: #333;
}
.content-header-right button {
  margin: 4px 4px;
  border: 1px solid #e5e5e5;
  padding: 2px;
}
.content-title {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
}
.content-header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
}
.content-header-left {
  display: flex;
}
.content-header-left img {
  height: 20px;
  margin: 6px;
}
.content-header-left span,
select {
  margin: 6px;
}
.content-header-left select {
  border: 1px solid #e5e5e5;
  outline: none;
  min-width: 120px;
  /* padding: 8px; */
  padding-left: 8px;
}

.content-header-left a {
  color: blue !important;
  margin: 6px;
}
#customer.content-title a {
  background-color: #019160;
  height: 38px;
  border-radius: 3px;
  color: #fff;
  padding: 8px 11px;
  margin-top: 13px;
}
.content-title a img {
  position: relative;
  top: -2px;
}
.content-search {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  padding-bottom: 19px;
}
.input-search {
  height: 37px;
  position: relative;
  /* width: 21%; */
  width: 200px;
  border: solid 1px #bbbbbb;
  border-radius: 4px;
}
.input-search img {
  position: absolute;
  height: 18px;
  top: 8px;
  left: 7px;
}
.input-search input {
  outline: none;
  border: none;
  height: 34px;
  padding-top: 2px;
  width: 100%;
  padding-left: 30px;
}
.reset {
  height: 31px;
  width: 40px;
  border: solid 1px #bbbbbb;
  border-radius: 4px;
  position: relative;
}
.reset img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content-list table {
  text-align: center;
  border-right: 5px solid #e5e5e5;
  border-bottom: 5px solid #777777;
}
.content-list {
  padding: 0 13px;
}
/* Phan trang */
.paging li {
  list-style: none;
}
.paging {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
}
.paging ul {
  display: flex;
}
.paging-number {
  height: 30px;
  border: solid 1px #e8e8e8;
  /* height: 37px; */
  width: 28px;
  /* display: inline-block; */
  /* padding: 0px 6px; */
  margin: 0px 5px;
  text-align: center;
  border-radius: 50%;
  padding-top: 4px;
  background: #e5e5e5;
  position: relative;
  top: -3px;
}
.paging-active {
  background: #019160;
  color: #fff;
}
</style>
