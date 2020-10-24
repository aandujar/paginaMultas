<template>
  <div class="login pa-4">
    <v-flex xs11 md8 lg4>
      <v-card class="card pa-2">
        <v-layout column>
          <v-text-field
            label="Usuario"
            v-model="username"
            :error-messages="usernameErrors"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
            @keyup.enter="login"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            v-model="password"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @keyup.enter="login"
          ></v-text-field>
          <v-btn v-show="auth.status != 'loading'" color="blue" @click="login"
            >Iniciar sesión</v-btn
          >
          <v-layout justify-center>
            <v-progress-circular
              v-show="auth.status == 'loading'"
              indeterminate
              color="blue"
            ></v-progress-circular>
          </v-layout>
        </v-layout>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  validations: {
    username: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["auth"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.email && errors.push("Debe ser una email");
      !this.$v.username.required && errors.push("Debes rellenar el campo");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Debes rellenar el campo");
      return errors;
    },
  },
  methods: {
    login() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("auth/login", {
            username: this.username,
            password: this.password,
          })
          .then((resp) => {
            localStorage.setItem("user", resp.data);
            this.$router.push("/apps");
          })
          .catch((err) => {
            //si quieres mostrar el mensaje de error
          });
      } else {
        this.$v.$touch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    height: 200px;
  }
}
</style>