Test function chaining in [OpenFaas](https://github.com/openfaas/faas).

* `world` function returns the text 'world'
* `hello` function take text as input and return 'hello _text_' as output
* `helloworld` chains the two functions above by taking the output of `world` as input for `hello` and outputs 'Hello world'

Function piping works from the command line by piping the following commands - 
```bash
$ curl -s http://127.0.0.1:8080/function/world | curl -sX POST http://127.0.0.1:8080/function/hello --data @-
Hello world
```

However, chaining the functions following the [function director pattern](https://github.com/openfaas/faas/blob/master/guide/chaining_functions.md#function-director-pattern) does not seem to work. The function seems to _hang_ and CPU utilization of docker goes up drastically.