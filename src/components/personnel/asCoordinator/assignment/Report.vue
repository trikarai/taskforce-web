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
            <v-col>Submitted by: Staff 3</v-col>
          </v-row>
          <v-row>
            <v-col>submit time : 26 Sept 2019, 08:49:10</v-col>
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

    <v-row>
      <v-col>
        <v-card color="accent" router to="/personnel/coordinator/assignment">
          <v-row>
            <v-col class="title">Dynamic Form placeholder</v-col>
          </v-row>
          <v-row>
            <v-col>Location name:BTS Antapani</v-col>
          </v-row>
          <v-row>
            <v-col>Space available: 1</v-col>
          </v-row>
        </v-card>
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
    }
  }
};
</script>
