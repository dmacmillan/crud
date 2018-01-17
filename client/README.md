# usertest

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# My notes
# In order to get server working I had to add to /build/webpack.dev.conf.js under devServer:
     disableHostCheck: true
# I also had to set the port to 3000 and change the host from "localhost" to "0.0.0.0" in /config/index.js
# Install packages:
  npm install at-ui --save
  npm install axios --save
  npm install at-ui-style --save
