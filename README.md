# sendgrid-subscribe-user

## How it works

It creates a server that enables certain features that are not (yet) implemented in Sendgrid's
marketing email service.

When the users access to the route '/', they get
a form from which they can subscribe to your service.

When they have successfully registered, the system redirects them to a ***successfully registered*** page,
or if the system encounters an error, it will redirect them to a ***unsuccessfully registered*** page.

## Running

Run ```npm i```, then ```node index.js```

Please remember to have set the env variable SENDGRID_API_KEY

If you are testing, you can do: ``` SENDGRID_API_KEY=<your_sg_api_key> node index.js ```

## Env Variables

- SENDGRID_API_KEY: No need for explanation
- PORT: The port in which the server is going to be running

## License

MIT.

## Credits

Juan Camilo Guarin P.
[@jcguarinp](http://twitter.com/jcguarinp)