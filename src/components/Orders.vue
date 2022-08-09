<template>
  <v-data-table
    :headers="headers"
    :items="prods"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-form style="width:100%;">
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          
          class="mr-5"
          ></v-text-field>
        </v-form>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Product
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                    v-model="editedItem.title"
                    label="Product Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                    v-model="editedItem.price"
                    label="Price"
                    type="number"
                    min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                    v-model="editedItem.amount"
                    label="Amount"
                    type="number"
                    min="0"
                    max="100"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6 justify-center">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
      small
      class="mr-2"
      @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      
      <v-icon
      small
      @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
    name: "Orders",
    data(){
        return {
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {
                title: '',
                price: 0,
                amount: 0,
            },
            defaultItem: {
                title: '',
                price: 0,
                amount: 0,
            },
            search: '',
            headers: [
                {
                    text: 'Product Name',
                    align: 'start',
                    sortable: false,
                    value: 'title',
                },
                { text: 'Price ($)', value: 'price'},
                { text: 'Amount', value: 'amount' },
                { text: 'Actions', value: 'actions'},
            ],
            prods:[
                { 
                    "id": 1,
                    "title": "Samsung Note 9",
                    "price": 100,
                    "amount": 2
                },
                { 
                    "id": 2,
                    "title": "Smart Watch",
                    "price": 90,
                    "amount": 1
                },
                { 
                    "id": 3,
                    "title": "Iphone 11",
                    "price": 70,
                    "amount": 5
                },
                { 
                    "id": 4,
                    "title": "Oppo A3s",
                    "price": 50,
                    "amount": 3
                },
                { 
                    "id": 5,
                    "title": "iphone 11 Pro Max",
                    "price": 40,
                    "amount": 6
                },
                { 
                    "id": 6,
                    "title": "iphone 11 Pro Max",
                    "price": 90,
                    "amount": 6
                },
                { 
                    "id": 7,
                    "title": "Mac",
                    "price": 120,
                    "amount": 3
                },
                { 
                    "id": 8,
                    "title": "Lenove Laptop",
                    "price": 120,
                    "amount": 2
                },
                { 
                    "id": 9,
                    "title": "Mobile Reno 5",
                    "price": 100,
                    "amount": 3
                },
                { 
                    "id": 10,
                    "title": "Samsung S22 Ultra",
                    "price": 100,
                    "amount": 4
                },
                { 
                    "id": 11,
                    "title": "OPPO F9",
                    "price": 100,
                    "amount": 3
                },
                { 
                    "id": 12,
                    "title": "PC",
                    "price": 100,
                    "amount": 1
                },
                { 
                    "id": 13,
                    "title": "XBox",
                    "price": 100,
                    "amount": 3
                },
                { 
                    "id": 14,
                    "title": "Laptop Dell",
                    "price": 9.91,
                    "amount": 2
                },
                { 
                    "id": 15,
                    "title": "iphone 13 Bro Max",
                    "price": 110,
                    "amount": 3
                }
            ]
        }
    },
    computed:{
        formTitle () {
            return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
        },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods:{
        editItem (item) {
            this.editedIndex = this.prods.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.prods.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.prods.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.prods[this.editedIndex], this.editedItem)
            } else {
            this.prods.unshift(this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<style scoped>
    .v-icon:hover {
        color: #1976d2
    }
</style>