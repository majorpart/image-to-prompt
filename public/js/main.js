// Image to Prompt Generator - Main JavaScript File
class ImageToPromptApp {
    constructor() {
        this.currentImage = null;
        this.isGenerating = false;
        this.apiUrl = '/api/generate-prompt';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initLanguageSystem();
        this.generateTestimonials();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupLanguageSelector();
        this.setupFileUpload();
        this.setupUrlInput();
        this.setupGenerateButton();
        this.setupFAQAccordion();
        
        // 确保语言切换事件监听器正确绑定
        setTimeout(() => {
            this.setupLanguageClickHandlers();
        }, 100);
        
        // 确保拖拽功能在DOM完全渲染后设置
        setTimeout(() => {
            this.setupDragAndDrop();
        }, 200);
    }

    // Language System Initialization
    initLanguageSystem() {
        console.log('Initializing LanguageSystem...');
        if (window.LanguageSystem) {
            console.log('LanguageSystem found, initializing...');
            window.LanguageSystem.initLanguageSystem();
        } else {
            console.error('LanguageSystem not found!');
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // 其他事件监听器设置
    }

    // Setup Drag and Drop for Upload Area
    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        
        if (uploadArea) {
            console.log('Setting up drag and drop for upload area');
            
            // 阻止默认的拖拽行为
            uploadArea.addEventListener('dragenter', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Drag enter detected');
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Drag over detected');
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Drag leave detected');
                // 只有当鼠标真正离开上传区域时才移除dragover类
                const rect = uploadArea.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                
                if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                    uploadArea.classList.remove('dragover');
                }
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('File drop detected', e.dataTransfer.files);
                uploadArea.classList.remove('dragover');
                
                const dt = e.dataTransfer;
                const files = dt.files;

                if (files.length > 0) {
                    // 验证拖拽的文件是否为图片
                    const file = files[0];
                    console.log('Dropped file:', file.name, file.type, file.size);
                    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
                    
                    if (allowedTypes.includes(file.type)) {
                        this.handleFileSelect(file);
                    } else {
                        this.showError(window.LanguageSystem?.getTranslation('error-file-format') || 'Unsupported file format. Please upload PNG, JPG, or WEBP.');
                    }
                }
            });
        } else {
            console.error('Upload area not found!');
        }
    }


    // File Upload Setup
    setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        console.log('Setting up file upload...', { uploadArea, fileInput });

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => {
                console.log('Upload area clicked');
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                console.log('File input changed:', e.target.files);
                if (e.target.files.length > 0) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        } else {
            console.error('Upload area or file input not found!');
        }
    }

    // URL Input Setup
    setupUrlInput() {
        const urlTab = document.getElementById('urlTab');
        const uploadTab = document.getElementById('uploadTab');
        const uploadArea = document.getElementById('uploadArea');
        const urlArea = document.getElementById('urlArea');
        const loadUrlBtn = document.getElementById('loadUrlBtn');
        const urlInput = document.getElementById('urlInput');

        // Tab switching
        if (urlTab && uploadTab && uploadArea && urlArea) {
            urlTab.addEventListener('click', () => {
                uploadTab.classList.remove('bg-orange-500');
                uploadTab.classList.add('bg-gray-600');
                urlTab.classList.remove('bg-gray-600');
                urlTab.classList.add('bg-orange-500');
                uploadArea.classList.add('hidden');
                urlArea.classList.remove('hidden');
            });

            uploadTab.addEventListener('click', () => {
                urlTab.classList.remove('bg-orange-500');
                urlTab.classList.add('bg-gray-600');
                uploadTab.classList.remove('bg-gray-600');
                uploadTab.classList.add('bg-orange-500');
                urlArea.classList.add('hidden');
                uploadArea.classList.remove('hidden');
            });
        }

        // Load URL functionality
        if (loadUrlBtn && urlInput) {
            // 监听URL输入框变化，更新按钮状态
            urlInput.addEventListener('input', () => {
                this.updateLoadUrlButtonState();
            });

            loadUrlBtn.addEventListener('click', () => {
                const url = urlInput.value.trim();
                if (url) {
                    this.loadImageFromUrl(url);
                }
            });

            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const url = urlInput.value.trim();
                    if (url) {
                        this.loadImageFromUrl(url);
                    }
                }
            });

            // 初始化按钮状态
            this.updateLoadUrlButtonState();
        }
    }

    // Generate Button Setup
    setupGenerateButton() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                if (this.currentImage && !this.isGenerating) {
                    this.generatePrompt();
                }
            });
        }
    }

    // Language Selector Setup
    setupLanguageSelector() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');

        if (languageBtn && languageDropdown) {
            languageBtn.addEventListener('click', () => {
                languageDropdown.classList.toggle('hidden');
            });
        }

        // Language click handling is now done in setupLanguageClickHandlers()
        
        // Sync desktop and mobile selectors
        this.setupSelectorSync();
    }
    
    // Setup Selector Synchronization
    setupSelectorSync() {
        const promptLanguage = document.getElementById('promptLanguage');
        const promptLanguageMobile = document.getElementById('promptLanguageMobile');
        const structuredPrompt = document.getElementById('structuredPrompt');
        const structuredPromptMobile = document.getElementById('structuredPromptMobile');
        
        // Sync Prompt Language selectors
        if (promptLanguage && promptLanguageMobile) {
            promptLanguage.addEventListener('change', () => {
                promptLanguageMobile.value = promptLanguage.value;
            });
            
            promptLanguageMobile.addEventListener('change', () => {
                promptLanguage.value = promptLanguageMobile.value;
            });
        }
        
        // Sync Structured Prompt selectors
        if (structuredPrompt && structuredPromptMobile) {
            structuredPrompt.addEventListener('change', () => {
                structuredPromptMobile.value = structuredPrompt.value;
            });
            
            structuredPromptMobile.addEventListener('change', () => {
                structuredPrompt.value = structuredPromptMobile.value;
            });
        }
    }

    // Setup Language Click Handlers
    setupLanguageClickHandlers() {
        // 移除之前的事件监听器（如果有的话）
        document.removeEventListener('click', this.handleLanguageClick);
        
        // 绑定新的事件监听器
        this.handleLanguageClick = (e) => {
            console.log('Language click event triggered:', e.target);
            if (e.target.classList.contains('language-option')) {
                console.log('Language option clicked');
                e.preventDefault();
                e.stopPropagation();
                
                const lang = e.target.getAttribute('data-lang');
                console.log('Selected language:', lang);
                
                if (lang && window.LanguageSystem) {
                    console.log('Calling setCurrentLanguage...');
                    window.LanguageSystem.setCurrentLanguage(lang);
                    // Close dropdown if it exists
                    const languageDropdown = document.getElementById('languageDropdown');
                    if (languageDropdown) {
                        languageDropdown.classList.add('hidden');
                    }
                } else {
                    console.error('Language or LanguageSystem not available');
                }
            } else {
                // Close dropdown when clicking outside
                const languageBtn = document.getElementById('languageBtn');
                const languageDropdown = document.getElementById('languageDropdown');
                
                if (languageBtn && languageDropdown && 
                    !languageBtn.contains(e.target) && 
                    !languageDropdown.contains(e.target)) {
                    languageDropdown.classList.add('hidden');
                }
            }
        };
        
        document.addEventListener('click', this.handleLanguageClick);
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    // Smooth Scrolling Setup
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                
                if (targetId === 'top') {
                    // Scroll to the very top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }

                // Update active nav link
                this.updateActiveNavLink(link);

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }

    // Update Active Navigation Link
    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-gray-300');
        });
        
        activeLink.classList.remove('text-gray-300');
        activeLink.classList.add('text-white');
    }

    // Clear File Input
    clearFileInput() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    // Setup FAQ Accordion
    setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer && icon) {
                question.addEventListener('click', () => {
                    const isOpen = !answer.classList.contains('hidden');
                    
                    // Toggle current item only (independent behavior)
                    if (isOpen) {
                        answer.classList.add('hidden');
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        answer.classList.remove('hidden');
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }

    // Handle File Selection
    handleFileSelect(file) {
        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            this.showError(window.LanguageSystem?.getTranslation('error-file-format') || 'Unsupported file format. Please upload PNG, JPG, or WEBP.');
            this.clearFileInput(); // 清空文件输入框
            return;
        }

        // Validate file size (2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            this.showError(window.LanguageSystem?.getTranslation('error-file-size') || 'File size too large. Please upload an image smaller than 2MB.');
            this.clearFileInput(); // 清空文件输入框
            return;
        }

        // Create FileReader
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImage = e.target.result;
            this.displayImagePreview(this.currentImage);
            this.updateGenerateButton(true);
        };
        reader.readAsDataURL(file);
    }

    // Load Image from URL
    async loadImageFromUrl(url) {
        try {
            // 显示URL加载状态，但不影响Generate Prompt按钮
            this.showUrlLoading();
            
            // Validate URL
            if (!this.isValidImageUrl(url)) {
                this.hideUrlLoading();
                this.showError(window.LanguageSystem?.getTranslation('error-url') || 'Invalid image URL. Please check the link and try again.');
                return;
            }

            // Create image element to test if URL is valid
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                // Convert image to base64
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                this.currentImage = canvas.toDataURL('image/jpeg', 0.8);
                this.displayImagePreview(this.currentImage);
                this.updateGenerateButton(true);
                this.hideUrlLoading();
            };

            img.onerror = () => {
                this.hideUrlLoading();
                this.showError(window.LanguageSystem?.getTranslation('error-url') || 'Invalid image URL. Please check the link and try again.');
            };

            img.src = url;
        } catch (error) {
            this.hideUrlLoading();
            this.showError(window.LanguageSystem?.getTranslation('error-url') || 'Invalid image URL. Please check the link and try again.');
        }
    }

    // Validate Image URL
    isValidImageUrl(url) {
        try {
            const urlObj = new URL(url);
            const validProtocols = ['http:', 'https:'];
            const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
            
            if (!validProtocols.includes(urlObj.protocol)) {
                return false;
            }

            const pathname = urlObj.pathname.toLowerCase();
            return validExtensions.some(ext => pathname.includes(ext));
        } catch {
            return false;
        }
    }

    // Display Image Preview
    displayImagePreview(imageSrc) {
        const previewContainer = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        const placeholder = previewContainer.querySelector('.text-center');
        
        if (previewContainer && previewImage) {
            // 隐藏占位符内容
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            
            // 显示图片
            previewImage.src = imageSrc;
            previewImage.classList.remove('hidden');
        }
    }

    // Reset Image Preview
    resetImagePreview() {
        const previewContainer = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        const placeholder = previewContainer.querySelector('.text-center');
        
        if (previewContainer && previewImage) {
            // 隐藏图片
            previewImage.classList.add('hidden');
            previewImage.src = '';
            
            // 显示占位符内容
            if (placeholder) {
                placeholder.style.display = 'block';
            }
        }
    }

    // Update Load URL Button State
    updateLoadUrlButtonState() {
        const loadUrlBtn = document.getElementById('loadUrlBtn');
        const urlInput = document.getElementById('urlInput');
        
        if (loadUrlBtn && urlInput) {
            const hasUrl = urlInput.value.trim().length > 0;
            
            // 清理所有可能的状态类
            loadUrlBtn.classList.remove(
                'bg-gray-600', 'text-white', 'border-gray-600',
                'bg-transparent', 'text-orange-500', 'border-orange-500', 'border-2',
                'bg-gray-500', 'border-gray-500'
            );
            
            if (hasUrl) {
                // 高亮状态：亮橙色字体、亮橙色边框、透明背景
                loadUrlBtn.classList.add('bg-transparent', 'text-orange-500', 'border-orange-500', 'border-2');
                loadUrlBtn.disabled = false;
            } else {
                // 默认状态：灰色背景、白色字体、灰色边框
                loadUrlBtn.classList.add('bg-gray-600', 'text-white', 'border-gray-600');
                loadUrlBtn.disabled = true;
            }
        }
    }

    // Update Generate Button State
    updateGenerateButton(hasImage) {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            if (hasImage) {
                generateBtn.disabled = false;
                generateBtn.classList.remove('disabled:cursor-not-allowed');
            } else {
                generateBtn.disabled = true;
                generateBtn.classList.add('disabled:cursor-not-allowed');
            }
        }
    }

    // Generate Prompt
    async generatePrompt() {
        if (!this.currentImage) {
            return;
        }
        
        if (this.isGenerating) {
            return;
        }

        this.isGenerating = true;
        this.ensureButtonStructure(); // 确保按钮结构完整
        this.updateGenerateButton(false);
        this.showLoading(); // 显示进度条
        
        const generateBtn = document.getElementById('generateBtn');
        const promptLanguage = document.getElementById('promptLanguage')?.value || 'en';
        const structuredPrompt = document.getElementById('structuredPrompt')?.value || 'no';
        
        // Button text will be updated by showLoading method

        try {
            const prompt = await this.callAPI(this.currentImage, promptLanguage, structuredPrompt);
            this.completeProgress(); // 完成进度条
            this.displayPrompt(prompt);
            
            // API成功完成后，立即恢复按钮可点击状态
            this.isGenerating = false;
            this.updateGenerateButton(true);
            this.hideLoading(); // 隐藏进度条
        } catch (error) {
            console.error('Error generating prompt:', error);
            this.showError(error.message || window.LanguageSystem?.getTranslation('error-api') || 'API error. Please try again later.');
            
            // 即使出错也要恢复按钮状态
            this.isGenerating = false;
            this.updateGenerateButton(true);
            this.hideLoading(); // 隐藏进度条
        }
    }

    // Call API
    async callAPI(imageBase64, language, structuredPrompt = 'no') {
        const requestBody = {
            imageBase64: imageBase64,
            language: language,
            structuredPrompt: structuredPrompt
        };

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success && data.prompt) {
            return data.prompt;
        } else {
            throw new Error(data.error || 'Invalid API response format');
        }
    }

    // Get Prompt Language
    getPromptLanguage(languageCode) {
        const languageMap = {
            'en': '英语',
            'es': '西班牙语',
            'de': '德语',
            'fr': '法语',
            'pt': '葡萄牙语',
            'zh-cn': '简体中文',
            'zh-tw': '繁体中文',
            'ar': '阿拉伯语',
            'ru': '俄语',
            'ja': '日语',
            'ko': '韩语'
        };
        return languageMap[languageCode] || '英语';
    }

    // Simple Markdown Parser
    parseMarkdown(text) {
        if (!text) return '';
        
        // Convert line breaks to <br> tags
        let html = text.replace(/\n/g, '<br>');
        
        // Convert **text** to <strong>text</strong> (bold)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-orange-300">$1</strong>');
        
        // Convert *text* to <em>text</em> (italic)
        html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>');
        
        // Convert ## Heading to <h2> (subheadings)
        html = html.replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-orange-400 mt-4 mb-2">$1</h2>');
        
        // Convert # Heading to <h1> (main headings)
        html = html.replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold text-orange-400 mt-6 mb-3">$1</h1>');
        
        // Convert - list items to <li>
        html = html.replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-300">• $1</li>');
        
        // Wrap consecutive <li> elements in <ul>
        html = html.replace(/(<li class="ml-4 text-gray-300">.*<\/li>)(\s*<li class="ml-4 text-gray-300">.*<\/li>)*/g, (match) => {
            return '<ul class="list-none space-y-1 my-2">' + match + '</ul>';
        });
        
        return html;
    }

    // Display Generated Prompt
    displayPrompt(prompt) {
        const promptDisplay = document.getElementById('promptDisplay');
        const copyBtn = document.getElementById('copyBtn');
        
        if (promptDisplay) {
            const markdownHtml = this.parseMarkdown(prompt);
            promptDisplay.innerHTML = `<div class="text-white leading-relaxed prose prose-invert max-w-none">${markdownHtml}</div>`;
        }
        
        if (copyBtn) {
            copyBtn.classList.remove('hidden');
            copyBtn.addEventListener('click', () => {
                this.copyToClipboard(prompt);
            });
        }
    }

    // Copy to Clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showSuccess(window.LanguageSystem?.getTranslation('copy-success') || 'Copy successful!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showSuccess(window.LanguageSystem?.getTranslation('copy-success') || 'Copy successful!');
        }
    }

    // Generate Testimonials
    generateTestimonials() {
        const currentLanguage = window.LanguageSystem?.getCurrentLanguage() || 'en';
        const translations = window.LanguageSystem?.getTranslations(currentLanguage) || {};
        
        const testimonials = [
            {
                text: translations['testimonial-1'] || "Image to Prompt's AI model boosted my creative efficiency by 10x! The image quality analysis is beyond imagination and perfectly meets commercial requirements.",
                name: "Sophie Miller",
                role: translations['role-1'] || "Freelance Designer",
                avatar: "assets/images/commenter-of-image-to-prompt (1).webp"
            },
            {
                text: translations['testimonial-2'] || "With Image to Prompt feature, I can precisely control every detail. This is the most powerful AI Image Prompt Generator available!",
                name: "Michael Chen",
                role: translations['role-2'] || "Creative Director",
                avatar: "assets/images/commenter-of-image-to-prompt (2).webp"
            },
            {
                text: translations['testimonial-3'] || "As an e-commerce manager, Image to Prompt helps me quickly generate product showcase descriptions. The AI's effect is so much better than other tools!",
                name: "Sarah Wang",
                role: translations['role-3'] || "E-commerce Manager",
                avatar: "assets/images/commenter-of-image-to-prompt (3).webp"
            },
            {
                text: translations['testimonial-4'] || "Image to Prompt lets me maintain brand style consistency. This AI Image Generator truly understands my needs.",
                name: "David Liu",
                role: translations['role-4'] || "Brand Designer",
                avatar: "assets/images/commenter-of-image-to-prompt (4).webp"
            },
            {
                text: translations['testimonial-5'] || "Image to Prompt's generation speed is amazing! Professional-quality descriptions in seconds, dramatically shortening project cycles.",
                name: "Emma Zhang",
                role: translations['role-5'] || "Content Creator",
                avatar: "assets/images/commenter-of-image-to-prompt (5).webp"
            },
            {
                text: translations['testimonial-6'] || "The AI model's detail expression is unparalleled. As a game developer, Image to Prompt has become our go-to tool for concept design.",
                name: "Kevin Wu",
                role: translations['role-6'] || "Game Concept Artist",
                avatar: "assets/images/commenter-of-image-to-prompt (6).webp"
            },
            {
                text: translations['testimonial-7'] || "I've tried many AI Image Generators, but Image to Prompt's feature is a true game-changer!",
                name: "Jessica Li",
                role: translations['role-7'] || "Digital Marketing Expert",
                avatar: "assets/images/commenter-of-image-to-prompt (7).webp"
            },
            {
                text: translations['testimonial-8'] || "Image to Prompt makes realizing creative descriptions so simple. The AI generates text that reaches commercial standards.",
                name: "Tom Anderson",
                role: translations['role-8'] || "Ad Creative Director",
                avatar: "assets/images/commenter-of-image-to-prompt (8).webp"
            },
            {
                text: translations['testimonial-9'] || "As an indie developer, Image to Prompt's integration is very friendly. It's the best AI Image Generator solution on the market!",
                name: "Nina Patel",
                role: translations['role-9'] || "Full-stack Developer",
                avatar: "assets/images/commenter-of-image-to-prompt (9).webp"
            }
        ];

        // Duplicate testimonials multiple times for seamless scrolling
        const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
        
        // Create testimonial card HTML
        const createTestimonialCard = (testimonial) => `
            <div class="testimonial-card bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-800/70 hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30">
                <p class="text-gray-200 mb-6 leading-relaxed text-spacing text-base">${testimonial.text}</p>
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="text-white font-semibold text-base">${testimonial.name}</h4>
                        <p class="text-gray-400 text-sm">${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Distribute testimonials across three columns
        const column1 = document.getElementById('testimonialsColumn1');
        const column2 = document.getElementById('testimonialsColumn2');
        const column3 = document.getElementById('testimonialsColumn3');
        
        if (column1 && column2 && column3) {
            // Distribute testimonials to columns (every 3rd item goes to each column)
            const column1Testimonials = allTestimonials.filter((_, index) => index % 3 === 0);
            const column2Testimonials = allTestimonials.filter((_, index) => index % 3 === 1);
            const column3Testimonials = allTestimonials.filter((_, index) => index % 3 === 2);
            
            column1.innerHTML = column1Testimonials.map(createTestimonialCard).join('');
            column2.innerHTML = column2Testimonials.map(createTestimonialCard).join('');
            column3.innerHTML = column3Testimonials.map(createTestimonialCard).join('');
        }
    }

    // Show URL Loading State (only affects Load URL button)
    showUrlLoading() {
        const loadUrlBtn = document.getElementById('loadUrlBtn');
        if (loadUrlBtn) {
            loadUrlBtn.disabled = true;
            loadUrlBtn.textContent = window.LanguageSystem?.getTranslation('loading-image') || 'Loading...';
            
            // 清理所有状态类，然后添加加载状态类
            loadUrlBtn.classList.remove(
                'bg-gray-600', 'text-white', 'border-gray-600',
                'bg-transparent', 'text-orange-500', 'border-orange-500', 'border-2'
            );
            loadUrlBtn.classList.add('bg-gray-500', 'text-white', 'border-gray-500');
        }
    }

    // Hide URL Loading State
    hideUrlLoading() {
        const loadUrlBtn = document.getElementById('loadUrlBtn');
        if (loadUrlBtn) {
            loadUrlBtn.textContent = window.LanguageSystem?.getTranslation('load-url') || 'Load Image URL';
            // 恢复按钮状态
            this.updateLoadUrlButtonState();
        }
    }

    // Show Loading with Progress Bar Above Button
    showLoading() {
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const buttonText = document.getElementById('buttonText');
        const generateBtn = document.getElementById('generateBtn');
        
        // Show progress bar above button
        if (progressContainer) {
            progressContainer.classList.remove('hidden');
        }
        
        // Reset progress bar
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        // Update button text and make it gray
        if (buttonText) {
            buttonText.textContent = window.LanguageSystem?.getTranslation('generating-prompt') || 'Image prompt generation in progress...';
        }
        
        // Change button to gray color
        if (generateBtn) {
            generateBtn.classList.remove('btn-primary');
            generateBtn.classList.add('bg-gray-500', 'hover:bg-gray-600');
        }
        
        // Start progress animation
        this.startProgressAnimation();
    }

    // Hide Loading
    hideLoading() {
        const progressContainer = document.getElementById('progressContainer');
        const buttonText = document.getElementById('buttonText');
        const generateBtn = document.getElementById('generateBtn');
        
        // Hide progress bar
        if (progressContainer) {
            progressContainer.classList.add('hidden');
        }
        
        // Reset button text and color
        if (buttonText) {
            buttonText.textContent = window.LanguageSystem?.getTranslation('generate-prompt') || 'Generate Prompt';
        }
        
        // Restore button color
        if (generateBtn) {
            generateBtn.classList.add('btn-primary');
            generateBtn.classList.remove('bg-gray-500', 'hover:bg-gray-600');
        }
        
        // Stop progress animation
        this.stopProgressAnimation();
    }
    
    // Ensure Button Structure is Complete
    ensureButtonStructure() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            // Check if button has the correct structure
            const progressContainer = generateBtn.querySelector('#progressContainer');
            const buttonText = generateBtn.querySelector('#buttonText');
            
            if (!progressContainer || !buttonText) {
                // Restore complete button structure
                generateBtn.innerHTML = `
                    <!-- Progress Bar Inside Button -->
                    <div id="progressContainer" class="w-full mb-2 hidden">
                        <div class="w-full bg-gray-600 rounded-full h-1">
                            <div id="progressBar" class="bg-gradient-to-r from-orange-500 to-orange-400 h-1 rounded-full transition-all duration-300 ease-out" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <span id="buttonText" data-translate="generate-prompt">Generate Prompt</span>
                `;
            }
        }
    }

    // Start Progress Animation
    startProgressAnimation() {
        this.progressInterval = setInterval(() => {
            const progressBar = document.getElementById('progressBar');
            
            if (progressBar) {
                const currentWidth = parseFloat(progressBar.style.width) || 0;
                let newWidth = currentWidth;
                let increment = 0.8; // 更慢的速度
                
                // 更慢的进度逻辑
                if (currentWidth < 20) {
                    // 前20%：缓慢启动
                    increment = 1;
                } else if (currentWidth < 50) {
                    // 20%-50%：正常速度
                    increment = 0.8;
                } else if (currentWidth < 80) {
                    // 50%-80%：稍微慢一点
                    increment = 0.6;
                } else if (currentWidth < 95) {
                    // 80%-95%：更慢
                    increment = 0.4;
                } else {
                    // 95%以上：停止自动增长，等待API完成
                    return;
                }
                
                newWidth = Math.min(currentWidth + increment, 95);
                progressBar.style.width = newWidth + '%';
            }
        }, 600); // 更慢的更新频率
    }

    // Stop Progress Animation
    stopProgressAnimation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    // Complete Progress (called when API finishes)
    completeProgress() {
        const progressBar = document.getElementById('progressBar');
        
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Stop the animation
        this.stopProgressAnimation();
    }

    // Show Success Message
    showSuccess(message) {
        const toast = document.getElementById('successToast');
        if (toast) {
            toast.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    }

    // Show Error Message
    showError(message) {
        const toast = document.getElementById('errorToast');
        const errorMessage = document.getElementById('errorMessage');
        if (toast && errorMessage) {
            errorMessage.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 5000);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageToPromptApp = new ImageToPromptApp();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh any timers or animations when page becomes visible
        console.log('Page is now visible');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Handle responsive adjustments if needed
    console.log('Window resized');
});
