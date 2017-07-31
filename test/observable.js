/* eslint-env mocha */
import assert from 'assert';

import ObservableVariable from '../src/util/observable';
import Channel from '../src/channel';

async function syncSleep(ms) {
  const end = new Date().getTime() + ms;
  let now = new Date().getTime();
  let stepBegin = new Date().getTime();
  let step = 0;

  while (now < end) {
    now = new Date().getTime();
    step = now - stepBegin;
    if (step >= 1000) {
      step = 0;
      stepBegin = now;
    }
  }

}

describe('Channels', () => {
  describe('#canObserve', () => {
    it('should wait for variable to change to true', async (done) => {
      // Start observer
      const observableBoolean = new ObservableVariable();
      observableBoolean.set(false);
      observableBoolean.setOnChange((val) => {
        assert.ok(val, 'Value is true.');
        done();
      }, 'test');
      // End observer
      observableBoolean.set(true);
    });
  });
  describe('#Channel put/take', () => {
    it('should put boolean and take boolean', async () => {
      const channel = new Channel('boolean');
      (async () => {
        console.log('Putting true on channel');
        channel.put(true);
      })();
      console.log('Waiting for data on channel');
      const res = await channel.take();
      console.log('Channel got', res);
      assert.ok(res);
    });
    it('should put a value on and wait to put another', async () => {
      const channel = new Channel('boolean');
      (async () => {
        console.log('Putting true on channel');
        await channel.put(true);
        console.log('Putting false on channel');
        await channel.put(false);
      })();
      const trueValue = await channel.take();
      assert.ok(trueValue, 'First value recieved as true');
      const falseValue = await channel.take();
      assert.ok(!falseValue, 'Second value recieved as false');
    });
  });
});
