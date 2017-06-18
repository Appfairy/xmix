import mixin from './mixin';

describe('mixin', () => {
  let BaseClass;

  beforeAll(() => {
    BaseClass = class {}
  });

  test('single prototypical chain injection', () => {
    let TestMixinClass;

    const TestMixin = mixin.new(Class => TestMixinClass = class extends Class {

    });

    class TestClass extends mixin(TestMixin)(BaseClass) {

    }

    const testInstance = new TestClass();

    expect(testInstance).toBeInstanceOf(TestClass);
    expect(testInstance).toBeInstanceOf(TestMixinClass);
    expect(testInstance).toBeInstanceOf(BaseClass);
  });

  test('multiple prototypical chain injections', () => {
    let TestMixin1Class;
    let TestMixin2Class;

    const TestMixin1 = mixin.new(Class => TestMixin1Class = class extends Class {

    });

    const TestMixin2 = mixin.new(Class => TestMixin2Class = class extends Class {

    });

    class TestClass extends mixin(TestMixin1, TestMixin2)(BaseClass) {

    }

    const testInstance = new TestClass();

    expect(testInstance).toBeInstanceOf(TestClass);
    expect(testInstance).toBeInstanceOf(TestMixin1Class);
    expect(testInstance).toBeInstanceOf(TestMixin2Class);
    expect(testInstance).toBeInstanceOf(BaseClass);
  });

  test('single mixin class', () => {
    let TestMixinClass;

    const TestMixin = mixin.new(Class => TestMixinClass = class extends Class {

    });

    class TestClass extends TestMixin.class {

    }

    const testInstance = new TestClass();

    expect(testInstance).toBeInstanceOf(TestClass);
    expect(testInstance).toBeInstanceOf(TestMixinClass);
  });

  test('multiple mixins class', () => {
    let TestMixin1Class;
    let TestMixin2Class;

    const TestMixin1 = mixin.new(Class => TestMixin1Class = class extends Class {

    });

    const TestMixin2 = mixin.new(Class => TestMixin2Class = class extends Class {

    });

    class TestClass extends mixin(TestMixin1, TestMixin2).class {

    }

    const testInstance = new TestClass();

    expect(testInstance).toBeInstanceOf(TestClass);
    expect(testInstance).toBeInstanceOf(TestMixin1Class);
    expect(testInstance).toBeInstanceOf(TestMixin2Class);
  });

  test('transformation', () => {
    let TestMixinClass;

    const TestMixin = mixin.new(Class => TestMixinClass = class extends Class {

    }, (Child, Parent) => {
      Object.defineProperty(Child, 'name', {
        enumerable: true,
        configurable: true,
        value: 'TestMixin'
      });
    });

    expect(TestMixin.class.name).toEqual('TestMixin');
  });

  test('mixin application validation', () => {
    const TestMixin1 = mixin.new(Class => class extends Class {

    });

    const TestMixin2 = mixin.new(Class => class extends Class {

    });

    class TestClass extends mixin(TestMixin1, TestMixin2).class {

    }

    const testInstance = new TestClass();

    expect(mixin.of(testInstance, TestMixin1)).toEqual(true);
    expect(mixin.of(testInstance, TestMixin2)).toEqual(true);
  });
});
