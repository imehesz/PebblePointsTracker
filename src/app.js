/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var main = new UI.Card({
  title: 'P-Tracker',
  icon: 'images/menu_icon.png',
  subtitle: ["Hey", "Hello", "Hi", "Whaddup"][Math.ceil(Math.random()*3)] + "!",
  body: "It is a super simple Points Tracking system for 2-player games.\nPress ->\nby @imehesz"
});

main.show();

var resetPoints = function(pObj) {
  pObj.home = 0;
  pObj.visitor = 0;
  return pObj;
};
var points = resetPoints({});

var confirm = function(yCb, nCb, scope) {
  var confirmCard = new UI.Card({
    title: "Confirm Reset",
    body: "Are you sure?\n\nUP - Yes\nDOWN - No"
  });
  
  confirmCard.show();
  
  if (typeof yCb == "function") {
    confirmCard.on("click", "up", function(){
      yCb.apply(scope,[]);
      confirmCard.hide();
    });
  }
  
  if (typeof nCb == "function") {
    confirmCard.on("click", "down", function(){
      nCb.apply(scope,[]);
      confirmCard.hide();
    });
  }
};

var mainOnClicks = function(e) {
  var tracker = new UI.Card({
    title: "P-Tracker"
  });
  
  var updateTracker = function() {
    tracker.body("\nHome: " + points.home + "\nVisitor: " + points.visitor);    
  };
  
  tracker.show();
  
  tracker.on("click", "up", function(){
    points.home = points.home+1;
    updateTracker();
  });
  
  tracker.on("click", "down", function(){
    points.visitor = points.visitor+1;
    updateTracker();
  });
  
  tracker.on("click", "select", function(){
    confirm(function(){
      resetPoints(points);
      updateTracker();
    }, function(){
      updateTracker();
    }, this);
  });
  
  updateTracker();
};

main.on('click', 'select', mainOnClicks);
main.on('click', 'up', mainOnClicks);
main.on('click', 'down', mainOnClicks);