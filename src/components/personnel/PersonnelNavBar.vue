<template>
  <nav>
    <v-app-bar text app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">TaskForce</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="rightDrawer =! rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>

    <v-btn text class="ml-0 mt-3" v-if="$route.meta.level !== 0" @click="$router.go(-1) ">
      <v-icon left>arrow_back</v-icon>Back
    </v-btn>
    <!-- <p class="ml-3 mb-2">{{$route.name}}</p> -->

    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="miniVariant" color="sidebar">
      <!-- list head-->
      <v-list class="pa-1">
        <v-list-item v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
          <v-list-item-action>
            <v-icon>chevron_right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.data.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list>
        <!--sub list other-->
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          :disabled="link.disabled"
        >
          <v-list-item-action>
            <v-icon color="#676767">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="account_circle" no-action>
          <template v-slot:activator>
            <v-list-item class="pl-0">
              <v-list-item-title>Coordinator</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            ripple
            v-for="link in coordinatorMenu"
            :key="link.text"
            router
            :to="link.route"
            :disabled="link.disabled"
          >
            <v-list-item-title>{{link.text}}</v-list-item-title>
            <v-list-item-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="directions_run" no-action>
          <template v-slot:activator>
            <v-list-item class="pl-0">
              <v-list-item-title>Staff</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            ripple
            v-for="link in staffMenu"
            :key="link.text"
            router
            :to="link.route"
            :disabled="link.disabled"
          >
            <v-list-item-title>{{link.text}}</v-list-item-title>
            <v-list-item-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn small color="red" @click="logout">
              <span>Sign Out</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>language</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <!-- <LocaleSwitcher /> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>brightness_4</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>Dark Theme</v-list-item-content>
          <v-list-item-action>
            <v-switch color="black" @change="switchTheme"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import auth from "@/config/auth";

export default {
  data() {
    return {
      drawer: true,
      rightDrawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      user: "",
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/personnel/dashboard",
          disabled: false
        }
      ],
      coordinatorMenu: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/personnel/coordinator/dashboard",
          disabled: false
        },
        {
          icon: "how_to_reg",
          text: "Distribute Assignment",
          route: "/personnel/coordinator/assignment",
          disabled: false
        },
        {
          icon: "assessment",
          text: "Report",
          route: "/personnel/coordinator/report",
          disabled: true
        },
        {
          icon: "bubble_chart",
          text: "Statistic",
          route: "/personnel/coordinator/Statistic",
          disabled: true
        }
      ],
      staffMenu: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/personnel/staff/dashboard",
          disabled: false
        },
        {
          icon: "assignment",
          text: "Task",
          route: "/personnel/staff/assignment",
          disabled: false
        },
        {
          icon: "assessment",
          text: "Report",
          route: "/personnel/staff/report",
          disabled: true
        }
      ]
    };
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    switchTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout: function() {
      localStorage.removeItem("lbUser");
      this.$router.replace({ path: "/" });
    }
  }
};
</script>
<style scoped>
</style>
