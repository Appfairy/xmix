function mixin(...mixins) {
  mixins.forEach((mixin) => {
    if (typeof mixin != 'function' || mixin.__mixin__ !== true) {
      throw TypeError('Only mixins must be provided');
    }
  });

  const result = (Root) => {
    if (typeof Root != 'function') {
      throw TypeError('A class must be provided')
    }

    return mixins.reduce((Class, mixin) => {
      return mixin(Class);
    }, Root);
  };

  result.class = result(function () {});

  return result;
}

mixin.new = function newMixin(factory, transform = x => x) {
  if (typeof factory != 'function') {
    throw TypeError('A factory function must be provided');
  }

  if (typeof transform != 'function') {
    throw TypeError('Transformation must be a function');
  }

  const mixin = (Parent) => {
    if (typeof Parent != 'function') {
      throw TypeError('A class must be provided')
    }

    const Child = factory(Parent);
    transform(Child, Parent);
    Child.__mixin__ = mixin;

    if (typeof Child != 'function') {
      throw TypeError('Factory must return a class');
    }

    return Child;
  };

  mixin.__mixin__ = true;
  mixin.class = mixin(function () {});

  return mixin;
}

mixin.of = function ofMixin(instance, mixin) {
  if (!(instance instanceof Object)) {
    throw TypeError('An instance must be provided');
  }

  if (typeof mixin != 'function' || mixin.__mixin__ !== true) {
    throw TypeError('A mixin must be provided');
  }

  for (let candi = instance.constructor;
       candi.prototype.__proto__ != null;
       candi = candi.prototype.__proto__.constructor) {
    if (candi.__mixin__ === mixin) {
      return true;
    }
  }

  return false;
}

export default mixin;
