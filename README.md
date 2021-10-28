# jsramverk2

1. Run npm install 

2. change url:s to your own database
in app/config/db.config.js and in server.js

3. you also need to change in vue_frontend
but first also run "npm install" here, then in vue_frontend/src/http-common.js change to your own url and then
run "npm run build" to make a own dist with the right files,

4. after that if you dont want to run the front and backen separte
you need to copy the updated dist folder in to app/views and replace
all the files in there with the new ones.
After this it should be done to test out.
