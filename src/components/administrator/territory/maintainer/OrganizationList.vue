<template>
  <v-container>
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
    <v-col>
      <v-row>
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
            <v-btn small color="primary" @click="openAssign(item.id, item.name)">
              <v-icon small left>add</v-icon>Assign as maintainers
            </v-btn>
          </template>
        </v-data-table>
      </v-row>
    </v-col>

    <v-dialog v-model="dialogAssign" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">Assign maintainers</p>
        </v-card-title>
        <v-card-text>Assign {{leftName}} as maintainers</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green" @click="assign(leftId)">Yes</v-btn>
          <v-btn color="red" @click="dialogAssign = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  props: ["ass"],
  data() {
    return {
      dialogAssign: false,
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
      options: {}
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
            "/organizations?page=" +
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
    openAssign(id, name) {
      this.leftId = id;
      this.leftName = name;
      this.dialogAssign = true;
    },
    assign(id) {
      this.tableLoad = true;
      this.axios
        .post(
          config.baseUri +
            "/teritories/" +
            this.$route.params.territoryId +
            "/maintainers",
          { organization_id: id },
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dialogAssign = false;
          this.$emit("refresh");
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