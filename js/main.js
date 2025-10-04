// Image to Prompt Generator - Main JavaScript File
class ImageToPromptApp {
    constructor() {
        this.currentImage = null;
        this.isGenerating = false;
        this.apiKey = 'sk-aqfifchzmbknmottxivyewvnokmcwyxmsdjljaommwsbeiza';
        this.apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';
        
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
        
        // 确保语言切换事件监听器正确绑定
        setTimeout(() => {
            this.setupLanguageClickHandlers();
        }, 100);
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
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.addEventListener(eventName, this.preventDefaults, false);
        });

        // Handle drag events
        ['dragenter', 'dragover'].forEach(eventName => {
            document.addEventListener(eventName, this.handleDrag, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            document.addEventListener(eventName, this.handleDrop, false);
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrag(e) {
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.classList.add('dragover');
        }
    }

    handleDrop(e) {
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.classList.remove('dragover');
        }

        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            this.handleFileSelect(files[0]);
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
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(link);
                }

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

    // Handle File Selection
    handleFileSelect(file) {
        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            this.showError(window.LanguageSystem?.getTranslation('error-file-format') || 'Unsupported file format. Please upload PNG, JPG, or WEBP.');
            return;
        }

        // Validate file size (2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            this.showError(window.LanguageSystem?.getTranslation('error-file-size') || 'File size too large. Please upload an image smaller than 2MB.');
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
            this.showLoading();
            
            // Validate URL
            if (!this.isValidImageUrl(url)) {
                this.hideLoading();
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
                this.hideLoading();
            };

            img.onerror = () => {
                this.hideLoading();
                this.showError(window.LanguageSystem?.getTranslation('error-url') || 'Invalid image URL. Please check the link and try again.');
            };

            img.src = url;
        } catch (error) {
            this.hideLoading();
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
        const promptLanguage = this.getPromptLanguage(language);
        
        // 根据structuredPrompt选择不同的指令
        let instruction;
        if (structuredPrompt === 'yes') {
            instruction = `你是一名专业的AI绘画提示词工程师。请详细分析这张图片，并为我生成一段非常详细、专业的${promptLanguage}AI文生图提示词，需要用结构化内容输出。分析需要包括：主体描述（人物、物体、动物的细节，如外观、动作、表情）、场景与环境（所处的背景、地点、时代）、构图与视角（镜头角度、景别、人物比例）、视觉风格（艺术风格，如插画、油画、赛博朋克、极简主义，可能参考的艺术家或工作室）、画面质量（光影效果、色彩色调、材质质感、渲染引擎、画质8k）。请直接用${promptLanguage}输出最终提示词，请保证回复语言的单一性，便于我理解。`;
        } else {
            instruction = `你是一名专业的AI绘画提示词工程师。请详细分析这张图片，并为我生成一段非常详细、专业的${promptLanguage}AI文生图提示词。分析需要包括：主体描述（人物、物体、动物的细节，如外观、动作、表情）、场景与环境（所处的背景、地点、时代）、构图与视角（镜头角度、景别、人物比例）、视觉风格（艺术风格，如插画、油画、赛博朋克、极简主义，可能参考的艺术家或工作室）、画面质量（光影效果、色彩色调、材质质感、渲染引擎、画质8k）。请直接用${promptLanguage}输出最终提示词，请保证回复语言的单一性，便于我理解。`;
        }
        
        const requestBody = {
            model: "THUDM/GLM-4.1V-9B-Thinking",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: instruction
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageBase64
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        };

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('Invalid API response format');
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
        const testimonials = [
            {
                text: "Image to Prompt's AI model boosted my creative efficiency by 10x! The image quality analysis is beyond imagination and perfectly meets commercial requirements.",
                name: "Sophie Miller",
                role: "Freelance Designer",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "With Image to Prompt feature, I can precisely control every detail. This is the most powerful AI Image Prompt Generator available!",
                name: "Michael Chen",
                role: "Creative Director",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "As an e-commerce manager, Image to Prompt helps me quickly generate product showcase descriptions. The AI's effect is so much better than other tools!",
                name: "Sarah Wang",
                role: "E-commerce Manager",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "Image to Prompt lets me maintain brand style consistency. This AI Image Generator truly understands my needs.",
                name: "David Liu",
                role: "Brand Designer",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "Image to Prompt's generation speed is amazing! Professional-quality descriptions in seconds, dramatically shortening project cycles.",
                name: "Emma Zhang",
                role: "Content Creator",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "The AI model's detail expression is unparalleled. As a game developer, Image to Prompt has become our go-to tool for concept design.",
                name: "Kevin Wu",
                role: "Game Concept Artist",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "I've tried many AI Image Generators, but Image to Prompt's feature is a true game-changer!",
                name: "Jessica Li",
                role: "Digital Marketing Expert",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "Image to Prompt makes realizing creative descriptions so simple. The AI generates text that reaches commercial standards.",
                name: "Tom Anderson",
                role: "Ad Creative Director",
                avatar: "assets/images/avatar.svg"
            },
            {
                text: "As an indie developer, Image to Prompt's integration is very friendly. It's the best AI Image Generator solution on the market!",
                name: "Nina Patel",
                role: "Full-stack Developer",
                avatar: "assets/images/avatar.svg"
            }
        ];

        // Duplicate testimonials to reach 18
        const allTestimonials = [...testimonials, ...testimonials];
        
        const container = document.getElementById('testimonialsContainer');
        if (container) {
            container.innerHTML = allTestimonials.map((testimonial, index) => `
                <div class="testimonial-card rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300">
                    <p class="text-gray-300 mb-6 leading-relaxed text-spacing">${testimonial.text}</p>
                    <div class="flex items-center">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mr-6">
                        <div>
                            <h4 class="text-white font-semibold text-lg">${testimonial.name}</h4>
                            <p class="text-gray-400">${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            `).join('');
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
    new ImageToPromptApp();
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
