test('null', () => {
    const n = null;
    expect(n).toBeNull();
  });//pass
  test('defined',function(){
      const n=1;
      expect(n).toBeDefined()
  })//pass
  test('undefined',function(){
      const n=undefined;
      expect(n).toBeUndefined()
  })//pass
  test('falsy',function(){
      const n=0;
      const n2='';
      const n3=null;
      const n4=undefined;
      const n5=false;
      const n6=NaN;
      expect(n).toBeFalsy()
      expect(n2).toBeFalsy()
      expect(n3).toBeFalsy()
      expect(n4).toBeFalsy()
      expect(n5).toBeFalsy()
      expect(n6).toBeFalsy()
  })//pass
  
  test('truthy',function(){
      const n=1;
      const n2=[];
      const n3={};
      expect(n).toBeTruthy()
      expect(n2).toBeTruthy()
      expect(n3).toBeTruthy()
  })//pass