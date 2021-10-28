<template>
    <div v-if="!submitted">
        <h1>Send invite</h1>
        <p> Invite a friend or colleauge to sign up and edit texts. </p>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div>
            <button type="submit" class="btn btn-outline-primary"
            @click="send();">
            Send invite
            </button>
        </div>
    </div>
    <div v-else>
        <h1> Invite sent! </h1>
    </div>
</template>

<script>
import MailDataService from '../services/MailDataService';


export default {
    data() {
        return {
            email: "",
            submitted: false
        }
    },
    methods: {
        send() {
            var data = {
                email: this.email,
            };
            MailDataService.sendMail(data)
            .then(response => {
                console.log("Response: ", response);
                this.submitted = true;
            })
            .catch(e => {
                console.log(e);
            });
        },
    }
}
</script>