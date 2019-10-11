<template>
  <transition name="modal">
    <div class="modal-mask">
      <!-- <div class="modal-wrapper" @click="$emit('close')"> -->
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <v-card elevation="0" width="500">
            <v-card-text>
              <v-stepper v-model="e1" class="elevation-0">
                <v-stepper-header>
                  <v-stepper-step :editable="false" :complete="e1 > 1" step="1">Tenant Info</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :editable="false" :complete="e1 > 2" step="2">Tenant Admin</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-form ref="form1" v-model="valid1">
                      <v-card flat>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Code"
                                v-model="params.code"
                                :rules="rulesRequired"
                                counter="4"
                                maxlength="4"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Name"
                                v-model="params.name"
                                :rules="rulesName"
                                counter="100"
                                maxlength="100"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="PIC email"
                                v-model="params.pic_email"
                                :rules="rulesEmail"
                                counter
                                maxlength="100"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="params.valid_until"
                                    label="Valid Until"
                                    prepend-icon="event"
                                    :rules="rulesRequired"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="params.valid_until" no-title scrollable>
                                  <div class="flex-grow-1"></div>
                                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save()">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-btn
                        class="ma-2"
                        :disabled="!valid1"
                        color="accent"
                        @click="e1 = 2"
                      >Continue</v-btn>

                      <v-btn class="ma-2" text @click="$emit('close')">Cancel</v-btn>
                    </v-form>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-form ref="form2" v-model="valid2">
                      <v-card flat>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Username"
                                v-model="params.admin.username"
                                :rules="rulesRequired"
                                counter="100"
                                maxlength="100"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Name"
                                v-model="params.admin.name"
                                :rules="rulesName"
                                counter="100"
                                maxlength="100"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="E-Mail"
                                v-model="params.admin.email"
                                :rules="rulesEmail"
                                counter="100"
                                maxlength="100"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Phone"
                                v-model="params.admin.phone"
                                :rules="rulesRequired"
                                counter="100"
                                maxlength="100"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                autocomplete="new-password"
                                v-model="params.admin.password"
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
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            @click="submit"
                            :loading="loader"
                            :disabled="!valid2"
                            color="primary"
                          >{{$vuetify.lang.t('$vuetify.action.submit')}}</v-btn>
                        </v-card-actions>
                      </v-card>
                      <v-btn :disabled="loader" icon class="ma-2" small @click="e1 = 1">
                        <v-icon>arrow_back</v-icon>
                      </v-btn>
                    </v-form>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
          </v-card>
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
      e1: 0,
      menu: false,
      valid1: false,
      valid2: false,
      loader: false,
      show1: false,
      params: {
        code: "",
        name: "",
        valid_until: "",
        pic_email: "",
        admin: {
          username: "",
          password: "",
          name: "",
          email: "",
          phone: ""
        }
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
      if (this.$refs.form2.validate()) {
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
        .post(config.baseUri + "/root/tenants", this.params, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.$emit("refresh");
        })
        .catch(error => {})
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
