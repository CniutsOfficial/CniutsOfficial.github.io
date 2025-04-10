// 获取每日一言并插入到页面中
function fetchHitokoto() {
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            const author = data.from_who ? data.from_who : data.from;
            const links = `https://hitokoto.cn/?uuid=${data.uuid}`;
            const hitokoto = `『${data.hitokoto}』——${author}`;
            document.querySelector('.Hitokoto').href = links;
            document.querySelector('.Hitokoto').textContent = hitokoto;
        })
        .catch(error => console.error('无法获取一言，错误信息:', error));
}

// 设置每日0点刷新一言
function setDailyRefresh() {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // 设置为下一个0点
    const timeUntilMidnight = nextMidnight - now;

    setTimeout(() => {
        fetchHitokoto();
        setDailyRefresh(); // 递归调用，确保每日刷新
    }, timeUntilMidnight);
}

// 更新背景渐变位置
function updateBackgroundPosition(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
}

// 初始化背景动画
function initBackgroundAnimation() {
    let lastTime = 0;
    const throttleDelay = 50; // 50ms节流
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime >= throttleDelay) {
            requestAnimationFrame(() => {
                updateBackgroundPosition(e);
            });
            lastTime = now;
        }
    });
}

// 创建几何图形元素
function createGeometricShapes() {
    const shapesContainer = document.body;
    for (let i = 0; i < 3; i++) {
        const shape = document.createElement('div');
        shape.className = 'geometric-shape';
        shapesContainer.appendChild(shape);
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', () => {
    fetchHitokoto();
    setDailyRefresh();
    initBackgroundAnimation();
    createGeometricShapes();
});
