<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-select
          v-model="organizationId"
          label="Select Organizationn"
          item-value="id"
          item-text="name"
        ></v-select>
      </v-col>
      <v-col cols="12" md="12" sm="12">
        <v-card class="text-center ma-2" min-width="300" :loading="tableLoad">
          <v-card-title>
            <v-btn small fab color="primary">
              <v-icon>zoom_in</v-icon>
            </v-btn>Assignments
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              label="Task"
              autocomplete
              :loading="tableLoad"
              cache-items
              required
              :items="dataAssignment.list"
              item-text="task_name"
              return-object
              v-model="assignment"
            ></v-autocomplete>
          </v-card-text>
          <v-scale-transition>
            <v-card-text v-if="reportLoad">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-card-text>
          </v-scale-transition>
          <v-slide-y-transition>
            <template v-if="assignment">
              <v-card-text v-if="!reportLoad">
                <p>Staff Name : {{assignment.staff_personnel_name}}</p>
                <p>Type : {{assignment.assignment_type}}</p>
                <p>Target : {{assignment.target_name}}</p>
                <p>Performance : {{getPerformance(dataAssignment.total, dataReport.total)}} %</p>
              </v-card-text>
            </template>
          </v-slide-y-transition>
        </v-card>
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
      reportLoad: false
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
