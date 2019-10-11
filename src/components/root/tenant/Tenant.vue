<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- {{authData.data.id}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add tenant
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" xs="12">
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{item}">
            <v-btn class="mr-2" small color="primary" @click="openDetail(item.id)">
              <v-icon small>zoom_in</v-icon>
            </v-btn>
            <v-btn class="mr-2" small color="accent" @click="openName(item.id)">
              <v-icon small>edit</v-icon>
            </v-btn>
            <v-btn small color="warning" @click="openDate(item.id)">
              <v-icon small>today</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <tenant-form v-if="dialogForm" :edit="edit" @close="dialogForm = false" @refresh="refresh" />

    <v-dialog v-model="dialogDetail" width="300">
      <v-card :loading="tableLoad">
        <v-card-title>{{dataSingle.code}}</v-card-title>
        <v-card-text>{{dataSingle}}</v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogName" width="300">
      <v-form ref="form1" v-model="valid1">
        <v-card :loading="tableLoad">
          <!-- <v-card-title>{{dataSingle.name}}</v-card-title> -->
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  label="Name"
                  v-model="dataSingle.name"
                  :rules="rulesName"
                  counter="100"
                  maxlength="100"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="changeAct"
              :loading="tableLoad"
              :disabled="!valid1"
              color="primary"
            >{{$vuetify.lang.t('$vuetify.action.update')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="dialogDate" width="300">
      <v-form ref="form2" v-model="valid2">
        <v-card :loading="tableLoad">
          <v-card-title>{{dataSingle.name}}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dataSingle.valid_until"
                      label="Valid Until"
                      prepend-icon="event"
                      :rules="rulesRequired"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dataSingle.valid_until" no-title scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save()">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="renewAct"
              :loading="tableLoad"
              :disabled="!valid2"
              color="primary"
            >{{$vuetify.lang.t('$vuetify.action.update')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

import { validationMixins } from "@/mixins/validationMixins";

import TenantForm from "./tenantForm";

export default {
  mixins: [validationMixins],
  data() {
    return {
      valid1: false,
      valid2: false,
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: {
        id: "",
        code: "",
        name: "",
        valid_until: "1900-01-01 00:00:00",
        subscribed_time: "1900-01-01 00:00:00"
      },
      tableLoad: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDetail: false,
      dialogName: false,
      dialogDate: false,
      dialogDelete: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: ""
    };
  },
  components: {
    TenantForm
  },
  created: function() {
    this.authData = JSON.parse(auth.getAuthData());
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/root/tenants", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(error => {
          // console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getSingleData(id) {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/root/tenants/" + id, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(error => {
          // console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openAdd() {
      this.edit = false;
      this.dialogForm = true;
    },
    openDetail(id) {
      this.dialogDetail = true;
      this.getSingleData(id);
    },
    openName(id) {
      this.dialogName = true;
      this.getSingleData(id);
    },
    openDate(id) {
      this.dialogDate = true;
      this.getSingleData(id);
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.name;
      this.leftAction = action;
    },
    changeAct() {
      if (this.$refs.form1.validate()) {
        this.changeName();
      }
    },
    changeName() {
      this.tableLoad = true;
      this.axios
        .put(
          config.baseUri +
            "/root/tenants/" +
            this.dataSingle.id +
            "/change_name",
          { name: this.dataSingle.name },
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.refresh();
        })
        .catch(error => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    renewAct() {
      if (this.$refs.form2.validate()) {
        this.renewSubscription();
      }
    },
    renewSubscription() {
      this.tableLoad = true;
      this.axios
        .put(
          config.baseUri +
            "/root/tenants/" +
            this.dataSingle.id +
            "/renew_subscription",
          { valid_until: this.dataSingle.valid_until },
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.refresh();
        })
        .catch(error => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    refresh() {
      this.dialogForm = false;
      this.dialogName = false;
      this.dialogDate = false;
      this.getDataList();
    }
  }
};
</script>
