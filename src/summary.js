export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}

/*----- 二叉树 ----*/
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      div{position: absolute;}
    </style>
</head>
<body>
    

    <script>
       var canvas = document.createElement('canvas'); // creates new canvas element
    canvas.height = document.body.clientHeight; //get original canvas height
    canvas.width = document.body.clientWidth; // get original canvas width
    document.body.appendChild(canvas);

    

       class Test{
    
    constructor(num, many) {
        this.num = num;
        this.many = many;
        this.init()
    }
  
    init(){
        if(this.many == 0)
           return

        this.left = new Test(this.num - 1 - parseInt(Math.random()*8), this.many -1)
        this.right = new Test(this.num - 1 - parseInt(Math.random()*8), this.many -1)  
    }
  }
  
  let test = new Test(80, 5)
//              
//       1 3 7 15   
//                               99
//               88                              88
//       80              88              87              88
//// 55      77      77      76      55      77      77      76
// 33  32  55  56  73  75  73  75  33  32  55  56  73  75  73  75    

let tempArr = [[test]]

while(test.left){
  
         let num = tempArr.length, axiba = []
         for(let i = 0;i<tempArr[0].length;i++){
             axiba.push(tempArr[0][i].left)
             axiba.push(tempArr[0][i].right)
         }
         tempArr.unshift(axiba)
     
     test = test.left
}
// 0 2 4       1
// let tempArr = []
// for(let i = 0; i<=4; i++){
//    let num = Math.pow(2, 4-i)
//    for(let j = 1; j<num; j++){
//         //0 1 3 7 15  0  0 + 20 
//         tempArr.push({left:suan(i,j), top:4-i})
//    }
// }

console.log(tempArr)

function getDis(x,y){
    let num_base = 0, disX;
    for(let i = 0; i<=y; i++ ){
        if(i != 0)
           num_base += Math.pow(2, i-1)
    }

    disX = num_base + Math.pow(2, y+1)*x
    return disX
}

 let ctx = canvas.getContext('2d')
              ctx.strokeStyle = "#f5d300"
             // console.log(this.getCtxColor(i))
              ctx.lineWidth = 1
              ctx.beginPath();

tempArr.forEach((item,index) => {
   item.forEach((ele,number) => {
        let x = getDis(number, index)
        let y = tempArr.length - index - 1
        let dom = document.createElement('div')
        dom.textContent = ele.num
        dom.style.left = x*15 + 'px'
        dom.style.top = y*25 + 'px'
        document.body.appendChild(dom)

        if(index >0){
            let bot1 = number*2
            let bot2 = number*2 + 1

            ctx.moveTo(x*15,y*25)
            ctx.lineTo(getDis(bot1, index-1)*15, (tempArr.length - index)*25 )
            ctx.moveTo(x*15,y*25)
            ctx.lineTo(getDis(bot2, index-1)*15, (tempArr.length - index)*25 )
        }
   })
}) 

              ctx.stroke()
              ctx.closePath()
        
    </script>
</body>
</html>
/*----- 二叉树 ----*/
