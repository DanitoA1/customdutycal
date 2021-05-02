<template>
  <v-container
    class="mx-auto"
  >
    <v-card>
      <v-card-title>
        All registered users
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="tableheaders"
        :items="users"
        :search="search"
        :loading="users.length == 0"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline text-center mx-3">
                  You are about to change the role of this User
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="green darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="text-capitalize"
            color="deep-purple"
            :disabled="!superAdmin"
            @click="deleteItem(item)"
          >
            Change Role
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="320"
      persistent
    >
      <v-card>
        <v-card-title
          class="justify-center"
        >Make this user an Admin</v-card-title>
        <v-card-actions
          class="justify-center"
        >
          <v-btn
            class="mx-2"
            color="#FF8811"
            @click="UploadRates"
            small
            rounded
          >
            Rates
          </v-btn>
          <v-btn
            class="mx-2"
            right
            color="#FF8811"
            @click="UploadTariffs"
            small
            rounded
          >
            Tariffs
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase';
export default {
  name: 'Manager',
  data() {
    return {
      users: [],
      user: null,
      search: '',
      dialog: false,
      dialogDelete: false,
      superAdmin: false,
      editedIndex: '',
      tableheaders: [
        {
          text: 'Users Email',
          align: 'start',
          sortable: false,
          value: 'email',
        },
        { text: 'User Role', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },

  created() {
    const self = this;
    firebase.auth().onAuthStateChanged((user) => {
      self.user = user;
    });

    this.users = [];
    firebase
      .firestore()
      .collection('roles')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          if (doc.data().role.user) {
            user.type = 'Normal User';
          } else if (doc.data().role.admin){
            user.type = 'Admin User';
          } else {
            user.type = 'Super Admin';
          }
          console.log(doc.data());
          this.users.push(user);
        });
      });
  },
  mounted () {
    firebase.auth().onAuthStateChanged(userAuth => {
            if (userAuth) {
              firebase
                .auth()
                .currentUser.getIdTokenResult()
                .then(tokenResult => {
                  if (tokenResult.claims.superAdmin) {
                    this.superAdmin = true;
                  } else {
                    this.superAdmin = false;
                  }
              });
            }
        });
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((user) => {
          this.$router.push('/login');
          console.log(user);
        });
    },
    changeRole(uid, currentRole) {
      const addMessage = firebase.functions().httpsCallable('setUserRole');
      let data = {};

      if(currentRole == 1) {
        data = { uid, role: { admin: true } };
      }else {
        data = { uid, role: { user: true } };
      }

      addMessage(data)
        .then((result) => {
          this.$router.go()
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editItem(item) {
      this.editedIndex = this.riders.indexOf(item);
      const riderID = this.riders[this.editedIndex].id;
      this.$router.push({ name: 'editRiders', params: { id: riderID } });
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const userID = this.users[this.editedIndex].id;
      const userRole = this.users[this.editedIndex].role;
      if(userRole.user) {
        this.changeRole(userID, 1);
      }else if(userRole.admin) {
        this.changeRole(userID, 2);
      }
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>
