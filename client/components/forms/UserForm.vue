<template>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
        <v-container>
            <v-layout row>
                <v-flex xs2>
                    <v-subheader>E-mail</v-subheader>
                </v-flex>
                <v-flex xs10>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors, valid }">
                        <v-text-field
                            id="email"
                            name="email"
                            label="E-mail"
                            v-model="form.email"
                            :error-messages="errors"
                            :success="valid"
                        ></v-text-field>
                    </ValidationProvider>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs2>
                    <v-subheader>Nome</v-subheader>
                </v-flex>
                <v-flex xs10>
                    <ValidationProvider name="name" rules="required" v-slot="{ errors, valid }">
                        <v-text-field
                            id="form_name"
                            name="name"
                            label="Nome"
                            v-model="form.name"
                            :error-messages="errors"
                            :success="valid"
                        ></v-text-field>
                    </ValidationProvider>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs2>
                    <v-subheader>Senha</v-subheader>
                </v-flex>
                <v-flex xs10>
                    <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors, valid }" vid="password">
                        <v-text-field
                            id="password"
                            name="password"
                            label="Senha"
                            :counter="25"
                            :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            :error-messages="errors"
                            :success="valid"
                            v-model="form.password"
                        ></v-text-field>
                    </ValidationProvider>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs2>
                    <v-subheader>Confirmar Senha</v-subheader>
                </v-flex>
                <v-flex xs10>
                    <ValidationProvider name="conf_password" rules="required|confirmed:password" v-slot="{ errors, valid }">
                        <v-text-field
                            id="conf_password"
                            name="conf_password"
                            label="Confirmar Senha"
                            :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                            @click:append="show = !show"
                            :type="show ? 'text' : 'password'"
                            :error-messages="errors"
                            :success="valid"
                            v-model="form.confPassword"
                        ></v-text-field>
                    </ValidationProvider>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-btn
                    color="primary"
                    @click="handleSubmit(send)"
                    :loading="loading"
                    :disabled="invalid || !validated">
                    Enviar
                </v-btn>
                <v-btn
                    color="warning"
                    to="/users">
                    Cancelar
                </v-btn>
            </v-layout>
        </v-container>
    </ValidationObserver>
</template>

<script>
    import { ValidationObserver, ValidationProvider } from "vee-validate";

    export default {
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {
                show: false,
                form: {
                    id: null,
                    nome: null,
                    email: null,
                    password: null,
                    confPassword: null
                }
            };
        },
        computed: {},
        methods: {
            async send() {
                try {
                    this.$router.push('/users');
                } catch (err) {
                    console.log(err, err.response)
                    this.$toast.error(
                        err.response.data.message,
                        {
                            position: "top-center",
                            timeout: 5000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                            rtl: false
                        }
                    );
                }
            }
        }
    };
</script>
