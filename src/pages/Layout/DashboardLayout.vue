<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p class="text-white">{{ $t("dashboardLayout.dashboard") }}</p>
      </sidebar-link>
      <sidebar-link to="/account">
        <md-icon>person</md-icon>
        <p class="text-white">{{ $t("dashboardLayout.account") }}</p>
      </sidebar-link>
      <sidebar-link to="/instance">
        <md-icon>computer</md-icon>
        <p class="text-white">{{ $t("dashboardLayout.instance") }}</p>
      </sidebar-link>
      <sidebar-link to="/plan">
        <md-icon>schedule</md-icon>
        <p class="text-white">{{ $t("dashboardLayout.plans") }}</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter
  }
};
</script>
