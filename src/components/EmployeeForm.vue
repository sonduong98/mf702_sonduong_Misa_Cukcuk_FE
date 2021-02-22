<template>
  <div id="app1">
    <v-app id="inspire">
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog
            transition="dialog-top-transition"
            v-model="show"
            width="900"
          >
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on"
                >From the top</v-btn
              >
            </template> -->
            <template v-slot:default="dialog">
              <v-card style="border:solid 4px #0973b9;border-radius:0px">
                <v-toolbar
                  color="#0973b9"
                  style="height: 25px !important;background-color: rgb(9, 115, 185);border-color: rgb(9, 115, 185);padding: 0px;position:relative"
                  dark
                >
                  <div class="title-dialog"><span>Sửa nhân viên</span></div>
                  <div
                    @click="dialog.value = false"
                    style="    position: absolute;right: 0px;top: -8px;right: 8px;font-size: 24px;cursor: pointer;"
                  >
                    <img style="height: 13px;" src="@/assets/icon/cancel.png" />
                  </div>
                </v-toolbar>
                <div
                  class="modal-action"
                  style="height:40px;background-color:#ededed;display:flex"
                >
                  <div @click="show = true">
                    <img src="@/assets/icon/SaveAdd16.png" />
                    <span>Thêm</span>
                  </div>
                  <div>
                    <img src="@/assets/icon/Edit16.png" />
                    <span>Sửa</span>
                  </div>
                  <div @click="saveForm">
                    <img src="@/assets/icon/Save16.png" />
                    <span>Cất</span>
                  </div>
                  <div>
                    <img src="@/assets/icon/icons8-delete-26.png" />
                    <span>Xóa</span>
                  </div>
                  <div>
                    <p class="sprite"></p>
                    <span>Nạp</span>
                  </div>
                </div>
                <div class="form-container">
                  <div class="form">
                    <div class="field">
                      <div class="label">
                        <span>Mã Nhân Viên</span>
                        <span class="required">(*)</span>
                      </div>
                      <div class="input small">
                        <input v-model="EmpObj.employeeCode" />
                      </div>
                      <em class="validate-msg">
                        Dùng làm tên đăng nhập vào hệ thống, có thể sử dụng số
                        điện thoại hoặc email cho dễ nhớ.
                      </em>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Email</span>
                      </div>
                      <div class="input medium">
                        <input v-model="EmpObj.email" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Số Điện Thoại</span>
                      </div>
                      <div class="input medium">
                        <input v-model="EmpObj.phoneNumber" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Họ và tên</span>
                        <span class="required">(*)</span>
                      </div>
                      <div class="input large">
                        <input v-model="EmpObj.fullName" />
                      </div>
                    </div>

                    <div class="field-group">
                      <div class="groupLeft">
                        <div class="field">
                          <div class="label">
                            <span>Giới tính</span>
                          </div>
                          <div class="input large">
                            <!-- <input v-model="EmpObj.Gender" style="display:none" /> -->
                            <select
                              v-model="EmpObj.gender"
                              style="width: 100%;"
                            >
                              <option value="1">{{ formatGender(1) }}</option>
                              <option value="0">{{ formatGender(0) }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="groupRight">
                        <div class="field">
                          <div class="label">
                            <span>Ngày sinh</span>
                          </div>
                          <div class="input large">
                            <input type="date" v-model="EmpObj.dateOfBirth" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="field-group">
                      <div class="groupLeft">
                        <div class="field">
                          <div class="label">
                            <span>Số CMND</span>
                          </div>
                          <div class="input large">
                            <!-- <input v-model="EmpObj.Gender" style="display:none" /> -->
                            <input
                              type="text"
                              v-model="EmpObj.citizenIdentityCode"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="groupRight">
                        <div class="field">
                          <div class="label">
                            <span>Ngày cấp</span>
                          </div>
                          <div class="input large">
                            <input
                              type="date"
                              v-model="EmpObj.citizenIdentityDate"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Nơi cấp CMND</span>
                      </div>
                      <div class="input large">
                        <input v-model="EmpObj.citizenIdentityPlace" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Phân quyền</span>
                        <span class="required">(*)</span>
                      </div>
                      <div class="checkbox">
                        <div class="checkbox-item">
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                            class="input-checkbox"
                          />
                          <label for="vehicle1"
                            >Vai trò Quản trị hệ thống</label
                          >
                        </div>
                        <div class="checkbox-item">
                          <input
                            type="checkbox"
                            id="vehicle2"
                            name="vehicle2"
                            value="Car"
                            class="input-checkbox"
                          />
                          <label for="vehicle2">Vai trò Quản lý chuỗi</label>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Trạng thái</span>
                        <span class="required">(*)</span>
                      </div>
                      <div class="checkbox">
                        <div class="input small">
                          <input v-model="EmpObj.workState" />
                        </div>
                        <div
                          class="checkbox-item"
                          style="    margin-left: 12px;"
                        >
                          <input
                            type="checkbox"
                            id="vehicle2"
                            name="vehicle2"
                            value="Car"
                            class="input-checkbox"
                          />
                          <label for="vehicle2" style="text-align:start"
                            >Cho phép làm việc với phần mềm CUKCUK</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <div class="label"></div>
                      <div
                        class="checkbox-item"
                        style="display:flex;
    align-items: center;
    width: 18%;"
                      >
                        <input
                          type="checkbox"
                          id="vehicle3"
                          name="vehicle3"
                          value="Bike"
                          class="input-checkbox"
                        />
                        <label style="min-width:100px" for="vehicle3"
                          >Đổi mật khẩu</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="avt">
                    <img
                      src="https://cdn2.cukcuk.vn/QLNH/resources/Image/ImageNotFound-3x4.png"
                    />

                    <div class="desc">
                      Chỉ được upload file .jpg, .jpeg, .png, .gif.
                    </div>
                  </div>
                </div>

                <v-card-text style="width:100%"> </v-card-text>

                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      EmpObj: {
        employeeCode: "",
        email: "",
        fullName: "",
        gender: null,
        dateOfBirth: null,
        salary: null,
        phoneNumber: "",
        workState: "",
        citizenIdentityCode: "",
        citizebIdentityPlace: "",
        citizebIdentityDate: null,
      },
    };
  },
  props: ["visible", "obj"],
  watch: {
    obj: async function(newVal) {
      // watch it
      var emp = await axios.get(
        `https://localhost:44382/api/Employee?id=` + newVal
      );

      this.EmpObj = emp.data.data[0];
      console.log(this.EmpObj);
      //console.log(newVal);
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    saveForm: async function() {
      console.log(this.EmpObj);
      const response = await axios({
        method: "post",
        url: "https://localhost:44382/api/Employee",
        data: this.EmpObj, // This is the body part
      });

      return response;
    },
    formatGender(gender) {
      var g = parseInt(gender);
      var genderName =
        g == 1 ? "Nữ" : g == 0 ? "Nam" : g == 2 ? "Khác" : "Không xác định";
      return genderName;
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
  },
};
</script>
<style>
.title-dialog {
  position: relative;
  top: -20px;
  font-size: 13px;
  right: 12px;
}
.sprite {
  background: url("../assets/icon/set-icon.png") no-repeat 0 -2586px;
  width: 16px;
  height: 13px;
}

.sprite {
  background-image: url("/assets/icon/set-icon.png") no-repeat;

  background-position: 0 -2586px;
  width: 16px;
  height: 13px;
}
.modal-action div img {
  height: 20px;
}
.modal-action {
  display: flex;
  padding: 8px;
  height: 40px;
}
.modal-action div {
  display: flex;
  margin-left: 8px;
  padding: 0 4px;
  cursor: pointer;
}
.modal-action div:hover {
  border: solid 1px blue;
}
.modal-action div p {
  margin-top: 3px;
}
.modal-action div span {
  padding-left: 8px;
}
.modal-action :hover {
  background: #fff;
  /* border: 1px solid blue; */
}
div .row {
  margin: 0;
}
#form input {
  border-style: inset;
  width: 100%;
}
.col {
  padding: 4px !important;
}

.form-container {
  display: flex;
  justify-content: flex-between;
  align-items: flex-start;
}

.avt {
  padding-top: 12px;
}

.avt img {
  width: 120px;
  height: 120px;
}

.form {
  padding: 12px;
  width: 100%;
}
.field {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.field em {
  font-size: 12px;
  text-align: start;
  /* padding-right: 8px; */
  padding-left: 8px;
}
.field .label {
  width: 60%;
  max-width: 140px;
  min-width: 100px;
  text-align: left;
  white-space: nowrap;
}
.field input {
  background-color: #fff;
  color: #000;
  padding: 3px 5px 3px !important;
  font: 12px/15px TahomaCustom, arial, sans-serif !important;
  line-height: 22px;
  width: 100%;
  border: solid 1px #e5e5e5;
  /* outline-color: #3892d3 !important; */
  outline-color: #3892d3;
  height: 30px;
}
.field select {
  width: 100%;
  border: 1px solid #e5e5e5;
  outline-color: #3892d3;
  padding: 2px;
}
.required {
  color: red;
}
.input.small {
  width: 40%;
}
.input.medium {
  width: 60%;
}
.input.large {
  width: 100%;
}

.field .checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
label {
  margin: 0px;
}
.field .checkbox .checkbox-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 12px;
}
.checkbox-item label {
  margin: 0px;
}
.field .checkbox .checkbox-item .input-checkbox {
  width: 16px;
  margin-right: 12px;
}
.field .checkbox .checkbox-item .label {
  white-space: nowrap;
}

.field .warning {
  font-size: 11px;
}

.field-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.groupLeft {
  width: 60%;
}
.groupRight {
  width: calc(40% - 5px);
  margin-left: 5px;
}

.groupRight .field .label {
  text-align: center;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
