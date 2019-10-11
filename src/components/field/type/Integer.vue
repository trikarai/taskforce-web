<template>
  <v-col>
    <v-text-field :hint="field.type" :label="field.name" type="number"></v-text-field>
  </v-col>
</template>
<script>
export default {
  props: ["field"]
};
</script>