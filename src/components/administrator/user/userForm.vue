<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <!-- <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" /> -->
          <v-form v-model="valid" ref="form">
            <v-card elevation="0" width="400" :loading="loader">
              <v-card-text class="pt-4">
                <template v-if="!edit">
                  <v-row>
                    <v-col>
                      <v-text-field
                        :disabled="view"
                        label="Username"
                        v-model="params.username"
                        :rules="rulesName"
                        :counter="25"
                        maxlength="25"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Name"
                      v-model="params.name"
                      :rules="rulesName"
                      :counter="25"
                      maxlength="25"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="view"
                      label="Email"
                      v-model="params.email"
                      :rules="rulesEmail"
                      maxlength="100"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <template v-if="!edit">
                  <v-row>
                    <v-col>
                      <v-text-field
                        autocomplete="new-password"
                        v-if="!view"
                        v-model="params.password"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :rules="rulesPassword"
                        :type="show1 ? 'text' : 'password'"
                        name="Password"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="params.role"
                      label="Role"
                      :items="roleList"
                      :rules="rulesRequired"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="edit == false"
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
        username: "",
        email: "",
        password: "",
        role: ""
      },
      roleList: ["ADMIN", "PERSONNEL"]
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
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      }
    },
    addData: function() {
      this.loader = true;
      this.axios
        .post(config.baseUri + "/users", this.params, {
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
    updateData: function() {},
    getSingleData: function(id) {}
  }
};
</script>
<style scoped>
@import "../../../assets/css/modal.css";
</style>
