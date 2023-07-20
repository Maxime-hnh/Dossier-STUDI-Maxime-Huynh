# :car: GARAGE WEBSITE

# :link: URL : 
- https://garage-vparrot.fly.dev/

# Made with : 
1. Front :
  - React js, react-router-dom, Formik, Yup, Bulma, Moment, React-icons
2. Back :
  - Node js, Sequelize, Express, Jsonwebtoken, bcrypt, joi, express-acl, cors, dotenv, fs, multer, 
3. Server :
  - Fly.io
  - Docker


# Prerequisites :

1. Node v16.15.1 with nvm
2. Postgres >=12 with extensions:
   - postgis


# Setup database :

1. Create a schema in pgAdmin with the name "garagevparrot_m" and set the owner to "postgres."


# :file_folder: installing (local) :
1. Go to Localhost branch and clone it
1. Run npm i in the root directory.
2. Navigate to the "client" folder and run npm i --force.


# :house: Running the local server :

1. Start the client, which listens on port 8001:
   - Navigate to the "client" folder.
   - Run npm run start.   

2. Start the server, which listens on port 8000:
   - Navigate to the "server" folder.
   - Run npm run start.

 
# :cop: Create admin account :

1. Modify the file "/server/models/user.js" and change the role's default value to 'admin' instead of 'user'.
2. Create the admin account using one of the following methods:
   - Postman or
   - pgAdmin (directly in the database)
   - After creating the admin account, revert the change in the "/server/models/user.js" file and set the role's default value back to 'user'.
