CSP Style Channels
=

CSP style concurrency based off [Tony Hoare's formal language](https://en.wikipedia.org/wiki/Communicating_sequential_processes).  

Useage
-

```const Channel = require('node-csp-channels').default;```

or if using newer syntax or babel

```import Channel from 'node-csp-channels';```

Then simply:

```
  const myChannel = new Channel();
  (async () => {
    await myChannel.put('Hello world!');
    const res = await myChannel.take();
    console.log(res); // Prints 'Hello world!'
  });

```

This is best used with async/await and hasn't been tested with promises or other concurrency libs.  


API
=

```Channel.put(obj)```
--

Takes a JavaScript object and places it on the channel.  If the channel is occupied it will wait until it is free (possibly blocking forever) and then place the data on.  You can wait for the put to succeed by calling:

```await Channel.put(obj)```.

```Channel.take()```
--

Will take the next available value off the channel.  If the channel has no value it will wait until there is a value, then return the data.  If you require the value before proceeding you can await it.  

```const result = await Channel.take()```

Building and contributing
=

If you want to build locally just clone the repository and run ```npm run build``` to create the lib folder.  If you want to run tests just run ```npm test```.  

If you want to contribute please follow the eslint guidelines and ensure all code follows the style guidelines and has tests before submitting a pull request.  