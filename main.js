const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
let x =0;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const cars =generateCars(1);
// const traffic = generateTraffic(3);
const traffic =
[new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
            new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
            new Car(road.getLaneCenter(1), -300, 30, 50, "DUMMY", 2),
            new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
            new Car(road.getLaneCenter(2), -500, 30, 50, "DUMMY", 2),
            new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 2),
            new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2)
        ];

let bestCar= cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0; i< cars.length; i++){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!= 0){
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
}
function generateTraffic(trafficLayers= 100){
    let pos = -100;
    let traffic = [];
    for(let i = 0; i < trafficLayers; i++ ){
        let carLane1 = Math.floor(Math.random()*(road.laneCount));
        let carLane2 = Math.floor(Math.random()*(road.laneCount));
        traffic.push(new Car(road.getLaneCenter(carLane1), pos, 30, 50, "DUMMY", 2));
        traffic.push(new Car(road.getLaneCenter(carLane2), pos, 30, 50, "DUMMY", 2));
        pos-=300;
    }
    // console.log(traffic);
    return traffic;
}
animate();

function save(){
    localStorage.setItem("bestBrain", 
        JSON.stringify(bestCar.brain)
    );
    console.log("saved");
}
function isPast(carx, trafficArr){
    let furthestTraffic = Math.min(...trafficArr.map(t=>t.y));

    return carx.y<(furthestTraffic-200);
}
function train(){
    console.log("hello");
}
function discard(){
    localStorage.removeItem("bestBrain")
}
function getFurthest(c){

    return c.y <= (Math.min(...cars.map(c=>c.y)) +30);
}
function generateCars(N){
    const cars=[];
    for (let i = 1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50, "AI"));
    }
    return cars;
}
function getCenteredCar(arr){
    let minDev=100;
    let minIndex = -1;

    for(let i =0; i <arr.length; i++){
        let x = arr[i].x;
        let deviationArray =[];
        for(let j = 0; j< road.laneCount; j++){
            deviationArray.push(Math.abs(x-road.getLaneCenter(j)));
        }

        let minVal = Math.min(...deviationArray);

        if(minVal < minDev){
            minDev = minVal;
            minIndex = i;
        }
    }

    return arr[minIndex];
}
window.setInterval(train(), 200);

function animate(time){

    x+=1;
    // if(x>=1500){
    //     location.reload();
    // }
    for(let i = 0; i< traffic.length; i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic); 
    }
    furthestCars = cars.filter(getFurthest);
   
    bestCar = getCenteredCar(furthestCars);

    carCanvas.height =  window.innerHeight;
    networkCanvas.height =  window.innerHeight;
    // console.log(furthestCars);
    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    road.draw(carCtx);
    for(let i = 0; i< traffic.length; i++){
        traffic[i].draw(carCtx, "red");
    }
    carCtx.globalAlpha=0.2;
    for(let i = 0; i < cars.length; i++){
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx, "blue", true);


    carCtx.restore();

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    if(isPast(bestCar, traffic)){
        save();
        // location.reload();
    }
 
    

    requestAnimationFrame(animate);
}
