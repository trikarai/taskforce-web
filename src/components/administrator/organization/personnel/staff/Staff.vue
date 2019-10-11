<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- {{authData}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAssign" v-if="!showUser">
          <v-icon left>add</v-icon>
          Assign {{ass}}
        </v-btn>
        <v-btn color="primary" @click="showUser = false" v-if="showUser">
          <v-icon left small>backspace</v-icon>Back
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="!showUser">
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
    </template>

    <v-scale-transition>
      <user-list v-if="showUser" :ass="ass" @refresh="refresh" />
    </v-scale-transition>
    <!-- <organization-form
      v-if="dialogForm"
      :edit="edit"
      :branch="branch"
      :rootData="rootData"
      @close="dialogForm = false"
      @refresh="refresh"
    />-->

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

import UserList from "@/components/administrator/organization/personnel/UserList";

// import OrganizationForm from "./organizationForm";

export default {
  data() {
    return {
      ass: "staffs",
      search: "",
      dataList: { total: 0, list: [] },
      tableLoad: false,
      tableHeaders: [
        { text: "Name", value: "personnel_name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      options: {},
      dialogForm: false,
      dialogDelete: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      showUser: false
    };
  },
  components: {
    UserList
    // OrganizationForm
  },
  watch: {
    options: "getDataList"
  },
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/organizations/" +
            this.$route.params.organizationId +
            "/staffs?page=" +
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
    openAssign() {
      this.showUser = true;
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.personnel_name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/organizations/" +
            this.$route.params.organizationId +
            "/staffs/" +
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
      this.showUser = false;
      this.dialogForm = false;
      this.dialogDelete = false;
      this.getDataList();
    }
  }
};
</script>
