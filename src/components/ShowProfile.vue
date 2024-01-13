<template>
    <div>
        <HeaderPage />
        <div class="profile-container">
            <h1>User Profile</h1>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.password }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-controls">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script>
import HeaderPage from "./HeaderPage.vue";
import axios from "axios";

export default {
    name: "ShowProfile",
    components: {
        HeaderPage,
    },
    data() {
        return {
            users: [],
            itemsPerPage: 5,
            currentPage: 1,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.users.length / this.itemsPerPage);
        },
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.users.slice(start, end);
        },
    },
    async mounted() {
        let result = await axios.get("http://localhost:3000/user/");
        console.warn(result);
        this.users = result.data;
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
};
</script>

<style scoped>
.profile-container {
    text-align: center;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}

.pagination-controls {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-controls button {
    margin: 0 5px;
    padding: 8px;
    cursor: pointer;
}

.pagination-controls button:disabled {
    cursor: not-allowed;
}
</style>
