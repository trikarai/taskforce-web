<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- {{authData}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add Territory
        </v-btn>
      </v-col>
    </v-row>
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
            <v-btn small color="accent" class="mr-1" @click="openAddBranch(item)">
              <v-icon small left>account_tree</v-icon>Add Branch
            </v-btn>
            <v-btn small color="warning" @click="leftAct(item, 'Delete')">
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.maintainer="{item}">
            <v-btn small color="accent" class="mr-1" @click="gotoMaintainer(item.id)">
              <v-icon small left>build</v-icon>Maintainer
            </v-btn>
            <v-btn small color="accent" class="mr-1" @click="gotoClient(item.id)">
              <v-icon small left>contacts</v-icon>Client
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <territory-form
      v-if="dialogForm"
      :edit="edit"
      :branch="branch"
      :rootData="rootData"
      @close="dialogForm = false"
      @refresh="refresh"
    />

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

import TerritoryForm from "./territoryForm";

export default {
  data() {
    return {
      search: "",
      dataList: { total: 0, list: [] },
      tableLoad: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        {
          text: "Maintainer",
          value: "maintainer",
          sortable: false,
          align: "right"
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      options: {},
      dialogForm: false,
      dialogDelete: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      branch: false,
      rootData: ""
    };
  },
  components: {
    TerritoryForm
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
            "/teritories?page=" +
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
      this.branch = false;
      this.dialogForm = true;
    },
    openAddBranch(root) {
      this.edit = false;
      this.branch = true;
      this.rootData = root;
      this.dialogForm = true;
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
        .delete(config.baseUri + "/teritories/" + id, {
          headers: auth.getAuthHeader()
        })
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
    },
    gotoMaintainer(id) {
      this.$router.push({ path: "/admin/territory/" + id + "/maintainer" });
    },
    gotoClient(id) {
      this.$router.push({ path: "/admin/territory/" + id + "/client" });
    }
  }
};
</script>
