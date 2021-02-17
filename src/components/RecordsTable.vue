<template>
  <div class="records-table">
    <v-data-table
      :headers="headers"
      :items="records"
      dense
      hide-default-footer
      :items-per-page="-1"
      no-data-text="No records yet"
    >
      <template v-slot:body="{ items, headers }">
        <tbody>
          <tr class="text-center" v-if="!items.length">
            <td :colspan="headers.length">
              No records yet.
            </td>
          </tr>
          <tr v-for="record in items" :key="record.id">
            <td v-for="(key, idx) in record" :key="key + idx">{{ key }}</td>
            <td>
              <v-btn-toggle multiple max="0">
                <v-btn small @click="editItem(record)">Edit</v-btn>
                <v-btn small @click="deleteRecord(record)">Delete</v-btn>
              </v-btn-toggle>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Item</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.title"
                  label="Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.description"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="editedItem.platform"
                  :items="platforms"
                  label="Platform"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to edit this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEdit">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="editItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecordsTable",
  data: () => ({
    headers: [
      { text: "#", value: "id", sortable: false },
      { text: "Title", value: "title", sortable: false },
      { text: "Description", value: "description", sortable: false },
      { text: "Platform", value: "platform", sortable: false },
      { text: "Downloads", value: "downloads", sortable: false },
      { text: "Revenue", value: "revenue", sortable: false },
      { text: "Date", value: "date", sortable: false },
      { text: "Actions", value: "", sortable: false }
    ],
    editedItem: {
      id: "",
      title: "",
      description: "",
      platform: "",
      downloads: "",
      revenue: "",
      date: ""
    },
    defaultItem: {
      id: "",
      title: "",
      description: "",
      platform: "",
      downloads: "",
      revenue: "",
      date: ""
    },
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    platforms: ["Windows", "MacOS", "Linux", "Android", "iOS"]
  }),
  computed: {
    ...mapGetters({
      records: "records/records"
    })
  },
  methods: {
    ...mapActions({
      removeRecord: "records/removeRecord",
      updateRecord: "records/updateRecord"
    }),
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    save() {
      this.dialogEdit = true;
    },
    closeEdit() {
      this.dialogEdit = false;
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    editItemConfirm() {
      this.updateRecord(this.editedItem);
      this.closeEdit();
      this.close();
    },
    deleteRecord(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.removeRecord(this.editedItem.id);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    }
  }
};
</script>

<style scoped></style>
