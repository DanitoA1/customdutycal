<template>
  <v-container>
    <v-card
      v-if="signUp"
      class="mx-auto mt-16"
      rounded="t-xl"
      max-width="400"
      color="#FCF4F8"
    >
      <v-toolbar
        color="#9B2D86"
        dense
        dark
      >
        <v-card-title
          class="mx-auto"
        >
          Create An Account
        </v-card-title>
      </v-toolbar>
      <v-container
        class="mt-4"
      >
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Email"
          type="email"
          hint="Enter a Valid Email"
        />
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Password"
          type="password"
          hint="Enter Password"
        />
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Confirm Password"
          type="password"
          hint="Re-Type Password to Confirm"
        />
        <div class="text-center">
          <v-btn
            class="mb-2 text-capitalize"
            color="#9B2D86"
            rounded
            dark
          >
            Sign Up
          </v-btn>
          <p
            class="text-caption"
          >
            Already have an account ?
            <v-btn
              class="deep-purple--text ml-n2 text-capitalize"
              text
              rounded
              small
              @click="openLogin"
            >
              Login
            </v-btn>
          </p>
        </div>
      </v-container>
    </v-card>
    <v-card
      v-if="login"
      class="mx-auto mt-16"
      rounded="t-xl"
      max-width="400"
      color="#FCF4F8"
    >
      <v-toolbar
        color="#9B2D86"
        dense
        dark
      >
        <v-card-title
          class="mx-auto"
        >
          Login To Account
        </v-card-title>
      </v-toolbar>
      <v-container
        class="mt-4"
      >
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Email"
          type="email"
          hint="Enter a registered email"
        />
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Password"
          type="password"
          hint="Enter your password"
        />
        <div class="text-center">
          <v-btn
            class="mb-3 text-capitalize"
            text
            @click="loginNow()"
          >
            <v-avatar
              class="mr-3"
              size="25"
            >
              <img
                src="/img/googleLogo.png"
                alt="G"
              />
            </v-avatar>
            Login with Google
          </v-btn>
          <br>
          <v-btn
            class="mb-2 text-capitalize"
            color="#9B2D86"
            rounded
            dark
          >
            Login
          </v-btn>
          <p
            class="text-caption"
          >
            Don't have an account?
            <v-btn
              class="deep-purple--text ml-n2 text-capitalize"
              text
              rounded
              small
              @click="openSignUp"
            >
              Sign Up
            </v-btn>
          </p>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'UserLogin',
  data: () => ({
    signUp: false,
    login: true,
  }),
  methods: {
    openLogin() {
      this.signUp = false;
      this.login = true;
    },
    openSignUp() {
      this.login = false;
      this.signUp = true;
    },
    loginNow() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          console.log(token);
          // The signed-in user info.
          const { user } = result;
          console.log(user);
          // ...
          this.$router.push('/user');
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // The email of the user's account used.
          const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;
          console.log(email, credential);
          // ...
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          vm.$router.push('/user/login');
        }
      });
    });
  },
};
</script>
