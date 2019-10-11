<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <!-- <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" /> -->

          <v-form v-model="valid" ref="form">
            <v-card elevation="0" width="400" :loading="loader">
              <template v-if="branch">
                <v-card-title>{{rootData.name}}</v-card-title>
              </template>
              <v-card-text class="pt-4">
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Name"
                      v-model="params.name"
                      :rules="rulesName"
                      :counter="50"
                      maxlength="50a"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      :disabled="view"
                      label="Description"
                      v-model="params.description"
                      counter="200"
                      maxlength="200"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <template v-if="!branch">
                  <v-btn
                    v-if="!edit"
                    @click.once="submit"
                    color="primary"
                    :disabled="!valid"
                  >{{$vuetify.lang.t('$vuetify.action.add')}}</v-btn>
                </template>
                <v-btn
                  v-if="branch"
                  @click.once="submitBranch"
                  color="primary"
                  :disabled="!valid"
                >{{$vuetify.lang.t('$vuetify.action.add')}} Branch</v-btn>
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
  props: ["id", "edit", "view", "data", "rootData", "branch"],
  data: function() {
    return {
      valid: false,
      loader: false,
      show1: false,
      params: {
        name: "",
        description: ""
      }
    };
  },
  components: {},
  created: function() {},
  mounted: function() {
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
        .post(config.baseUri + "/organizations", this.params, {
          headers: auth.getAuthHeader()
        })
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
    addDataBranch: function() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri + "/organizations/" + this.rootData.id,
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
@import "../../../assets/css/modal.css";
</style>
