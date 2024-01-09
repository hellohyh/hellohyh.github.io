// script.js

document.addEventListener('DOMContentLoaded', function() {

    // 设置默认页面为首页
    const defaultPage = 'home-content';

    // 刷新时自动跳转到默认页面
    window.location.hash = defaultPage;
    // 获取导航按钮元素列表
    var navButtons = document.querySelectorAll('.nav-buttons a');


    // 为每个按钮添加点击事件监听器
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // 移除所有按钮上的 "active" 类
            navButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            // 在点击的按钮上添加 "active" 类
            button.classList.add('active');

            // 获取点击按钮的数据标识
            const page = button.dataset.page;

            // 隐藏所有内容容器
            document.querySelectorAll('.content-container').forEach(function(content) {
                content.style.display = 'none';
            });

            // 根据点击的按钮显示对应的内容容器
            showContentContainer(page);

            // 如果点击的是首页按钮，则滚动到页面顶部
            if (page === 'home-content') {
                window.scrollTo(0, 0);
            }
        });
    });

    // 检查 URL 中的锚点，并显示对应的内容容器
    var currentHash = window.location.hash.substr(1);
    showContentContainer(currentHash);

    // 显示对应的内容容器函数
    function showContentContainer(page) {
        // 判断点击的按钮，并显示对应的内容容器
        if (page === 'home-content') {
            const homeContainer = document.getElementById('home-content');
            if (homeContainer) {
                homeContainer.style.display = 'block';
            }
        } else if (page === 'activities') {
            const activitiesContainer = document.getElementById('activities-content');
            if (activitiesContainer) {
                activitiesContainer.style.display = 'block';

                var activityDetails = document.getElementById('activity-details');
                if (activityDetails) {
                    activityDetails.style.display = 'table'; // 显示活动剪影框
                }
            }
        } else if (page === 'departments') {
            const departmentsContainer = document.getElementById('departments-content');
            if (departmentsContainer) {
                departmentsContainer.style.display = 'block';
            }
        } else if (page === 'whisper') {
            const whisperContainer = document.getElementById('whisper-content');
            if (whisperContainer) {
                whisperContainer.style.display = 'block';
            }
        } else if (page === 'contact') {
            // 如果点击的按钮是“联系与反馈”按钮，则显示联系与反馈内容容器
            const contactContainer = document.getElementById('contact-content');
            if (contactContainer) {
                contactContainer.style.display = 'block';
            }
        } else if (page === 'newPage') {
            const newPageContainer = document.getElementById('newPage-content');
            if (newPageContainer) {
                newPageContainer.style.display = 'block';
            }
        }
        // 可以根据需要继续添加其他按钮的判断逻辑
    }


    // 获取悄悄话输入框和发送按钮
    const whisperInput = document.getElementById('whisper-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        // 获取用户输入的内容
        const whisperContent = whisperInput.value;

        // 检查输入是否为空
        if (whisperContent.trim() === '') {
            alert('请输入内容后再发送！');
            return;
        }

        // 生成文件名，可以根据需要更改文件名规则
        const fileName = 'received_whisper_' + Date.now() + '.txt';

        // 创建一个Blob对象
        const blob = new Blob([whisperContent], { type: 'text/plain' });

        // 创建一个下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;

        // 添加下载链接到页面，并触发点击事件
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // 移除下载链接
        document.body.removeChild(downloadLink);

        // 清空输入框
        whisperInput.value = '';
    });


    // 轮播图部分
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    // 设置定时器自动切换轮播图
    setInterval(nextSlide, 3000);

    // 初始显示第一张轮播图
    showSlide(currentIndex);

    
});
