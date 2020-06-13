<template>
  <v-container>
    <v-row>
      <!-- {{authData}} -->
      <v-col cols="12" md="12" sm="12">
        <v-card color="accent" router to="/personnel/coordinator/assignment">
          <v-row>
            <v-col class="title">BTS Monitoring</v-col>
          </v-row>
          <v-row>
            <v-col>Staff 3</v-col>
          </v-row>
          <v-row>
            <v-col>this month : 80% (4/5)</v-col>
          </v-row>
          <v-row>
            <v-col>last month : 100% (5/5)</v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" xs="12">
        <!-- <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>-->
      </v-col>
    </v-row>
    <v-row class="hidden-sm-and-down">
      <v-col>
        <!-- {{dataList}} -->
        <!-- <v-data-table
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
        </template>-->
        <!-- <template v-slot:item.manage="{item}">
            <v-btn small color="accent" class="mr-1" @click="gotoSection(item.id)" disabled>
              <v-icon small left>power_input</v-icon>Section
            </v-btn>
            <v-btn small color="accent" class="mr-0" @click="gotoSegment(item.id)">
              <v-icon small left>category</v-icon>Segment
            </v-btn>
        </template>-->
        <!-- </v-data-table> -->
      </v-col>
    </v-row>
    <v-row class="hidden-md-and-up">
      <v-col>
        <v-data-iterator
          :search="search"
          :loading="tableLoad"
          :items="submitdata"
          :options.sync="options"
          :server-items-length="dataList.total"
          class="elevation-1"
        >
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                <v-card class="ma-1">
                  <v-card-title>
                    <h4>submit time: {{item.submit_time}}</h4>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <!-- <v-icon small>directions_run</v-icon> -->
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>start: {{item.start_time}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :inset="true"></v-divider>
                    <v-list-item>
                      <v-list-item-avatar>
                        <!-- <v-icon small>assignment</v-icon> -->
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>end: {{item.end_time}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :inset="true"></v-divider>
                    <v-card-actions>
                      <v-btn color="accent" @click="gotoReport(item.id)">
                        <v-icon left>people</v-icon>View Report
                      </v-btn>
                    </v-card-actions>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

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

export default {
  data() {
    return {
      coordinatorId: "0eeca071-cee0-4d45-adeb-16f12dcdea8a",
      search: "",
      dataList: { total: 0, list: [] },
      assignment: {
        id: "642ec2d1-9835-44f3-aa6b-2d684080171e",
        staff_personnel_name: "personnel empat tbig",
        task_name: "Mobile App User Survey",
        assignment_type: "SURVEY",
        target_name: "Kec. Cicendo",
        min_sampling: 3
      },
      submitdata: [
        {
          id: "32er212-w323232-qwqwq",
          submit_time: "26 Sept 2019, 08:49:10",
          start_time: "01 Sept 2019 00:00:00",
          end_time: "30 Sept 2019 23:59:59"
        },
        {
          id: "32er212-w323232-qwqwq",
          submit_time: "26 Sept 2019, 08:49:10",
          start_time: "01 Sept 2019 00:00:00",
          end_time: "30 Sept 2019 23:59:59"
        },
        {
          id: "32er212-w323232-qwqwq",
          submit_time: "26 Sept 2019, 08:49:10",
          start_time: "01 Sept 2019 00:00:00",
          end_time: "30 Sept 2019 23:59:59"
        }
      ],
      tableLoad: false,
      tableHeaders: [
        { text: "Name", value: "task_name", sortable: false },
        { text: "Type", value: "assignment_type", sortable: false },
        { text: "Target", value: "target_name", sortable: false },
        { text: "Staff", value: "staff_personnel_name", sortable: false },
        {
          text: "Manage",
          value: "manage",
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
  components: {},
  created: function() {},
  watch: {
    options: "getDataList"
  },
  mounted: function() {
    // this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/coordinator/" +
            this.coordinatorId +
            "/assignments",
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
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.task_name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/coordinator/" +
            this.coordinatorId +
            "/assignments/" +
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
    },
    gotoSection(id) {
      this.$router.push({ path: "/admin/report/" + id + "/section" });
    },
    gotoSegment(id) {
      this.$router.push({ path: "/admin/report/" + id + "/segment" });
    },
    newAssignment(type) {
      this.$router.push({ path: "/personnel/coordinator/assignment/" + type });
    },
    gotoReport(id) {
      this.$router.push({
        path: "/personnel/coordinator/assignment/" + id + "/report"
      });
    }
  }
};
</script>
