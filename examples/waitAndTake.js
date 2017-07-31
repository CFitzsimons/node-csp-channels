import Channel from '../src/channel';

const textChannel = new Channel('boolean');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(2000);
  const res1 = await textChannel.take();
  console.log(res1);
  await sleep(2000);
  const res2 = await textChannel.take();
  console.log(res2);
})();

(async () => {
  const input1 = 'Hello ';
  const input2 = 'world!';

  await textChannel.put(input1);
  console.log(`Placed: ${input1}`);

  // Won't place input 2 until input1 is cleared
  await textChannel.put(input2);
  console.log(`Placed: ${input2}`);
})();
