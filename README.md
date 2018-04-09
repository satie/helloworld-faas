Test function chaining in [OpenFaas](https://github.com/openfaas/faas).

* `world` function returns the text 'world'
* `hello` function take text as input and return 'hello _text_' as output
* `helloworld` chains the two functions above by taking the output of `world` as input for `hello` and outputs 'Hello world'

### Build and deploy functions
```bash
$ faas-cli build -f world.yml
$ faas-cli deploy -f world.yml
$ faas-cli build -f hello.yml
$ faas-cli deploy -f hello.yml
$ faas-cli build -f helloworld.yml
$ faas-cli deploy -f helloworld.yml
```

Function piping works from the command line by piping the following commands - 
```bash
$ curl -s http://127.0.0.1:8080/function/world | curl -sX POST http://127.0.0.1:8080/function/hello --data @-
Hello world
```

To chain functions follow the [function director pattern](https://github.com/openfaas/faas/blob/master/guide/chaining_functions.md#function-director-pattern). Use `gateway` explicitly as the hostname of the API gateway when calling a function. For example,

```javascript
request.get('http://gateway:8080/function/func1', (e, r, b) => {

});
``` 

I made the mistake of referring to the hostname where my API gateway is deployed (`localhost`), and that ended up in the OpenFaaS being stuck with the function call.