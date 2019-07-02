import {MinuteSecondsPipe} from "./MinuteSecondsPipe";

describe('MinuteSecondsPipe', () => {
  it('should display 02:00 if seconds is 120 ', () => {
    let pipe = new MinuteSecondsPipe();
    expect(pipe.transform(120)).toEqual('02:00');
  })
  it('should display 01:00 if seconds is 60', () => {
    let pipe  = new MinuteSecondsPipe();
    expect(pipe.transform(60)).toEqual('01:00')
  })
})
