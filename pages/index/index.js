
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

  //清空按钮功能
  clear() {
    this.setData({input: ''})
  },

  //回退按钮功能
  backspace() {
    let input = this.data.input;
    input = input.substr(0, input.length-1);
    this.setData({input});
  }
})
