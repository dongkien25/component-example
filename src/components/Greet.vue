<template>
    <div class="greet">
        
        <h3>Example</h3>
        <div>
            <!-- <div class="my-4">
                Greeting {{ message }}
            </div> -->
            <hr class="border-b">
            <v-btn @click="handleClick" class="ma-2" color="info">
                Load Table
            </v-btn>
        </div>
        <br/>
        <!-- <p>{{ result }}</p> -->
        
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, atrrs}">
                <v-btn 
                    color="info"
                    v-bind="atrrs"
                    v-on="on"
                >
                    Display dialog
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Title
                </v-card-title>
                <v-card-text>
                    Text content
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary"
                        @click="dialog = false" 
                    > Close 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <br/>
        <v-data-table
            :headers = "arrHeader"
            :items = "result"
            :hidden = "hideTable"
            :items-per-page="10"
        ></v-data-table>
        <router-link to="/formAirline">Form Airline</router-link>
    </div>
</template>
<script>
import { Vue, Component, Prop} from 'vue-property-decorator'
const url = "https://jsonplaceholder.typicode.com/posts"

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(json => console.log(json))

const axios = require('axios');
@Component
export default class Greet extends Vue{
    clicked = 0;
    dialog = false;
    @Prop({})
    message;
    result = [];
    arrHeader = [];
    hideTable = true;
    items = [];
    handleClick() {
        const id = `5fed8149aa76cd3b66c5d336`
        // axios.delete(`https://api.instantwebtools.net/v1/passenger/${id}`)
        const baseURL = 'https://api.instantwebtools.net'

            // axios.delete(`${baseURL}/v1/passenger/${id}`)
            // .then(function (response) {
            //     console.log(response);
            //     if (response.status === 200) {
            //         console.log('success')
            //     }
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });

            // axios.post(`${baseURL}/v1/passenger`, {
            //         "name": "John Doe",
            //         "trips": 250,
            //         "airline": 5
            //     })
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
             axios.patch(`${baseURL}/v1/passenger/${id}`, {
                    "name": "Kien",
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        // this.hideTable ? this.hideTable = false : this.hideTable = true;
        // axios
        // .get(url)
        // .then(response => {
        //     this.result = response.data;
        //     console.log(this.result)

        //     this.arrHeader = Object.keys(response.data[1]).map(header => ({
        //         text: header.toUpperCase(),
        //         value: header
        //         }));
        //     console.log(this.arrHeader);

            
        //     return this.result;
        // })
    }; 
    mounted() {
        
        // console.log(this.arrHeader)
    }

}
</script>