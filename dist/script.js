/**
 * The instance has these properties:
 * 
 * ## USAGE
 * 
    function callback(value, moreInfo) {
        console.log(value);
    }

    const td = new TypingDelayer({
        elId: "myInput",
        onTypingStopped: callback,
        delayMs: 2000
    });
 *
 */
class TypingDelayer {
  constructor({ elId, onTypingStopped, delayMs = 600 }) {
    // the instance of the class
    var inst = this;
    // set instance properties
    inst.onTypingStopped = onTypingStopped;
    inst.delayMs = delayMs;
    inst._timeout = null;

    window.addEventListener("load", () => {
      // when the page has loaded or is already loaded,
      // run the core typing delay mechanism
      inst.elHtml = document.getElementById(elId);
      inst._init();
    });
  }

  _init() {
    var inst = this;
    inst.elHtml.addEventListener("keyup", () => {
      inst._when_types(inst);
    });
  }

  _when_types(inst) {
    // every time the specified html element is being typed in,
    // clear the timeout of the last timeout, which means,
    // do not run the code that was in the last setTimeout function
    clearTimeout(inst._timeout);

    // this code will be run in setTimeout
    function runWhenFinishDelay() {
      // get the value of that element, supposedly an input
      const elVal = inst.elHtml.value;
      const moreInfo = {};
      // call the onTypingStopped callback, providing data,
      // including the value of the input
      inst.onTypingStopped(elVal, moreInfo);
    }

    const newTimeout = setTimeout(runWhenFinishDelay, inst.delayMs);
    // set the new timeout, which means, this code will be run next time
    // target html element will be typed in.
    inst._timeout = newTimeout;
  }
}
