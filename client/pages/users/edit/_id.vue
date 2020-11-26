<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Alterar Usuario">
            <div slot="widget-content">
                <user-form></user-form>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
    import VWidget from '@/components/VWidget';
    import UserForm from '@/components/forms/UserForm.vue';

    export default {
        layout: "dashboard",
        components: {
            VWidget,
            UserForm
        },
        data() {
            return {};
        },
        computed: {},
        methods: {}
    };
</script>
