<template>
    <div>
        <h1>Log in</h1>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <div>
            <button type="submit" class="btn btn-outline-primary"
            @click="login();">
            Log in
            </button>
        </div>
        <h4> {{ message }} </h4>
    </div>
</template>

<script>
import AuthDataService from '../services/AuthDataService';


export default {
    data() {
        return {
            email: "",
            password: "",
            message: ""
        }
    },
    methods: {
        login() {
            var data = {
                email: this.email,
                password: this.password
            };

            AuthDataService.login(data)
            .then(response => {
                console.log(response.data);
                this.message = response.data.message;
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.$router.push("/texts");
                }
            })
            .catch(e => {
                console.log(e);
            });
        },
    }
}
</script>