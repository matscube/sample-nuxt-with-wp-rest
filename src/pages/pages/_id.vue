<template>
  <div>
    page id: {{ pageId }} status: {{ statusMessage }}
    <div v-if="loaded">
      title: {{ post.title.rendered }} content: {{ post.content }}
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Post } from '@/types/struct'

type Status = 'ok' | 'error'
interface LocalData {
  loaded: boolean
  status?: Status
  post?: Post
}
export default Vue.extend({
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData(context) {
    const result: Post | null = await context.$getPage(2)
    if (result === null) {
      return {
        loaded: true,
        status: 'error',
      }
    }

    return {
      loaded: true,
      status: 'ok',
      post: result,
    }
  },
  data: (): LocalData => {
    return {
      loaded: false,
    }
  },
  computed: {
    pageId() {
      return this.$route.params.id
    },
    statusMessage() {
      if (this.loaded) {
        return this.status === 'ok' ? '取得成功' : '取得失敗'
      } else {
        return '取得中...'
      }
    },
  },
  mounted() {
    console.info(`page id: ${this.$route.params.id}`)
  },
})
</script>
<style lang="sass" scoped></style>
