<template>
  <div class="content">
    <div class="content-header">
      <div class="content-header-left">
        <h4>Danh mục</h4>
        <img src="@/assets/icon/page-next.png" />
        <a href="#">Nhân viên</a>
        <span>Lọc nhanh</span>
        <div style="position:relative">
          <select
            @change="filterEmployee()"
            style="min-width: 140px;"
            v-model="filterWork"
          >
            <option value="0">--Tất cả--</option>
            <option :selected="filterWork" value="1">Đang làm việc</option>
            <option value="2">Chính thức</option>
            <option value="3">Thử việc</option>
            <option value="4">Nghỉ việc</option>
          </select>
          <img
            style="   top: 11px; right: 5px;height: 7px;"
            class="img-toggle-select"
            src="@/assets/icon/hd-pop.png"
          />
        </div>
      </div>
      <div class="content-header-right">
        <button>Quay lại thiết lập ban đầu</button>
        <button><img src="@/assets/icon/viewEmail.png" />Phản hồi</button>
      </div>
    </div>
    <div class="list-emp">
      <table
        class="table table-striped responsive  table-emps"
        style="background-color:#EEEEEE"
      >
        <thead style="border-right: 1px solid #ddd;">
          <tr class="table-action" style="max-width: 100px;">
            <div @click.stop="addItem()">
              <img src="@/assets/icon/SaveAdd16.png" />
              <span>Thêm</span>
            </div>
            <div @click.stop="viewItem(2)">
              <p class="sprite-view"></p>
              <span>Xem</span>
            </div>
            <div @click.stop="editItem(2)">
              <img src="@/assets/icon/Edit16.png" />
              <span>Sửa</span>
            </div>
            <div @click="deleteItem()">
              <img src="@/assets/icon/icons8-delete-26.png" />
              <span>Xóa</span>
            </div>
          </tr>
          <tr>
            <th scope="col">Tên đăng nhập</th>
            <th scope="col">Tên nhân viên</th>
            <th scope="col">Số điện thoai</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
            <th style="    width: 175px;" scope="col">Trang thái làm việc</th>
          </tr>
          <tr>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td style="padding:0px;position:relative" scope="col">
              <select
                @change="filterEmployeeByGender()"
                style="margin:0px !important;;outline:none"
                v-model="filterGender"
                class="select"
              >
                <option value="-1">--Tất cả--</option>
                <option :selected="filterGender" value="1">Nữ</option>
                <option value="0">Nam</option>
              </select>
              <img class="img-toggle-select" src="@/assets/icon/hd-pop.png" />
            </td>
            <td style="padding:0px;position:relative" scope="col">
              <select
                @change="filterEmployee()"
                style="margin:0px !important;outline:none"
                v-model="filterWork"
                class="select"
              >
                <option value="0">--Tất cả--</option>
                <option :selected="filterWork" value="1">Đang làm việc</option>
                <option value="2">Chính thức</option>
                <option value="3">Thử việc</option>
                <option value="4">Nghỉ việc</option>
              </select>
              <img class="img-toggle-select" src="@/assets/icon/hd-pop.png" />
            </td>
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
      @showMessageSuccess="makeToastDelete"
    />
    <EmployeeForm
      :visible="showScheduleForm"
      @close="close"
      :obj="item"
      @loadData="loadData"
      :viewState="setDisableInput"
      :style="{ display: displayNone }"
      :hidePassword="setDisablePasswork"
      :addStateCheckboxPassword="addStateCheckboxPassword"
      :idMax="idMax"
      @showMessageEditSuccess="makeToastEdit"
      @showMessageAddSuccess="makeToastAdd"
      @showMessageAddUnsuccess="makeToastFail"
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
      filterGender: 1,
      itemDelete: Object,
      itemDeleteName: Object,
      setDisableInput: Object,
      setDisablePasswork: Object,
      displayNone: "none",
      addStateCheckboxPassword: true,
      idMax: 0,
      toastCount: 0,
    };
  },
  //get dữ liệu sau khi render html
  async mounted() {
    var d = await axios.get(
      `https://localhost:44382/api/Employee?pageIndex=1&pageSize=100`
    );
    this.listEmploy = d.data;
  },

  methods: {
    //ham bat su kien dong dialog
    close: function() {
      this.showScheduleForm = false;
      this.displayNone = "none";
      this.addStateCheckboxPassword = false;
      this.setDisablePasswork = false;
      this.idMax = 0;
      this.item = -1;
    },
    //Toast thông báo thêm sửa xóa
    makeToastDelete() {
      this.$bvToast.toast("Xóa nhân viên thành công", {
        title: "Xóa nhân viên",
        variant: "success",
        solid: true,
      });
    },
    makeToastAdd() {
      this.$bvToast.toast("Thêm nhân viên thành công", {
        title: "Thêm nhân viên",
        variant: "success",
        solid: true,
      });
    },
    makeToastEdit() {
      this.$bvToast.toast("Chỉnh sửa nhân viên thành công", {
        title: "Sửa nhân viên",
        variant: "success",
        solid: true,
      });
    },
    makeToastFail() {
      this.$bvToast.toast("Thực hiện không thành công", {
        title: "Thông báo",
        variant: "danger",
        solid: true,
      });
    },
    //bắt sự kiện đóng dialog cho dialog confirm
    close1: function() {
      this.displayNone = "none";
      this.showScheduleFormConfirm = false;
    },
    //hàm edit dữ liệu sau khi đã kích chọn bản ghi trên table
    editItem: function() {
      this.item = this.active_el;
      this.showScheduleForm = true;
      this.displayNone = "block";
      this.setDisablePasswork = true;
      this.setDisableInput = false;
      this.addStateCheckboxPassword = false;
      this.idMax = this.listEmploy.data[0].employeeId;
    },
    //hàm click view item
    viewItem: function() {
      this.item = this.active_el;
      this.showScheduleForm = true;
      this.setDisableInput = true;
      this.displayNone = "block";
      this.setDisablePasswork = true;
      this.idMax = this.listEmploy.data[0].employeeId;
    },
    //hàm thêm mới item
    addItem: function() {
      this.showScheduleForm = true;
      this.item = -5;
      this.displayNone = "block";
      this.setDisablePasswork = false;
      this.setDisableInput = false;
      this.addStateCheckboxPassword = true;
      this.idMax = this.listEmploy.data[0].employeeId;
    },
    //lọc nhân viên theo trạng thái công việc
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
    //lọc nhân viên theo giới tính
    filterEmployeeByGender: async function() {
      // var workStatusId = event.target.value;
      console.log(this.filterWork);
      try {
        var employee = await axios.get(
          `https://localhost:44382/api/Employee?gender=${this.filterGender}`
        );
        this.listEmploy = employee.data;
      } catch (error) {
        console.log(error);
      }
    },
    //format giới tính
    formatGender(gender) {
      var g = parseInt(gender);
      var genderName =
        g == 1 ? "Nữ" : g == 0 ? "Nam" : g == 2 ? "Khác" : "Không xác định";
      return genderName;
    },
    //formmat trạng thái công việc
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
    //hàm format ngày tháng
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
    //Xét row đang active trên table,gán id và mã nhân viên cho 2 state
    activate: function(el, nc) {
      this.active_el = el;
      this.itemDeleteName = nc;
    },
    //hàm active khi hover row trên table
    activatehover: function(elhover) {
      this.active_elhover = elhover;
    },
    //hàm sau khi rời chuột khỏi row
    unactivehover: function() {
      this.active_elhover = -1;
    },
    //hàm load lại data khi child component gọi đến
    loadData: async function() {
      var listUpdate = await axios.get(
        `https://localhost:44382/api/Employee?pageIndex=1&pageSize=100`
      );
      this.listEmploy = listUpdate.data;
    },
    //hàm xóa nhân viên theo id active,được gọi sang component comfirm dialog
    deleteItem: function() {
      this.itemDelete = this.active_el;
      console.log(this.itemDelete);
      this.showScheduleFormConfirm = true;
      this.displayNone = "block";
    },
  },
};
</script>
<style scoped>
.img-toggle-select {
  height: 8px;
  right: 10px;
  top: 20px;
  position: absolute;
}
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
table.table-emps select {
  margin: 0px !important;
  height: 47px;
  width: 100%;
  background: #fff;
  /* text-align: center; */
  /* padding-left: 39px; */
  border: 1px solid blue;
  padding-left: 16px;
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
