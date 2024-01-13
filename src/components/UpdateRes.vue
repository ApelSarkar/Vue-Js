<template>
    <HeaderPage />
    <h1>Hello {{ name }}, Welcome on Update Restaurant Page</h1>
    <form class="add" action="">
        <input type="text" name="name" placeholder="Enter name" v-model="restaurent.name">
        <input type="text" name="address" placeholder="Enter Addres" v-model="restaurent.address">
        <input type="text" name="name" placeholder="Enter contact" v-model="restaurent.contact">
        <button v-on:click="UpdateRestaurent" type="button">Update Restaurant</button>
    </form>
</template>
<script>
import axios from 'axios';
import HeaderPage from './HeaderPage.vue';
export default {
    name: 'HomePage',
    components: {
        HeaderPage
    },
    data() {
        return {
            restaurent: {
                name: '',
                address: '',
                contact: ''
            }
        }
    },
    methods: {
        async UpdateRestaurent() {
            const result = await axios.put("http://localhost:3000/restaurent/" + this.$route.params.id, {
                name: this.restaurent.name,
                address: this.restaurent.address,
                contact: this.restaurent.contact,

            })
            if (result.status == 200) {
                this.$router.push({ name: 'HomePage' })
            }
        }
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        this.userData = JSON.parse(user);
        this.name = this.userData[0].name
        if (!user) {
            this.$router.push({ name: 'SignUp' })
        }
        //    console.warn(this.$route.params.id)
        let id = this.$route.params.id
        const result = await axios.get('http://localhost:3000/restaurent/' + id)
        this.restaurent = result.data;
    }

}
</script>