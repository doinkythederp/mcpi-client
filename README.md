# mcpi-client
A client to connect to the Minecraft: Pi Edition api.

```ts
import { World } from 'mcpi-client';

const world = new World({
  host: 'raspberry.pi'
});

world.chat.send('Hello, Pi!')
  .then(() => console.log('sent!'))
  .catch(console.error);
```