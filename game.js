const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const beeImage = new Image();
beeImage.src = 'bee.svg';

let beeX = 50;
let beeY = 150; // 小蜜蜂的初始高度
let beeVelocityY = 0;
const gravity = 0.5;
const jumpStrength = -10;
let isJumping = false;
const beeSpeed = 2; // 小蜜蜂的水平速度

const clouds = [
    { x: 100, y: 50 },
    { x: 400, y: 80 },
    { x: 700, y: 30 }
];

const trees = [
    { x: 200, y: canvas.height - 50 },
    { x: 600, y: canvas.height - 50 }
];

beeImage.onload = () => {
    draw();
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Draw clouds
    clouds.forEach(cloud => {
        drawCloud(cloud.x, cloud.y);
        cloud.x -= beeSpeed / 2; // 雲朵移動速度較慢
        if (cloud.x < -100) {
            cloud.x = canvas.width;
        }
    });

    // Draw trees
    trees.forEach(tree => {
        drawTree(tree.x, tree.y);
        tree.x -= beeSpeed; // 樹木移動速度與小蜜蜂相同
        if (tree.x < -50) {
            tree.x = canvas.width;
        }
    });

    // Draw bee
    ctx.drawImage(beeImage, beeX, beeY, 50, 50);

    // Update bee position
    beeY += beeVelocityY;
    beeX += beeSpeed; // 更新小蜜蜂的水平位置
    beeVelocityY += gravity;

    // Ensure bee stays above the ground
    const groundLevel = canvas.height - 150; // 設置小蜜蜂飛行的最低高度
    if (beeY > groundLevel) {
        beeY = groundLevel;
        beeVelocityY = 0;
        isJumping = false;
    }

    // Loop bee position
    if (beeX > canvas.width) {
        beeX = -50; // 當小蜜蜂飛出畫布右邊時，從左邊重新進入
    }

    requestAnimationFrame(draw);
}

function drawCloud(x, y) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, true);
    ctx.arc(x + 20, y, 20, 0, Math.PI * 2, true);
    ctx.arc(x + 30, y - 15, 20, 0, Math.PI * 2, true);
    ctx.arc(x + 40, y, 20, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawTree(x, y) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 15, y - 30, 20, 30); // 樹幹
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 25, y - 60);
    ctx.lineTo(x + 50, y - 30);
    ctx.closePath();
    ctx.fill();
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        beeVelocityY = jumpStrength;
        isJumping = true;
    }
});