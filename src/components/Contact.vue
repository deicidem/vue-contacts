<template>
<div>
  <br>
  <router-link to="/contacts/">На главную</router-link>
  <h1 class="title">Информация</h1>
  <button @click="goBack(id); keyInc++" :disabled="goBackDisabled" class="btn btn-dark">Шаг назад</button>
  <hr>
  <ul class="list-group">
    <!-- Выводим список полей -->
    <app-contact-field
     v-for="(item, index) in contactInfo"
     :key="index + keyInc"
     :info="item"
     @edit="edit(index, $event)"
     @remove="remove(index)"></app-contact-field>
  </ul>
  <hr>
  <form @submit.prevent="submit">
      <div class="input-group flex-nowrap">
        <div class="input-group-prepend">
          <button class="btn btn-success" :disabled="!isCorrect"><i class="fas fa-plus"></i></button>
        </div>
        <input type="text" class="form-control" v-model="newField.title" placeholder="Название">
        <input type="text" class="form-control" v-model="newField.value" placeholder="Значение">
      </div>
    </form>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';

import AppContactField from "./ContactField";
export default {
  components: {
    AppContactField
  },
  data() {
    return {
      newField: {
        title: '',
        value: ''
      },
      // Индекс для обновления key у полей. Обновление нужно для того, чтобы компонент ререндерился и не возникало ошибок
      keyInc: 0
    }
  },
  computed: {
    id() {
      // Получаем ID
      return +this.$route.params.id
    },
    contactInfo() {
      // Получаем поля контакта
      return this.list[this.id].info;
    },
    goBackDisabled(){
      // Проверяем доступен ли шаг назад
      return this.list[this.id].infoPrev.length == 0;
    },
    ...mapGetters(['list']),
    isCorrect() {
      // Проверяем инпуты на корректность
      return /.+/.test(this.newField.title) && /.+/.test(this.newField.value)
    }
  },
  methods: {
    ...mapActions(['addField', 'removeField', 'editField', 'goBack']),
    submit() {
      this.addField({
        id: this.id,
        value: {
          title: this.newField.title,
          value: this.newField.value
        }
      })
      // Очищаем инпуты
      this.newField.title = '';
      this.newField.value = '';
    },
    edit(index, value) {
      this.editField({
        contactId: this.id,
        fieldId: index,
        value: value
      });
    },
    remove(index) {
      // Запрашиваем подтверждение
      if (confirm("Вы уверены, что хотите удалить это поле?")) {
        this.removeField({
          contactId: this.id,
          fieldId: index
        });
      }
    }
  }
}
</script>
