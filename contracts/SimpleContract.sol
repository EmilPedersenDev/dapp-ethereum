contract SimpleContract {
    uint256 public myValue = 50;
    string public myString = "Hello World!";

    function setValue(uint256 _myValue) public {
        myValue = _myValue;
    }

    function setString(string memory _myString) public {
        myString = _myString;
    }
}
