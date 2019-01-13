const SoundPlayer=require('../sound-player')
const SoundPlayerConsumer=require('../sound-player-consumer')
jest.mock('../sound-player'); // SoundPlayer 现在是一个模拟构造函数
 
beforeEach(() => {
    //清除所有实例，调用构造函数和所有的方法
    SoundPlayer.mockClear();
  });
  
  it('We can check if the consumer called the class constructor', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  });
  
  it('We can check if the consumer called a method on the class instance', () => {
    // 检查mockClear()是否起作用
    expect(SoundPlayer).not.toHaveBeenCalled();
  
    const soundPlayerConsumer = new SoundPlayerConsumer();
    // 构造函数应再次被调用
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  
    const coolSoundFileName = 'song.mp3';
    soundPlayerConsumer.playSomethingCool();
  
    // mock.instances 可用于自动模拟
    const mockSoundPlayerInstance = SoundPlayer.mock.instances[0];
    const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
    expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
    // 相当于上面的检查
    expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
  });
