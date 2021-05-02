<template>
  <v-container>
    <div
      v-for="message of messages"
      :key="message['.key']"
    >
      <div
        v-if="user.uid === message.userid"
        class="d-flex flex-row-reverse"
      >
        <v-card
          class="mr-16 my-2"
          max-width="450px"
          rounded="t-xl bl-xl"
        >
          <v-card-text>
            {{ message.message }}
          </v-card-text>
        </v-card>
        <p>
          {{ message.createdAt | moment("ddd, hh:mm a") }}
        </p>
      </div>
      <v-card
        v-else
        class="my-2"
        max-width="450px"
        rounded="t-xl br-xl"
        color="#daa520"
      >
        <v-card-text>
          {{ message.message }}
        </v-card-text>
      </v-card>
      <div id="bottom"></div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'AdvisoryChatCmp',
  props: {
    messages: Array,
    user: Object,
  },
  methods: {
    ScrollToBottom() {
      const box = this.$el.querySelector('#box');
      box.scrollTop = box.scrollHeight();
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
      const box = this.$el.querySelector('#box');
      box.scrollTop = box.scrollHeight;
    },
  },
};
</script>
