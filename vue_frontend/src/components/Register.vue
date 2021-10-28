<template>
<div>
    <div v-if="!submitted">
        <h1>Create account</h1>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
            <label for="passwrd" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <div>
            <button type="submit" class="btn btn-outline-primary"
            @click="signup();">
            Register
            </button>
        </div>
    </div>
    <div v-if="submitted">
        <h1>{{ message }}</h1>
    </div>
</div>
</template>

<script>
import auth from '../services/AuthDataService';

export default {
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            message: ""
        }
    },
    methods: {
        signup() {
            if (!this.validEmail(this.email)) {
                this.submitted = true;
                console.log("Unvalid email!");
                this.message = "Unvalid email, please try again";
            } else {
                var data = {
                    email: this.email,
                    password: this.password
                };

                auth.create(data)
                .then(response => {
                    console.log(response.data);
                    this.message = response.data.message;
                    this.submitted = true;
                    if (!response.data.message) {
                        this.$router.push("/login");
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>