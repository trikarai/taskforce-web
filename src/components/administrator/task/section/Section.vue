<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- {{authData}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add Section
        </v-btn>
      </v-col>
    </v-row>
    <v-fade-transition>
      <v-row>
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
    </v-fade-transition>
    <v-expand-transition>
      <v-row>
        <v-col>
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
        </v-col>
      </v-row>
    </v-expand-transition>

    <section-form v-if="dialogForm" :edit="edit" @close="dialogForm = false" @refresh="refresh" />

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green" @click="deleteAccount(leftId)">Yes</v-btn>
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

import SectionForm from "./sectionForm";

export default {
  data() {
    return {
      search: "",
      dataList: { total: 0, list: [] },
      tableLoad: false,
      tableHeaders: [
        { text: "Position", value: "position", sortable: true },
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      options: {},
      dialogForm: false,
      dialogDelete: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      showSub: false
    };
  },
  components: {
    SectionForm
  },
  created: function() {},
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
            "/sections?page=" +
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
    openAdd() {
      this.edit = false;
      this.dialogForm = true;
    },
    openOption(id) {
      this.leftId = id;
      this.showSub = true;
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/tasks/" +
            this.$route.params.taskId +
            "/sections/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    refresh() {
      this.dialogForm = false;
      this.dialogDelete = false;
      this.getDataList();
    }
  }
};
</script>
