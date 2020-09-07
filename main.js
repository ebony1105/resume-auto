var result = `/*
*面试官你好，我是xxx
*我将以动画的形式来介绍我自己
*只用文字介绍太单调了
*我就用代码来介绍我自己吧
*首先准备了一些样式
*/

*{
  transition:all 1s;
}

html{
  background: rgb(222,222,222);
  font-size: 16px;
}

#code{
  position:fixed;
  left:0;
  width:50%;
  height:100%;
  border: 1px solid yellow;
  padding: 16px;
}

/*代码高亮*/
span.token.selector
{
  color: #690;
}

span.token.property
{
  color: #905;
}

span.token.function
{
  display: inline-block;
  color: #DD4A68;
}

/*加点动画吧*/
#code
{
  transform: rotate(360deg);
}

/*我来介绍一下我自己*/
/*我需要一张白纸*/

#paper{
    width: 50%;
    height:100%;
    right:0;
    position:fixed;
    background: yellow; 
    display:flex;
    justify-content: center;
    align-item:center   
}

#paper > .content{
    background: white;
    height: 100%;
    width:100%;
    font-size: 16px;
    font-color: grey;
    padding: 16px;
}
  
`

let result2=`
  #paper{   
  }
  /*
  *接下来就要把markdown 变成 HTML - marked.js
  */
  /*
  *接下来给HTML加样式
  */
  /*
  *这就是我的简历了，谢谢观看
  */
`

var md =`
#自我介绍

我叫陆佳鑫
1996年11出生
2019年毕业于南京邮电大学 
软件工程专业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉JavaScript CSS

# 项目介绍
1、轮播
2、简历
3、画板

# 联系方式
手机： 18805198230
QQ： 405447460

`

writeCode('',result,()=>
{  //wirteCode call the function
  createPaper(()=>{
    writeCode(result,result2,()=>{
      markdown(md)
    })
  })
})  //不能直接调用createPaper函数，



/*
 * 1.定闹钟
 * 2.wirteCode执行
 * 3.执行createPaper（）
 * 4.闹钟时间到
 * 5.实行第一行代码
 * 也就是说在代码还没有结束的时候，createPaper就已经执行完毕了
 */





/*function f3(preResult) {

  var n = 0
  let timer = setInterval(()=>{
    n += 1
    //code.innerHTML = code.innerHTML + result[n-1]
    code.innerHTML = preResult + result.substring(0,n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
    console.log()
    styleTag.innerHTML = preResult + result.substring(0,n)
    console.log(styleTag)
    if(n>=result.length){
      window.clearInterval(timer)
    }
  },50)
}
*/

/*
* 为什么writeCode是异步任务
* createPaper是同步任务
*
*
* */

//把code写到#code和style标签里面去
function writeCode(prefix,code,fn){
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let n = 0
  let timer = setInterval(()=>{
    n += 1
    //code.innerHTML = code.innerHTML + result[n-1]
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css);
    //domCode.scrollTop = 10000   //这两种方法都可以实现代码自动往下滚
    domCode.scrollTop = domCode.scrollHeight
    styleTag.innerHTML = prefix + code.substring(0,n)
    if(n>=code.length){
      window.clearInterval(timer)
      fn.call()
    }
  },10)
}

//代码到这里不会自动往下滚


function createPaper(fn){
  let paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  document.body.appendChild(paper)
  paper.appendChild(content)
  fn.call()
}


function markdown(markdown,fn){
  let domPaper = document.querySelector('#paper > .content')
  let n = 0
  let timer = setInterval(()=> {
    n += 1
    domPaper.innerHTML = markdown.substring(0,n)
    domPaper.scrollTop = domPaper.scrollHeight
    domPaper.innerHTML = markdown.substring(0,n)
    if (n >= markdown.length)
    {
      window.clearInterval(timer)
      fn.call()
    }
  })
}