function infiniteTimerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
      console.log('Times up! 10 seconds before the next game starts...');
      callback && callback();
      setTimeout(() => {
        infiniteTimerGame(callback);
      }, 10000);
    }, 1000);
  }
  module.exports = infiniteTimerGame;