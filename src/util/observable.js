export default class ObservableVariable {
  constructor(fn, ref) {
    this.onChangeEvents = {};
    if (fn && ref) {
      this.onChangeEvents[ref] = fn;
    }
  }
  setOnChange(fn, ref) {
    this.onChangeEvents[ref] = fn;
  }
  removeOnChange(ref) {
    if (this.onChangeEvents[ref]) {
      delete this.onChangeEvents[ref];
    }
  }
  get() {
    return this.data;
  }

  set(data) {
    this.data = data;
    this.fireAll(this.data);
  }

  fireAll(data) {
    for (const eventRef in this.onChangeEvents) {
      if (Object.prototype.hasOwnProperty.call(this.onChangeEvents, eventRef)) {
        this.onChangeEvents[eventRef](data);
      }
    }
  }
}
