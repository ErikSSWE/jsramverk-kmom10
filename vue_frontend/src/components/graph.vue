<template>
    <div>
        <div>
            <button type="submit" class="btn btn-warning" @click="test();">Get graphql</button>
        </div>
        <div>
            <ul v-for="items in i" :key="items.title" class="list-group">
                <li class="list-group-item"> Title: {{ items.title }} </li>
                <li class="list-group-item"> Text: {{ items.text }} </li>
                <li class="list-group-item"> Id: {{ items.id }} </li>
            </ul>
        </div>
    </div>
</template>


<script>

export default {
  name: "test",
  data() {
    return {
      i: []
    };
  },
  methods: {
      test() {
          fetch('https://jsramverk-editor-ersr20.azurewebsites.net/api/graphql/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: "{ texts {id title text createdAt updatedAt} }" })
                })
                .then(r => r.json())
                .then(data => { 
                    console.log('data returned:', data.data.texts)
                    this.i = data.data.texts;
                    }
                )
        }
    }
};

</script>