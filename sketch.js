var database, firebase;

var drawing = [];
var currentPath = [];

var isDRawing = false;

function setup(){
    canvas = createCanvas(200,200);
    var params = getURLParams();
    console.log(params);
    if(params .id){

    }
    canvas.mosuePressed(startPath);
    canvas.mosueReleased(endPath0);

    var saveButton = select('#saveButton');
    savaButton.mousePressed(saveDrawing);

    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    canvas.parent('canvascontainer')
    var firebaseConfig = {
        apiKey: "AIzaSyBX7FQzj_Ud6lHR978mVWoj06ti8otwZyY",
        authDomain: "canvas-4665d.firebaseapp.com",
        databaseURL: "https://canvas-4665d.firebaseio.com",
        projectId: "canvas-4665d",
        storageBucket: "canvas-4665d.appspot.com",
        messagingSenderId: "648435040689",
        appId: "1:648435040689:web:acecced95a2da7f9567d90",
        measurementId: "G-00NJR55VR0"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
      var params = getURLParams();
    console.log(params);
    if(params .id){
        console.log(params.id)
      showDrawings(params.id)
    }
      var ref = database.ref('drawings');
      ref.on('value', gtoData, errData)
}

function startPath(){
    isDrawing = true;
    currentPath = [];
    currentPath.push(point);
    drawing.push(currentPath);
}

function endPath(){
    drawing.push(currentPath);
}

function draw(){
    backgrond(0);
    if(isDrawing){
        var point = {
            x:mouseX,
            y:mouseY
        }

    }

   
    stroke(255);
    strokeweight(4);
    noFill();
    for (var i = 0; i< drawing.length; i++){
        var path = drawing[i];
        beginShape();
        for (var i = 0; i< path.length; i++){
     vertex(path[i].x,drawing[i].y )
        }
        endShape();
    }
  
}

function saveDrawing(){
    var ref = database.ref('drawings');
    var data = {
        name: "sohan",
        drawing: drawing
    }
   var result = ref.push(data, dataSent);
     console.log(result.key)
    funciron dataSent (err, status) {
       console.log(status);
    }
}
  
function gotData(data){

    var elts = selectAll('.listing')
    for (var i = 0; i< elts. length, i++){
        elts[i].remnove();
    }
 var drawings = data.val();
 var key = Object.keys(drawings)

 for(var i =0; i< keys.length; i++){
     var key = keys[i];
     //console.log(key)
     var li = createElement('li', '');
     li.class('listing')
     var perma = createA('?id=' +key, permalink);
     perma.parents(li);
     perma.style('padding', '4px')
     ahref.mousePressed(showDrawing);
     ahref.parent(li);
     li.parent('drawingList')
 }
}

function errData(err){
  console.log(err)
}

function showDrawing(){
    //console.log(arguments);
    if(key instanceof MouseEvent){
     key = this.html();
    }
    console.log(this.html());

    var ref = database.ref('drawings/'+key)
    ref.on('value', oneDrawing, errData);

    function oneDrawing(data){
      var dbdrawing = data.val();
      drawing = dbdrawing.drawing;
      //console.log(drawing)
    } 
}

function clearDrawing(){
    drawing = [];
}