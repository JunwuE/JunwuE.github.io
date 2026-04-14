// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 获取导航相关元素
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端导航切换
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // 切换汉堡菜单动画
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.toggle('active');
        });
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        });
    });

    // 平滑滚动 —— 只处理页内锚点；真实的 .html 链接走默认跳转
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href') || '';
            if (!href.startsWith('#')) return; // 外部页面：让浏览器正常跳转
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // 滚动时更新导航栏样式
    window.addEventListener('scroll', function () {
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
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
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
        const elements = document.querySelectorAll('.project-card, .research-item, .publication-item');

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
    const animatedElements = document.querySelectorAll('.project-card, .research-item, .publication-item');
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

            card.addEventListener('click', function (e) {
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

        // 2. 选择目标卡片 (Removed .project-card from selection)
        const cards = document.querySelectorAll('.research-item, .publication-item');

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

    // --- 预加载图片以提升悬停体验 ---
    function preloadImages() {
        const previewItems = document.querySelectorAll('[data-preview-img]');
        console.log('开始预加载预览图片...');

        previewItems.forEach(item => {
            const imgUrl = item.getAttribute('data-preview-img');
            if (imgUrl) {
                const img = new Image();
                img.src = imgUrl;
            }
        });
    }

    // 延迟一点执行预加载，优先保证首屏渲染
    setTimeout(preloadImages, 2000);

    // 项目链接现在可以正常跳转，不需要阻止默认行为

    // 添加页面加载完成的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 键盘导航支持
    document.addEventListener('keydown', function (e) {
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

    // 初始化首页终端与方形机器人
    initTerminal();
    initRobot();

    console.log('🎉 个人网站已成功加载！');
    console.log('💡 提示：您可以在浏览器开发者工具中查看和修改网站代码');
});

/* =========================================================
   首页终端（Terminal）
   ========================================================= */
function initTerminal() {
    const body = document.getElementById('terminal-body');
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const pane = document.getElementById('terminal-pane');
    if (!body || !form || !input) return;

    const HEADER_ASCII = `     ██╗██╗   ██╗███╗   ██╗██╗    ██╗██╗   ██╗    ███████╗
     ██║██║   ██║████╗  ██║██║    ██║██║   ██║    ██╔════╝
     ██║██║   ██║██╔██╗ ██║██║ █╗ ██║██║   ██║    █████╗
██   ██║██║   ██║██║╚██╗██║██║███╗██║██║   ██║    ██╔══╝
╚█████╔╝╚██████╔╝██║ ╚████║╚███╔███╔╝╚██████╔╝    ███████╗
 ╚════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚══╝╚══╝  ╚═════╝     ╚══════╝`;

    const history = [];

    function append(type, text) {
        const div = document.createElement('div');
        div.className = 'terminal-line ' + type;
        div.textContent = text;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function appendHTML(type, html) {
        const div = document.createElement('div');
        div.className = 'terminal-line ' + type;
        div.innerHTML = html;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    // 初始输出
    append('ascii', HEADER_ASCII);
    append('system', 'SYSTEM INITIALIZED. Welcome to Junwu E\'s personal terminal.');
    append('intro', 'Junwu E — B.E. in Automation, Tongji University');
    append('intro', 'Computer Vision · Robot Perception · Deep Learning');
    append('system', 'Type "help" to see available commands. The bot on the right can also give hints.');

    const commands = {
        help: () => {
            append('output',
`AVAILABLE COMMANDS:

  IDENTITY
  about / whoami   - Who is Junwu E?
  education        - Academic background
  skills           - Technical stack
  awards           - Honors & scholarships

  WORK
  publications     - Published / submitted papers
  projects         - Selected projects

  CONTACT
  contact          - How to reach me
  links            - External profiles

  NAV
  goto <page>      - Open home / profile / publications / projects / contact
  clear            - Clear the terminal`);
        },

        about: () => {
            append('output',
`ABOUT ME:
  Name     : Junwu E
  School   : Tongji University (College of EIE)
  Major    : B.E. in Automation
  GPA      : 90.53 / 100   (WES verified 3.92 / 4.0)
  Focus    : Computer Vision, Robot Perception,
             Deep Learning, Machine Intelligence`);
            robotSpeak('Hi! I am Junwu\'s assistant. Try "publications" or "projects".');
        },
        whoami: () => commands.about(),
        profile: () => commands.about(),

        education: () => {
            append('output',
`EDUCATION:
  > Tongji University, Shanghai, China
    B.E. in Automation | 2021.09 - Present
    GPA: 90.53/100  |  WES Verified GPA: 3.92/4.0

  A+ Courses:
    Artificial Intelligence Basics, Machine Learning,
    Deep Learning, Image Processing, Embedded Systems,
    Linear Algebra, Probability Theory, Control System ...`);
        },

        skills: () => {
            append('output',
`TECHNICAL SKILLS:
  > Python       [###########-] 95%
  > C / C++      [##########--] 85%
  > PyTorch      [##########--] 85%
  > OpenCV       [##########--] 85%
  > CUDA C       [########----] 70%
  > CARLA Sim    [########----] 70%
  > Open3D       [########----] 70%
  > PyTorch3D    [#######-----] 65%
  > Claude       [##########--] 85%
  > MATLAB       [########----] 70%
  > Linux / Git  [##########--] 85%`);
        },

        awards: () => {
            append('output',
`AWARDS & HONORS:
  > First-Class Scholarship   (Top 10%)  Tongji, 2023
  > Second-Class Scholarship  (Top 30%)  Tongji, 2022
  > Outstanding Student Cadre             Tongji, 2022
  > Second Prize, East China Embedded Systems Comp., 2025`);
        },

        publications: () => {
            append('output',
`PUBLICATIONS:

  [1] Transformer and Trainable Bilateral Filter
      for Unsupervised Stereo Matching
      Junwu E, Ming-Ju Lee, Qinluo Deng, et al.
      IEEE RCAR 2025

  [2] Robust & Real-time Road Crack Detection
      via Collaborative Dual-Branch Learning
      Zhengfei Song, ..., Junwu E, ..., Rui Fan
      IEEE RCAR 2025

  [3] CarlaOcc: An Instance-Centric Panoptic
      Occupancy Benchmark
      Yi Feng*, Junwu E*, Zizhan Guo, Yu Ma, Hanli Wang, Rui Fan
      Accepted to CVPR 2026   (final score: 455)

  [4] KITTI-360-PO: A Panoptic Occupancy Benchmark
      for Geometrically Complete Scene Understanding
      Junwu E, Yi Feng, Xijing Zhang, Wei Ye, Rui Fan
      (Under Review)`);
        },

        projects: () => {
            append('output',
`SELECTED PROJECTS:

  [01] Embedded Handwritten Digit Recognition
       Real-time ML on resource-constrained MCU
       github.com/JunwuE/gesture_pcb

  [02] Camera Calibration & Stereo Matching
       OpenCV / Python / Computer Vision
       github.com/JunwuE/IPMV

  [03] Autonomous Water-Surface Robot
       Garbage detection & autonomous navigation
       github.com/JunwuE/water_robot`);
        },

        contact: () => {
            append('output',
`CONTACT:
  Email    : 2152482@tongji.edu.cn
  Phone    : +86 18801615808
  GitHub   : github.com/JunwuE
  Location : Tongji University, Shanghai, China`);
        },

        links: () => {
            append('output',
`EXTERNAL LINKS:
  [GitHub]  github.com/JunwuE
  [Email ]  mailto:2152482@tongji.edu.cn
  [TBSMNet] github.com/JunwuE/TBSMnet`);
        },

        clear: () => {
            body.innerHTML = '';
        },

        goto: (arg) => {
            const target = (arg || '').toLowerCase();
            const map = {
                home: 'index.html',
                profile: 'profile.html',
                publications: 'publications.html',
                projects: 'projects.html',
                contact: 'contact.html',
            };
            if (!map[target]) {
                append('error', 'Usage: goto <home|profile|publications|projects|contact>');
                return;
            }
            append('accent', '> Navigating to ' + target + ' ...');
            setTimeout(() => { window.location.href = map[target]; }, 450);
        },
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const raw = input.value.trim();
        if (!raw) return;

        append('user', 'guest@junwu-e:~$ ' + raw);
        history.push(raw);

        const [cmd, ...rest] = raw.split(/\s+/);
        const fn = commands[cmd.toLowerCase()];
        if (fn) {
            fn(rest.join(' '));
        } else {
            append('error', 'COMMAND NOT FOUND: ' + cmd + '   (type "help")');
            robotSpeak('Unknown command. Try "help".');
        }
        input.value = '';
    });

    // 点击终端面板任意位置即聚焦输入框
    pane.addEventListener('click', () => input.focus());
    setTimeout(() => input.focus(), 300);
}

/* =========================================================
   方形像素机器人（Canvas + Bayer Dithering，白底主题）
   ========================================================= */
let robotSpeakFn = null;
function robotSpeak(text) {
    if (robotSpeakFn) robotSpeakFn(text);
}

function initRobot() {
    const canvas = document.getElementById('robot-canvas');
    const statusEl = document.getElementById('robot-status');
    const speechEl = document.getElementById('robot-speech');
    const pane = document.getElementById('robot-pane');
    if (!canvas || !pane) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const W = canvas.width;   // 720
    const H = canvas.height;  // 720

    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const o = off.getContext('2d', { willReadFrequently: true });

    const bayer = [
        [ 0, 48, 12, 60,  3, 51, 15, 63],
        [32, 16, 44, 28, 35, 19, 47, 31],
        [ 8, 56,  4, 52, 11, 59,  7, 55],
        [40, 24, 36, 20, 43, 27, 39, 23],
        [ 2, 50, 14, 62,  1, 49, 13, 61],
        [34, 18, 46, 30, 33, 17, 45, 29],
        [10, 58,  6, 54,  9, 57,  5, 53],
        [42, 26, 38, 22, 41, 25, 37, 21]
    ];

    let frame = 0;
    let targetMX = 0, targetMY = 0, smoothMX = 0, smoothMY = 0;
    let state = 'idle';
    let blinkTimer = 0;
    let speechTimeout = null, typingInterval = null;

    robotSpeakFn = (text) => {
        speechEl.classList.add('show');
        let idx = 0; speechEl.textContent = '';
        if (typingInterval) clearInterval(typingInterval);
        typingInterval = setInterval(() => {
            idx++; speechEl.textContent = text.slice(0, idx);
            if (idx >= text.length) { clearInterval(typingInterval); typingInterval = null; }
        }, 20);
        if (speechTimeout) clearTimeout(speechTimeout);
        speechTimeout = setTimeout(() => speechEl.classList.remove('show'), Math.max(3000, text.length * 55 + 1800));
        state = 'talking'; setTimeout(() => { state = 'idle'; }, 1500);
    };

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        targetMX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetMY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    });

    const hints = [
        'Hi! I am the guide of Junwu\'s site. Click me for hints.',
        'Try typing "help" in the terminal on the left.',
        '"education" shows Junwu\'s academic background.',
        '"publications" shows his papers (incl. CVPR 2026).',
        '"projects" lists selected engineering + research projects.',
        '"skills" draws a neat skill stack bar chart.',
        '"awards" shows scholarships and honors.',
        '"contact" prints email / phone / GitHub.',
        'Use "goto profile" to open the Profile page.',
        'Use "goto publications" or "goto projects" to jump pages.',
        '"clear" wipes the terminal. "help" always works.',
        'Tip: the nav bar above also jumps between pages.'
    ];
    let hintIdx = 0;
    pane.addEventListener('click', () => { robotSpeak(hints[hintIdx % hints.length]); hintIdx++; });
    setTimeout(() => { if (hintIdx === 0) robotSpeak(hints[0]); }, 2500);

    // 自动定时提示
    function scheduleHint() {
        const delay = 8000 + Math.random() * 10000;
        setTimeout(() => {
            robotSpeak(hints[hintIdx % hints.length]);
            hintIdx++;
            scheduleHint();
        }, delay);
    }
    setTimeout(scheduleHint, 6000);

    function roundRect(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y); c.lineTo(x + w - r, y);
        c.arcTo(x + w, y, x + w, y + r, r); c.lineTo(x + w, y + h - r);
        c.arcTo(x + w, y + h, x + w - r, y + h, r); c.lineTo(x + r, y + h);
        c.arcTo(x, y + h, x, y + h - r, r); c.lineTo(x, y + r);
        c.arcTo(x, y, x + r, y, r); c.closePath();
    }

    function render() {
        frame++;
        smoothMX += (targetMX - smoothMX) * 0.06;
        smoothMY += (targetMY - smoothMY) * 0.06;
        const mx = smoothMX, my = smoothMY;

        o.fillStyle = '#fff';
        o.fillRect(0, 0, W, H);

        const cx = W / 2;

        const hX = mx * 12, hY = my * 6;
        const oX = mx * 6,  oY = my * 4;

        // Body armor (lower canvas, from mid to bottom)
        const bodyTop = 480;
        const armorGrad = o.createLinearGradient(cx - 260, bodyTop, cx + 260, H);
        armorGrad.addColorStop(0, 'rgb(250,250,250)');
        armorGrad.addColorStop(0.3, 'rgb(170,175,180)');
        armorGrad.addColorStop(0.8, 'rgb(30,35,40)');
        armorGrad.addColorStop(1, 'rgb(60,65,70)');
        o.fillStyle = armorGrad;
        o.beginPath();
        o.moveTo(80, H); o.quadraticCurveTo(cx, bodyTop - 20, W - 80, H);
        o.fill();

        // Chest dark panel
        o.fillStyle = 'rgb(20,22,28)';
        roundRect(o, cx - 70, bodyTop + 20, 140, H - bodyTop - 20, 8);
        o.fill();

        // Chest rivet
        o.fillStyle = 'rgb(120,125,130)';
        o.beginPath(); o.arc(cx, bodyTop + 50, 8, 0, Math.PI * 2); o.fill();
        o.fillStyle = 'rgb(80,85,90)';
        o.beginPath(); o.arc(cx, bodyTop + 50, 4, 0, Math.PI * 2); o.fill();

        // Mechanical neck
        const neckGrad = o.createLinearGradient(cx - 55, 0, cx + 55, 0);
        neckGrad.addColorStop(0, 'rgb(15,15,15)');
        neckGrad.addColorStop(0.35, 'rgb(80,85,90)');
        neckGrad.addColorStop(0.65, 'rgb(130,135,140)');
        neckGrad.addColorStop(1, 'rgb(15,15,15)');
        o.fillStyle = neckGrad;
        o.fillRect(cx - 55, bodyTop - 55, 110, 75);

        // Neck slots
        o.fillStyle = 'rgba(0,0,0,0.7)';
        for (let i = 0; i < 4; i++) o.fillRect(cx - 55, bodyTop - 48 + i * 16, 110, 6);

        // Square head
        const headW = 320, headH = 330, headR = 32;
        const headX = cx - headW / 2 + hX;
        const headY = bodyTop - 55 - headH + hY;

        // Head metal gradient
        const headGrad = o.createRadialGradient(headX + headW * 0.35, headY + headH * 0.3, 30, cx + hX, headY + headH / 2, headW);
        headGrad.addColorStop(0, 'rgb(250,250,250)');
        headGrad.addColorStop(0.25, 'rgb(210,215,220)');
        headGrad.addColorStop(0.6, 'rgb(110,115,120)');
        headGrad.addColorStop(0.95, 'rgb(25,28,32)');
        headGrad.addColorStop(1, 'rgb(50,55,60)');
        o.fillStyle = headGrad;
        roundRect(o, headX, headY, headW, headH, headR);
        o.fill();

        // Head edge
        o.strokeStyle = 'rgb(10,10,10)';
        o.lineWidth = 3;
        roundRect(o, headX, headY, headW, headH, headR);
        o.stroke();

        // Ear blocks
        [-1, 1].forEach(side => {
            const earW = 30, earH = 70, earR = 8;
            const earX = side === -1 ? headX - earW + 4 : headX + headW - 4;
            const earY = headY + headH / 2 - earH / 2;
            const earGrad = o.createLinearGradient(earX, earY, earX + earW, earY + earH);
            earGrad.addColorStop(0, 'rgb(180,185,190)');
            earGrad.addColorStop(1, 'rgb(20,22,25)');
            o.fillStyle = earGrad;
            roundRect(o, earX, earY, earW, earH, earR);
            o.fill();
            o.strokeStyle = 'rgb(10,10,10)';
            o.lineWidth = 2;
            roundRect(o, earX, earY, earW, earH, earR);
            o.stroke();
        });

        // Visor (square dark area)
        const visorPad = 32;
        const visorX = headX + visorPad + oX * 0.5;
        const visorY = headY + visorPad + oY * 0.5;
        const visorW = headW - visorPad * 2;
        const visorH = headH - visorPad * 2;
        const visorGrad = o.createLinearGradient(visorX, visorY, visorX, visorY + visorH);
        visorGrad.addColorStop(0, 'rgb(40,42,48)');
        visorGrad.addColorStop(0.5, 'rgb(5,5,8)');
        visorGrad.addColorStop(1, 'rgb(20,22,28)');
        o.fillStyle = visorGrad;
        roundRect(o, visorX, visorY, visorW, visorH, 18);
        o.fill();

        // Eyes
        blinkTimer++;
        const isBlink = (blinkTimer % 260) > 252;
        const eyeSpacing = 100;
        const eyeCY = headY + headH * 0.46 + oY;
        const eyeR = 38;

        [-1, 1].forEach(side => {
            const ex = cx + hX + side * eyeSpacing / 2 + oX;
            const ey = eyeCY;

            // Outer casing
            o.fillStyle = 'rgb(0,0,0)';
            o.beginPath(); o.arc(ex, ey, eyeR + 6, 0, Math.PI * 2); o.fill();
            const casing = o.createLinearGradient(ex - eyeR, ey - eyeR, ex + eyeR, ey + eyeR);
            casing.addColorStop(0, 'rgb(200,200,200)');
            casing.addColorStop(0.5, 'rgb(40,40,40)');
            casing.addColorStop(1, 'rgb(120,120,120)');
            o.fillStyle = casing;
            o.beginPath(); o.arc(ex, ey, eyeR, 0, Math.PI * 2); o.fill();

            // Lens
            const lens = o.createRadialGradient(ex - 8, ey - 8, 2, ex, ey, eyeR - 4);
            lens.addColorStop(0, 'rgb(50,50,55)');
            lens.addColorStop(0.5, 'rgb(8,8,10)');
            lens.addColorStop(1, 'rgb(0,0,0)');
            o.fillStyle = lens;
            o.beginPath(); o.arc(ex, ey, eyeR - 6, 0, Math.PI * 2); o.fill();

            if (isBlink) {
                o.fillStyle = 'rgb(180,180,180)';
                o.fillRect(ex - eyeR + 8, ey - 2, (eyeR - 8) * 2, 4);
            } else {
                // Glow ring
                const alpha = state === 'talking' ? 0.95 : 0.5;
                const ringR = state === 'talking' ? 14 + Math.sin(frame * 0.2) * 3 : 16;
                o.strokeStyle = `rgba(255,255,255,${alpha})`;
                o.lineWidth = 3;
                o.beginPath(); o.arc(ex, ey, ringR, 0, Math.PI * 2); o.stroke();
                // Core light
                o.fillStyle = `rgba(255,255,255,${alpha})`;
                o.beginPath(); o.arc(ex, ey, 6, 0, Math.PI * 2); o.fill();
                // Highlight
                o.fillStyle = 'rgba(255,255,255,0.25)';
                o.beginPath(); o.arc(ex - 10, ey - 10, 8, 0, Math.PI * 2); o.fill();
            }
        });

        // Antenna
        const antX = cx + hX + mx * 3;
        const antBaseY = headY;
        const antTipY = headY - 50;
        o.strokeStyle = 'rgb(30,30,30)';
        o.lineWidth = 4;
        o.beginPath(); o.moveTo(antX, antBaseY); o.lineTo(antX + mx * 4, antTipY); o.stroke();
        o.fillStyle = state === 'talking' ? 'rgb(255,255,255)' : 'rgb(100,100,100)';
        o.beginPath(); o.arc(antX + mx * 4, antTipY - 4, 7, 0, Math.PI * 2); o.fill();
        o.strokeStyle = 'rgb(20,20,20)'; o.lineWidth = 2;
        o.beginPath(); o.arc(antX + mx * 4, antTipY - 4, 7, 0, Math.PI * 2); o.stroke();

        // Bayer Dithering (black dots on white)
        const img = o.getImageData(0, 0, W, H);
        const d = img.data;
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;
                const luma = d[idx] * 0.299 + d[idx + 1] * 0.587 + d[idx + 2] * 0.114;
                const threshold = (bayer[y & 7][x & 7] / 64) * 255;
                const isDark = luma < threshold;
                d[idx] = 255; d[idx + 1] = 255; d[idx + 2] = 255; d[idx + 3] = 0;
                if (isDark) { d[idx] = 0; d[idx + 1] = 0; d[idx + 2] = 0; d[idx + 3] = 255; }
            }
        }
        o.putImageData(img, 0, 0);

        // Output
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(off, 0, 0, W, H);

        if (statusEl) {
            statusEl.textContent = state === 'talking' ? '[ UNIT_STATUS: TALKING ]' : '[ UNIT_STATUS: IDLE ]';
        }

        requestAnimationFrame(render);
    }
    render();
}
