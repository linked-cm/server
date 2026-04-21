# LINCD Server

This package provides a `LincdServer` which can be used to instantiate a LINCD backend environment on node.js.

If you use `npx lincd-cli create-app [name]` it will already set everything up for you to use `LincdServer`.
To see how it's used, open `your-site/backend/server.js`.

If you require any additional features, feel free to make a request at the LINCD Discord server.
If you want to further adjust the functionality of LincdServer yourself, either extend it or clone this repo locally.

---

## Table of contents

- [Environment Variables](#environment-variables)
- [Calling methods on the backend](#calling-methods-on-the-backend)
  - [Shape providers](#shape-providers)
  - [Generic backend providers](#generic-backend-providers)
  - [Gotchas](#gotchas)
- [Shapes](#shapes)
  - [LocalFileStore](#localfilestore)
- [TODO](#todo)

---

## Environment Variables

```properties
# The port on which the server will listen
PORT=3000

# A descriptive URI for where the app's data can live
DATA_ROOT=https://app.my-site.com/data

# The site's URL - will also be used for LocalFileStore
SITE_ROOT=http://localhost:3000  # or https://app.my-site.com

# "development" or "production"
NODE_ENV=development
```

## Calling methods on the backend

When you use LincdServer, you can also implement backend methods that you can access from the frontend.

There is two ways to do this:

### Shape providers

With Shape providers you can connect shapes to a backend method.

Let's say for example you want to send an email to a specific person from the server.
You could do that from a Person shape like so:

```typescript
import { linkedShape } from '../package';
import { Shape } from '@_linked/core/lib/shapes/Shape';
import { Server } from 'lincd-server/lib/utils/Server';

@linkedShape
export class Person extends Shape {
  sendEmail(subject: string, message: string): Promise<boolean> {
    return Server.call(this, 'sendEmail', subject, message);
  }
}
```

Note that `Server.call()` first takes the instance of the shape, then the method name and than any number of arguments
to be passed on.

To implement the backend, create `src/shapes/PersonProvider.ts`:

```typescript
import Person from './Person';
import { ShapeProvider } from 'lincd-server-utils/lib/utils/ShapeProvider';

export class PersonProvider extends ShapeProvider {
  static shape = Person;

  static sendEmail(person: Person, subject: string, message: string): boolean {
    //send email to person
    //mail(person.mailbox,subject,message);
  }
}
```

Here, PersonProvider first of all registers itself as a provider of the `Person` shape with `static shape = Person`.

Then it implements the method (sendEmail()) as a a _static_ method, which receives an instance of the shape it is
connected to as its first argument.

To make sure the provider is _compiled_ but _not bundled_ you need to add it to `tsconfig`.

The recommended way to do that is with a providers index file `src/providers.ts`.
This file will re-export all providers of your package:

```typescript
//src/providers.ts
export * from './shapes/PersonProvider';
```

Finally, add `providers.ts` to your `src/tsconfig.json`:

```json5
//tsconfig.json
{
  //...
  files: ['./src/index.ts', './src/providers.ts'],
}
```

That's all that's required to connect your frontend shapes to backend code.

### Generic backend providers

Sometimes you want to exchange data with the backend without any specific shape being involved.

For such generic backend methods, you can use generic backend providers:

Add a src/backend.ts file and include it in tsconfig.json:

```json5
//tsconfig.json
{
  //...
  files: ['./src/index.ts', './src/backend.ts'],
}
```

In `backend.ts`, export a default class that implements `IBackendProvider`.
In this class you can implement methods, which you can then call from the frontend.

For example:

```typescript
//src/backend.ts
import { IBackendProvider } from 'lincd-server/lib/interfaces/IBackendProvider';

export default class MyPackageBackendProvider implements IBackendProvider {
  login(email: string, password: string) {
    //do login
    return Promise.resolve(user);
  }
}
```

With this example you could call the login method from the frontend like so:

```typescript
import { packageName } from '../package';
import { Server } from 'lincd-server/lib/utils/Server';

Server.call(packageName, 'login', email, password).then((user) => {
  //...
});
```

Note that you can have **only one** generic backend provider per package.

### Gotchas

**The packageName you pass to Server.call() must match with the package that contains the provider.**

If you get a warning on the backend saying

```
Generic provider [providerName] of [packageName] does not have a method called [methodName]
```

then make sure that the `packageName` you pass to `Server.call(packageName)` is imported from _the same package_ as
where the provider lives. Generally, this means you call `Server.call` from a component in the same package as the
Provider (and import packageName from `src/package.ts`). If you want to call a method from another package, then import
packageName from that package, or manually type it.

## Shapes

This section will be a brief overview of the shapes that are included in this package, along with example usage of each
shape.

### LocalFileStore

This is the default file store for LINCD. It is a simple file store that stores files in a local directory. Its usage
follows the general pattern of other file stores in LINCD:

- Define all storage locations when the server or application starts up
- Access methods of the file store through the `LinkedFileStorage` class
  - e.g. `LinkedFileStorage.saveFile("path/to/save-file.as", fileBuffer)`

It's important to note that this file store is not suitable for frontend usage - it's intended to be used in an
environment that has access to the [`fs` module](https://nodejs.org/api/fs.html).

```ts
import { LinkedFileStorage } from '@_linked/core/lib/utils/LinkedFileStorage';
import { LocalFileStore } from 'lincd-server/lib/shapes/LocalFileStore';
import path from 'path';

const pathToStore = path.join(process.cwd(), 'my-file-store');
const store = new LocalFileStore('my-file-store', pathToStore);
LinkedFileStorage.setDefaultStore(store);
```

## TODO

- [ ] Add tests
- [ ] Refactor `NodeFileStore` to `LocalQuadStore` as to not confuse FileStores with QuadStores
