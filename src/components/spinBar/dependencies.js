
function* positionGenerator(radius, sectionsNumber) {
    let offset = 0;
    const step = (Math.PI / 45);
    const rotateStep = 360/sectionsNumber;
    const rotateStepRadian = (Math.PI*rotateStep)/180;
    const imageNumber = parseInt(sectionsNumber/2)+1;
    const rotateOffset = -(sectionsNumber/4);
    const [pushBottomLimit, pushUpLimit] = [70*Math.PI/180 , 110*Math.PI/180];

    const calcRotate = (radian) => {
        return -(rotateStep*(rotateOffset) + (radian*180/Math.PI));
    }
    const pushOffset = radius - calcRotate(pushBottomLimit);
    
    const circleEquotation = (radians,r) => {
        radians %= 2*Math.PI;
        let x = Math.sin(radians)*r , active = false;
        if (radians > pushBottomLimit && radians < pushUpLimit) {
            x -= ( (Math.abs(radians - Math.PI/2) - pushBottomLimit)*5)^2;
            active = true;
        }  
        return {
            y: Math.cos(radians)*r,
            x: x,
            rotate: calcRotate(radians),
            active: active
        }
    }
    const crownsSections = Array(imageNumber).fill("").map( (e,index) => {
        return { 
            step: rotateStepRadian*(index),
            imageNumber: index === imageNumber - 1 ? 0 : index,
        };
    })
    
    while(true) {
        let newCrownsPack = crownsSections.map( (e,index) => {
            let obj = circleEquotation(e.step+offset,radius);
            obj.imageNumber = e.imageNumber;
            return obj;
        })
        let direction = yield newCrownsPack;
        
        if (newCrownsPack[0].rotate > 112 ) {

            let temp = crownsSections.shift();
            temp.step += rotateStepRadian*imageNumber;
            temp.imageNumber = crownsSections[0].imageNumber;
            crownsSections.push(temp);
            
        } else if (newCrownsPack[newCrownsPack.length - 1].rotate < -112) {

            let temp = crownsSections.pop();
            temp.step -= rotateStepRadian*imageNumber;
            temp.imageNumber = crownsSections[crownsSections.length-1].imageNumber;
            crownsSections.unshift(temp);
        }

        if (direction === true) {
            offset+= step;
        } else if (direction === false){
            offset-= step;
        } 
    }
}

// 1. referencja useRef() do koron
// 2. promien kola
// 3. liczba koron do wyswietlenia
function crownsGenerator(_refs,_CIRCLE_RADIUS,_CROWNS_NUMBER) {
    let generator = positionGenerator(_CIRCLE_RADIUS,_CROWNS_NUMBER);
    const refs = _refs;
    
    return [ generator.next().value, function(direction,crowns) {
        const val = generator.next(direction).value;
    
        //debugger;
        refs.forEach( (element,index) => {
            //index %= val.length-1;
            element.style.right = val[index].x+"px";
            element.style.top = _CIRCLE_RADIUS-val[index].y+"px";
            element.childNodes[0].src = crowns[val[index].imageNumber];
            element.childNodes[0].style.transform = 'rotate('+val[index].rotate+'deg)';
        });
    }];
};

function disableScroll() { 
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft; 
    // if any scroll is attempted, set this to the previous value 
    window.onscroll = function(e) { 
        window.scrollTo(scrollLeft, scrollTop); 
    }; 
} 
function enableScroll() { 
    window.onscroll = function() {}; 
} 

export { crownsGenerator,disableScroll,enableScroll };