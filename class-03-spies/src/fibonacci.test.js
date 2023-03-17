
const { createSandbox } = require("sinon");
const assert = require("assert");
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();


; (async () => {
  {
    const fib = new Fibonacci();

    const execSpy = sinon.spy(fib, fib.execute.name);


    for (const seq of fib.execute(5)) { };
    const expectCallCount = 6;

    assert.strictEqual(expectCallCount, execSpy.callCount);
  }

  {
    const fib = new Fibonacci();
    const fibSpy = sinon.spy(fib, fib.execute.name);

    const result = [...fib.execute(5)];
    const expectResults = [0, 1, 1, 2, 3];

    const { args: callArgs } = fibSpy.getCall(2);
    const expectCallArgs = [3, 1, 2];

    assert.deepStrictEqual(result, expectResults);

    assert.deepStrictEqual(callArgs, expectCallArgs);
  }

})();