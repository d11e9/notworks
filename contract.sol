contract LottoContext{
    uint public counter;
    event Incremented( address by, uint counter );
    
    function LottoContext(){
        counter=3;
    }
    
   function plus() constant returns (uint){
       return 10;
   }
   
    function increment() public {
        counter++;
        Incremented( msg.sender, counter );
   }
}
