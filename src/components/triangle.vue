<template>
    <div>
        <!-- y=Math.sin(3x)  -->
        <div id="uploadForm">
            <p >上传文件： <input type="file" id="file" multiple /></p>
            <input type="button" value="上传" @click="doUpload" />
        </div>

        <gameList>
            <div slot="slota">qqqqqqqqqqqqqqqqq</div>
            <div slot="slotb">qqqqqeeeeqqqqqqq</div>
        </gameList>
        <router-link :to="'/movies/33'">ee</router-link>
        <button @click="gohello">helloword</button>

         <div class="name" flex="main:center cross:center dir:top">
                <div class="aa">
                    
                </div>
                <div class="bb"></div>
         </div>

         <img :src="imgSrc" alt="">

         <button @click="getCode">getcode</button>

         <div flex="box:first" style="width:300px;height:100px;">
              <div>aa</div> <div>bb</div> <div>cc</div><div>dd</div>
         </div>
        <!-- <router-link :to="'/helloworld'">helloworld</router-link> -->

        <canvas ref="canvas"></canvas>
        <div class="icon_discount"></div>
        <!-- <tabNav :list="navs" v-model="active"> </tabNav>  
        <p>{{active}}</p> -->
    </div>
</template>

<script>
    import Socket from '../tool/vue-socket'
    import tabNav from './custom/tabNav'
    import gameList from './custom/gamelist'
    import * as $ from 'jquery'
    import {upload} from '../getData/dataService'
    export default {
        name:'triangle',
        data(){
            return {
                canvas:'',
                canvasWidth:'',
                canvasHeight:'',
                offSet:0,
                ws:null,
                imgSrc:'',
                active:0,
                navs: [
                {name: "注册优惠", icon: "icon_discount"},
                {name: "电子优惠", icon: "icon_laohuji"},
                {name: "长期优惠", icon: "icon_changqi"},
                {name: "已结束", icon: "icon_guoqi"},
              ]
            }
        },

        components:{tabNav, gameList},

        created(){
            console.log('created');

            this.ws = new Socket({url: 'ws://192.168.10.199:9280'});



            // this.ws.send({
            //     service:'platform',
            //     functionName:'getPlatformAnnouncements',
            //     data:{reach:'players'}
            // }).then(res => {console.log(res.data);})

            // let data={phoneNumber:'15926346231',purpose:"registration",name:'ybfwzking10'};
          
            // this.ws.send({
            //     service:'player',
            //     functionName:'getSMSCode',
            //     data:data
            // }).then(res => {console.log(res);})      
        },

        mounted(){
            console.log('mounted')
            //upload();
            const canvas = this.$refs.canvas;
            canvas.height = 500;
            canvas.width = 500;
            this.canvas = canvas;
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
            const ctx = canvas.getContext('2d');
            this.requestAni(ctx);
        },

        methods:{
            doUpload(){
                var formData = new FormData();
                var files= $("#file")[0].files;
                   /**这里多次append file到同一个key里面*/
                for(var i=0;i<files.length;i++){
                    formData.append("file[]", files[i]);
                }
                //formData.append('file', $('#file')[0].files);       
                upload(formData);
            
            },
            getCode(){
                 this.ws.send({
                service:'player',
                functionName:'captcha'
             }).then(res => this.imgSrc = this.arrayBufferToBase64(res.data.data))
            },
            arrayBufferToBase64(buffer) {
                let binary = '';
                let bytes = new Uint8Array(buffer);
                let len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return 'data:image/png;base64,' + window.btoa(binary);
            },

            gohello(){
                this.$router.push({name:'movies', params:{id:55}}, () => {console.log('fullfill')})
            },
            requestAni(ctx){
                const canvasWidth = this.canvasWidth;
                const canvasHeight = this.canvasHeight;
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                this.drawSin(ctx)
                this.drawSins(ctx)
                 
                this.offSet += 0.05
                requestAnimationFrame(this.requestAni.bind(this,ctx));
            },

            drawSin(ctx){
                const points = [];
                const canvasWidth = this.canvasWidth;
                const canvasHeight = this.canvasHeight;
                const startX = 0
               
                ctx.beginPath();
                ctx.strokeStyle = '#f5d300';
                ctx.fillStyle="pink"
  
                for(let x = startX; x < canvasWidth; x += 1){
                    const y = Math.sin(0.02*x + this.offSet)*10;
                    points.push([x, (canvasHeight / 2) + y]);
                    if(x == 0){
                       ctx.moveTo(x, (canvasHeight / 2) + y)
                    }else{
                       ctx.lineTo(x, (canvasHeight / 2) + y);   
                    }     
                }

                ctx.lineTo(canvasWidth, canvasHeight);
                ctx.lineTo(startX, canvasHeight);
                ctx.lineTo(points[0][0], points[0][1]);
                
                ctx.stroke();
                ctx.fill();

               // this.drawSins(ctx)
            },

            drawSins(ctx){
                const points = [];
                const canvasWidth = this.canvasWidth;
                const canvasHeight = this.canvasHeight;
                const startX = 0
               // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.fillStyle="orange"
  
                for(let x = startX; x < canvasWidth; x += 1){
                    const y = Math.sin(0.02*x + this.offSet + 1)*10;
                    points.push([x, (canvasHeight / 2) + y]);
                    if(x == 0){
                       ctx.moveTo(x, (canvasHeight / 2) + y)
                    }else{
                       ctx.lineTo(x, (canvasHeight / 2) + y);   
                    }     
                }

                ctx.lineTo(canvasWidth, canvasHeight);
                ctx.lineTo(startX, canvasHeight);
                ctx.lineTo(points[0][0], points[0][1]);
                
                ctx.stroke();
                ctx.fill();
            },

            draw(ctx, offset, style){
                const points = [];    
                const startX = 0
                ctx.beginPath();
                let {strokeStyle, fillStyle} = style
                ctx.strokeStyle = strokeStyle;
                ctx.fillStyle = fillStyle;
  
                for(let x = startX; x < this.canvasWidth; x += 1){
                    const y = Math.sin(0.02*x + this.offSet + 1)*10;
                    points.push([x, (this.canvasHeight / 2) + y]);
                    if(x == 0){
                       ctx.moveTo(x, (this.canvasHeight / 2) + y)
                    }else{
                       ctx.lineTo(x, (this.canvasHeight / 2) + y);   
                    }     
                }

                ctx.lineTo(canvasWidth, canvasHeight);
                ctx.lineTo(startX, canvasHeight);
                ctx.lineTo(points[0][0], points[0][1]);
                
                ctx.stroke();
                ctx.fill();
            }
        },

        destroyed(){
            console.log('destroyed')
        }
    } 
   
</script>

<style scoped lang="scss">
.name{width: 200px;height: 300px; border: 1px solid blue}

.aa{width:100px;height: 100px;background: chocolate}
.bb{width:80px;height: 100px;background:pink}
</style>