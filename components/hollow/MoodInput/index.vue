<template>
  <div class="mood-record-container">
    <el-input
      ref="textareaRef"
      v-model="moodText"
      :autosize="{ minRows: 7, maxRows: 10 }"
      type="textarea"
      placeholder="记录此刻的心情……"
    />
    <div class="mood-action">
      <div @click="tagModalVisible = true">#</div>
      <div class="iconfont icon-xingxing" />
      <div class="iconfont icon-tupian" />
    </div>
  </div>
  <div
    class="tag-modal animate__animated animate__bounceInUp"
    v-if="tagModalVisible"
  >
    <div class="title">
      <el-icon
        :size="20"
        style="margin-left: 24px; cursor: pointer"
        @click="handleCancelTag"
      >
        <Close />
      </el-icon>
      <p>标签</p>
      <p style="margin-right: 24px; cursor: pointer" @click="handleTagComplete">
        完成
      </p>
    </div>
    <el-divider style="margin-top: 10px" />

    <div style="padding: 0 24px">
      <el-input
        v-model="tag"
        placeholder="输入后点击添加或回车添加"
        size="small"
        @keyup.enter.native="handleEnter"
      >
        <template #append>
          <el-button :icon="Pointer" @click="handleAddTag" />
        </template>
      </el-input>
    </div>
    <div class="tag-container">
      <template v-for="item of tags">
        <div class="tag">
          <span>{{ item }}</span>
          <el-icon :size="14" @click="() => hanldeTagDelete(item)">
            <Close />
          </el-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue'
import { Close, Pointer } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    initTags: string[]
    initText: string
  }>(),
  {
    initTags: [] as string[],
    initText: '',
  }
)

const moodText = ref<string>(props.initText)
const tag = ref<string>('')
const tags = ref<string[]>(props.initTags)
const tagModalVisible = ref<boolean>(false)

const addTag = () => {
  if (tag.value?.length) {
    tags.value.push(tag.value)
    tag.value = ''
  } else {
    ElMessage({
      message: '请输入标签',
      center: true,
      type: 'warning',
      grouping: true,
      offset: 100,
    })
  }
}

const handleAddTag = () => {
  addTag()
}

const handleEnter = () => {
  addTag()
}

const hanldeTagDelete = (tag: string) => {
  tags.value = tags.value.filter((item: string) => item !== tag)
}

const handleCancelTag = () => {
  tagModalVisible.value = false
  tag.value = ''
  tags.value = props.initTags
}

const handleTagComplete = () => {
  tagModalVisible.value = false
}

defineExpose({
  moodText,
  tags,
})
</script>

<style lang="less" scoped>
.mood-record-container {
  position: relative;

  --el-color-primary: var(--primary-color-orange);
  .mood-action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: -20px;
  }
  .mood-action div {
    cursor: pointer;
    margin: 10px 0;
  }
}
.tag-modal {
  --el-color-primary: var(--primary-color-orange);

  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  height: calc(100vh - 250px);
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    p {
      font-size: 14px;
    }
  }
  .tag-container {
    padding: var(--page-container-padding);
    display: flex;
    flex-wrap: wrap;
    .tag {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(64, 158, 255, 0.1);
      color: var(--primary-color-blue);
      padding: 2px 10px;
      border-radius: 20px;
      width: fit-content;
      font-size: var(--normal-font-size);
      margin-right: 10px;
      margin-bottom: 10px;
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
