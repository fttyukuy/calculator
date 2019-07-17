
Page({
  data: {
    button_row1: ["c", "÷", "×","Bk"],
    button_row2: [7, 8, 9, "-"],
    button_row3: [4, 5, 6, "+"],
    button_row4: [1, 2, 3,''],
    button_row5: ["%", 0, ".",''],
    operators: ["+", "-", "×", "÷", "%", "."],
    input: '',
    result: '',
    isFirstMinus: false,
    isClear: false
  },

  //点击按钮显示部分进行相应的显示和操作
  handleTap(event) {
    const value = event.currentTarget.dataset.value;
    const operators = this.data.operators;
    //判断是否为数字
    if(!isNaN(value)){
      if (this.data.isClear){
        this.clear();
      }
      this.input(value)
    }
    // 判断是否为运算符
    else if(operators.indexOf(value) > -1){
      if (this.data.isClear){
        this.setData({input: this.data.result, result: '',isClear: false})
      }
      this.operator(value);
    }
    //判断等号
    else if (value === '=') {
      this.operation()
      this.setData({isClear: true,isFirstMinus: false})
    }
    // 清空
    else if(value === "c"){
      this.clear()

    }
    //删除
    else if(value === "Bk"){
      if (this.data.isClear) {
        this.clear();
      }
      this.backspace();
    }
  },

  //按键与输入框进行数据绑定
  input(value) {
    let input = this.data.input;
    input+=value;
    this.setData({input});
  },

  //运算符判断,不能连续显示运算符且运算符前面必须有数字。
  operator(value) {
    let input = this.data.input;
    if(input==="") {
      //首位是否为减号
      if(value ==='-'){
        this.input(value);
        this.setData({isFirstMinus: true})
      }
      return;
    }
    let end = input.substr(input.length - 1);
    if(this.data.operators.indexOf(end)===-1){
      //判断是否为小数点
      if(value!=='.'){
        this.input(value);
      }else{
       this.hasPoint(input,value);
      }
      
    }else if(end!==value && input !=='-'){
    
      if (value !== '.' ) {
        input = input.substr(0, input.length - 1) + value;
        this.setData({ input });
      } else return;
    }else{
      return;
    }
  },

  //清空
  clear() {
    this.setData({input: '',result: '',isClear: false})
  },

  //删除
  backspace() {
    let input = this.data.input;
    input = input.substr(0, input.length-1);
    this.setData({input});
  },

  //运算函数
  operation() {
    let input = this.data.input;
    let result = this.data.result;
    let operationArr=[];
    let numArr = [];
    let index = 0;

    //判断input 最后一个字符是否为operators中的项
    let lastChar = input.substr(input.length-1);
    if(this.data.operators.indexOf(lastChar)!==-1){
      input = input.substr(0, input.length-1);
    }
    //判断首字符是否为负号
    if(this.data.isFirstMinus){
      input = input.substr(1);
    }
    //分解字符串
    const pattOperation = /[+\-×÷%]/g;
    if(pattOperation.test(input)){
      //把符号提取出来，存在数组中；
      operationArr = input.match(pattOperation)
      //把数值提取出来存在数组中
      numArr = input.replace(pattOperation, '/').split('/');
      if (this.data.isFirstMinus) {
        numArr[0] = '-' + numArr[0];
      }
      //先计算 乘 除 取余
      while(index!==-1){
        index = this.isExist(operationArr);
        //存在firstOperation 中运算符时，优先运算
        if(index!==-1){
          let item = operationArr[index];
          let result = this.calculator(numArr[index], numArr[index + 1], item);
          numArr.splice(index, 2, result);
          operationArr.splice(index,1);
        }
      }
      while(numArr.length > 1){
        let item = operationArr[0];
        let result = this.calculator(numArr[0], numArr[1], item);
        numArr.splice(0, 2, result);
        operationArr.splice(0, 1);
      }
      result = numArr[0];
    }else{
      result= input;
    }
    this.setData({result})
  },

  // 判断是否存在优先运算符,存在返回索引，不存在返回-1
  isExist(arr) {
    let index = 0;
    const firstOperation = ['×', '÷', '%'];
    for(let i =0 ; i<arr.length ; i++){
      index = firstOperation.indexOf(arr[i]);
      if(index!==-1){
        return i;
      }
    }
    return -1;
  },

  //基本运算函数
  calculator(v1, v2, operation){
    v1= parseFloat(v1);
    v2= parseFloat(v2);
    let result = 0;
    if((v1===0.1 && v2===0.2 && operation==='+') || (v1 ===0.2 && v2===0.1 && operation==='+')){
      return (v1*10+v2*10)/10;
    }
    switch(operation){
      case '×': result=v1*v2; break; 
      case '÷': result =v1/v2; break;
      case '%': result =v1 % v2; break;
      case '+': result =v1 + v2; break;
      case '-': result =v1 - v2; break;
    }
    return result.toString();
  },

  //确定每个数值中只有一个小数点。
  hasPoint(input,value) {
    const pattOperation = /[+\-×÷%]/g;
    //把input中数值提取出来。
    let numArr = input.replace(pattOperation, '/').split('/');
    if (numArr[numArr.length - 1].indexOf('.') === -1) {
      this.input(value);
    } else {
      return;
    }
  }
})
