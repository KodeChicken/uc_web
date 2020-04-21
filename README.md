# vuetest

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



###跨域问题
我们的客户端和服务端交互的时候使用的是 token，通过 Authorization头发送到服务端，
并没有使用到 cookie，所以客户端没有必要设置 withCredentials: true
withCredentials: false, // Check cross-site Access-Control
