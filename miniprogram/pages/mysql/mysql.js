// pages/mysql/mysql.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        posts:[],
      add:'',
      del:'',
      update:'',
      search:'',
      lieming:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 
   */
  sqlSubmit: async function (e) {
    let that = this;
    //  let server = e.detail.value.server;
    //  let basename=e.detail.value.basename;
    //  let user = e.detail.value.user;
    //  let pwd=e.detail.value.pwd;
 
     let server = "rm-hp3q8vgfzl4du8493zo.mysql.huhehaote.rds.aliyuncs.com";
     let basename="xiushi";
     let user = "ccr_123";
     let pwd="FAW_ccr123!";

    let sql=e.detail.value.sql;
    if (server === undefined ||
      server === "" ||
      user === undefined ||
      user === "" ||
      sql === undefined ||
      sql === "" ||
      pwd=== undefined ||
      pwd === ""
            ) {
      wx.showToast({
        title: '请填写正确的表单信息',
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.showLoading({
        title: '执行中...',
        duration: 1500
      })

      if(e.detail.target.dataset.type == 1){
        
        wx.cloud.callFunction({
          name:"mysql",
          data: {
            server:server,
            user:user,
            pwd:pwd,
            basename:basename,
            sql: sql
        },
          success(res){
            console.log(res)
            that.setData({
              adu:'执行成功！',
              lieming:'',
              posts:''             
            })
          },
          fail(res){
            console.log(res)
            that.setData({
              add:'执行失败！'            
            })
          }
        })

    }else if(e.detail.target.dataset.type == 2){
      wx.cloud.callFunction({
        name:"mysql",
        data: {
          server:server,
          user:user,
          pwd:pwd,
          basename:basename,
          sql: sql
      },
        success(res){
          console.log(res)
          that.setData({
            lieming:res.result,
            adu:'',
            posts:''
           
          })
        },
        fail(res){
          console.log(res)
      
        }
      })

     }else{
      wx.cloud.callFunction({
        name:"mysql",
        data: {
          server:server,
          user:user,
          pwd:pwd,
          basename:basename,
          sql: sql
      },
        success(res){
          console.log(res)
          that.setData({
            posts:res.result,
            adu:'',
            lieming:''
        
           
          })
        },
        fail(res){
          console.log(res)
        }
      })
    }
      
    }
  }

})