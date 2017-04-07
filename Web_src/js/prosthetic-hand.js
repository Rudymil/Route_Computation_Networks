var h = new Hand({
    timing: 'frame'
});
var f1 = h.growFinger('touch');
var f2 = h.growFinger('touch');
f1.wait(100).moveTo(250, 200, 0).down().wait(500).moveBy(-200, 0, 1000).wait(500).up().wait(500).down().wait(500).moveBy(200, 0, 1000).wait(500).up().wait(500);
f2.wait(100).moveTo(350, 200, 0).down().wait(500).moveBy(200, 0, 1000).wait(500).up().wait(500).down().wait(500).moveBy(-200, 0, 1000).wait(500).up().wait(500);