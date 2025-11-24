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

    // --- 3D Tilt Effect ---
    function init3DTilt(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // 计算旋转角度
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // 最大旋转 10度
                const rotateY = ((x - centerX) / centerX) * 10;

                // 应用变换
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            element.addEventListener('mouseleave', () => {
                // 复位
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
            
            // 添加过渡效果，使复位更平滑，但移动时要跟手（我们在 CSS 中处理）
            element.style.transition = 'transform 0.1s ease-out';
        });
    }

    // 初始化 3D 倾斜效果
    // init3DTilt('.image-placeholder'); // 移除头像浮动
    init3DTilt('.project-card');
    init3DTilt('.skill-item');
    init3DTilt('.research-item');     // 添加 Research
    init3DTilt('.publication-item');  // 添加 Publication

    // --- 项目预览浮窗 (自定义图 + GitHub 信息) ---
    function initProjectPreview() {
        // 1. 创建预览容器
        const tooltip = document.createElement('div');
        tooltip.className = 'project-preview-tooltip';
        
        // 内部结构：图片层 + 信息层
        tooltip.innerHTML = `
            <div class="preview-image-container">
                <img class="preview-img" src="" alt="Project Preview">
            </div>
            <div class="preview-info">
                <div class="repo-name"></div>
                <div class="repo-stats">
                    <!-- 可以在这里扩展 Star 数等，目前先保持简洁 -->
                </div>
            </div>
        `;
        document.body.appendChild(tooltip);

        const img = tooltip.querySelector('.preview-img');
        const nameEl = tooltip.querySelector('.repo-name');
        const infoEl = tooltip.querySelector('.preview-info');

        // 2. 选择目标卡片
        const cards = document.querySelectorAll('.research-item, .project-card, .publication-item');

        cards.forEach(card => {
            // 初始化变量
            let imgUrl = '';
            let title = '';
            let desc = '';
            let isPublication = card.classList.contains('publication-item');

            // --- 情况 A: Publication 卡片 ---
            if (isPublication) {
                const link = card.querySelector('a[href]');
                if (link) {
                    const href = link.getAttribute('href');
                    title = link.textContent.trim(); // 论文标题
                    
                    // 根据域名判断来源并设置 Logo
                    if (href.includes('ieeexplore.ieee.org')) {
                        imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg'; // IEEE Logo
                        desc = 'View on IEEE Xplore';
                    } else if (href.includes('arxiv.org')) {
                        imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/ArXiv_logo_2011.svg'; // arXiv Logo
                        desc = 'View on arXiv';
                    } else if (href.includes('thecvf.com')) {
                        imgUrl = 'https://thecvf.com/images/cvf_logo.png'; // CVF Logo
                        desc = 'View on CVF Open Access';
                    } else {
                        // 默认文档图标
                        imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg';
                        desc = 'View Paper';
                    }
                }
            } 
            // --- 情况 B: Research/Project 卡片 (保持原有逻辑) ---
            else {
                const localImg = card.getAttribute('data-preview-img');
                const link = card.querySelector('a[href*="github.com"]');
                
                imgUrl = localImg;
                
                if (link) {
                    const href = link.getAttribute('href');
                    const match = href.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                    if (match) {
                        const user = match[1];
                        const repo = match[2];
                        title = repo;
                        desc = 'GitHub Repository';
                        
                        if (!imgUrl) {
                            imgUrl = `https://opengraph.githubassets.com/1/${user}/${repo}`;
                        }
                    }
                }
            }

            // 如果没有有效信息，跳过
            if (!imgUrl && !title) return;

            // 绑定事件
            card.addEventListener('mouseenter', () => {
                // 特殊处理 Publication 的图片样式 (contain 且有 padding)
                if (isPublication) {
                    img.style.objectFit = 'contain';
                    img.style.padding = '40px'; // 增加 padding，让 Logo 看起来更小更精致
                    img.style.background = '#fff'; // Logo 通常需要白底
                } else {
                    img.style.objectFit = 'contain'; // Research图保持contain
                    img.style.padding = '0';
                    img.style.background = '#000';
                }

                img.src = imgUrl;
                
                if (title) {
                    nameEl.textContent = title;
                    
                    // 如果有描述信息，显示出来
                    if (desc) {
                        let statsHtml = `<span><i class="fas fa-external-link-alt"></i> ${desc}</span>`;
                        // 如果是 Publication，还可以尝试显示摘要（如果有 data-abstract）
                        const abstract = card.getAttribute('data-abstract');
                        if (abstract) {
                            // 增加摘要显示长度，且样式更明显
                            statsHtml += `<p style="margin-top:10px; font-size: 0.85rem; color: #ccc; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">${abstract.substring(0, 150)}${abstract.length > 150 ? '...' : ''}</p>`;
                        }
                        infoEl.innerHTML = statsHtml;
                        infoEl.style.display = 'block';
                    } else {
                        infoEl.style.display = 'none';
                    }
                } else {
                    infoEl.style.display = 'none'; // 纯图片模式
                }
                
                tooltip.classList.add('active');
            });

            card.addEventListener('mousemove', (e) => {
                const offsetX = 20;
                const offsetY = 20;
                let left = e.clientX + offsetX;
                let top = e.clientY + offsetY;

                if (left + 320 > window.innerWidth) {
                    left = e.clientX - 320 - offsetX;
                }
                if (top + 200 > window.innerHeight) {
                    top = e.clientY - 200 - offsetY;
                }

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            });

            card.addEventListener('mouseleave', () => {
                tooltip.classList.remove('active');
            });
        });
    }

    initProjectPreview();

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
