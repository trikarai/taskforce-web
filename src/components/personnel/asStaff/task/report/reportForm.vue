<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card :loading="templateLoad">
            <v-card-title primary-title>Report</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :rules="rulesRequired"
                        v-model="date"
                        label="Start Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <div class="flex-grow-1"></div>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col sm="12" md="6">
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :return-value.sync="date3"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :rules="rulesRequired"
                        v-model="date3"
                        label="Start Time"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker v-model="date3" format="24hr" scrollable>
                      <div class="flex-grow-1"></div>
                      <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu3.save(date3)">OK</v-btn>
                    </v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <!--start dynamic form -->
              <template v-for="field in dataList.list">
                <field-modul :field="field" :key="field.id" />
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import FieldModul from "@/components/field/Field";

export default {
  data() {
    return {
      staffId: "4a237f02-477b-4876-a598-f3d21b29df41",
      valid: false,
      dataList: { total: 0, list: [] },
      templateLoad: false,
      edit: false,
      menu: false,
      menu3: false,
      date: "",
      date3: "",
      params: {
        designated_time: {
          year: null,
          month: null,
          date: null,
          week: null,
          day: null,
          hour: null,
          minute: null,
          second: null
        },
        entries: []
      }
    };
  },
  components: {
    FieldModul
  },
  mounted: function() {
    this.getTaskTemplate();
  },
  methods: {
    getTaskTemplate() {
      this.templateLoad = true;
      this.axios
        .get(
          config.baseUri + "/tasks/" + this.$route.params.taskId + "/fields",
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
          this.templateLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>