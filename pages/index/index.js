
Page({
  data: {
    button_row1: ["c", "÷", "×","Bk"],
    button_row2: [7, 8, 9, "-"],
    button_row3: [4, 5, 6, "+"],
    button_row4: [1, 2, 3,''],
    button_row5: ["%", 0, ".",''],
    input: '',
    result: ''
  },
  onLoad: function () {},
  handleTap(event) {
    const value = event.currentTarget.dataset.value;
  }
})
