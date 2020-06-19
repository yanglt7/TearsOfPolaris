// components/y-multipicker/y-multipicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 使用地点 - 多列选择器
    multiArray: [
      ['丰盛堂A座', '丰盛堂B座', '丰盛堂C座', '南楼', '北楼'],
      ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'],
      ['101', '102', '103', '104', '105', '106', '107', '108', '109']
    ],
    multiIndex: [0, 0, 0],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
      console.log()
      const value = this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]] + this.data.multiArray[2][this.data.multiIndex[2]]
      const data = { value }
      this.triggerEvent('multipickerChange', data, {})
    },

    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        // 丰盛堂A座
        case 0:
          switch (data.multiIndex[0]) {
            // 丰盛堂A座
            case 0:
              data.multiArray[1] = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'];
              data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
              break;
            // 丰盛堂B座
            case 1:
              data.multiArray[1] = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'];
              data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
              break;
            // 丰盛堂C座
            case 2:
              data.multiArray[1] = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'];
              data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
              break;
            // 南楼
            case 3:
              data.multiArray[1] = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'];
              data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
              break;
            // 北楼
            case 4:
              data.multiArray[1] = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'];
              data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
              break;
          }
          data.multiIndex[1] = 0;
          data.multiIndex[2] = 0;
          break;
        // 丰盛堂B座
        case 1:
          switch (data.multiIndex[0]) {
            // 丰盛堂A座
            case 0:
              switch (data.multiIndex[1]) {
                // 1楼
                case 0:
                  data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
                  break;
                // 2楼
                case 1:
                  data.multiArray[2] = ['201', '202', '203', '204', '205', '206', '207', '208', '209'];
                  break;
                // 3楼
                case 2:
                  data.multiArray[2] = ['301', '302', '303', '304', '305', '306', '307', '308', '309'];
                  break;
                // 4楼
                case 3:
                  data.multiArray[2] = ['401', '402', '403', '404', '405', '406', '407', '408', '409'];
                  break;
                // 5楼
                case 4:
                  data.multiArray[2] = ['501', '502', '503', '504', '505', '506', '507', '508', '509'];
                  break;
                // 6楼
                case 5:
                  data.multiArray[2] = ['601', '602', '603', '604', '605', '606', '607', '608', '609'];
                  break;
                // 7楼
                case 6:
                  data.multiArray[2] = ['701', '702', '703', '704', '705', '706', '707', '708', '709'];
                  break;
                // 8楼
                case 7:
                  data.multiArray[2] = ['801', '802', '803', '804', '805', '806', '807', '808', '809'];
                  break;
                // 9楼
                case 8:
                  data.multiArray[2] = ['901', '902', '903', '904', '905', '906', '907', '908', '909'];
                  break;
              }
              break;
            // 丰盛堂B座
            case 1:
              switch (data.multiIndex[1]) {
                // 1楼
                case 0:
                  data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
                  break;
                // 2楼
                case 1:
                  data.multiArray[2] = ['201', '202', '203', '204', '205', '206', '207', '208', '209'];
                  break;
                // 3楼
                case 2:
                  data.multiArray[2] = ['301', '302', '303', '304', '305', '306', '307', '308', '309'];
                  break;
                // 4楼
                case 3:
                  data.multiArray[2] = ['401', '402', '403', '404', '405', '406', '407', '408', '409'];
                  break;
                // 5楼
                case 4:
                  data.multiArray[2] = ['501', '502', '503', '504', '505', '506', '507', '508', '509'];
                  break;
                // 6楼
                case 5:
                  data.multiArray[2] = ['601', '602', '603', '604', '605', '606', '607', '608', '609'];
                  break;
                // 7楼
                case 6:
                  data.multiArray[2] = ['701', '702', '703', '704', '705', '706', '707', '708', '709'];
                  break;
                // 8楼
                case 7:
                  data.multiArray[2] = ['801', '802', '803', '804', '805', '806', '807', '808', '809'];
                  break;
                // 9楼
                case 8:
                  data.multiArray[2] = ['901', '902', '903', '904', '905', '906', '907', '908', '909'];
                  break;
              }
              break;
            // 丰盛堂C座
            case 2:
              switch (data.multiIndex[1]) {
                // 1楼
                case 0:
                  data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
                  break;
                // 2楼
                case 1:
                  data.multiArray[2] = ['201', '202', '203', '204', '205', '206', '207', '208', '209'];
                  break;
                // 3楼
                case 2:
                  data.multiArray[2] = ['301', '302', '303', '304', '305', '306', '307', '308', '309'];
                  break;
                // 4楼
                case 3:
                  data.multiArray[2] = ['401', '402', '403', '404', '405', '406', '407', '408', '409'];
                  break;
                // 5楼
                case 4:
                  data.multiArray[2] = ['501', '502', '503', '504', '505', '506', '507', '508', '509'];
                  break;
                // 6楼
                case 5:
                  data.multiArray[2] = ['601', '602', '603', '604', '605', '606', '607', '608', '609'];
                  break;
                // 7楼
                case 6:
                  data.multiArray[2] = ['701', '702', '703', '704', '705', '706', '707', '708', '709'];
                  break;
                // 8楼
                case 7:
                  data.multiArray[2] = ['801', '802', '803', '804', '805', '806', '807', '808', '809'];
                  break;
                // 9楼
                case 8:
                  data.multiArray[2] = ['901', '902', '903', '904', '905', '906', '907', '908', '909'];
                  break;
              }
              break;
            // 南楼
            case 3:
              switch (data.multiIndex[1]) {
                // 1楼
                case 0:
                  data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
                  break;
                // 2楼
                case 1:
                  data.multiArray[2] = ['201', '202', '203', '204', '205', '206', '207', '208', '209'];
                  break;
                // 3楼
                case 2:
                  data.multiArray[2] = ['301', '302', '303', '304', '305', '306', '307', '308', '309'];
                  break;
                // 4楼
                case 3:
                  data.multiArray[2] = ['401', '402', '403', '404', '405', '406', '407', '408', '409'];
                  break;
                // 5楼
                case 4:
                  data.multiArray[2] = ['501', '502', '503', '504', '505', '506', '507', '508', '509'];
                  break;
                // 6楼
                case 5:
                  data.multiArray[2] = ['601', '602', '603', '604', '605', '606', '607', '608', '609'];
                  break;
                // 7楼
                case 6:
                  data.multiArray[2] = ['701', '702', '703', '704', '705', '706', '707', '708', '709'];
                  break;
                // 8楼
                case 7:
                  data.multiArray[2] = ['801', '802', '803', '804', '805', '806', '807', '808', '809'];
                  break;
                // 9楼
                case 8:
                  data.multiArray[2] = ['901', '902', '903', '904', '905', '906', '907', '908', '909'];
                  break;
              }
              break;
            // 北楼
            case 4:
              switch (data.multiIndex[1]) {
                // 1楼
                case 0:
                  data.multiArray[2] = ['101', '102', '103', '104', '105', '106', '107', '108', '109'];
                  break;
                // 2楼
                case 1:
                  data.multiArray[2] = ['201', '202', '203', '204', '205', '206', '207', '208', '209'];
                  break;
                // 3楼
                case 2:
                  data.multiArray[2] = ['301', '302', '303', '304', '305', '306', '307', '308', '309'];
                  break;
                // 4楼
                case 3:
                  data.multiArray[2] = ['401', '402', '403', '404', '405', '406', '407', '408', '409'];
                  break;
                // 5楼
                case 4:
                  data.multiArray[2] = ['501', '502', '503', '504', '505', '506', '507', '508', '509'];
                  break;
                // 6楼
                case 5:
                  data.multiArray[2] = ['601', '602', '603', '604', '605', '606', '607', '608', '609'];
                  break;
                // 7楼
                case 6:
                  data.multiArray[2] = ['701', '702', '703', '704', '705', '706', '707', '708', '709'];
                  break;
                // 8楼
                case 7:
                  data.multiArray[2] = ['801', '802', '803', '804', '805', '806', '807', '808', '809'];
                  break;
                // 9楼
                case 8:
                  data.multiArray[2] = ['901', '902', '903', '904', '905', '906', '907', '908', '909'];
                  break;
              }
              break;
          }
          data.multiIndex[2] = 0;
          console.log(data.multiIndex);
          break;
      }
      this.setData(data);
    },
  }
})