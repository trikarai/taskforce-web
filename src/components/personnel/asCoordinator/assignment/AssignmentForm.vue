<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>
        <pre>
          {{params}}         
        </pre>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-card>
              <v-card-text>
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
                  <!-- <v-date-picker v-model="date3" no-title scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date3)">OK</v-btn>
                  </v-date-picker>-->
                  <v-time-picker v-model="date3" format="24hr" scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu3.save(date3)">OK</v-btn>
                  </v-time-picker>
                </v-menu>

                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="date2"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :rules="rulesRequired"
                      v-model="date2"
                      label="End Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" no-title scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                  </v-date-picker>
                </v-menu>

                <v-menu
                  ref="menu4"
                  v-model="menu4"
                  :close-on-content-click="false"
                  :return-value.sync="date4"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :rules="rulesRequired"
                      v-model="date4"
                      label="End Time"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="date4" format="24hr" scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu4.save(date4)">OK</v-btn>
                  </v-time-picker>
                </v-menu>

                <v-select
                  :rules="rulesRequired"
                  :items="items"
                  v-model="params.period_unit"
                  label="Periode Unit"
                ></v-select>
                <v-text-field
                  :rules="rulesRequired"
                  label="Periode Length"
                  v-model="params.period_length"
                  type="number"
                ></v-text-field>

                <v-text-field
                  :rules="rulesRequired"
                  label="Min Sampling"
                  v-model="params.min_sampling"
                  type="number"
                ></v-text-field>
                <v-text-field
                  :rules="rulesRequired"
                  label="Max Sampling"
                  v-model="params.max_sampling"
                  type="number"
                ></v-text-field>

                <v-select :rules="rulesRequired" :items="items" v-model="value" label="Task"></v-select>
                <template v-if="assignmentType === 'canvas'">
                  <v-select :rules="rulesRequired" :items="items" v-model="value" label="Client"></v-select>
                  <v-select :rules="rulesRequired" :items="items" v-model="value" label="Territory"></v-select>
                </template>
                <template v-else>
                  <v-select :rules="rulesRequired" :items="items" v-model="value" label="Territory"></v-select>
                </template>
                <v-select :rules="rulesRequired" :items="items" v-model="value" label="Staff"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="submit" color="primary" :disabled="!valid">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      date: "",
      date2: "",
      date3: "",
      date4: "",
      menu: "",
      menu2: "",
      menu3: "",
      menu4: "",
      params: {
        period_unit: "",
        period_length: null,
        start_time: {
          year: null,
          month: null,
          date: null,
          week: null,
          day: null,
          hour: null,
          minute: null,
          second: null
        },
        end_time: {
          year: null,
          month: null,
          date: null,
          week: null,
          day: null,
          hour: null,
          minute: null,
          second: null
        },
        min_sampling: "",
        max_sampling: "",
        task_id: "",
        client: {
          teritory_id: "",
          id: ""
        },
        teritory_id: "",
        staff: {
          organization_id: "",
          id: ""
        }
      },
      assignmentType: this.$route.params.type,
      valid: true,
      name: "",
      select: null,
      items: [
        { text: "Year", value: "YEAR" },
        { text: "Month", value: "MONTH" },
        { text: "Week", value: "WEEK" },
        { text: "Day", value: "DAY" },
        { text: "Open", value: "OPEN" }
      ],
      checkbox: false,
      value: ""
    };
  },
  watch: {
    // "params.period_unit": "getPeriodDate",
    date: "getPeriodDateStart",
    date2: "getPeriodDateEnd",
    date3: "getPeriodTimeStart",
    date4: "getPeriodTimeEnd"
  },
  methods: {
    getPeriodTimeStart() {
      this.params.start_time.hour = this.date3.split(":")[0];
      this.params.start_time.minute = this.date3.split(":")[1];
      this.params.start_time.second = "00";
    },
    getPeriodTimeEnd() {
      this.params.end_time.hour = this.date4.split(":")[0];
      this.params.end_time.minute = this.date4.split(":")[1];
      this.params.end_time.second = "00";
    },
    getPeriodDateEnd() {
      var dt = new Date(this.date2);
      this.params.end_time.date = this.date2;
      this.params.end_time.year = this.$moment(dt).format("Y");
      this.params.end_time.month = this.$moment(dt).format("M");
      this.params.end_time.week = this.$moment(dt).format("W");
      this.params.end_time.day = this.$moment(dt).format("D");
    },
    getPeriodDateStart() {
      var dt = new Date(this.date);
      this.params.start_time.date = this.date;
      this.params.start_time.year = this.$moment(dt).format("Y");
      this.params.start_time.month = this.$moment(dt).format("M");
      this.params.start_time.week = this.$moment(dt).format("W");
      this.params.start_time.day = this.$moment(dt).format("D");

      // switch (this.params.period_unit) {
      //   case "YEAR":
      //     this.params.start_time.year = this.$moment(dt).format("Y");
      //     break;
      //   case "MONTH":
      //     this.params.start_time.month = this.$moment(dt).format("M");
      //     break;
      //   case "WEEK":
      //     this.params.start_time.week = this.$moment(dt).format("W");
      //     break;
      //   case "DAY":
      //     this.params.start_time.day = this.$moment(dt).format("D");
      //     break;
      //   case "OPEN":
      //     break;
      //   default:
      //     break;
      // }
    },
    submit() {
      if (this.$refs.form.validate()) {
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
</style>