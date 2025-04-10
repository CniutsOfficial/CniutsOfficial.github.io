window.addEventListener('load', function() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        //模拟内容加载完成，5秒后隐藏加载动画,并跳转到主页
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 5000);
    }
});