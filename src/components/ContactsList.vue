<template>
<div class="container">
  <h1 class="title">Контакты</h1>
  <app-input @submit="add($event)"></app-input>
  <hr>
  <app-list></app-list>
</div>
</template>

<script>
import AppInput from './Input';
import AppList from './List';
import {mapActions} from 'vuex';

export default {
  components: {
    AppInput,
    AppList
  },
  methods: {
    ...mapActions(['add'])
  }
}
</script>

