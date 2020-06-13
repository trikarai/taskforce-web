<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="12"></v-col>
      <v-col cols="12" md="12" sm="12">
        <v-card color="accent" router to="/personnel/coordinator/assignment">
          <v-row>
            <v-col class="title">Assignments</v-col>
          </v-row>
          <v-row>
            <v-col class="display-1">3</v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" sm="12">
        <v-card color="accent">
          <v-row>
            <v-col class="title">Performance</v-col>
          </v-row>
          <v-row>
            <v-col class="display-1">80%</v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" sm="12">
        <v-btn color="primary" block>Report</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      fab: false,
      coordinatorId: "0eeca071-cee0-4d45-adeb-16f12dcdea8a",
      organizationId: "",
      dataAssignment: { total: 0, list: [] },
      assignment: "",
      dataReport: { total: 0, list: [] },
      tableLoad: false,
      reportLoad: false,
      organization: {
        list: [
          {
            id: "9bb25790-a7f3-48a3-837f-66117905bb79",
            name: "Area Bandung Tengah"
          }
        ]
      }
    };
  },
  mounted: function() {
    this.getAssignment();
  },
  watch: {
    assignment: "getReport"
  },
  methods: {
    getPerformance(assignmentTotal, reportTotal) {
      return Math.floor((reportTotal / assignmentTotal) * 100);
    },
    getAssignment() {
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
            this.dataAssignment = res.data.data;
          } else {
            this.dataAssignment = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getReport() {
      this.reportLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/coordinator/" +
            this.coordinatorId +
            "/assignments/" +
            this.assignment.id +
            "/reports",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataReport = res.data.data;
          } else {
            this.dataReport = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.reportLoad = false;
        });
    }
  }
};
</script>
