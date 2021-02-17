<template>
  <div class="records-form">
    <v-card>
      <v-card-title>Добавить запись</v-card-title>
      <v-card-text>
        <v-text-field
          outlined
          dense
          v-model.trim="recordItem.title"
          label="Title"
        />
        <v-text-field
          outlined
          dense
          v-model.trim="recordItem.description"
          label="Description"
        />
        <v-select
          outlined
          dense
          v-model="recordItem.platform"
          :items="platforms"
          label="Platform"
        />
        <v-text-field
          outlined
          dense
          type="number"
          v-model.number="recordItem.downloads"
          label="Downloads"
        />
        <v-text-field
          outlined
          dense
          type="number"
          v-model.number="recordItem.revenue"
          label="Revenue"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addRecord">Add record</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RecordsForm",
  data: () => ({
    recordItem: {
      id: "",
      title: "",
      description: "",
      platform: "",
      downloads: "",
      revenue: "",
      date: ""
    },
    platforms: ["Windows", "MacOS", "Linux", "Android", "iOS"]
  }),
  computed: {
    ...mapGetters({
      lastRecordId: "records/lastRecordId"
    }),
    checkLength() {
      return Object.values(this.recordItem).every(i => i.toString().length);
    }
  },
  methods: {
    ...mapActions({
      addNewRecord: "records/addNewRecord"
    }),
    addRecord() {
      this.recordItem.date = new Date().toLocaleDateString();
      this.recordItem.id = this.lastRecordId + 1;
      if (!this.checkLength) {
        return;
      }
      this.addNewRecord({ ...this.recordItem });
      Object.keys(this.recordItem).forEach(key => {
        this.recordItem[key] = "";
      });
    }
  }
};
</script>

<style scoped></style>
