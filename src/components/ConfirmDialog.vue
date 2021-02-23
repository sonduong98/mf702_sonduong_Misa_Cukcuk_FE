<template>
  <div id="app2">
    <v-app id="inspire">
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="showConfirm"
          >
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar style="height: 25px" color="primary" dark
                  ><div class="title-dialog">
                    <span>CUKCUK-Quản lý nhà hàng</span>
                  </div></v-toolbar
                >

                <p
                  style="font-size: 16px;
                    margin: 24px;"
                >
                  Bạn có chắc chắn muốn xóa Nhân viên '{{ name }}' không?
                </p>

                <v-card-actions class="justify-end">
                  <v-btn text @click="deleteItem()">Có</v-btn>
                  <v-btn text @click="dialog.value = false">Không</v-btn>
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
  props: ["visibleConfirm", "item", "name"],

  computed: {
    showConfirm: {
      get() {
        return this.visibleConfirm;
      },
      set(value) {
        if (!value) {
          this.$emit("close1");
        }
      },
    },
  },
  methods: {
    loadData: function() {
      this.$emit("loadData");
    },
    deleteItem: async function() {
      await axios
        .delete(`https://localhost:44382/api/Employee?id=${this.item}`)
        .then(() => {
          this.showConfirm = false;
          this.loadData();
        });
      //   var listUpdate = await axios.get(
      //     `https://localhost:44382/api/Employee?pageIndex=1&pageSize=50`
      //   );
      //   this.listEmploy = listUpdate.data;
      //   }
    },
  },
};
</script>
