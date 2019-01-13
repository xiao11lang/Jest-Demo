const SoundPlayer = require('./sound-player').SoundPlayer
class SoundPlayerConsumer {
    constructor() {
        this.soundPlayer = new SoundPlayer();
    }

    playSomethingCool() {
        const coolSoundFileName = 'song.mp3';
        this.soundPlayer.playSoundFile(coolSoundFileName);
    }
}
module.exports = SoundPlayerConsumer