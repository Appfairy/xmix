# Xmix

Xmix is a pack of mixin related utility methods, which will let you create, and apply custom mixins, by injecting them into the prototype chain.

## Example

```js
import mixin from 'xmix';

const Mixin = mixin.new(Class => class extends Class {
  constructor() {
    super();

    this.mixinProperty = 'comes second';
  }
});

class Parent {
  constructor() {
    this.parentProperty = 'comes first';
  }
}

class Child extends mixin(Mixin)(Parent) {
  constructor() {
    super();

    this.childProperty = 'comes last'
  }
}

const child = new Child();

assert(mixin.of(child, Mixin) == true);
```

## API

### mixin(Function, [...Function]) function

**description**: Takes a single mixin (or more) and returns a function which applies the mixins in series once invoked. This function can extend an additional extra class by simply invoking it with the desired class, or we can either skip that stage and call the `.class` property.

**returns**: extend(Function) function

**usage**:

```js
class Child extends mixin(A, B)(Parent) {

}
```

or without providing an additional class:

```js
class Child extends mixin(A, B).class {

}
```

### mixin.new(Function, [Function]) function

**description**: Takes a factory function which should return a child class of the provided parent class. An additional transformation function may be provided as the second argument for syntactic sugar.

**returns**: mixin(Function) function

**usage**:

```js
const Mixin = mixin.new(Class => class extends Class {

});
```

Then, the mixin can either be applied using the following methods:

```js
class Child extends mixin(Mixin)(Parent) {}
// or
class Child extends Mixin(Parent) {}
// or in case we're not interested in Parent class
class Child extends Mixin.class {}
```

An additional transformation function may be provided as well:

```js
const Mixin = mixin.new(Class => class extends Class {

}, (Child, Parent) => {
  Object.defineProperty(Child, 'name', {
    enumerable: true,
    configurable: true,
    value: Parent.name
  });
});
```

### mixin.of(Object, Function) function

**description**: Checks if a given instance is affected by a given mixin.

**returns**: Boolean

**usage**

```js
mixin.of(instance, Mixin);
```

## Download

The source is available for download from [GitHub](http://github.com/Appfairy/xmix). Alternatively, you can install using Node Package Manager (`npm`):

    npm install xmix

## License

MIT
