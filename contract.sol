contract LottoContext{
    uint counter;
    
    function LottoContext(){
        counter=3;
    }
    
   function plus()public returns (uint){
       return 10;
   }
   
    function increment()public {
        counter++;
   }
   function getCounter()public returns (uint){
       return counter;
   }
}
