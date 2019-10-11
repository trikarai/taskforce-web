<template>
  <v-container>
    <v-row>
      <v-col md="2">
        <v-btn color="accent" @click="openAddForm">
          <v-icon left>add</v-icon>Option
        </v-btn>
      </v-col>
      <v-col md="4" xs="12">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-col>
      <v-row>
        <!-- {{fieldid}} -->
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          :options.sync="options"
          :server-items-length="dataList.total"
          class="elevation-1"
        >
          <template v-slot:item.action="{item}">
            <v-btn small color="warning" @click="leftAct(item, 'Delete')">
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-row>
    </v-col>

    <!--form option-->
    <v-dialog v-model="dialogForm" width="350" :persistent="true">
      <v-form ref="form" v-model="valid">
        <v-card :loading="tableLoad">
          <v-card-title>
            <p class="text-capitalize">Options</p>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  :disabled="view"
                  label="Name"
                  v-model="params.name"
                  :rules="rulesName"
                  :counter="50"
                  maxlength="50"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  :disabled="view"
                  label="Position"
                  v-model="params.position"
                  :rules="rulesRequired"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <!-- <div class="flex-grow-1"></div> -->
            <v-btn class="mr-1" color="primary" :disabled="!valid" @click="submit">Submit</v-btn>
            <v-btn color="red" @click="dialogForm = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- dialog delete option-->
    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green" @click="deleteOption(leftId)">Yes</v-btn>
          <v-btn color="red" @click="dialogDelete = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  props: ["ass", "fieldid"],
  data() {
    return {
      valid: false,
      dialogDelete: false,
      dialogForm: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      search: "",
      dataList: { total: 0, list: [] },
      tableLoad: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      options: {},
      params: {
        name: "",
        position: ""
      }
    };
  },
  watch: {
    options: "getDataList"
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/tasks/" +
            this.$route.params.taskId +
            "/fields/" +
            this.fieldid +
            "/options?page=" +
            this.options.page +
            "&page_size=" +
            this.options.itemsPerPage,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openAddForm() {
      this.dialogForm = true;
      this.params.name = "";
      this.params.position = "";
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    addData() {
      this.tableLoad = true;
      this.axios
        .post(
          config.baseUri +
            "/tasks/" +
            this.$route.params.taskId +
            "/fields/" +
            this.fieldid +
            "/options",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dialogForm = false;
          this.getDataList();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.name;
      this.leftAction = action;
    },
    deleteOption(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/tasks/" +
            this.$route.params.taskId +
            "/fields/" +
            this.fieldid +
            "/options/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dialogDelete = false;
          this.getDataList();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>