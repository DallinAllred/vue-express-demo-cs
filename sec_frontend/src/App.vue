<script setup>
import { RouterLink, RouterView } from 'vue-router'

let cryptoLinks = [
  {
    title: 'Shift Cipher',
    to: 'shift'
  },
  {
    title: 'Book Cipher',
    to: 'book'
  }
];

let injectionLinks = [
{
    title: 'SQL Injection',
    to: 'sqli'
  },
]
</script>

<template>
  <header>
    <div class="ma-6"><h1>The Security Project</h1><h5>Dallin Allred</h5></div>
  </header>
  <nav class="ma-6">
    <v-btn variant="tonal">
      <RouterLink to="/" class="nav-item btn">Home</RouterLink>
    </v-btn>
    <v-btn variant="tonal">
      <div class="text-light-green">Cryptography</div>
      <v-menu activator="parent">
        <v-list class="bg-black">
          <v-list-item
            v-for="(item, index) in cryptoLinks"
            :key="index"
            :value="index"
          >
            <v-list-item-title>
              <RouterLink :to="item.to">{{ item.title }}</RouterLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn variant="tonal">
      <div class="text-light-green">Injection</div>
      <v-menu activator="parent">
        <v-list class="bg-black">
          <v-list-item
            v-for="(item, index) in injectionLinks"
            :key="index"
            :value="index"
          >
            <v-list-item-title>
              <RouterLink :to="item.to">{{ item.title }}</RouterLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </nav>

  <RouterView/>
</template>

<style>
</style>>
