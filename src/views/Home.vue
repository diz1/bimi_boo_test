<template>
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
</template>

<script>
import RecordsTable from "@/components/RecordsTable";
import RecordsForm from "@/components/RecordsForm";

export default {
  name: "Home",
  components: { RecordsForm, RecordsTable }
};
</script>
