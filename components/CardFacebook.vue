<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();
const { chat, state, firstMessage } = useChatAi({ agent: "facebook" });
const announcement = computed(() => firstMessage.value?.content);
const postUrl = computed(
  () =>
    `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`
);
const generate = () => nextTick(() => chat(props));
defineExpose({
  generate,
});
const { copy } = useClipboard();
function post() {
  copy(announcement.value || "");
  setTimeout(() => {
    window.open(postUrl.value, "_blank");
  }, 500);
}
</script>

<template>
  <CardGeneric
    title="Facebook"
    :state="state"
    :body="announcement"
    class="mb-10"
  >
    <button class="btn btn-neutral" @click="generate">Regenerate</button>
    <a
      :href="postUrl"
      class="btn btn_primary"
      target="_blank"
      @click.prevent="post"
      >Post</a
    >
  </CardGeneric>
</template>
