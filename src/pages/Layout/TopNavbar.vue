<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
        <div class="md-collapse">
          <md-list>
            <select v-model="lang">
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
          </md-list>
          <md-list>
            <md-list-item href="#/user">
              <!-- <i class="material-icons">person</i> -->
              <p :style="{ fontSize: '20px' }">{{ username }}</p>
            </md-list-item>
          </md-list>
          <md-list>
            <md-list-item href="#/login" id="btnLogout" @click="click_logout">
              <i class="material-icons">exit_to_app</i>
              <p class="hidden-lg hidden-md">Sign out</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { getUserNameFromCookie } from "../../cookie";
import { setGlo_MyLocale } from "../../lang/locale";
export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ],
      username: "",
      lang: "en"
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    click_logout: function() {
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push("login");
    }
  },
  mounted: function() {
    this.username = getUserNameFromCookie();
    this.lang = this.$i18n.locale;
  },

  watch: {
    lang: function() {
      /* istanbul ignore next */
      this.$i18n.locale = this.lang;
      /* istanbul ignore next */
      setGlo_MyLocale(this.lang);
      /* istanbul ignore next */
      this.$emit("change_language");
    }
  }
};
</script>

<style lang="css" scoped>
select {
  width: 100px;
  height: 30px;
  border: none;
  margin-top: 15px;
}
</style>
