<template>
    <HeaderPage />
    <h1>Hello {{ name }}, Welcome on Home Page</h1>

    <table border="1">
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Contact</td>
            <td>Address</td>
            <td>Actions</td>

        </tr>
        <tr v-for="item in restaurent" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.address }}</td>
            <td>
                <router-link :to="'/update/' + item.id"
                    style="text-decoration: none; color: blue; margin-right: 8px;">Update</router-link>
                <button v-on:click="deleteRest(item.id)"
                    style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">Delete</button>
            </td>
        </tr>
    </table>
</template>
<script>
import HeaderPage from './HeaderPage.vue';
import axios from 'axios';
export default {
    name: 'HomePage',
    data() {
        return {
            name: '',
            restaurent: [],
        }
    },
    components: {
        HeaderPage
    },
    methods: {
        async deleteRest(id) {
            let result = await axios.delete("http://localhost:3000/restaurent/" + id);
            console.log(result);
            if (result.status == 200) {
                this.loadData();
            }
        },
        async loadData() {
            let user = localStorage.getItem('user-info');
            this.userData = JSON.parse(user);
            this.name = this.userData[0].name
            // console.log(JSON.parse(user));
            if (!user) {
                this.$router.push({ name: 'SignUp' })
            }
            let result = await axios.get("http://localhost:3000/restaurent");
            // console.log(result);
            this.restaurent = result.data;
        }
    },
    async mounted() {
        this.loadData();
    }
}
</script>
<style>
td {
    width: 160px;
    height: 40px;
}

table {
    margin-left: auto;
    margin-right: auto;
}
</style>