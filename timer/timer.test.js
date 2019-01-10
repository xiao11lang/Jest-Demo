const timerGame = require('./timer')
const timerGame2 = require('./timer2')
const infiniteTimerGame = require('./infiniteTimer');
describe('timer mock', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  })

  test('waits 1 second before ending the game', () => {
    timerGame();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });//pass

  test('waits 1 second before ending the game', () => {
    timerGame2();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });//pass
})

describe('timer mock2', function () {
  test('waits 1 second before ending the game', () => {
    jest.useFakeTimers();
    timerGame();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });//pass
  test('waits 1 second before ending the game', () => {
    timerGame2();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });//failed
})

describe('run timer',function(){
    test('calls the callback after 1 second', () => {
        jest.useFakeTimers();    
        const callback = jest.fn();
        timerGame(callback);
        expect(callback).not.toBeCalled();
        jest.runAllTimers();
        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(1);
    });//pass
})

describe('run infinite timer',function(){
    test('schedules a 10-second timer after 1 second', () => {
        jest.useFakeTimers();  
        const callback = jest.fn();
        infiniteTimerGame(callback);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        jest.runOnlyPendingTimers();
        expect(callback).toBeCalled();
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
      });
})