<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <v-form v-model="valid" ref="form">
            <v-card elevation="0" width="400" :loading="loader">
              <v-card-text class="pt-4">
                {{params}}
                <v-row>
                  <v-col>
                    <v-autocomplete
                      :loading="loader"
                      :disabled="view"
                      :rules="rulesRequired"
                      label="Task Form"
                      :items="taskList.list"
                      item-value="id"
                      item-text="name"
                      v-model="params.task_id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      :disabled="view"
                      :rules="rulesRequired"
                      label="Form Field"
                      :items="fieldList.list"
                      item-value="id"
                      item-text="name"
                      v-model="params.field_id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Alias"
                      v-model="params.alias"
                      :rules="rulesName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :disabled="view"
                      :rules="rulesRequired"
                      :items="typelist"
                      v-model="params.comparator_type"
                      label="Comparator Type"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Comparator Value"
                      v-model="params.name"
                      :rules="rulesRequired"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="!edit"
                  @click.once="submit"
                  color="primary"
                  :disabled="!valid"
                >{{$vuetify.lang.t('$vuetify.action.add')}}</v-btn>

                <v-btn
                  color="red"
                  @click="$emit('close')"
                >{{$vuetify.lang.t('$vuetify.action.cancel')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      show1: false,
      params: {
        task_id: "",
        field_id: "",
        alias: "",
        comparator_type: "",
        comparator_value: ""
      },
      typelist: [
        { value: "ALL", text: "All" },
        { value: "=", text: "Equal to" },
        { value: ">", text: "Greater than" },
        { value: ">=", text: "Greater than or equal to" },
        { value: "<", text: "Less than" },
        { value: "<=", text: "Less than or equal to" }
      ],
      taskList: { total: 0, list: [] },
      fieldList: { total: 0, list: [] }
    };
  },
  components: {},
  watch: {
    "params.task_id": "getFormField"
  },
  created: function() {},
  mounted: function() {
    this.getTaskForm();
    if (this.edit) {
      this.getSingleData(this.data.id);
    }
  },
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    submitBranch: function() {
      if (this.$refs.form.validate()) {
        this.addDataBranch();
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      }
    },
    addData: function() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/statistic_reports/" +
            this.$route.params.reportId +
            "/segments/" +
            this.$route.params.segmentId +
            "/units",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.$emit("refresh");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateData: function() {},
    getSingleData: function(id) {},
    getTaskForm() {
      this.loader = true;
      this.axios;
      this.axios
        .get(config.baseUri + "/tasks?page=" + 1 + "&page_size=" + 1000, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.taskList = res.data.data;
          } else {
            this.taskList = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getFormField() {
      this.loader = true;
      this.axios;
      this.axios
        .get(
          config.baseUri +
            "/tasks/" +
            this.params.task_id +
            "/fields?page=" +
            1 +
            "&page_size=" +
            1000,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.fieldList = res.data.data;
          } else {
            this.fieldList = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../../../../assets/css/modal.css";
</style>
