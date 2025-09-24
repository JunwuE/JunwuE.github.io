// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取导航相关元素
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端导航切换
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // 切换汉堡菜单动画
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.toggle('active');
        });
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        });
    });

    // 平滑滚动到指定部分
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑固定导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时更新导航栏样式
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // 高亮当前部分的导航链接
        highlightActiveSection();
    });

    // 高亮当前可见部分的导航链接
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                // 移除所有活动状态
                navLinks.forEach(link => link.classList.remove('active'));
                // 添加当前部分的活动状态
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // 联系表单已移除，现在使用直接的联系方式

    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 显示通知消息
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 技能项目悬停效果
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 打字机效果
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 页面加载时的动画效果
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-item, .project-card, .research-item, .publication-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // 初始化动画元素
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .research-item, .publication-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    
    // 页面加载时执行一次
    animateOnScroll();

    // 社交链接现在可以正常跳转，不需要阻止默认行为

    // 让 research / publications / projects 中含链接的卡片整块可点击
    function makeCardsClickable(cardSelector) {
        const cards = document.querySelectorAll(cardSelector);
        cards.forEach(card => {
            // 找到卡片内第一个可跳转的链接
            const innerLink = card.querySelector('a[href]');
            if (!innerLink) {
                return; // 无链接则跳过
            }

            // 标记样式以显示可点击
            card.classList.add('clickable');

            // 避免重复绑定
            if (card.__cardClickableBound) return;
            card.__cardClickableBound = true;

            card.addEventListener('click', function(e) {
                // 若直接点击了内部链接，交给浏览器默认行为
                const path = e.composedPath ? e.composedPath() : (e.path || []);
                const clickedAnchor = path && path.find && path.find(n => n.tagName === 'A');
                if (clickedAnchor) return;

                const href = innerLink.getAttribute('href');
                const target = innerLink.getAttribute('target');
                if (!href) return;

                if (target === '_blank') {
                    window.open(href, '_blank', 'noopener');
                } else {
                    window.location.href = href;
                }
            });
        });
    }

    // 应用于三个区块
    makeCardsClickable('.research-item');
    makeCardsClickable('.publication-item');
    makeCardsClickable('.project-card');

    // 项目链接现在可以正常跳转，不需要阻止默认行为

    // 添加页面加载完成的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        }
    });

    // 性能优化：节流滚动事件
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightActiveSection();
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    console.log('🎉 个人网站已成功加载！');
    console.log('💡 提示：您可以在浏览器开发者工具中查看和修改网站代码');
});
