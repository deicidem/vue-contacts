<template>
<div>
  <li class="list-group-item d-flex justify-content-between align-items-center" >
    <label v-if="!isEdit" for="">
      {{info.title}} : {{info.value}}
      <div class="button-group">
        <button @click="isEdit = true" class="btn btn-primary">
          <i class="fas fa-edit"></i>
        </button>
        <button @click="remove" class="btn btn-danger">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </label>
    <form v-else @submit.prevent="onSubmit">
      <div class="input-group flex-nowrap">
        <div class="input-group-prepend">
          <button class="btn btn-primary" @click="onSubmit" :disabled="!isCorrect"><i class="fas fa-check"></i></button>
          <button class="btn btn-danger" @click="onReject"><i class="fas fa-times"></i></button>
        </div>
        <input type="text" class="form-control" :value="newField.title" @input="onInput($event, 'title')" placeholder="Название">
        <input type="text" class="form-control" :value="newField.value" @input="onInput($event, 'value')" placeholder="Значение">
      </div>
    </form>
  </li>
</div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      newField: {
        title: this.info.title,
        value: this.info.value
      },
      isEdit: false
    }
  },
  methods: {
    onSubmit() {
      this.$emit('edit', this.newField);
      this.isEdit = false;
    },
    remove() {
      this.$emit('remove');
    },
    onInput(e, field) {
      this.newField[field] = e.target.value;
    },
    onReject() {
      // Запрашиваем подтверждение
      if (confirm("Вы уверены, что хотите отменить изменения?")) {
        this.isEdit = false;
      // Возвращаем старые значения в инпуты
        this.newField.title = this.info.title;
        this.newField.value = this.info.value;
      }
    }
  },
  computed: {
    isCorrect() {
      // Проверяем инпуты на корректность
      return /.+/.test(this.newField.title) && /.+/.test(this.newField.value)
    }
  }
}
</script>

<style scoped>
label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}
</style>
