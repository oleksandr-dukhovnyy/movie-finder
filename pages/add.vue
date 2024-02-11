<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="form flex flex-col mx-auto justify-center align-center"
    label-position="right"
  >
    <h2
      class="text-sm md:text-xl text-white text-center"
      style="margin-bottom: 18px"
    >
      Add a Movie
    </h2>

    <el-form-item
      prop="title"
      class="remove-asterisk"
    >
      <el-input
        v-model="ruleForm.title"
        size="large"
        placeholder="Title"
      />
    </el-form-item>

    <el-form-item
      prop="director"
      class="remove-asterisk"
    >
      <el-input
        v-model="ruleForm.director"
        size="large"
        placeholder="Director"
      />
    </el-form-item>
    <el-form-item
      prop="year"
      class="remove-asterisk"
    >
      <el-input
        v-model="ruleForm.year"
        size="large"
        placeholder="Release year"
      />
    </el-form-item>

    <el-form-item
      prop="poster"
      class="remove-asterisk"
    >
      <el-input
        v-model="/* @ts-ignore */ ruleForm.poster"
        placeholder="Poster"
        :type="posterType"
        size="large"
        accept="image/*"
      >
        <template #prepend>
          <el-select
            v-model="posterType"
            placeholder="Type"
            style="width: 80px"
            class="remove-validation-icon"
            size="large"
            @change="ruleForm.poster = ''"
          >
            <el-option
              label="File"
              value="file"
            />
            <el-option
              label="Url"
              value="text"
            />
          </el-select>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="remove-asterisk">
      <el-button
        type="primary"
        style="width: 120px"
        class="mx-auto"
        size="large"
        @click="submitForm(ruleFormRef)"
      >
        <span class="text-black"> Add a Movie </span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';

  const ruleFormRef = ref<FormInstance>();

  // Form data
  const ruleForm = reactive({
    title: '',
    director: '',
    poster: '' as string | File,
    year: '',
  });

  const posterType = ref<'text' | 'file'>('text');

  // Validation rules
  const rules = reactive<FormRules<typeof ruleForm>>({
    title: [{ validator: nonEmpty, trigger: 'blur' }],
    director: [{ validator: nonEmpty, trigger: 'blur' }],
    year: [{ validator: validYear, trigger: 'blur' }],
    poster: [{ validator: nonEmpty, trigger: 'blur' }],
  });

  // Submit handler
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async (valid) => {
      if (valid) {
        ElMessage({
          message: 'Movie has been added successfully!',
          type: 'success',
        });

        await navigateTo('/');
        return true;
      }

      return false;
    });
  };

  // Validators
  function nonEmpty(_: any, value: string, callback: any) {
    if (value?.length > 0) {
      callback();
      return;
    }

    callback('Please input value');
  }

  function validYear(_: any, value: string, callback: any) {
    const year = +value;

    if (year < 1895) {
      callback('Fun fact: The first movie was made in 1895');
      return;
    } else if (year > new Date().getFullYear()) {
      callback('The release year should not be greater than the current one!');
      return;
    }

    if (/^\d+$/.test(value.toString())) {
      callback();
      return;
    }

    callback('Please input correct number');
  }
</script>

<style scoped lang="scss">
  :deep(.remove-validation-icon .el-input__validateIcon) {
    display: none;
  }

  .remove-asterisk {
    margin-left: -120px;
  }

  .form {
    gap: 12px;
    width: 460px;

    @include media-down(md) {
      width: 100%;
    }
  }
</style>
