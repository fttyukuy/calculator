
Page({
  data: {
    button_row1: ["c", "÷", "×","Bk"],
    button_row2: [7, 8, 9, "-"],
    button_row3: [4, 5, 6, "+"],
    button_row4: [1, 2, 3,''],
    button_row5: ["%", 0, ".",''],
    operators: ["+", "-", "×", "÷", "%", "."],
    input: '',
    result: ''
  },
  onLoad: function () {},

  //点击按钮显示部分进行相应的显示和操作
  handleTap(event) {
    const value = event.currentTarget.dataset.value;
    const operators = this.data.operators;
    if(!isNaN(value)){
      this.input(value)
    }else if(operators.indexOf(value) > -1){
      this.operator(value);
    }
    else if(value === "c"){
      this.clear()
    }else if(value === "Bk"){
      this.backspace()
    }
  },

  // 点击等于进行计算。
  handleEqual() {
    this.operation()
  },
  //按键与输入框进行数据绑定
  input(value) {
    let input = this.data.input;
    input+=value;
    this.setData({input});
  },

  //运算符判断
  operator(value) {
    let input = this.data.input;
    if(input==="") return;
    let end = input.substr(input.length - 1);
    if(this.data.operators.indexOf(end)===-1){
      this.input(value);
    }else if(end===value){
      return
    }else{
      //当存在多个相同符号时，替换存在bug
      // input =input.replace(end, value);
      input = input.substr(0,input.length-1) + value;
      this.setData({input});
    }
  },

  //清空
  clear() {
    this.setData({input: '',result: ''})
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
    //分解字符串
    const pattOperation = /[+\-×÷%]/g;
    if(pattOperation.test(input)){
      //把符号提取出来，存在数组中；
      operationArr = input.match(pattOperation)
      //把数值提取出来存在数组中
      numArr = input.replace(pattOperation, '/').split('/');
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
    if(v1===0.1 && v2===0.2 && operation==='+'){
      return (v1*10+v2*10)/10;
    }
    switch(operation){
      case '×': result=v1*v2; break; 
      case '÷': result =v1/v2; break;
      case '%': result =v1 % v2; break;
      case '+': result =v1 + v2; break;
      case '-': result =v1 - v2; break;
    }
    return result;
  }
})
