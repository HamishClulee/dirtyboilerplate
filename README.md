# Just another crappy ExpressJS - VueJs Boilerplate
i use this as an app/website starter kit if I want to throw something up, quick and dirty

uses mongo and mongo session auth and passport.js, displays an under construction page if no session token exists and the site if one does

login, profile and signup pages served at the following super creative route names
```
/login
/signup
/profile (just a session id and logout button)
```
if youre in dev, these routes will hang off the server port
```
localhost:5001/login
```
not
```
localhost:8080/login
```

run the dev script below, both front and back are set up with hot reload, the `deploy.sh` handles getting the static assets from the front end build system in to the servers `/static` folder, that bit is really upto you, i use digital ocean for quick and dirty, because cheap, if you are different, thats great, work out your own deploy pipe

front is set up with a simple sass system (no alliteration intended), variables, some typography helpers, a button component etc
the variables are accessible in all .vue components without imports

there is an axios instance which is exported under the name `NODE` for http reqs

vuex, and vue-router installed as well

also features a terrible 404 page for no extra charge

i am under no illusions here, just accept this for what its is, its got everything you need to start hacking, including auth

you're welcome
## dev
from project root

`sh ./dev`

need mongo installed and an `app.js` file at
`/server/config/app.js`

#### example `app.js`
```javascript
module.exports = {
    'sessionkey': 'insert_a_rando_key',
    'dburl': 'mongodb://localhost:<your_awesome_port>/yourcooldbname'
}
```

## deploy

if you are using digital ocean the deploy machine could work for you without too much hackery

need your ssh keys added to server and to edit the deploy script to suit your bit and pieces

from root
`sh ./deploy 'your deploy / commit message'`
