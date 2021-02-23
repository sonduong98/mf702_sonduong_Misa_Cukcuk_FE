<template>
  <div id="app1" style="font-size:13px">
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
                  id="action-tool"
                  style="height:28px;background-color:#ededed;display:flex"
                >
                  <v-btn text
                    ><img src="@/assets/icon/SaveAdd16.png" /> Thêm</v-btn
                  >
                  <v-btn text><img src="@/assets/icon/Edit16.png" /> Sửa</v-btn>
                  <v-btn text @click="saveForm"
                    ><img src="@/assets/icon/Save16.png" /> Cất</v-btn
                  >
                  <v-btn text
                    ><img src="@/assets/icon/icons8-delete-26.png" /> Xóa</v-btn
                  >
                  <!-- <div @click="show = true">
                    <img src="@/assets/icon/SaveAdd16.png" />
                    <span>Thêm</span>
                  </div>
                  <div>
                    <img src="@/assets/icon/Edit16.png" />
                    <span>Sửa</span>
                  </div>

                  <v-btn text @click="saveFormm"
                    ><img src="@/assets/icon/Save16.png" /> Cất</v-btn
                  >

                  <div class="v-card__text" @click="saveFormm">
                    <img src="@/assets/icon/icons8-delete-26.png" />
                    <span>Xóa</span>
                  </div>
                  <div>
                    <p class="sprite"></p>
                    <span>Nạp</span>
                  </div> -->
                </div>
                <div class="form-container">
                  <div class="form">
                    <div class="field">
                      <div class="label">
                        <span>Mã Nhân Viên</span>
                        <span class="required"> (*) </span>
                      </div>
                      <div class="input small">
                        <input
                          type="text"
                          :disabled="viewState"
                          :style="{ background: backgroundInput }"
                          v-model="EmpObj.employeeCode"
                        />
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
                        <input
                          type="text"
                          :disabled="viewState"
                          :style="{ background: backgroundInput }"
                          v-model="EmpObj.email"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Số Điện Thoại</span>
                      </div>
                      <div class="input medium">
                        <input
                          type="text"
                          :disabled="viewState"
                          :style="{ background: backgroundInput }"
                          v-model="EmpObj.phoneNumber"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Họ và tên</span>
                        <span class="required"> (*) </span>
                      </div>
                      <div class="input large">
                        <input
                          type="text"
                          :disabled="viewState"
                          :style="{ background: backgroundInput }"
                          v-model="EmpObj.fullName"
                        />
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
                              :style="{ background: backgroundInput }"
                            >
                              <option :disabled="viewState" value="1">{{
                                formatGender(1)
                              }}</option>
                              <option :disabled="viewState" value="0">{{
                                formatGender(0)
                              }}</option>
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
                            <input
                              type="date"
                              :style="{ background: backgroundInput }"
                              :disabled="viewState"
                              v-model="EmpObj.dateOfBirth"
                            />
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
                              :disabled="viewState"
                              :style="{ background: backgroundInput }"
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
                              :style="{ background: backgroundInput }"
                              :disabled="viewState"
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
                        <input
                          type="text"
                          v-model="EmpObj.citizenIdentityPlace"
                          :style="{ background: backgroundInput }"
                          :disabled="viewState"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Phân quyền</span>
                        <span class="required"> (*) </span>
                      </div>
                      <div class="checkbox">
                        <div class="checkbox-item">
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                            class="input-checkbox"
                            :style="{ background: backgroundInput }"
                            :disabled="viewState"
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
                            :style="{ background: backgroundInput }"
                            :disabled="viewState"
                          />
                          <label for="vehicle2">Vai trò Quản lý chuỗi</label>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <div class="label">
                        <span>Trạng thái</span>
                        <span class="required"> (*) </span>
                      </div>
                      <div class="checkbox">
                        <div class="input small">
                          <!-- <input v-model="EmpObj.workState" /> -->
                          <select
                            v-model="EmpObj.workState"
                            :style="{ background: backgroundInput }"
                            :disabled="viewState"
                          >
                            <option :selected="EmpObj.workState" value="1"
                              >Đang làm việc</option
                            >
                            <option value="2">Chính thức</option>
                            <option value="3">Thử việc</option>
                            <option value="4">Nghỉ việc</option>
                          </select>
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
                            :style="{ background: backgroundInput }"
                            :disabled="viewState"
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
                          :style="{ background: backgroundInput }"
                          :disabled="viewState"
                        />
                        <label style="min-width:100px" for="vehicle3"
                          >Đổi mật khẩu</label
                        >
                      </div>
                    </div>
                    <div class="field-group" :style="{ display: displayNone }">
                      <div class="groupLeft">
                        <div class="field">
                          <div class="label">
                            <span>Mật khẩu truy cập</span>
                            <span class="required">(*)</span>
                          </div>
                          <div
                            class="input medium warning-input"
                            style="    margin-right: 24px;position:relative"
                          >
                            <!-- <input v-model="EmpObj.Gender" style="display:none" /> -->
                            <input
                              id="password-field"
                              v-model="EmpObj.passWord"
                              :type="value ? 'password' : 'text'"
                            />

                            <p
                              class="sprite-eye toggle-password"
                              @click="value = !value"
                            ></p>
                            <img src="@/assets/icon/exclamation.png" />
                          </div>
                        </div>
                      </div>
                      <div class="groupRight" style="width: calc(53% - 5px);">
                        <div class="field">
                          <div class="label">
                            <span>Xác nhận MK</span>
                            <span class="required">(*)</span>
                          </div>
                          <div
                            class="input medium warning-input"
                            style="position:relative"
                          >
                            <input :type="valuecf ? 'password' : 'text'" />
                            <p
                              class="sprite-eye-cf toggle-password"
                              @click="valuecf = !valuecf"
                            ></p>
                            <img src="@/assets/icon/exclamation.png" />
                          </div>
                        </div>
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
        employeeId: null,
        employeeCode: "",
        email: "",
        fullName: "",
        gender: 1,
        dateOfBirth: null,
        salary: null,
        phoneNumber: "",
        workState: 1,
        citizenIdentityCode: "",
        citizebIdentityPlace: "",
        citizebIdentityDate: null,
      },
      value: true,
      valuecf: true,
      stateAdd: false,
      stateEdit: false,
      stateView: false,
      displayNone: "flex",
      backgroundInput: "#f2f2f2",
      password: "",
    };
  },
  props: ["visible", "obj", "viewState", "hidePassword"],
  watch: {
    obj: async function(newVal) {
      // watch it
      if (newVal > 0) {
        var emp = await axios.get(
          `https://localhost:44382/api/Employee?id=` + newVal
        );

        this.EmpObj = emp.data.data[0];
        //this.EmpObj.dateOfBirth = this.formatDate(emp.data.data[0].dateOfBirth);
      } else {
        this.setStateDefaul();
      }

      console.log(this.EmpObj);
      //console.log(newVal);
    },
    viewState: function(newVal) {
      if (newVal == true) {
        this.backgroundInput = "#f2f2f2";
      } else {
        this.backgroundInput = "#fff";
      }
    },
    hidePassword: function(newVal) {
      if (newVal == true) {
        this.displayNone = "none";
      } else {
        this.displayNone = "flex";
      }
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
    loadData: function() {
      this.$emit("loadData");
    },
    saveForm: function() {
      //lưu chỉnh sửa

      if (this.obj > 0) {
        this.EmpObj.employeeId = this.obj;

        axios({
          method: "put",
          url: "https://localhost:44382/api/Employee",
          data: this.EmpObj, // This is the body part
        }).then(() => {
          this.show = false;
          this.loadData();
        });
      } else {
        //thêm bản ghi mới
        axios({
          method: "post",
          url: "https://localhost:44382/api/Employee",
          data: this.EmpObj, // This is the body part
        }).then(() => {
          this.show = false;
          this.loadData();
        });
      }
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
    setStateDefaul() {
      this.EmpObj.employeeCode = "";
      this.EmpObj.email = "";
      this.EmpObj.fullName = "";
      this.EmpObj.gender = 1;
      this.EmpObj.dateOfBirth = null;
      this.EmpObj.salary = null;
      this.EmpObj.phoneNumber = "";
      this.EmpObj.workState = 1;
      this.EmpObj.citizenIdentityCode = "";
      this.EmpObj.citizebIdentityPlace = "";
      this.EmpObj.citizebIdentityDate = null;
      this.EmpObj.passWord = "";
    },
  },
};
</script>
<style>
.warning-input img {
  position: absolute;
  top: 4px;
  /* left: 4px; */
  right: -24px;
  height: 20px;
}
.toggle-password {
  position: absolute;
  right: 4px;
  top: 9px;
  cursor: pointer;
}
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
.sprite-eye {
  background: url("../assets/icon/set-icon.png") no-repeat 0 -2602px;
  width: 16px;
  height: 12px;
}
.sprite-eye-cf {
  background: url("../assets/icon/set-icon.png") no-repeat 0 -2602px;
  width: 16px;
  height: 12px;
}

.sprite {
  background-image: url("/assets/icon/set-icon.png") no-repeat;

  background-position: 0 -2586px;
  width: 16px;
  height: 13px;
}
.modal-action button span img {
  height: 13px;
  padding-right: 4px;
}
.modal-action {
  display: flex;
  padding: 8px;
}

#action-tool button {
  min-width: 64px;
  padding: 0 2px !important;
  position: relative;
  top: -11px;
}
/* .modal-action button :hover{
  border: solid 1px blue;
} */
.modal-action button span {
  display: flex;
  margin-left: 8px;
  padding: 0 4px;
  cursor: pointer;
  font-size: 12px;
}
/* .modal-action button :hover {
  background: #fff;
} */
/* .modal-action :hover {
  background: #fff;
  /* border: 1px solid blue;} */

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
  width: 66%;
  max-width: 150px;
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
