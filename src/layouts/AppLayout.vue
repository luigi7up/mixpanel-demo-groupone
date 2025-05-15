<template>
  <div class="d-flex">
    <nav class="bg-light sidebar p-3" style="width: 220px; min-height: 100vh;">
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link to="/application/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/gallery" class="nav-link">Gallery</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/widgets" class="nav-link">Widgets</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/bookings" class="nav-link">Bookings</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/seo_tools" class="nav-link">SEO Tools</router-link>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1 p-4">
      <header class="d-flex justify-content-between align-items-center mb-4">
        <router-link to="/" class="navbar-brand" style="cursor:pointer;">
          <!-- <img src="/logo.png" alt="Logo" style="height: 40px;" /> -->
          <img src="@/assets/logo.png" alt="Logo" style="height: 40px;" />
        </router-link>
        <!-- add other header content -->
      </header>

      <router-view />
    </main>
  </div>
</template>
