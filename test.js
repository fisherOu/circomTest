const Mapping = {
    0: "self",
    30: "right-up",
    90: "up",
    150: "left-up",
    210: "left-down",
    270: "down",
    330: "right-down"
}

const calAngle = (x1, y1, x2, y2) => {
    if (x1 == x2) {
        if (y1 > y2) {
            //down
            return 270;
        } else if (y1 < y2) {
            //up
            return 90;
        } else {
            return 0;
        }
    }
    const isOdd1 = x1 % 2 == 1;
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    if (deltaX > 0) {
        //rights
        if (isOdd1) {
            let upY = -1 * Math.floor(deltaX / 2);
            let downY = Math.ceil(deltaX / 2);
            if (deltaY < upY * 2) {
                // up
                return 90;
            } else if (deltaY > downY * 2) {
                // down
                return 270;
            } else if (deltaY >= upY * 2 && deltaY < 0) {
                // right-up
                return 30;
            } else {
                // right-down
                return 330;
            }
        } else {
            let upY = -1 * Math.ceil(deltaX / 2);
            let downY = Math.floor(deltaX / 2);
            if (deltaY < upY * 2) {
                // up
                return 90;
            } else if (deltaY > downY * 2) {
                // down
                return 270;
            } else if (deltaY >= upY * 2 && deltaY < 0) {
                // right-up
                return 30;
            } else {
                // right-down
                return 330;
            }
        }
    } else {
        //lefts
        if (isOdd1) {
            let upY = Math.ceil(deltaX / 2);
            let downY = -1 * Math.floor(deltaX / 2);
            if (deltaY < upY * 2) {
                // up
                return 90;
            } else if (deltaY > downY * 2) {
                // down
                return 270;
            } else if (deltaY >= upY * 2 && deltaY < 0) {
                // left-up
                return 150;
            } else {
                // left-down
                return 210;
            }
        } else {
            let upY = Math.floor(deltaX / 2);
            let downY = -1 * Math.ceil(deltaX / 2);
            if (deltaY < upY * 2) {
                // up
                return 90;
            } else if (deltaY > downY * 2) {
                // down
                return 270;
            } else if (deltaY >= upY * 2 && deltaY < 0) {
                // left-up
                return 150;
            } else {
                // left-down
                return 210;
            }
        }
    }
}

const drawLine = (x1, y1, angle) => {
    if (angle == 0) {
        return [{"x": x1, "y": y1}]
    }
    let lst = [];
    let deltaX = 0;
    if (angle == 30 || angle == 330) {
        deltaX = 1;
    } else if (angle == 150 || angle == 210) {
        deltaX = -1;
    }
    const isOdd1 = x1 % 2 == 1;
    for (let index = 0; index < 10; index++) {
        const x2 = x1 + deltaX * index;
        let y2 = y1;
        if (angle == 90) {
            // up
            y2 = y1 - index;
        } else if (angle == 270) {
            // down
            y2 = y1 + index;
        } else if (angle == 30) {
            // right-up
            y2 = isOdd1 ? y1 - Math.floor(deltaX * index / 2) : y1 - Math.ceil(deltaX * index / 2);
        } else if (angle == 330) {
            // right-down
            y2 = isOdd1 ? y1 + Math.ceil(deltaX * index / 2) : y1 + Math.floor(deltaX * index / 2);
        } else if (angle == 150) {
            // left-up
            y2 = isOdd1 ? y1 + Math.ceil(deltaX * index / 2) : y1 + Math.floor(deltaX * index / 2);
        } else if (angle == 210) {
            // left-down
            y2 = isOdd1 ? y1 - Math.floor(deltaX * index / 2) : y1 - Math.ceil(deltaX * index / 2);
        }
        lst.push({"x": x2, "y": y2});
    }
    return lst;
}

// left-up
console.log(Mapping[calAngle(3, 3, 0, 2)])
console.log(drawLine(3, 3, calAngle(3, 3, 0, 2)));

// left-down
console.log(Mapping[calAngle(3, 3, 0, 5)])
console.log(drawLine(3, 3, calAngle(3, 3, 0, 5)));

// right-up
console.log(Mapping[calAngle(3, 3, 6, 2)])
console.log(drawLine(3, 3, calAngle(3, 3, 6, 2)));

// right-down
console.log(Mapping[calAngle(3, 3, 6, 5)])
console.log(drawLine(3, 3, calAngle(3, 3, 6, 5)));

// up
console.log(Mapping[calAngle(3, 3, 3, 0)])
console.log(drawLine(3, 3, calAngle(3, 3, 3, 0)));

// down
console.log(Mapping[calAngle(3, 3, 3, 6)])
console.log(drawLine(3, 3, calAngle(3, 3, 3, 6)));