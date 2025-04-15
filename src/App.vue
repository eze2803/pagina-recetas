<template>
  <nav class="navbar bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Inicio</router-link>
      <router-link to="/recetas" class="navbar-brand">Recetas</router-link>
      <router-link to="/login" class="navbar-brand">Login</router-link>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
  <router-view />
</template>

<style scoped></style>
