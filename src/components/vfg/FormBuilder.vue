<template>
  <b-container class="schema-builder-columns">
    <b-row
      class="text-center"
      style="min-height: 100%;"
    >
      <b-col sm="3">
        <ElementList :form="form" />
      </b-col>
      <b-col sm="6">
        <ElementConfig :form="form" />
      </b-col>
      <b-col sm="3">
        <ElementPicker :form="form" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  components: {
    ElementConfig: () => import('@/components/vfg/ElementConfig'),
    ElementList: () => import('@/components/vfg/ElementList'),
    ElementPicker: () => import('@/components/vfg/ElementPicker'),
  },

  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.schema-builder-columns .row + .row {
  margin-top: 16px;
  margin-top: 1rem;
}

.schema-builder-columns .row > .col:not(.header),
.schema-builder-columns .row > [class^='col-'] {
  padding-top: 12px;
  padding-top: 0.75rem;
  padding-bottom: 12px;
  padding-bottom: 0.75rem;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
