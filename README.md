Test function chaining in [OpenFaas](https://github.com/openfaas/faas).

* `world` function returns the text 'world'
* `hello` function take text as input and return 'hello _text_' as output
* `helloworld` chains the two functions above by taking the output of `world` as input for `hello` and outputs 'Hello world'
