<template>
    <div>
        <HeaderPage />
        <h1>Add Restaurant Information Here..</h1>
        <form class="add" @submit.prevent="addRestaurent">
            <div>
                <input type="text" id="name" name="name" placeholder="Enter Restaurant name" v-model="restaurent.name"
                    required />
                <span v-if="!validateName">Please enter a valid restaurant name.</span>
            </div>
            <div>
                <input type="text" id="address" name="address" placeholder="Enter Restaurant Address"
                    v-model="restaurent.address" required />
                <span v-if="!validateAddress">
                    Please enter a valid restaurant address.
                </span>
            </div>
            <div>
                <input type="text" id="contact" name="contact" placeholder="Enter Restaurant contact"
                    v-model="restaurent.contact" required />
                <span v-if="!validateContact">
                    Please enter a valid restaurant contact.
                </span>
            </div>
            <button type="submit" :disabled="!isFormValid">
                Add new Restaurant
            </button>
        </form>
    </div>
</template>

<script>
import HeaderPage from "./HeaderPage.vue";
import axios from "axios";

export default {
    name: "HomePage",
    components: {
        HeaderPage,
    },
    data() {
        return {
            restaurent: {
                name: "",
                address: "",
                contact: "",
            },
            validateName: true,
            validateAddress: true,
            validateContact: true,
        };
    },
    computed: {
        isFormValid() {
            return (
                this.validateName &&
                this.validateAddress &&
                this.validateContact
            );
        },
    },
    methods: {
        async addRestaurent() {
            // Validate before submitting
            if (!this.isFormValid) {
                return; // Do not submit if the form is not valid
            }

            const result = await axios.post("http://localhost:3000/restaurent", {
                name: this.restaurent.name,
                address: this.restaurent.address,
                contact: this.restaurent.contact,
            });

            if (result.status === 201) {
                this.$router.push({ name: "HomePage" });
            }
            console.warn(result);
        },
    },
    watch: {
        "restaurent.name"(newVal) {
            // Validate name
            this.validateName = newVal.trim() !== "";
        },
        "restaurent.address"(newVal) {
            // Validate address
            this.validateAddress = newVal.trim() !== "";
        },
        "restaurent.contact"(newVal) {
            // Validate contact
            this.validateContact = newVal.trim() !== "";
        },
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        this.userData = JSON.parse(user);
        this.name = this.userData[0].name;
        if (!user) {
            this.$router.push({ name: "SignUp" });
        }
    },
};
</script>
