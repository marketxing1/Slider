let imges_data = [{     //图片数据,数据来源。。。。。。
  1:["./picture/1-1.jpg","https://www.zhihu.com/"],
  2:["./picture/1-2.jpg","https://www.google.com/"],
  3:["./picture/1-3.jpg","https://www.baidu.com/"],
  4:["./picture/1-4.jpg","https://www.4399.com/"],
  5:["./picture/1-5.jpg","https://www.v2ex.com/"],
  6:["./picture/1-6.jpg","https://www.github.com/"],
},{     
  1:["./picture/2-1.jpg","https://www.zhihu.com/"],
  2:["./picture/2-2.jpg","https://www.google.com/"],
  3:["./picture/2-3.jpg","https://www.baidu.com/"],
  4:["./picture/2-4.jpg","https://www.4399.com/"],
  5:["./picture/2-5.jpg","https://www.v2ex.com/"],
  6:["./picture/2-6.jpg","https://www.github.com/"],
},{     
  1:["./picture/3-1.jpg","https://www.zhihu.com/"],
  2:["./picture/3-2.jpg","https://www.google.com/"],
  3:["./picture/3-3.jpg","https://www.baidu.com/"],
  4:["./picture/3-4.jpg","https://www.4399.com/"],
  5:["./picture/3-5.jpg","https://www.v2ex.com/"],
  6:["./picture/3-6.jpg","https://www.github.com/"],
},{     
  1:["./picture/4-1.jpg","https://www.zhihu.com/"],
  2:["./picture/4-2.jpg","https://www.google.com/"],
  3:["./picture/4-3.jpg","https://www.baidu.com/"],
  4:["./picture/4-4.jpg","https://www.4399.com/"],
  5:["./picture/4-5.jpg","https://www.v2ex.com/"],
  6:["./picture/4-6.jpg","https://www.github.com/"],
},{     
  1:["./picture/5-1.jpg","https://www.zhihu.com/"],
  2:["./picture/5-2.jpg","https://www.google.com/"],
  3:["./picture/5-3.jpg","https://www.baidu.com/"],
  4:["./picture/5-4.jpg","https://www.4399.com/"],
  5:["./picture/5-5.jpg","https://www.v2ex.com/"],
  6:["./picture/5-6.jpg","https://www.github.com/"],
},{     
  1:["./picture/6-1.jpg","https://www.zhihu.com/"],
  2:["./picture/6-2.jpg","https://www.google.com/"],
  3:["./picture/6-3.jpg","https://www.baidu.com/"],
  4:["./picture/6-4.jpg","https://www.4399.com/"],
  5:["./picture/6-5.jpg","https://www.v2ex.com/"],
  6:["./picture/6-6.jpg","https://www.github.com/"],
},{     
  1:["./picture/7-1.jpg","https://www.zhihu.com/"],
  2:["./picture/7-2.jpg","https://www.google.com/"],
  3:["./picture/7-3.jpg","https://www.baidu.com/"],
  4:["./picture/7-4.jpg","https://www.4399.com/"],
  5:["./picture/7-5.jpg","https://www.v2ex.com/"],
  6:["./picture/7-6.jpg","https://www.github.com/"],
}]

let Slider_default_data = {  //默认配置项
  "iteration_count":true,    //循环播放
  "animation_time": 2000,    //单图片展示时间
  "animation_timer": 500,    //动画时间
  "index":true,             //右下角角标
  "arrows":true,             //左右或上下箭头(视动画方式而定)
  "can_jump":true,           //图片可以点击跳转
  "play_direction":1,        //播放方向,默认从左到右，1为水平(视动画方式而定)
  "animation_way":1          //动画方式(淡入淡出、百叶窗、飞入、放大缩小替换等等)
  //...........
}

let Slider_data = { //单个Slider属性配置,这里举例第一个
  1:{"index":true,"animation_time": 1000,"animation_timer": 1000,},
  2:{"index":true,"animation_timer": 2000,},
  3:{"index":true},
  4:{"arrows":false},
  5:{"index":true},
  6:{"arrows":true},
  7:{"index":true}         
  //.........
}
let nodes = document.querySelectorAll("div[class*=Slider_vessel]") //Slider集合
let Slider_datas = [] //Slider配置项数组，[{},{},{}]形式 
let status = []  //动画状态数组，用于控制对应Slider动画控制,[{},{},{}]形式  


for (let i = 1; i <= nodes.length; i++) {
  let temporary_data = {}
  for (let data in Slider_default_data) {
    if (Slider_data[i] !== undefined && Slider_data[i][data] !== undefined) temporary_data[data] = Slider_data[i][data]
    else temporary_data[data] = Slider_default_data[data]
  }
  Slider_datas.push(temporary_data)
}




class Slider{
  constructor(val){
    let img_data = imges_data[val - 1]
    let len = Object.keys(img_data).length
    this.ves = document.createElement('div')
    this.ves.className = "vessel"
    this.ves.len = len
    this.ves.width = len * nodes[val - 1].offsetWidth
    this.ves.style.width = this.ves.width + "px"
    for (let i = 1; i <= len; i++) {  
      let node = document.createElement('a')
      node.setAttribute("style",`background-image:url(${img_data[i][0]});width:${nodes[val - 1].offsetWidth}px`)
      node.setAttribute("href",`${img_data[i][1]}`)
      node.setAttribute("target",`_blank`)
      this.ves.appendChild(node)
    }
    status[val - 1] = {}
    index_data(this.ves,val - 1) 
    arrows_data(this.ves,val - 1) 
    animation_data (this.ves,val - 1)
    animation(this.ves,val - 1)
    return this.ves
  }
}

document.addEventListener('DOMContentLoaded',() => {
  nodes.forEach((node,index) => {
    if (index === imges_data.length) {
      throw new Error("图片数据缺少(少于Slider数量)")
    }
    let str = /\-([0-9]+)$/.exec(node.className)[1]
    node.appendChild(new Slider(str - 0))
    node.addEventListener("mouseenter",() => {
      for (let val in status[index]) {
        clearInterval(status[index][val])
      }
    })
    node.addEventListener("mouseleave",() => {
      animation(node.querySelector("div[class*=vessel]"),index)
    })
  })
})


function animation_data (node,index) {   //各个Slider初始状态处理
  status[index].imgIndex = 0 //////////////////////////
  if (Slider_datas[index].animation_way === 1) {
    node.style.transition = Slider_datas[index].animation_timer / 1000 + "s"
    status[index].translateX = 0
    status[index].direction = "-"
  }
  if (Slider_datas[index].index === true) {
    status[index].spanIndex = 0
    status[index].spanIndex_direction = "+"
    node.spanIndexEl[status[index].spanIndex].style = "box-shadow:0 0 0px 3px black inset;"
  }
  if (Slider_datas[index].arrows === true) {
    status[index].arrowsIndex = 0
    status[index].arrowsIndex_direction = "+" 
  }
}

function index_data(node,index) {   //各个Slider右下角角标创建
  if (Slider_datas[index].index === true) {
    node.spanIndexEl = []       //Slider图片容器包含的角标数组集合
    let div = document.createElement('div')
    div.className = "index"
    for (let i = 0; i < node.len; i++) {
      let span = document.createElement('span')
      span.className = "index"
      span.index = i
      //span.textContent = i + 1 + ""
      span.onclick = () => {      //span点击  各个动画状态都要重置。。有点乱后面改
        status[index].translateX = -(node.width / node.len * span.index)
        node.style.transform = `translateX(${status[index].translateX}px)`
        node.spanIndexEl[status[index].spanIndex].removeAttribute("style")
        status[index].spanIndex = i
        node.spanIndexEl[status[index].spanIndex].style = "box-shadow:0 0 0px 3px black inset;"
        if  (Slider_datas[index].arrows === true) {
          status[index].arrowsIndex = status[index].spanIndex
        }
      }
      div.appendChild(span)
      node.spanIndexEl.push(span) 
    }
    nodes[index].appendChild(div)
  }
}

function arrows_data(node,index) {
  if (Slider_datas[index].arrows === true) {
    node.arrowsEl = []       //Slider图片容器包含的角标数组集合
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    div1.className = "arrows"
    div2.className = "arrows"
    if (Slider_datas[index].animation_way === 1) {
      div1.setAttribute("style",`background-image:url(./picture/left-arrows-1.png);top:0;bottom:0;margin:auto;left:0;`)
      div2.setAttribute("style",`background-image:url(./picture/right-arrows-1.png);top:0;bottom:0;margin:auto;right:0;`)
    } 
    div1.onclick = () => { 
      if (status[index].arrowsIndex === 0) {
        status[index].translateX = -node.width + (node.width / node.len)
        status[index].arrowsIndex = node.len - 1
      } else {
        status[index].translateX = -(status[index].arrowsIndex - 1) * (node.width / node.len)
        status[index].arrowsIndex -= 1
      }
      node.style.transform = `translateX(${status[index].translateX}px)`
      if (Slider_datas[index].index === true) {       
        node.spanIndexEl[status[index].spanIndex].removeAttribute("style")
        status[index].spanIndex = status[index].arrowsIndex
        node.spanIndexEl[status[index].spanIndex].style = "box-shadow:0 0 0px 3px black inset;"
      }
    }
    div2.onclick = () => {  
      if (status[index].arrowsIndex === node.len - 1) {
        status[index].translateX = 0
        status[index].arrowsIndex = 0
      } else {
        status[index].translateX = -(status[index].arrowsIndex + 1) * (node.width / node.len)
        status[index].arrowsIndex += 1
      }
      node.style.transform = `translateX(${status[index].translateX}px)`
      if (Slider_datas[index].index === true) {       
        node.spanIndexEl[status[index].spanIndex].removeAttribute("style")
        status[index].spanIndex = status[index].arrowsIndex
        node.spanIndexEl[status[index].spanIndex].style = "box-shadow:0 0 0px 3px black inset;"
      }
    }
    div1.onmouseenter = () => {
      div1.setAttribute("style",`background-image:url(./picture/left-arrows-2.png);top:0;bottom:0;margin:auto;left:0;`)
    }
    div2.onmouseenter = () => {
      div2.setAttribute("style",`background-image:url(./picture/right-arrows-2.png);top:0;bottom:0;margin:auto;right:0;`)
    }
    div1.onmouseleave = () => {
      div1.setAttribute("style",`background-image:url(./picture/left-arrows-1.png);top:0;bottom:0;margin:auto;left:0;`)
    }
    div2.onmouseleave = () => {
      div2.setAttribute("style",`background-image:url(./picture/right-arrows-1.png);top:0;bottom:0;margin:auto;right:0;`)
    }
    nodes[index].appendChild(div1)
    nodes[index].appendChild(div2)
  }
}

function animation(node,index) {
  if (Slider_datas[index].animation_way === 1) {
    status[index].animation_statu = setInterval(() => {
      setTimeout(() => {
        if (status[index].translateX === -node.width + (node.width / node.len)) status[index].direction = "+"
        if (status[index].translateX === 0) status[index].direction = "-"
        if (status[index].direction === "-") status[index].translateX -= node.width / node.len
        else status[index].translateX += node.width / node.len
        node.style.transform = `translateX(${status[index].translateX}px)`
      },Slider_datas[index].animation_timer)
    },Slider_datas[index].animation_time)
  }
  if (Slider_datas[index].index === true) {
    status[index].spanIndex_statu = setInterval(() => {
      setTimeout(() => {
        node.spanIndexEl[status[index].spanIndex].removeAttribute("style")
        if (status[index].spanIndex === node.len - 1) status[index].spanIndex_direction = "-"
        if (status[index].spanIndex === 0) status[index].spanIndex_direction = "+"  
        if (status[index].spanIndex_direction === "-") status[index].spanIndex -= 1
        else status[index].spanIndex += 1
        node.spanIndexEl[status[index].spanIndex].style = "box-shadow:0 0 0px 3px black inset;"
      },Slider_datas[index].animation_timer)
    },Slider_datas[index].animation_time)
  }
  if (Slider_datas[index].arrows === true) {
    status[index].arrowsIndex_statu = setInterval(() => {
      setTimeout(() => {
        if (status[index].arrowsIndex === node.len - 1) status[index].arrowsIndex_direction = "-"
        if (status[index].arrowsIndex === 0) status[index].arrowsIndex_direction = "+"  
        if (status[index].arrowsIndex_direction === "-") status[index].arrowsIndex -= 1
        else status[index].arrowsIndex += 1
      },Slider_datas[index].animation_timer)
    },Slider_datas[index].animation_time)
  }
}






