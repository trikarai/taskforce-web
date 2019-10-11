<template>
  <v-col>
    <v-select :hint="field.type" :label="field.name"></v-select>
  </v-col>
</template>
<script>
export default {
  props: ["field"]
};
</script>