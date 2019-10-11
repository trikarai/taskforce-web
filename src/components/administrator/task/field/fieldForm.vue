<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <v-form v-model="valid" ref="form">
            <v-card elevation="0" width="400" :loading="loader">
              <v-card-text class="pt-4">
                <!-- {{params}} -->
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Name"
                      v-model="params.name"
                      :rules="rulesName"
                      :counter="50"
                      maxlength="50"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Position"
                      v-model="params.position"
                      :rules="rulesRequired"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="params.type"
                      :items="typeList"
                      :rules="rulesRequired"
                      label="Field Type"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      :label="'Min '  + valueHint"
                      v-model="params.min_value"
                      :rules="rulesRequired"
                      min="1"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      :label="'Max '  + valueHint"
                      v-model="params.max_value"
                      :rules="rulesRequired"
                      min="2"
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
        name: "",
        position: "",
        min_value: "",
        max_value: "",
        type: ""
      },
      valueHint: "Value",
      typeList: [
        { value: "string", text: "String" },
        { value: "integer", text: "Integer" },
        { value: "numeric", text: "Numeric" },
        { value: "select", text: "Select" },
        { value: "Attachment", text: "Attachment" }
      ]
    };
  },
  components: {},
  created: function() {},
  watch: {
    "params.type": "setvalueHint"
  },
  mounted: function() {
    if (this.edit) {
      this.getSingleData(this.data.id);
    }
  },
  methods: {
    setvalueHint() {
      if (this.params.type === "string" || this.params.type === "text") {
        this.valueHint = "Characters";
      } else {
        this.valueHint = "Value";
      }
    },
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
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
          config.baseUri + "/tasks/" + this.$route.params.taskId + "/fields",
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
    getSingleData: function(id) {}
  }
};
</script>
<style scoped>
@import "../../../../assets/css/modal.css";
</style>
