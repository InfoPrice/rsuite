import prefix, { globalKey, getClassNamePrefix, defaultClassPrefix } from '../prefix';

describe('[utils] prefix', () => {
  afterEach(() => {
    delete window.__RSUITE_CLASSNAME_PREFIX__;
  });

  it('Should read the override from the global object', () => {
    // garante que o modulo resolveu o objeto global de verdade (era o motivo do
    // `new Function`, que exigia 'unsafe-eval' na CSP)
    window.__RSUITE_CLASSNAME_PREFIX__ = 'ip-';
    assert.equal(getClassNamePrefix(), 'ip-');
  });

  it('Should fall back to the default prefix', () => {
    assert.equal(getClassNamePrefix(), globalKey);
    assert.equal(globalKey, 'rs-');
  });

  it('Should ignore an override set to `undefined`', () => {
    window.__RSUITE_CLASSNAME_PREFIX__ = undefined;
    assert.equal(getClassNamePrefix(), 'rs-');
  });

  it('Should prepend the prefix to the name, in that order', () => {
    assert.equal(defaultClassPrefix('btn'), 'rs-btn');
    window.__RSUITE_CLASSNAME_PREFIX__ = 'ip-';
    assert.equal(defaultClassPrefix('btn'), 'ip-btn');
  });

  it('Should join with a single hyphen', () => {
    assert.equal(prefix('btn', 'primary'), 'btn-primary');
  });

  it('Should return an empty string when either side is missing', () => {
    assert.equal(prefix('', 'primary'), '');
    assert.equal(prefix('btn', ''), '');
    assert.equal(prefix('btn', null), '');
  });

  it('Should prefix every item of an array and drop the falsy ones', () => {
    assert.equal(prefix('btn', ['primary', null, 'lg']), 'btn-primary btn-lg');
  });
});
