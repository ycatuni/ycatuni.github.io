        var start = document.querySelector("#start");
		start.onmousedown= function(){
            document.getElementById("start").disabled=true;
            var count=0;
            document.getElementById("count").innerHTML=count;
            //设置某行某列的小格格为某颜色
            function setColor(row , col , color){
                document.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
            }

            //蛇
            var snake = [
                {"row" : 3 , "col" : 5},
                {"row" : 3 , "col" : 4},
                {"row" : 3 , "col" : 3},
                {"row" : 3 , "col" : 2}
            ];

            //画蛇
            function drawSnake(){
                for(var i = 0 ; i < snake.length ; i++){
                    setColor(snake[i].row , snake[i].col , "rebeccapurple");
                }
            }

            //清屏
            function clearScreen(){
                for(var i = 0 ; i < 14 ; i++){
                    for(var j = 0 ; j < 14 ; j++){
                        setColor(i , j , "white");
                    }
                }
            }


            //产生食物函数
            function createFood(){
                do{
                    var row = parseInt(Math.random() * 14);
                    var col = parseInt(Math.random() * 14);

                    //验证这一项是不是在蛇身上
                    //一上来“无罪推定”，认为食物不再蛇身上
                    var isExist = false;
                    for(var i = 0 ; i < snake.length ; i++){
                        if(snake[i].row == row && snake[i].col == col){
                            isExist = true;
                        }
                    }
                }while(isExist);

                //其他去*
                for(var i = 0 ; i < 14 ; i++){
                    for(var j = 0 ; j < 14 ; j++){
                        document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = "";
                    }
                }

                //自己加*
                document.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = "⚪";
            }


			//虚拟方向按键
            var zuo = document.querySelector("#zuo");
            var shang = document.querySelector("#shang");
            var you = document.querySelector("#you");
            var xia = document.querySelector("#xia");
            zuo.onmousedown=function(){
                document.getElementById("m1").play();
                _direction = direction;
                if(_direction != "right"){
                    _direction = "left";
                }
            }
            shang.onmousedown=function(){
                document.getElementById("m1").play();
                _direction = direction;
                if(_direction != "down"){
                    _direction = "up";
                }
            }
            you.onmousedown=function(){
                document.getElementById("m1").play();
                _direction = direction;
                if(_direction != "left"){
                    _direction = "right";
                }
            }
            xia.onmousedown=function(){
                document.getElementById("m1").play();
                _direction = direction;
                if(_direction != "up"){
                    _direction = "down";
                }
            }


            document.body.onkeydown = function(e){
                //播放声音
                document.getElementById("m1").play();

                var keyCode = e.keyCode;
                //备份当前方向
                _direction = direction;
                switch(keyCode){
                    case 37 :
                        if(_direction != "right"){
                            _direction = "left";
                        }
                        break;
                    case 38 :
                        if(_direction != "down"){
                            _direction = "up";
                        }
                        break;
                    case 39 :
                        if(_direction != "left"){
                            _direction = "right";
                        }
                        break;
                    case 40 :
                        if(_direction != "up"){
                            _direction = "down";
                        }
                        break;
                }
            }

            //方向
            var direction = "right";
            var _direction = "right";

            //调用画蛇
            drawSnake();
            //调用生成食物
            createFood();

            var timer = setInterval(function(){
                clearScreen();		//清屏

                //解决nameless的bug的问题：
                if(direction == "right" && _direction != "left"){
                    direction = _direction;
                }else if(direction == "left" && _direction != "right"){
                    direction = _direction;
                }else if(direction == "up" && _direction != "down"){
                    direction = _direction;
                }else if(direction == "down" && _direction != "up"){
                    direction = _direction;
                }

                switch(direction){
                    case "right" :
                        //判断我现在不是最右
                        if(snake[0].col == 13){
                            document.getElementById("gameover").play();
                            alert("笨蛋, 撞死啦! 得分:"+count);
                            document.getElementById("start").disabled=false;
                            clearInterval(timer);
                            return;

                        }
                        snake.unshift({"row" : snake[0].row , "col" : snake[0].col + 1});
                        break;
                    case "down" :
                        //判断我现在不是最下
                        if(snake[0].row == 13){
                            document.getElementById("gameover").play();
                            alert("笨蛋, 撞死啦! 得分:"+count);
                            document.getElementById("start").disabled=false;
                            clearInterval(timer);
                            return;

                        }
                        snake.unshift({"row" : snake[0].row  + 1 , "col" : snake[0].col});
                        break;
                    case "left" :
                        //判断我现在不是最下
                        if(snake[0].col == 0){
                            document.getElementById("gameover").play();
                            alert("笨蛋, 撞死啦! 得分:"+count);
                            document.getElementById("start").disabled=false;
                            clearInterval(timer);
                            return;

                        }
                        snake.unshift({"row" : snake[0].row , "col" : snake[0].col - 1});
                        break;
                    case "up" :
                        //判断我现在不是最上
                        if(snake[0].row == 0){
                            document.getElementById("gameover").play();
                            alert("笨蛋, 撞死啦! 得分:"+count);
                            document.getElementById("start").disabled=false;
                            clearInterval(timer);
                            return;

                        }
                        snake.unshift({"row" : snake[0].row - 1, "col" : snake[0].col});
                        break;
                }

                //判断自身碰撞
				for (var k=1;k<snake.length;k++){
				    if ((snake[0].row==snake[k].row)&&(snake[0].col==snake[k].col)) {
                        document.getElementById("gameover").play();
                        alert("笨蛋, 撞死啦! 得分:"+count);
                        document.getElementById("start").disabled=false;
                        clearInterval(timer);
                        return;

                    }
                    }


                //如果没有吃到食物，就尾删
                if(document.getElementsByTagName("tr")[snake[0].row].getElementsByTagName("td")[snake[0].col].innerHTML != "⚪"){
                    snake.pop();
                }else{
                    //吃到了
					//计数君+1
					count++;
                    document.getElementById("count").innerHTML=count;

                    //博声音
                    document.getElementById("m2").play();
                    //产生新的食物
                    createFood();
                }
                drawSnake();		//画蛇
            },200);

        };
