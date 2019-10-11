<template>
  <v-row>
    <string-field :field="field" v-if="field.type === 'STRING'" />
    <integer-field :field="field" v-if="field.type === 'INTEGER'" />
    <integer-field :field="field" v-if="field.type === 'NUMERIC'" />
    <select-field :field="field" v-if="field.type === 'SELECT'" />
  </v-row>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import String from "./type/String";
import Integer from "./type/Integer";
import Select from "./type/Select";

export default {
  props: ["field"],
  components: {
    "string-field": String,
    "integer-field": Integer,
    "select-field": Select
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>