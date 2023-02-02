var express = require('express');
var router = express.Router();
var connection = require("../db/sql.js")
var userLogin = require("../db/userLogin.js")  //userPhone   userPwd
var jwt  = require("jsonwebtoken")


//地址展示列表  /api/showAddress
router.post("/api/showAddress",function(req,res,next){
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  connection.query(`select * from user where tel = "${tokenObj.userPhone}"`,function(error,results){
    let usesrId = results[0].id   //用户id
    connection.query(`select * from address where uid = ${usesrId}`,function(error,results){
      res.send({
        code:200,
        data:{
          success:true,
          data:results,
        }
      })
    })
  })
})

//添加地址
router.post("/api/addAddress",function(req,res,next){
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let [name,tel,province,city,area,address,isDefault] = [req.body.content.name,req.body.content.tel,req.body.content.province,req.body.content.city,req.body.content.county,req.body.content.addressDetail,req.body.content.isDefault]
  
  connection.query(`select * from user where tel = "${tokenObj.userPhone}"`,function(error,results){
    let usesrId = results[0].id   //用户id
    isDefault = isDefault == true ? 1 : 0
    if(isDefault == 1){
      connection.query(`update address set isDefault=0 where uid=${usesrId} and isDefault=1`,function(error,results){
        connection.query(`insert into address(uid,name,tel,province,city,area,address,isDefault) values('${usesrId}','${name}','${tel}','${province}','${city}','${area}','${address}','${isDefault}')`,function(error,results){
          res.send({
            code:200,
            data:{
              success:true,
              msg:"添加成功"
            }
          })
        })
      })
    }else{
      connection.query(`insert into address(uid,name,tel,province,city,area,address,isDefault) values('${usesrId}','${name}','${tel}','${province}','${city}','${area}','${address}','${isDefault}')`,function(error,results){
        res.send({
          code:200,
          data:{
            success:true,
            msg:"添加成功"
          }
        })
      })
    }

  })
})

//购物车更新数量  /api/cartUpDate
router.post("/api/cartUpDate",function(req,res,next){
  let {value,id} = req.body
  connection.query(`update goods_cart set goods_num=${value} where id=${id}`,function(error,results){
    res.send({
      code:200,
      data:{
        success:true,
        msg:"更新成功"
      }
    })
  })
})


//购物车删除 /api/deleteCart
router.post("/api/deleteCart",function(req,res,next){
  let cartArr = req.body.cartArr
  for (let index = 0; index < cartArr.length; index++) {
    connection.query(`delete from goods_cart where id = ${cartArr[index]}`,function(error,results){
      res.send({
        code:200,
        data:{
          success:true,
          msg:"删除成功"
        }
      })
    })
  }
})

// /api/showCart  查询购物车 购物车默认显示的请求
router.post("/api/showCart",function(req,res,next){
  let userId = req.body.userId
  connection.query(`select * from goods_cart where uid = ${userId}`,function(error,results){
    if(results.length>0){
      res.send({
        code:200,
        data:{
          success:true,
          goodsArr:results
        }
      })
    }else{
      res.send({
        data:{
          success:false,
          msg:"没有数据"
        }
      })
    }
  })
})


// /api/addCar  添加到购物车
router.post("/api/addCar",function(req,res,next){
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let goodsId = req.body.goodsId  //商品id
  //根据token里的userPhone来查询用户id
  connection.query(`select * from user where tel = "${tokenObj.userPhone}"`,function(error,results){
    let usesrId = results[0].id   //用户id
    //查询商品信息
    connection.query(`select * from goods_list where id = ${goodsId}`,function(error,results){
      let goodsObj = results[0]
      //查询该用户是否已经添加过此商品
      connection.query(`select * from goods_cart where uid = ${usesrId} and goods_id = ${goodsId}`,function(error,results){
        if(results.length > 0 ){//已经添加过此商品=》更新商品数量
          connection.query(`update goods_cart set goods_num = replace(goods_num,"${results[0].goods_num}","${parseInt(results[0].goods_num) + 1}") where goods_id = ${goodsId}`,function(){
            res.send({
              data:{
                success:true,
                msg:"添加成功"
              }
            })
          })
        }else{//没有添加过
          //向goods_cart中添加
          connection.query(`insert into goods_cart(uid,goods_id,goods_name,goods_conten,goods_price,goods_img,goods_num) values("${usesrId}","${goodsId}","${goodsObj.name}","${goodsObj.content}","${goodsObj.price}","${goodsObj.imgUrl}","1")`,function(error,results){
            res.send({
              code:200,
              data:{
                success:true,
                msg:"添加成功"
              }
            })
          })
        }
      })
    })
  })
})

// /api/userUpData 忘记密码
router.post("/api/userUpData",function(req,res,next){
  let params = {
    userPhone:req.body.userPhone,
    userPwd:req.body.userPwd,
    user:{}
  }
  connection.query(userLogin.queryPhone(params),function(error,results){
    if(results.length > 0){
      params.user = results[0]
      connection.query(userLogin.userUpData(params),function(error,results){
        res.send({
          code:200,
          data:{
            success:true,
            data:results[0],
            msg:"修改成功"
          }
        })
      })
    }else{
      res.send({
        code:200,
        data:{
          success:false,
          msg:"账号不存在"
        }
      })
    }
  })
})

// registered  用户注册
router.post("/api/registered",function(req,res,next){
  let params = {
    userPhone:req.body.userTel,
    userPwd:req.body.userPwd
  }
  connection.query(userLogin.queryPhone(params),function(error,results){
    if(results.length > 0){
      res.send({
        code:200,
        data:{
          success:true,
          msg:"账号已存在"
        }
      })
    }else{
      connection.query(userLogin.addUser(params),function(error,results){
        res.send({
          code:200,
          data:{
            success:true,
            data:results[0],
            msg:"注册成功"
          }
        })
      })
    }
  })
})
//验证码
router.post("/api/code",function(req,res,next){
  let codes = Math.floor((Math.random()*(999999-100000))+100000)  //随机6位数
  res.send({
    code:200,
    data:{
      success:true,
      codeNumber:codes,
      userTel:req.query.userTel
    }
  })
})

//用户登录  手机号登录
router.post("/api/userLoginTel",function(req,res,next){
  let params = {
    userPhone:req.query.userTel
  }
  //查询数据库内是否已存在，不存在就添加到数据库中
  connection.query(userLogin.queryPhone(params),function(error,results){
    // if(!error) throw error
    if(results.length > 0){  //手机号存在
      res.send({
        code:200,
        data:{
          success:true,
          data:results[0],
          msg:"登录成功"
        }
      })
    }else{                    //不存在
      connection.query(userLogin.addUser(params),function(error,results){
        // if(!error) throw error
        connection.query(userLogin.queryPhone(params),function(error,results){
          res.send({
            code:200,
            data:{
              success:true,
              data:results[0],
              msg:"登录成功-添加"
            }
          })
        })
      })
    }
  })
})
//用户登录  密码登录
router.post("/api/userLogin",function(req,res,next){
  let params = {
    userPhone:req.query.userPhone,
    userPwd:req.query.userPwd
  }
  connection.query(userLogin.queryPhone(params),function(error,results){
    //results.length > 0  说明手机号存在
    if(results.length > 0 ){
      //验证密码
      connection.query(userLogin.queryPwd(params),function(error,results){
        if( results.length > 0 ){
          res.send({  //信息正确 返回数据
            code: 200,
            data: {
              success: true,
              msg: "登录成功",
              data:results[0]
            }
          })
        }else{
          res.send({  //不存在
            code: 301,
            data: {
              success: false,
              msg: "信息错误，请重新输入"
            }
          }) 
        }
      })
    }else{
      res.send({  //不存在
        code: 301,
        data: {
          success: false,
          msg: "信息错误，请重新输入"
        }
      })
    }
  })
})

//分类页数据 
router.get("/api/List",function(req,res,next){
  res.send({
    code:0,
    data:[ //一级
      {
        id:0,
        name:'推荐',
        data:[  //二级
          {
            id:0,
            name:'推荐',
            list:[ //三级
              {
                id:0,
                name:'紫砂壶',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:1,
                name:'碧螺春',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:2,
                name:'鑫骏眉',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:3,
                name:'武夷岩茶',
                imgUrl:'/images/blc.jpeg'
              },
            ]
          }
        ]
      },
      {
        id:1,
        name:'新品',
        data:[
          {
            id:1,
            name:'新品',
            list:[
              {
                id:0,
                name:'5月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:1,
                name:'6月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:2,
                name:'7月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:3,
                name:'8月新品',
                imgUrl:'/images/blc.jpeg'
              },
            ]
          }
        ]
      },
      {
        id:2,
        name:'茶具',
        data:[
          {
            id:1,
            name:'茶具',
            list:[
              {
                id:0,
                name:'5月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:1,
                name:'6月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:2,
                name:'7月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:3,
                name:'8月新品',
                imgUrl:'/images/blc.jpeg'
              },
            ]
          }
        ]
      },
      {
        id:3,
        name:'红茶',
        data:[
          {
            id:1,
            name:'红茶',
            list:[
              {
                id:0,
                name:'5月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:1,
                name:'6月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:2,
                name:'7月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:3,
                name:'8月新品',
                imgUrl:'/images/blc.jpeg'
              },
            ]
          }
        ]
      },
      {
        id:4,
        name:'绿茶',
        data:[
          {
            id:1,
            name:'绿茶',
            list:[
              {
                id:0,
                name:'5月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:1,
                name:'6月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:2,
                name:'7月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:3,
                name:'8月新品',
                imgUrl:'/images/blc.jpeg'
              },
            ]
          }
        ]
      },
      {
        id:5,
        name:'大红袍',
        data:[
          {
            id:1,
            name:'大红袍',
            list:[
              {
                id:0,
                name:'5月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:1,
                name:'6月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:2,
                name:'7月新品',
                imgUrl:'/images/blc.jpeg'
              },
              {
                id:3,
                name:'8月新品',
                imgUrl:'/images/blc.jpeg'
              },
            ]
          }
        ]
      }
    ]
  })
})
//搜索页 筛选数据
//搜索页数据 
router.get("/api/goods/shopList",function(req,res,next){
  let [keyName,orderName] = Object.keys(req.query)
  let [name,order] = Object.values(req.query)
  connection.query("select * from goods_list where name like '%"+name+"%' order by "+orderName+" "+order,function (error, results, fields){
    res.send({
      code:0,
      data:results
    })
  })
});

//首页第一屏数据
router.get('/api/index_list/0/data/1', function(req, res, next) {
  res.send({
    code:0,
    data:{
      //ly-tab 
      lytabList:[
        {id: 0,name: "推荐"}, 
        {id: 1,name: "金骏眉"}, 
        {id: 2,name: "大红袍"}, 
        {id: 3,name: "铁观音"},
        {id: 4,name: "绿荼"}, 
        {id: 5,name: "紫砂壶"}, 
        {id: 6,name: "漳平水仙"}, 
        {id: 7,name: "普洱"}, 
        {id: 8,name: "正山小种"},
        {id: 9,name: "苿莉花荼"}
      ],
      data:[
        //swiper
        {
          code:0,
          type:"swiperList",
          data:[
            { id: 1, imgUrl: "../images/swiper1.jpeg"},
            { id: 2, imgUrl: "../images/swiper2.jpeg"},
            { id: 3, imgUrl: "../images/swiper3.jpeg"}
          ]
        },
        // icons
        {
          code:0,
          type:'iconsList',
          data:[
            {
              id: 1,
              title: "自饮荼",
              imgUrl: "../images/icon1.png"
            },
            {
              id: 2,
              title: "品牌茶",
              imgUrl: "../images/icon2.png"
            },
            {
              id: 3,
              title: "茶具",
              imgUrl: "../images/icon3.png"
            },
            {
              id: 4,
              title: "领福利",
              imgUrl: "../images/icon4.png"
            },
            {
              id: 5,
              title: "官方验证",
              imgUrl: "../images/icon5.png"
            }
          ]
        },
        //listtjList 爆款推荐
        {
          code:0,
          type:"listtjList",
          data:[
            {
              id: 1,
              imgUrl: "../images/img1.png",
              name: '铁观音2號250g',
              content: "核心产区滋味正",
              price: 99
            },
            {
              id: 2,
              imgUrl: "../images/img1.png",
              name: '铁观音2號250g',
              content: "核心产区滋味正",
              price: 99
            },
            {
              id: 3,
              imgUrl: "../images/img1.png",
              name: '铁观音2號250g',
              content: "核心产区滋味正",
              price: 99
            },
            {
              id: 4,
              imgUrl: "../images/img1.png",
              name: '铁观音2號250g',
              content: "核心产区滋味正",
              price: 99
            },
            {
              id: 5,
              imgUrl: "../images/img1.png",
              name: '铁观音2號250g',
              content: "核心产区滋味正",
              price: 99
            },
            {
              id: 6,
              imgUrl: "../images/img1.png",
              name: '铁观音2號250g',
              content: "核心产区滋味正",
              price: 99
            }
          ]
        },
        //Guess 猜你喜欢
        {
          code:0,
          type:"guessList",
          data:[
            {
              id: 1,
              imgUrl: "../images/goods1.jpg",
              name: "武夷中火醇香大红袍1号",
              price: 99,
              shouqing: false
            },
            {
              id: 2,
              imgUrl: "../images/goods2.jpg",
              name: "武夷山高级大红袍2号",
              price: 199,
              shouqing: false
            },
            {
              id: 3,
              imgUrl: "../images/goods3.jpg",
              name: "云南凤庆经典蜜香滇红荼1",
              price: 299,
              shouqing: true
            },
            {
              id: 4,
              imgUrl: "../images/goods3.jpg",
              name: "云南凤庆经典蜜香滇红荼2",
              price: 399,
              shouqing: false
            }
          ]
        },
      ]
    }
  });
});
//首页 切换第二屏数据
router.get('/api/index_list/1/data/1', function(req, res, next) {
  res.send({
    code:0,
    data:[
      //数据
      {
        code:0,
        type:'adList',
        data:[
          {id:0,imgUrl:"../images/jm.jpg"}
        ]
      },
      //猜你喜欢
      {
        code:0,
        type:"guessList",
        data:[
          {
            id: 1,
            imgUrl: "../images/goods1.jpg",
            name: "武夷中火醇香大红袍1号",
            price: 99,
            shouqing: false
          },
          {
            id: 2,
            imgUrl: "../images/goods2.jpg",
            name: "武夷山高级大红袍2号",
            price: 199,
            shouqing: false
          },
          {
            id: 3,
            imgUrl: "../images/goods3.jpg",
            name: "云南凤庆经典蜜香滇红荼1",
            price: 299,
            shouqing: true
          },
          {
            id: 4,
            imgUrl: "../images/goods3.jpg",
            name: "云南凤庆经典蜜香滇红荼2",
            price: 399,
            shouqing: false
          }
        ]
      },
    ]
  })
})

//详情页数据获取
router.get('/api/goods/details', function(req, res, next) {
  let id = req.query.id
  connection.query("select * from goods_list where id ="+id,function(error,results){
    res.send({
      code:0,
      data:results[0]
    })
  })
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
