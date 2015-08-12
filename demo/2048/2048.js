var gameVm = avalon.define({
    $id: "game",
    attrs: {
        step: 0,
        moved: false,
        canMove: true
    },
    arr: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    $colors: [
        '#ffffff',
        '#eee4da',
        '#ede0c8',
        '#f2b179',
        '#f59563',
        '#f67c5f',
        '#f65e3b',
        '#edcf72',
        '#edcc61',
        '#edc850',
        '#edc53f',
        '#edc22e',
        '#3c3a32'
    ],
    restart: function() {
        var num = 2;
        arr = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        while (num--) {
            var x = Math.random() * 4 | 0,
                y = Math.random() * 4 | 0;
            if (arr[x][y] == 2) num++;
            arr[x][y] = 2;
        }
        gameVm.attrs.step = 0;
        gameVm.arr = arr;
    },
    getColor: function(n) {
        return gameVm.$colors[Math.log(n) / Math.log(2) | 0];
    },
    moveUp: function(e) {
        var _arr = gameVm.arr;
        _arr = transform.left(_arr);
        _arr = moveAction(_arr);
        gameVm.arr = transform.right(_arr);
        e.stopPropagation();
        e.preventDefault();
    },
    moveRight: function(e) {
        var _arr = gameVm.arr;
        _arr = transform.left(_arr);
        _arr = transform.left(_arr);
        _arr = moveAction(_arr);
        _arr = transform.right(_arr);
        gameVm.arr = transform.right(_arr);
        e.stopPropagation();
        e.preventDefault();
    },
    moveDown: function(e) {
        var _arr = gameVm.arr;
        _arr = transform.right(_arr);
        _arr = moveAction(_arr);
        gameVm.arr = transform.left(_arr);
        e.stopPropagation();
        e.preventDefault();
    },
    moveLeft: function(e) {
        var _arr = gameVm.arr;
        _arr = transform.left(_arr);
        _arr = transform.right(_arr);
        gameVm.arr = moveAction(_arr);
        e.stopPropagation();
        e.preventDefault();
    }
});
gameVm.attrs.$watch('canMove', function(a, b) {
    if (a == false) {
        alert("Game Over!!!");
    }
})

gameVm.restart();
//矩阵旋转
var transform = {
    left: function(arr) {
        var a = [
            [],
            [],
            [],
            []
        ];
        var col = arr[0].length,
            row = arr.length;
        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                a[row - j - 1][i] = arr[i][j];
            }
        }
        return a;
    },
    right: function(arr) {
        var a = [
            [],
            [],
            [],
            []
        ];
        var col = arr[0].length,
            row = arr.length;
        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                a[j][col - i - 1] = arr[i][j];
            }
        }
        return a;
    }
}

var moveAction = function(arr) {
    var empNum = [];
    var zeroNum = 0;
    var moved = false;
    //移动元素
    for (var i = 0; i < arr[0].length; i++) {
        var curIndex = -1;
        var a = arr[i];
        var hasAdd = false;

        for (var j = 0; j < arr.length; j++) {
            var now = a[j];

            //判断为0
            if (now == 0) {
                zeroNum++;
                continue;
            }
            //最左为0时，移动
            if (a[curIndex] == void 0) {
                a[++curIndex] = now;
                if (j > curIndex) {
                    a[j] = 0;
                    moved = true;
                }
                continue;
            }

            if (a[curIndex] == now) {
            	//发生过相加时
                if (hasAdd = !hasAdd) {
                    zeroNum++;
                    a[curIndex] = a[curIndex] * 2;
                    a[j] = 0;
                    moved = true;
                } else {
                    a[++curIndex] = now;
                    if (j > curIndex) {
                        a[j] = 0;
                        moved = true;
                    }
                }
            } else {
                hasAdd = false;
                a[++curIndex] = now;
                if (j > curIndex) {
                    a[j] = 0;
                    moved = true;
                }
            }
        }
        empNum[i] = zeroNum;
    }
    //如果有移动则新添数字
    if (gameVm.moved = moved) {
        zeroNum--;
        var newNum = Math.random() * zeroNum | 0;
        var x, y;
        for (var x = 0; x < 4; x++) {
            if (newNum < empNum[x]) {
                y = newNum + 4 - empNum[x];
                if (arr[x][y] != 0) {
                    continue;
                }
                arr[x][y] = 2;
                break;
            }
        }
        avalon.vmodels.game.attrs.step++;
    }
    //当格子填满时，检查是否可移动
    var canmove;
    if (zeroNum == 0) {
        var _a = arr;
        var current, next;
        canmove = false;
        checkcanmove:
            for (i = 2; i--;)
                for (j = 4; j--;)
                    for (k = 3; k--;) {
                        x = i ? j : k;
                        y = i ? k : j;
                        current = _a[x][y];
                        next = i ? _a[x][y + 1] : _a[x + 1][y];
                        if (current == next || current == 0 || next == 0) {
                            canmove = true;
                            break checkcanmove;
                        }
                    }
    }
    avalon.vmodels.game.attrs.canMove = canmove;
    return arr;
}
