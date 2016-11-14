
    (function(){
        //获取我们的dom元素
        var banner = document.querySelector('.banner');
        var width = banner.offsetWidth;

        console.log(width);
        var ul = document.querySelectorAll('.banner ul')[0];
        var lis = document.querySelector('.item');
        var points = document.querySelectorAll('.point');
        function addTransition(){
            ul.style.transition = 'all .5s ease';
        }
        function addTranslateX(x){
            ul.style.transform = 'translateX('+ x +'px)';
        }
        function removeTransition(){
            ul.style.transition = 'none';
        }
        var index = 1;
        var timer = null;
        timer = setInterval(function(){
            index++;
            addTransition();
            addTranslateX(-index*width);
            setPoint();
        },2000);
        ul.addEventListener('webkitTransitionEnd', function(e){
            // console.log(e);
            if(index >= 4){
                index = 1;
                removeTransition();
                addTranslateX(-index*width);
                setPoint();
            }else if(index <= 0){
                index = 3;
                removeTransition();
                addTranslateX(-index*width);
                setPoint();
            }
        });
        //小圆点做动画
        var start = 0;
        var end = 0;
        var step = 0;
        ul.addEventListener('touchstart', function(e){
            clearInterval(timer);
            // console.log(e);
            start = e.touches[0].clientX;
        });
        ul.addEventListener('touchmove', function(e){
            e.preventDefault();
            console.log(e);
            end = e.touches[0].clientX;
            step = start -end;
            addTransition();
            addTranslateX(-index*width-step);
        });
        ul.addEventListener('touchend', function(e){
            if(Math.abs(step) > width*(1/3) && end != 0){

                if(step > 0){
                    index++
                }else{
                    index--
                }
            }
            addTransition();
            addTranslateX(-index * width);
            setPoint();
            clearInterval(timer);
            timer = setInterval(function(){
                index++;
                addTransition();
                addTranslateX(-index * width);
            },2000);
            start = 0;
            end = 0;
            step = 0;
        },false);
        function setPoint(){
            var pointIndex = index;
            // console.log(pointIndex);
            for(var i=0; i<points.length; i++){
                points[i].classList.remove('active');
            }
            if(index >= 4 ){
                pointIndex = 1;
            }else if(index <= 0){
                pointIndex = 3;
            }
            // console.log(points[pointIndex]);
            points[pointIndex-1].classList.add('active');
            // points[pointIndex].className = 'point active'
        }
    })()
;