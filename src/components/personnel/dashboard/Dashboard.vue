<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card class="ma-2">
          <v-img src="https://picsum.photos/200/300" height="150px"></v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline">
                <v-icon left x-large>account_circle</v-icon>as Coordinator
              </div>
              <!-- <span class="red--text">desription</span> -->
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text block color="primary" router to="/personnel/coordinator/dashboard">
              <v-icon left>dashboard</v-icon>Dashboard
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="ma-2">
          <v-img src="https://picsum.photos/200/300" height="150px"></v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline">
                <v-icon left x-large>directions_run</v-icon>as Staff
              </div>
              <!-- <span class="red--text">desription</span> -->
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text block color="primary" router to="/personnel/staff/dashboard">
              <v-icon left>dashboard</v-icon>Dashboard
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-layout row wrap>
      <v-flex v-for="(dog, index) in dogs" :key="dog.id" xs12 md6 xl3 pa-2>
        <v-card @click="$router.push({name: 'details', params:{ id:dog.id, dog:dogs[index] }})">
          <v-img height="170" :src="dog.url" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title style="padding-top:13px">
            <div>
              <h3 class="headline">{{ dog.comment }}</h3>
              <div>{{ dog.info }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      dogs: [
        {
          id: 0,
          url:
            "https://images.dog.ceo/breeds/germanshepherd/n02106662_13904.jpg",
          comment: "Dog resting",
          info: "Posted by Eder on Friday"
        },
        {
          id: 1,
          url: "https://images.dog.ceo/breeds/setter-gordon/n02101006_4491.jpg",
          comment: "Tongue dog",
          info: "Posted by Naye on Tuesday"
        },
        {
          id: 2,
          url:
            "https://images.dog.ceo/breeds/terrier-australian/n02096294_1429.jpg",
          comment: "Terrier Australian dog",
          info: "Posted by Eder on Monday"
        },
        {
          id: 3,
          url:
            "https://images.dog.ceo/breeds/mexicanhairless/n02113978_1595.jpg",
          comment: "Mexico Xoloitzcuintle",
          info: "Posted by Naye on Monday"
        },
        {
          id: 4,
          url: "https://images.dog.ceo/breeds/dachshund/dog-495133_640.jpg",
          comment: "Sad dog",
          info: "Posted by Eder on Monday"
        }
      ]
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
