<template>
  <v-app id="app">
    <v-app-bar app>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="home">
            <v-row justify="center">
              <v-col cols="10">
                <records-form />
              </v-col>
              <v-col cols="10">
                <records-table />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RecordsTable from "@/components/RecordsTable";
import RecordsForm from "@/components/RecordsForm";

export default {
  name: "App",
  components: { RecordsForm, RecordsTable }
};
</script>
