<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();
const { chat, state, firstMessage } = useChatAi({ agent: "twitter" });
const announcement = computed(() => firstMessage.value?.content);
const postUrl = computed(
  () =>
    `https://x.com/intent/tweet/?text=${encodeURIComponent(
      announcement.value || ""
    )}`
);

const generate = () => nextTick(() => chat(props));
defineExpose({
  generate,
});
</script>

<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="announcement"
    class="mb-10"
  >
    <div class="flex w-full justify-between items-center">
      <div class="text-xs">
        Character count:
        <strong>{{ announcement?.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral" @click="generate">Regenerate</button>
        <a :href="postUrl" class="btn btn_primary" target="_blank">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
