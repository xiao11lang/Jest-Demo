const {SoundPlayer,mockPlaySoundFile}=require('../sound-player-2')
const SoundPlayerConsumer=require('../sound-player-consumer-2')
jest.mock('../sound-player-2'); // SoundPlayer当前是模拟构造函数

beforeEach(() => {
  //清除所有实例，调用构造函数和所有的方法
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
});