<template>
  <div id="vfg-render">
    <VueFormGenerator
      :model="form.model"
      :schema="form.schema"
    />
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
#vfg-render {
  max-width: 30vw;
  margin: 0 auto;
}
</style>

<style>
.field-group {
  border: 2px solid #bbb;
  padding: 8px;
  border-radius: 4px;
}

.subgroup {
  border-color: goldenrod;
}

.subgroup legend {
  color: #00268d;
}
</style>
