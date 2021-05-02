<template>
  <div>
    <v-row
      class="ml-16 mb-n4"
    >
      <v-col
        cols="8"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
        Search
      </v-col>
      <v-col
        cols="4"
      >
        <v-icon
          class="mr-3"
        >
          mdi-bell
        </v-icon>
        <v-avatar
          size="36px"
        >
          <img
            :src="user.photoURL"
            alt="U">
        </v-avatar>
      </v-col>
    </v-row>
    <v-divider
      class="mt-4"
    />
    <v-responsive
      id="box"
      class="overflow-y-auto"
      max-height="70vh"
      height="70vh"
    >
      <v-container>
        <div
          class="ml-16"
          v-for="message of messages"
          :key="message['.key']"
        >
          <div
            v-if="user.uid === message.userid"
            class="d-flex flex-column"
          >
            <v-card
              class="my-2 align-self-end"
              max-width="450px"
              rounded="t-xl bl-xl"
            >
              <v-card-text>
                {{ message.message }}
              </v-card-text>
            </v-card>
            <p
              class="caption align-self-end"
            >
              {{ message.createdAt | moment("ddd, hh:mm a") }}
            </p>
          </div>
          <div
            v-else
            class="d-flex flex-column"
          >
            <v-card
              class="my-2 align-self-start"
              max-width="450px"
              rounded="t-xl br-xl"
              color="#daa520"
            >
              <v-card-text>
                {{ message.message }}
              </v-card-text>
            </v-card>
            <p
              class="caption"
            >
              {{ message.createdAt | moment("ddd, hh:mm a") }}
            </p>
          </div>
        </div>
      </v-container>
    </v-responsive>
    <v-card
      class="fixedBottom"
      height="90px"
      rounded="lg"
    >
      <v-row
        class="my-auto"
      >
        <v-col
          cols="2"
        >
          <div
            v-if="attach"
          >
            <v-btn
              class="attachDoc ml-4"
              color="white"
              elevation="3"
              size="36"
              fab
              small
              @click="attachOpenClose"
            >
              <v-icon
                color="#9B2D86"
              >
                mdi-file
              </v-icon>
            </v-btn>
            <v-btn
              class="attachImg ml-4"
              color="#9B2D86"
              elevation="3"
              size="36"
              fab
              small
              @click="attachOpenClose"
            >
              <v-icon
                color="white"
              >
                mdi-image
              </v-icon>
            </v-btn>
          </div>
          <v-btn
            :class="attach ? 'mt-0 mt-n12 ml-4' : 'my-4 ml-4'"
            color="white"
            elevation="3"
            size="36"
            fab
            small
            @click="attachOpenClose"
          >
            <v-icon
              v-if="!attach"
              color="#9B2D86"
            >
              mdi-plus
            </v-icon>
            <v-icon
              v-if="attach"
              color="#9B2D86"
            >
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
        <v-col
          cols="8"
        >
          <v-text-field
            class="my-4"
            v-model="message"
            @keyup.enter="sendMessage()"
            label="Type your message here...."
            flat
            solo
            dense
          />
        </v-col>
        <v-col
          cols="2"
        >
          <v-btn
            class="my-2"
            icon
            x-large
            @click="sendMessage()"
          >
            <v-icon
              class="mt-n2 icon-rotate"
              size="40"
              color="#9B2D86"
            >
              mdi-send
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { rt } from '@/firebase';

export default {
  name: 'Advisory',
  props: {
    user: Object,
  },
  components: {
    // ghh
  },
  data() {
    return {
      attach: false,
      message: '',
      messages: [],
    };
  },
  firebase: {
    messages: rt.ref('messages'),
  },
  methods: {
    attachOpenClose() {
      this.attach = !this.attach;
    },
    sendMessage() {
      rt.ref('messages').push({
        message: this.message,
        userid: this.user.uid,
        username: this.user.displayName,
        createdAt: Date(),
      });
      this.message = '';
    },
  },
  computed: {
    target() {
      return 0;
    },
    options() {
      return {
        duration: 200,
        offset: 1,
        easing: 'linear',
      };
    },
  },
  watch: {
    messages() {
      setTimeout(() => {
        const box = this.$el.querySelector('#box');
        box.scrollTop = box.scrollHeight;
      }, 500);
    },
  },
};
</script>

<style scoped>
  .fixedTop {
    position: sticky;
    top: 0px;
    z-index: 2;
  }
  .fixedBottom {
    position: sticky;
    bottom: 0%;
    width: 600px;
    margin-left: 13%;
    z-index: 2;
  }
  .attachDoc {
    margin-top: -150px;
  }
  .attachImg {
    margin-top: -100px
  }
  .icon-rotate {
    filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=0.5);
    -webkit-transform: rotate(-35deg);
    -moz-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    -o-transform: rotate(-35deg);
    transform: rotate(-35deg);
    display: inline-block;
  }
</style>
