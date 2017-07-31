// Define type of channel (integer, string, bool)
// Allow put and take from this channel
// Put should block until the channel is free.
// Take should block until information is available.

import ObservableVariable from './util/observable';

export default class Channel {
  constructor() {
    this.takeRef = 0;
    this.hasDataObserve = new ObservableVariable();
    this.hasDataObserve.set(false);
  }
  async take() {
    // Case: Data is present
    if (this.hasDataObserve.get()) {
      const takableData = JSON.parse(JSON.stringify(this.data));
      this.hasDataObserve.set(false);
      return takableData;
    }
    // Case: No Data is present, wait for data to be available.
    const takePromise = new Promise((res) => {
      const ref = this.takeRef;
      this.takeRef += 1;
      this.hasDataObserve.setOnChange(() => {
        this.hasDataObserve.removeOnChange(ref);
        res(this.take());
      }, ref);
    });
    const result = await takePromise;
    return result;
  }

  async put(data) {
    // Case: No data present.
    if (!this.hasDataObserve.get()) {
      this.data = data;
      this.hasDataObserve.set(true);
      return;
    }
    // Case: Data must be present, setup listener for when it is not.
    const putPromise = new Promise((res) => {
      const ref = data.toString();
      this.hasDataObserve.setOnChange(() => {
        this.hasDataObserve.removeOnChange(ref);
        res(this.put(data));
      }, ref);
    });
    await putPromise;
  }
}