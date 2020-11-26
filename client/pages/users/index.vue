<template>
  <v-container grid-list-xl fluid>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-toolbar-title><h3>Lista</h3></v-toolbar-title>
            <v-btn flat icon color="blue" to="users/create">
                <v-icon>add</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                prepend-icon="search"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
        <template>
            <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
                :search="search"
                class="elevation-0 table-striped">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <!--<td class="text-xs-left">
                    <v-chip
                        label
                        small
                        v-for="role in props.item.roles"
                        :key="role"
                        :color="getColorByStatus(role)"
                        text-color="white" >
                        {{ role }}
                    </v-chip>
                </td>-->
                <td class="text-xs-right">
                    <v-btn flat icon color="blue" :to="'users/' + props.item.id">
                        <v-icon>fa-eye</v-icon>
                    </v-btn>
                    <v-btn flat icon color="green" :to="'users/edit/' + props.item.id">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="props.item.dialog"
                        persistent
                        max-width="500px">

                        <v-btn
                            flat
                            icon
                            color="red"
                            dark
                            slot="activator">
                            <v-icon>delete</v-icon>
                        </v-btn>

                        <v-card>
                            <v-card-title class="headline">
                                Atenção!
                            </v-card-title>
                            <v-card-text>
                                Tem certeza que deseja apagar esse registro?
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    depressed
                                    @click="props.item.dialog = false">
                                    SIM
                                </v-btn>
                                <v-btn
                                    color="error"
                                    depressed
                                    @click="props.item.dialog = false">
                                    NÃO
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </td>
            </template>
            </v-data-table>
        </template>
        <v-divider></v-divider>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { Items } from '@/api/users';

export default {
  layout: "dashboard",
  data () {
    return {
        dialog: [],
        search: '',
        headers: [
            { text: 'ID', align: 'left', sortable: false, value: 'id' },
            { text: 'Nome', value: 'name' },
            { text: 'Email', value: 'email' },
            //{ text: 'Role', value: 'role', sortable: false },
            { text: 'Açoes', value: 'action', align: 'right', sortable: false },
        ],
        items: Items,
        colors: {
            admin: 'blue',
            operador: 'green'
        }
    };
  },
  computed: {},
  methods: {
    getColorByStatus (status) {
      return this.colors[status];
    },
  }
};
</script>
