<template>
  <v-container
    class="fill"
    fluid
  >
    <v-row>
      <v-col
        md="3"
      >
        <v-navigation-drawer
          width="320"
          absolute
          v-model="drawer"
          color="white"
          :permanent="$vuetify.breakpoint.mdAndUp"
        >
          <div
            class="text-center mt-8"
          >
            <img
              height="30px"
              width="25px"
              src="/img/image 1.svg"
              alt="logo">
          </div>
          <div
            class="text-center mb-16"
          >
            <img
              height="20px"
              width="60"
              src="/img/valuehandlersLogo.png"
              alt="logo">
          </div>
          <v-list
            dense
          >
            <v-list-item
              class="text-caption my-1"
              color="#9B2D86"
              v-for="item in items"
              :key="item.title"
              :to="item.link"
            >
              <v-list-item-icon
                class="ml-16 mr-2"
              >
                <v-icon
                  size="20px"
                >{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="text-caption my-1"
              color="#9B2D86"
              @click="logOut()"
            >
              <v-list-item-icon
                class="ml-16 mr-2"
              >
                <v-icon
                  size="20px"
                >mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col
        md="9"
      >
        <router-view :user="authUser"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'User',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Advisory Services', icon: 'mdi-frequently-asked-questions', link: '/user' },
      { title: 'Pre Import Documentation', icon: 'mdi-file-document', link: '/user/preimport' },
      { title: 'Freight Shipping', icon: 'mdi-airplane-takeoff', link: '/user/freight' },
      { title: 'Post Clearance', icon: 'mdi-certificate', link: '/user/postclearance' },
      { title: 'Warehousing Support', icon: 'mdi-warehouse', link: '/user/warehousing' },
      { title: 'Logistics Services', icon: 'mdi-truck-fast', link: '/user/logistics' },
    ],
    authUser: {},
  }),
  methods: {
    logOut() {
      firebase.auth().signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push('/user/login');
          alert('Logout Successful');
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
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

<style scoped>
  .fill{
    margin: 0;
    padding: 0;
    background: #FCF4F8;
    height: 100%;
  }
</style>
