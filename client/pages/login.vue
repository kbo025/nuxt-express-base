<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/m.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Material Admin Template</h1>
                </div>
                <v-form>
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors, valid }">
                    <v-text-field
                      append-icon="person"
                      name="email"
                      label="Email"
                      type="text"
                      :error-messages="errors"
                      :success="valid"
                      v-model="model.email"
                      required>
                    </v-text-field>
                  </ValidationProvider>
                  <ValidationProvider name="password" rules="required" v-slot="{ errors, valid }">
                    <v-text-field
                      append-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      :error-messages="errors"
                      :success="valid"
                      v-model="model.password"
                      required>
                    </v-text-field>
                  </ValidationProvider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="handleSubmit(login)" :loading="loading" :disabled="invalid || !validated">Login</v-btn>
              </v-card-actions>
            </v-card>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from "vee-validate";
  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    auth: false,
    middleware: ['notAuth'],
    layout: 'default',
    components: {
      ValidationObserver,
      ValidationProvider
    },
    data: () => ({
      loading: false,
      model: {
        email: null,
        password: null
      }
    }),

    methods: {
      async login() {
        try {
          let res = await this.$auth.loginWith('local', { data: this.model })
           let user = res.data.user;
           this.$auth.setUser(user);
           this.$auth.setToken(res.data.token);
          console.log(res)
          this.$router.push('/')
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
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
