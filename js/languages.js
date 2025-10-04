// Multi-language support for Image to Prompt Generator
const translations = {
    en: {
        // Navigation
        'nav-image-prompt': 'Image Prompt',
        'nav-inspiration': 'Inspiration',
        'nav-tutorials': 'Tutorials',
        'nav-evaluation': 'Evaluation',
        'nav-assistance': 'Assistance',

        // Hero Section
        'hero-title-part1': 'From ',
        'hero-title-part2': 'Image to Prompt',
        'hero-title-part3': ' to Best ',
        'hero-title-part4': 'AI Art',
        'hero-subtitle': 'Inspire, Create, Craft Prompts, Create Masterpieces',

        // Main Feature
        'main-title': 'Free Image to Prompt Generator',
        'upload-image': 'Upload Image',
        'input-url': 'Input Image URL',
        'upload-text': 'Upload a photo or drag and drop',
        'upload-formats': 'PNG, JPG, or WEBP up to 4MB',
        'url-placeholder': 'Paste your image link here',
        'load-url': 'Load Image URL',
        'image-preview': 'Image Preview',
        'preview-placeholder': 'Your image will show here',
        'prompt-language': 'Prompt Language',
        'generate-prompt': 'Generate Prompt',
        'generating-prompt': 'Image prompt generation in progress...',
        'generated-prompt': 'Generated Prompt',
        'prompt-placeholder': 'Generated prompt will appear here',
        'copy-success': 'Copy successful!',

        // Inspiration
        'inspiration-title': 'Unleash Your AI Image Prompt Inspiration',
        'inspiration-desc': 'To precisely modify outstanding AI images, one must obtain the prompt words for the pictures.',
        'example-1': 'Massive, mechanical shark-like creature looms over a tumultuous sea battle. Dark blue, metallic shark, with glowing blue accents, dominates the foreground. Complex mechanical structure, akin to futuristic armor, is evident...',
        'example-2': 'Pastel mid-century modern house by a swimming pool, vibrant pink clouds, classic red car. Dreamy, serene, and nostalgic aesthetic. Mid-century modern home with beige facade, large windows...',
        'example-3': 'Teenage girl with fox ears and foxtail, wearing a light pink kimono, holding a small orange fox. Soft, gentle expression. Delicate, expressive features. Medium-dark gray hair styled in a bun...',
        'example-4': 'Close-up portrait of a young couple, a light-skinned man and woman, in a romantic embrace. The man is a young adult, with short, dark hair and a sailor\'s cap. He\'s wearing a navy blue sailor\'s uniform...',

        // Tutorials
        'tutorials-title': 'Images Prompt Tutorials',
        'tutorial-placeholder': 'Tutorial Video Placeholder',
        'step-1': 'Upload an image or image URL.',
        'step-2': 'Select the language of the generated prompt words.',
        'step-3': 'Click the "Generate Prompt Words" button.',
        'step-4': 'Wait for a few seconds to generate the prompt words.',

        // Evaluation
        'evaluation-title': 'What Users Say About Image to Prompt',

        // FAQ
        'faq-title': 'Frequently asked questions',
        'faq-desc': 'Do you have any questions? We have got you covered.',
        'faq-1-q': 'What is Image to Prompt tool?',
        'faq-1-a': 'Image to Prompt is a tool that converts images into image prompt(looks like textual descriptions). It uses artificial intelligence to analyze image content and generate image prompt. Image prompt can be used to create similar images or for other AI text-to-image generation tasks. Image to Prompt generator makes it easier for users to understand and describe image content, facilitating AI image generation and other creative work.',
        'faq-2-q': 'Is Image to Prompt free to use?',
        'faq-2-a': 'Yes, our Image to Prompt Generator offers 5 free uses daily for all users. This daily limit is shared across all image-to-text tools (Image to Prompt, AI Describe Image) on imageprompt.org. If you need more usage, you can upgrade to our premium plans or buy a one-time Power Pack for more access. We aim to make this tool accessible while ensuring sustainable service quality.',
        'faq-3-q': 'When does the daily usage reset?',
        'faq-3-a': 'The daily usage resets at midnight Pacific Time (PT) every day. This means you can use our Image to Prompt Generator up to 5 times daily, and the count will reset at the start of each day in PT. You can find the next reset time in your timezone next to the usage stats.',
        'faq-4-q': 'How are my uploaded images handled in Image to Prompt Generator?',
        'faq-4-a': 'We prioritize your privacy and data security. Any images you upload are only temporarily processed to generate prompts and are immediately deleted afterward. We do not store or retain any uploaded images on our servers. Your images are used solely for the purpose of generating prompts in real-time.',
        'faq-5-q': 'What is the role of Image to Prompt in AI image generation?',
        'faq-5-a': 'Image to Prompt plays a crucial role in AI image generation by helping users extract key information from existing image and generate accurate image prompt. This image prompt can serve as new description for creating similar or improved images. Additionally, it helps users better understand how AI \'sees\' images, thereby improving their own prompt-writing skills.',
        'faq-6-q': 'What elements are typically included in an Image to Prompt output?',
        'faq-6-a': 'An Image to Prompt output typically includes a description of the main subject, the setting or background, the artistic style, color schemes, lighting conditions, and the overall mood or atmosphere of the image. It may also describe specific main subjects, actions, poses, composition, perspective, coloring, style or detailed features present in the image. The goal is to provide a comprehensive textual representation of the image.',

        // Footer
        'footer-desc': 'Free, unlimited AI image prompt generator powered by advanced AI models.',
        'footer-nav': 'Navigation',
        'footer-image-prompt': 'Image Prompt',
        'footer-inspiration': 'Inspiration',
        'footer-tutorials': 'Tutorials',
        'footer-evaluation': 'Evaluation',
        'footer-assistance': 'Assistance',
        'footer-languages': 'Languages',
        'footer-copyright': '© 2025 Image to Prompt Generator. All rights reserved.',

        // Common
        'loading-text': 'Processing your image...',
        'error-network': 'Network error. Please check your connection and try again.',
        'error-api': 'API error. Please try again later.',
        'error-file-size': 'File size too large. Please upload an image smaller than 4MB.',
        'error-file-format': 'Unsupported file format. Please upload PNG, JPG, or WEBP.',
        'error-url': 'Invalid image URL. Please check the link and try again.'
    },

    'zh-cn': {
        // Navigation
        'nav-image-prompt': '图片转提示词',
        'nav-inspiration': '灵感展示',
        'nav-tutorials': '使用教程',
        'nav-evaluation': '用户评价',
        'nav-assistance': '帮助中心',

        // Hero Section
        'hero-title-part1': '从',
        'hero-title-part2': '图片到提示词',
        'hero-title-part3': '，创造最佳',
        'hero-title-part4': 'AI艺术',
        'hero-subtitle': '激发灵感，创造提示词，创作杰作',

        // Main Feature
        'main-title': '免费图片转提示词生成器',
        'upload-image': '上传图片',
        'input-url': '输入图片链接',
        'upload-text': '上传照片或拖拽到此处',
        'upload-formats': 'PNG、JPG 或 WEBP，最大 4MB',
        'url-placeholder': '在此粘贴您的图片链接',
        'load-url': '加载图片链接',
        'image-preview': '图片预览',
        'preview-placeholder': '您的图片将在此显示',
        'prompt-language': '提示词语言',
        'generate-prompt': '生成提示词',
        'generating-prompt': '正在生成图片提示词...',
        'generated-prompt': '生成的提示词',
        'prompt-placeholder': '生成的提示词将在此显示',
        'copy-success': '复制成功！',

        // Inspiration
        'inspiration-title': '释放您的 AI 图片提示词灵感',
        'inspiration-desc': '要精确修改出色的 AI 图片，必须获取图片的提示词。',
        'example-1': '巨大的机械鲨鱼般生物在汹涌的海战中若隐若现。深蓝色的金属鲨鱼，带有发光的蓝色装饰，占据前景。复杂的机械结构，类似于未来主义盔甲，清晰可见...',
        'example-2': '游泳池旁的柔和色彩中世纪现代房屋，充满活力的粉红色云彩，经典红色汽车。梦幻、宁静和怀旧的美学。具有米色外墙、大窗户的中世纪现代住宅...',
        'example-3': '带有狐狸耳朵和狐尾的少女，穿着淡粉色和服，抱着小橙色狐狸。温柔、温和的表情。精致、富有表现力的特征。中等深灰色头发梳成发髻...',
        'example-4': '年轻情侣的近距离肖像，浅色皮肤的男女浪漫拥抱。男人是年轻成人，短深色头发和海军帽。他穿着海军蓝水手制服...',

        // Tutorials
        'tutorials-title': '图片提示词教程',
        'tutorial-placeholder': '教程视频占位符',
        'step-1': '上传图片或图片链接。',
        'step-2': '选择生成提示词的语言。',
        'step-3': '点击"生成提示词"按钮。',
        'step-4': '等待几秒钟生成提示词。',

        // Evaluation
        'evaluation-title': '用户对图片转提示词的评价',

        // FAQ
        'faq-title': '常见问题',
        'faq-desc': '您有任何问题吗？我们为您解答。',
        'faq-1-q': '什么是图片转提示词工具？',
        'faq-1-a': '图片转提示词是将图片转换为提示词（看起来像文本描述）的工具。它使用人工智能分析图片内容并生成提示词。提示词可用于创建相似图片或用于其他AI文本转图片生成任务。图片转提示词生成器使用户更容易理解和描述图片内容，促进AI图片生成和其他创意工作。',
        'faq-2-q': '图片转提示词是免费使用的吗？',
        'faq-2-a': '是的，我们的图片转提示词生成器为所有用户提供每日5次免费使用。这个每日限制在imageprompt.org上的所有图片转文本工具（图片转提示词、AI描述图片）之间共享。如果您需要更多使用次数，可以升级到我们的高级计划或购买一次性Power Pack以获得更多访问权限。我们的目标是使这个工具易于访问，同时确保可持续的服务质量。',
        'faq-3-q': '每日使用次数何时重置？',
        'faq-3-a': '每日使用次数每天太平洋时间（PT）午夜重置。这意味着您每天可以使用我们的图片转提示词生成器最多5次，计数将在PT每天开始时重置。您可以在使用统计旁边的时区中找到下一次重置时间。',
        'faq-4-q': '我的上传图片在图片转提示词生成器中如何处理？',
        'faq-4-a': '我们优先考虑您的隐私和数据安全。您上传的任何图片都只是为了生成提示词而临时处理，处理完成后立即删除。我们不会在我们的服务器上存储或保留任何上传的图片。您的图片仅用于实时生成提示词的目的。',
        'faq-5-q': '图片转提示词在AI图片生成中扮演什么角色？',
        'faq-5-a': '图片转提示词通过帮助用户从现有图片中提取关键信息并生成准确的提示词，在AI图片生成中发挥关键作用。这个提示词可以作为创建相似或改进图片的新描述。此外，它帮助用户更好地理解AI如何"看到"图片，从而提高他们自己的提示词写作技能。',
        'faq-6-q': '图片转提示词输出通常包含哪些元素？',
        'faq-6-a': '图片转提示词输出通常包括主要主体的描述、设置或背景、艺术风格、配色方案、光照条件以及图片的整体情绪或氛围。它还可能描述图片中存在的特定主体、动作、姿势、构图、视角、着色、风格或详细特征。目标是提供图片的全面文本表示。',

        // Footer
        'footer-desc': '由先进AI模型驱动的免费、无限制AI图片提示词生成器。',
        'footer-nav': '导航',
        'footer-image-prompt': '图片转提示词',
        'footer-inspiration': '灵感展示',
        'footer-tutorials': '使用教程',
        'footer-evaluation': '用户评价',
        'footer-assistance': '帮助中心',
        'footer-languages': '语言',
        'footer-copyright': '© 2025 图片转提示词生成器。版权所有。',

        // Common
        'loading-text': '正在处理您的图片...',
        'error-network': '网络错误。请检查您的连接并重试。',
        'error-api': 'API错误。请稍后重试。',
        'error-file-size': '文件大小过大。请上传小于4MB的图片。',
        'error-file-format': '不支持的文件格式。请上传PNG、JPG或WEBP格式。',
        'error-url': '无效的图片链接。请检查链接并重试。'
    },

    es: {
        // Navigation
        'nav-image-prompt': 'Imagen a Prompt',
        'nav-inspiration': 'Inspiración',
        'nav-tutorials': 'Tutoriales',
        'nav-evaluation': 'Evaluación',
        'nav-assistance': 'Asistencia',

        // Hero Section
        'hero-title-part1': 'De ',
        'hero-title-part2': 'Imagen a Prompt',
        'hero-title-part3': ' al Mejor ',
        'hero-title-part4': 'Arte IA',
        'hero-subtitle': 'Inspira, Crea, Elabora Prompts, Crea Obras Maestras',

        // Main Feature
        'main-title': 'Generador Gratuito de Imagen a Prompt',
        'upload-image': 'Subir Imagen',
        'input-url': 'Ingresar URL de Imagen',
        'upload-text': 'Sube una foto o arrastra y suelta',
        'upload-formats': 'PNG, JPG o WEBP hasta 4MB',
        'url-placeholder': 'Pega tu enlace de imagen aquí',
        'load-url': 'Cargar URL de Imagen',
        'image-preview': 'Vista Previa de Imagen',
        'preview-placeholder': 'Tu imagen aparecerá aquí',
        'prompt-language': 'Idioma del Prompt',
        'generate-prompt': 'Generar Prompt',
        'generating-prompt': 'Generación de prompt de imagen en progreso...',
        'generated-prompt': 'Prompt Generado',
        'prompt-placeholder': 'El prompt generado aparecerá aquí',
        'copy-success': '¡Copia exitosa!',

        // Inspiration
        'inspiration-title': 'Libera Tu Inspiración de Prompt de Imagen AI',
        'inspiration-desc': 'Para modificar precisamente imágenes AI excepcionales, uno debe obtener las palabras de prompt para las imágenes.',

        // Tutorials
        'tutorials-title': 'Tutoriales de Prompt de Imagen',
        'tutorial-placeholder': 'Marcador de posición de video tutorial',
        'step-1': 'Sube una imagen o URL de imagen.',
        'step-2': 'Selecciona el idioma de las palabras de prompt generadas.',
        'step-3': 'Haz clic en el botón "Generar Palabras de Prompt".',
        'step-4': 'Espera unos segundos para generar las palabras de prompt.',

        // Evaluation
        'evaluation-title': 'Lo que Dicen los Usuarios sobre Imagen a Prompt',

        // FAQ
        'faq-title': 'Preguntas frecuentes',
        'faq-desc': '¿Tienes alguna pregunta? Te tenemos cubierto.',

        // Footer
        'footer-desc': 'Generador gratuito e ilimitado de prompts de imagen AI impulsado por modelos AI avanzados.',
        'footer-nav': 'Navegación',
        'footer-image-prompt': 'Imagen a Prompt',
        'footer-inspiration': 'Inspiración',
        'footer-tutorials': 'Tutoriales',
        'footer-evaluation': 'Evaluación',
        'footer-assistance': 'Asistencia',
        'footer-languages': 'Idiomas',
        'footer-copyright': '© 2025 Generador de Imagen a Prompt. Todos los derechos reservados.',

        // Common
        'loading-text': 'Procesando tu imagen...',
        'error-network': 'Error de red. Por favor verifica tu conexión e inténtalo de nuevo.',
        'error-api': 'Error de API. Por favor inténtalo más tarde.',
        'error-file-size': 'Archivo demasiado grande. Por favor sube una imagen menor a 4MB.',
        'error-file-format': 'Formato de archivo no soportado. Por favor sube PNG, JPG o WEBP.',
        'error-url': 'URL de imagen inválida. Por favor verifica el enlace e inténtalo de nuevo.'
    },

    de: {
        // Navigation
        'nav-image-prompt': 'Bild zu Prompt',
        'nav-inspiration': 'Inspiration',
        'nav-tutorials': 'Tutorials',
        'nav-evaluation': 'Bewertung',
        'nav-assistance': 'Hilfe',

        // Hero Section
        'hero-title-part1': 'Von ',
        'hero-title-part2': 'Bild zu Prompt',
        'hero-title-part3': ' zur besten ',
        'hero-title-part4': 'KI-Kunst',
        'hero-subtitle': 'Inspirieren, Erstellen, Prompts erstellen, Meisterwerke schaffen',

        // Main Feature
        'main-title': 'Kostenloser Bild-zu-Prompt-Generator',
        'upload-image': 'Bild hochladen',
        'input-url': 'Bild-URL eingeben',
        'upload-text': 'Foto hochladen oder per Drag & Drop',
        'upload-formats': 'PNG, JPG oder WEBP bis zu 4MB',
        'url-placeholder': 'Bildlink hier einfügen',
        'load-url': 'Bild-URL laden',
        'image-preview': 'Bildvorschau',
        'preview-placeholder': 'Ihr Bild wird hier angezeigt',
        'prompt-language': 'Prompt-Sprache',
        'generate-prompt': 'Prompt generieren',
        'generating-prompt': 'Bild-Prompt-Generierung läuft...',
        'generated-prompt': 'Generierter Prompt',
        'prompt-placeholder': 'Generierter Prompt wird hier angezeigt',
        'copy-success': 'Kopieren erfolgreich!',

        // Inspiration
        'inspiration-title': 'Entfesseln Sie Ihre KI-Bild-Prompt-Inspiration',
        'inspiration-desc': 'Um herausragende KI-Bilder präzise zu modifizieren, muss man die Prompt-Wörter für die Bilder erhalten.',

        // Tutorials
        'tutorials-title': 'Bild-Prompt-Tutorials',
        'tutorial-placeholder': 'Tutorial-Video-Platzhalter',
        'step-1': 'Laden Sie ein Bild oder eine Bild-URL hoch.',
        'step-2': 'Wählen Sie die Sprache der generierten Prompt-Wörter.',
        'step-3': 'Klicken Sie auf die Schaltfläche "Prompt-Wörter generieren".',
        'step-4': 'Warten Sie einige Sekunden, um die Prompt-Wörter zu generieren.',

        // Evaluation
        'evaluation-title': 'Was Nutzer über Bild zu Prompt sagen',

        // FAQ
        'faq-title': 'Häufig gestellte Fragen',
        'faq-desc': 'Haben Sie Fragen? Wir haben Sie abgedeckt.',

        // Footer
        'footer-desc': 'Kostenloser, unbegrenzter KI-Bild-Prompt-Generator, angetrieben von fortschrittlichen KI-Modellen.',
        'footer-nav': 'Navigation',
        'footer-image-prompt': 'Bild zu Prompt',
        'footer-inspiration': 'Inspiration',
        'footer-tutorials': 'Tutorials',
        'footer-evaluation': 'Bewertung',
        'footer-assistance': 'Hilfe',
        'footer-languages': 'Sprachen',
        'footer-copyright': '© 2025 Bild-zu-Prompt-Generator. Alle Rechte vorbehalten.',

        // Common
        'loading-text': 'Ihr Bild wird verarbeitet...',
        'error-network': 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
        'error-api': 'API-Fehler. Bitte versuchen Sie es später erneut.',
        'error-file-size': 'Datei zu groß. Bitte laden Sie ein Bild kleiner als 4MB hoch.',
        'error-file-format': 'Nicht unterstütztes Dateiformat. Bitte laden Sie PNG, JPG oder WEBP hoch.',
        'error-url': 'Ungültige Bild-URL. Bitte überprüfen Sie den Link und versuchen Sie es erneut.'
    },

    fr: {
        // Navigation
        'nav-image-prompt': 'Image vers Prompt',
        'nav-inspiration': 'Inspiration',
        'nav-tutorials': 'Tutoriels',
        'nav-evaluation': 'Évaluation',
        'nav-assistance': 'Assistance',

        // Hero Section
        'hero-title-part1': 'De l\'',
        'hero-title-part2': 'Image au Prompt',
        'hero-title-part3': ' au Meilleur ',
        'hero-title-part4': 'Art IA',
        'hero-subtitle': 'Inspirer, Créer, Élaborer des Prompts, Créer des Chefs-d\'œuvre',

        // Main Feature
        'main-title': 'Générateur Gratuit d\'Image vers Prompt',
        'upload-image': 'Télécharger une Image',
        'input-url': 'Saisir l\'URL de l\'Image',
        'upload-text': 'Téléchargez une photo ou glissez-déposez',
        'upload-formats': 'PNG, JPG ou WEBP jusqu\'à 4MB',
        'url-placeholder': 'Collez votre lien d\'image ici',
        'load-url': 'Charger l\'URL de l\'Image',
        'image-preview': 'Aperçu de l\'Image',
        'preview-placeholder': 'Votre image apparaîtra ici',
        'prompt-language': 'Langue du Prompt',
        'generate-prompt': 'Générer le Prompt',
        'generating-prompt': 'Génération du prompt d\'image en cours...',
        'generated-prompt': 'Prompt Généré',
        'prompt-placeholder': 'Le prompt généré apparaîtra ici',
        'copy-success': 'Copie réussie !',

        // Inspiration
        'inspiration-title': 'Libérez Votre Inspiration de Prompt d\'Image IA',
        'inspiration-desc': 'Pour modifier précisément des images IA exceptionnelles, il faut obtenir les mots de prompt pour les images.',

        // Tutorials
        'tutorials-title': 'Tutoriels de Prompt d\'Image',
        'tutorial-placeholder': 'Espace réservé pour la vidéo tutoriel',
        'step-1': 'Téléchargez une image ou une URL d\'image.',
        'step-2': 'Sélectionnez la langue des mots de prompt générés.',
        'step-3': 'Cliquez sur le bouton "Générer les Mots de Prompt".',
        'step-4': 'Attendez quelques secondes pour générer les mots de prompt.',

        // Evaluation
        'evaluation-title': 'Ce que les Utilisateurs Disent sur Image vers Prompt',

        // FAQ
        'faq-title': 'Questions fréquemment posées',
        'faq-desc': 'Avez-vous des questions ? Nous vous avons couvert.',

        // Footer
        'footer-desc': 'Générateur gratuit et illimité de prompts d\'image IA alimenté par des modèles IA avancés.',
        'footer-nav': 'Navigation',
        'footer-image-prompt': 'Image vers Prompt',
        'footer-inspiration': 'Inspiration',
        'footer-tutorials': 'Tutoriels',
        'footer-evaluation': 'Évaluation',
        'footer-assistance': 'Assistance',
        'footer-languages': 'Langues',
        'footer-copyright': '© 2025 Générateur d\'Image vers Prompt. Tous droits réservés.',

        // Common
        'loading-text': 'Traitement de votre image...',
        'error-network': 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.',
        'error-api': 'Erreur API. Veuillez réessayer plus tard.',
        'error-file-size': 'Fichier trop volumineux. Veuillez télécharger une image de moins de 4MB.',
        'error-file-format': 'Format de fichier non pris en charge. Veuillez télécharger PNG, JPG ou WEBP.',
        'error-url': 'URL d\'image invalide. Veuillez vérifier le lien et réessayer.'
    },

    pt: {
        // Navigation
        'nav-image-prompt': 'Imagem para Prompt',
        'nav-inspiration': 'Inspiração',
        'nav-tutorials': 'Tutoriais',
        'nav-evaluation': 'Avaliação',
        'nav-assistance': 'Assistência',

        // Hero Section
        'hero-title-part1': 'De ',
        'hero-title-part2': 'Imagem para Prompt',
        'hero-title-part3': ' para a Melhor ',
        'hero-title-part4': 'Arte IA',
        'hero-subtitle': 'Inspirar, Criar, Elaborar Prompts, Criar Obras-Primas',

        // Main Feature
        'main-title': 'Gerador Gratuito de Imagem para Prompt',
        'upload-image': 'Carregar Imagem',
        'input-url': 'Inserir URL da Imagem',
        'upload-text': 'Carregue uma foto ou arraste e solte',
        'upload-formats': 'PNG, JPG ou WEBP até 4MB',
        'url-placeholder': 'Cole seu link de imagem aqui',
        'load-url': 'Carregar URL da Imagem',
        'image-preview': 'Visualização da Imagem',
        'preview-placeholder': 'Sua imagem aparecerá aqui',
        'prompt-language': 'Idioma do Prompt',
        'generate-prompt': 'Gerar Prompt',
        'generating-prompt': 'Geração de prompt de imagem em andamento...',
        'generated-prompt': 'Prompt Gerado',
        'prompt-placeholder': 'O prompt gerado aparecerá aqui',
        'copy-success': 'Cópia bem-sucedida!',

        // Inspiration
        'inspiration-title': 'Liberte Sua Inspiração de Prompt de Imagem IA',
        'inspiration-desc': 'Para modificar precisamente imagens IA excepcionais, é necessário obter as palavras de prompt para as imagens.',

        // Tutorials
        'tutorials-title': 'Tutoriais de Prompt de Imagem',
        'tutorial-placeholder': 'Espaço reservado para vídeo tutorial',
        'step-1': 'Carregue uma imagem ou URL de imagem.',
        'step-2': 'Selecione o idioma das palavras de prompt geradas.',
        'step-3': 'Clique no botão "Gerar Palavras de Prompt".',
        'step-4': 'Aguarde alguns segundos para gerar as palavras de prompt.',

        // Evaluation
        'evaluation-title': 'O que os Usuários Dizem sobre Imagem para Prompt',

        // FAQ
        'faq-title': 'Perguntas frequentes',
        'faq-desc': 'Você tem alguma pergunta? Estamos aqui para ajudar.',

        // Footer
        'footer-desc': 'Gerador gratuito e ilimitado de prompts de imagem IA alimentado por modelos IA avançados.',
        'footer-nav': 'Navegação',
        'footer-image-prompt': 'Imagem para Prompt',
        'footer-inspiration': 'Inspiração',
        'footer-tutorials': 'Tutoriais',
        'footer-evaluation': 'Avaliação',
        'footer-assistance': 'Assistência',
        'footer-languages': 'Idiomas',
        'footer-copyright': '© 2025 Gerador de Imagem para Prompt. Todos os direitos reservados.',

        // Common
        'loading-text': 'Processando sua imagem...',
        'error-network': 'Erro de rede. Verifique sua conexão e tente novamente.',
        'error-api': 'Erro de API. Tente novamente mais tarde.',
        'error-file-size': 'Arquivo muito grande. Carregue uma imagem menor que 4MB.',
        'error-file-format': 'Formato de arquivo não suportado. Carregue PNG, JPG ou WEBP.',
        'error-url': 'URL de imagem inválida. Verifique o link e tente novamente.'
    },

    'zh-tw': {
        // Navigation
        'nav-image-prompt': '圖片轉提示詞',
        'nav-inspiration': '靈感展示',
        'nav-tutorials': '使用教程',
        'nav-evaluation': '用戶評價',
        'nav-assistance': '幫助中心',

        // Hero Section
        'hero-title-part1': '從',
        'hero-title-part2': '圖片到提示詞',
        'hero-title-part3': '，創造最佳',
        'hero-title-part4': 'AI藝術',
        'hero-subtitle': '激發靈感，創造提示詞，創作傑作',

        // Main Feature
        'main-title': '免費圖片轉提示詞生成器',
        'upload-image': '上傳圖片',
        'input-url': '輸入圖片連結',
        'upload-text': '上傳照片或拖拽到此處',
        'upload-formats': 'PNG、JPG 或 WEBP，最大 4MB',
        'url-placeholder': '在此貼上您的圖片連結',
        'load-url': '載入圖片連結',
        'image-preview': '圖片預覽',
        'preview-placeholder': '您的圖片將在此顯示',
        'prompt-language': '提示詞語言',
        'generate-prompt': '生成提示詞',
        'generating-prompt': '正在生成圖片提示詞...',
        'generated-prompt': '生成的提示詞',
        'prompt-placeholder': '生成的提示詞將在此顯示',
        'copy-success': '複製成功！',

        // Inspiration
        'inspiration-title': '釋放您的 AI 圖片提示詞靈感',
        'inspiration-desc': '要精確修改出色的 AI 圖片，必須獲取圖片的提示詞。',

        // Tutorials
        'tutorials-title': '圖片提示詞教程',
        'tutorial-placeholder': '教程影片佔位符',
        'step-1': '上傳圖片或圖片連結。',
        'step-2': '選擇生成提示詞的語言。',
        'step-3': '點擊「生成提示詞」按鈕。',
        'step-4': '等待幾秒鐘生成提示詞。',

        // Evaluation
        'evaluation-title': '用戶對圖片轉提示詞的評價',

        // FAQ
        'faq-title': '常見問題',
        'faq-desc': '您有任何問題嗎？我們為您解答。',

        // Footer
        'footer-desc': '由先進AI模型驅動的免費、無限制AI圖片提示詞生成器。',
        'footer-nav': '導航',
        'footer-image-prompt': '圖片轉提示詞',
        'footer-inspiration': '靈感展示',
        'footer-tutorials': '使用教程',
        'footer-evaluation': '用戶評價',
        'footer-assistance': '幫助中心',
        'footer-languages': '語言',
        'footer-copyright': '© 2025 圖片轉提示詞生成器。版權所有。',

        // Common
        'loading-text': '正在處理您的圖片...',
        'error-network': '網路錯誤。請檢查您的連接並重試。',
        'error-api': 'API錯誤。請稍後重試。',
        'error-file-size': '檔案大小過大。請上傳小於4MB的圖片。',
        'error-file-format': '不支援的檔案格式。請上傳PNG、JPG或WEBP格式。',
        'error-url': '無效的圖片連結。請檢查連結並重試。'
    },

    ar: {
        // Navigation
        'nav-image-prompt': 'الصورة إلى التلميح',
        'nav-inspiration': 'الإلهام',
        'nav-tutorials': 'الدروس التعليمية',
        'nav-evaluation': 'التقييم',
        'nav-assistance': 'المساعدة',

        // Hero Section
        'hero-title-part1': 'من ',
        'hero-title-part2': 'الصورة إلى التلميح',
        'hero-title-part3': ' إلى أفضل ',
        'hero-title-part4': 'فن ذكي',
        'hero-subtitle': 'ألهم، أنشئ، اصنع التلميحات، أنشئ روائع',

        // Main Feature
        'main-title': 'مولد مجاني من الصورة إلى التلميح',
        'upload-image': 'رفع صورة',
        'input-url': 'إدخال رابط الصورة',
        'upload-text': 'ارفع صورة أو اسحب وأفلت',
        'upload-formats': 'PNG أو JPG أو WEBP حتى 4MB',
        'url-placeholder': 'الصق رابط الصورة هنا',
        'load-url': 'تحميل رابط الصورة',
        'image-preview': 'معاينة الصورة',
        'preview-placeholder': 'ستظهر صورتك هنا',
        'prompt-language': 'لغة التلميح',
        'generate-prompt': 'إنشاء تلميح',
        'generating-prompt': 'إنشاء تلميح الصورة قيد التقدم...',
        'generated-prompt': 'التلميح المُنشأ',
        'prompt-placeholder': 'سيظهر التلميح المُنشأ هنا',
        'copy-success': 'تم النسخ بنجاح!',

        // Inspiration
        'inspiration-title': 'أطلق العنان لإلهام تلميح الصورة بالذكاء الاصطناعي',
        'inspiration-desc': 'لتعديل صور الذكاء الاصطناعي المتميزة بدقة، يجب الحصول على كلمات التلميح للصور.',

        // Tutorials
        'tutorials-title': 'دروس تلميح الصورة',
        'tutorial-placeholder': 'عنصر نائب لفيديو تعليمي',
        'step-1': 'ارفع صورة أو رابط صورة.',
        'step-2': 'اختر لغة كلمات التلميح المُنشأة.',
        'step-3': 'انقر على زر "إنشاء كلمات التلميح".',
        'step-4': 'انتظر بضع ثوانٍ لإنشاء كلمات التلميح.',

        // Evaluation
        'evaluation-title': 'ما يقوله المستخدمون عن الصورة إلى التلميح',

        // FAQ
        'faq-title': 'الأسئلة الشائعة',
        'faq-desc': 'هل لديك أي أسئلة؟ نحن هنا لمساعدتك.',

        // Footer
        'footer-desc': 'مولد مجاني وغير محدود لتلميحات الصور بالذكاء الاصطناعي مدعوم بنماذج ذكاء اصطناعي متقدمة.',
        'footer-nav': 'التنقل',
        'footer-image-prompt': 'الصورة إلى التلميح',
        'footer-inspiration': 'الإلهام',
        'footer-tutorials': 'الدروس التعليمية',
        'footer-evaluation': 'التقييم',
        'footer-assistance': 'المساعدة',
        'footer-languages': 'اللغات',
        'footer-copyright': '© 2025 مولد الصورة إلى التلميح. جميع الحقوق محفوظة.',

        // Common
        'loading-text': 'جاري معالجة صورتك...',
        'error-network': 'خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
        'error-api': 'خطأ في API. يرجى المحاولة لاحقاً.',
        'error-file-size': 'الملف كبير جداً. يرجى رفع صورة أصغر من 4MB.',
        'error-file-format': 'تنسيق ملف غير مدعوم. يرجى رفع PNG أو JPG أو WEBP.',
        'error-url': 'رابط صورة غير صالح. يرجى التحقق من الرابط والمحاولة مرة أخرى.'
    },

    ru: {
        // Navigation
        'nav-image-prompt': 'Изображение в Подсказку',
        'nav-inspiration': 'Вдохновение',
        'nav-tutorials': 'Уроки',
        'nav-evaluation': 'Оценка',
        'nav-assistance': 'Помощь',

        // Hero Section
        'hero-title-part1': 'От ',
        'hero-title-part2': 'Изображения к Подсказке',
        'hero-title-part3': ' к Лучшему ',
        'hero-title-part4': 'ИИ Искусству',
        'hero-subtitle': 'Вдохновляйте, Создавайте, Создавайте Подсказки, Создавайте Шедевры',

        // Main Feature
        'main-title': 'Бесплатный Генератор Изображения в Подсказку',
        'upload-image': 'Загрузить Изображение',
        'input-url': 'Ввести URL Изображения',
        'upload-text': 'Загрузите фото или перетащите',
        'upload-formats': 'PNG, JPG или WEBP до 4MB',
        'url-placeholder': 'Вставьте ссылку на изображение здесь',
        'load-url': 'Загрузить URL Изображения',
        'image-preview': 'Предварительный Просмотр Изображения',
        'preview-placeholder': 'Ваше изображение появится здесь',
        'prompt-language': 'Язык Подсказки',
        'generate-prompt': 'Сгенерировать Подсказку',
        'generating-prompt': 'Генерация подсказки изображения в процессе...',
        'generated-prompt': 'Сгенерированная Подсказка',
        'prompt-placeholder': 'Сгенерированная подсказка появится здесь',
        'copy-success': 'Копирование успешно!',

        // Inspiration
        'inspiration-title': 'Раскройте Свое Вдохновение для ИИ Подсказок Изображений',
        'inspiration-desc': 'Чтобы точно модифицировать выдающиеся ИИ изображения, необходимо получить слова подсказки для изображений.',

        // Tutorials
        'tutorials-title': 'Уроки Подсказок Изображений',
        'tutorial-placeholder': 'Заполнитель видеоурока',
        'step-1': 'Загрузите изображение или URL изображения.',
        'step-2': 'Выберите язык генерируемых слов подсказки.',
        'step-3': 'Нажмите кнопку "Сгенерировать Слова Подсказки".',
        'step-4': 'Подождите несколько секунд для генерации слов подсказки.',

        // Evaluation
        'evaluation-title': 'Что Пользователи Говорят об Изображении в Подсказку',

        // FAQ
        'faq-title': 'Часто задаваемые вопросы',
        'faq-desc': 'У вас есть вопросы? Мы поможем вам.',

        // Footer
        'footer-desc': 'Бесплатный, неограниченный генератор ИИ подсказок изображений, работающий на передовых ИИ моделях.',
        'footer-nav': 'Навигация',
        'footer-image-prompt': 'Изображение в Подсказку',
        'footer-inspiration': 'Вдохновение',
        'footer-tutorials': 'Уроки',
        'footer-evaluation': 'Оценка',
        'footer-assistance': 'Помощь',
        'footer-languages': 'Языки',
        'footer-copyright': '© 2025 Генератор Изображения в Подсказку. Все права защищены.',

        // Common
        'loading-text': 'Обработка вашего изображения...',
        'error-network': 'Ошибка сети. Проверьте ваше соединение и попробуйте снова.',
        'error-api': 'Ошибка API. Попробуйте позже.',
        'error-file-size': 'Файл слишком большой. Загрузите изображение меньше 4MB.',
        'error-file-format': 'Неподдерживаемый формат файла. Загрузите PNG, JPG или WEBP.',
        'error-url': 'Неверный URL изображения. Проверьте ссылку и попробуйте снова.'
    },

    ja: {
        // Navigation
        'nav-image-prompt': '画像からプロンプト',
        'nav-inspiration': 'インスピレーション',
        'nav-tutorials': 'チュートリアル',
        'nav-evaluation': '評価',
        'nav-assistance': 'サポート',

        // Hero Section
        'hero-title-part1': '',
        'hero-title-part2': '画像からプロンプト',
        'hero-title-part3': 'へ、最高の',
        'hero-title-part4': 'AIアートへ',
        'hero-subtitle': 'インスパイア、創造、プロンプト作成、傑作創造',

        // Main Feature
        'main-title': '無料画像からプロンプト生成器',
        'upload-image': '画像をアップロード',
        'input-url': '画像URLを入力',
        'upload-text': '写真をアップロードまたはドラッグ&ドロップ',
        'upload-formats': 'PNG、JPG、WEBP最大4MB',
        'url-placeholder': '画像リンクをここに貼り付け',
        'load-url': '画像URLを読み込み',
        'image-preview': '画像プレビュー',
        'preview-placeholder': '画像がここに表示されます',
        'prompt-language': 'プロンプト言語',
        'generate-prompt': 'プロンプト生成',
        'generating-prompt': '画像プロンプト生成中...',
        'generated-prompt': '生成されたプロンプト',
        'prompt-placeholder': '生成されたプロンプトがここに表示されます',
        'copy-success': 'コピー成功！',

        // Inspiration
        'inspiration-title': 'AI画像プロンプトインスピレーションを解き放つ',
        'inspiration-desc': '優れたAI画像を正確に修正するには、画像のプロンプト単語を取得する必要があります。',

        // Tutorials
        'tutorials-title': '画像プロンプトチュートリアル',
        'tutorial-placeholder': 'チュートリアル動画プレースホルダー',
        'step-1': '画像または画像URLをアップロードします。',
        'step-2': '生成されるプロンプト単語の言語を選択します。',
        'step-3': '「プロンプト単語生成」ボタンをクリックします。',
        'step-4': 'プロンプト単語が生成されるまで数秒待ちます。',

        // Evaluation
        'evaluation-title': 'ユーザーが画像からプロンプトについて言うこと',

        // FAQ
        'faq-title': 'よくある質問',
        'faq-desc': 'ご質問はありますか？お手伝いします。',

        // Footer
        'footer-desc': '先進的なAIモデルによって駆動される無料、無制限のAI画像プロンプト生成器。',
        'footer-nav': 'ナビゲーション',
        'footer-image-prompt': '画像からプロンプト',
        'footer-inspiration': 'インスピレーション',
        'footer-tutorials': 'チュートリアル',
        'footer-evaluation': '評価',
        'footer-assistance': 'サポート',
        'footer-languages': '言語',
        'footer-copyright': '© 2025 画像からプロンプト生成器。全著作権所有。',

        // Common
        'loading-text': '画像を処理中...',
        'error-network': 'ネットワークエラー。接続を確認して再試行してください。',
        'error-api': 'APIエラー。後でもう一度お試しください。',
        'error-file-size': 'ファイルサイズが大きすぎます。4MB未満の画像をアップロードしてください。',
        'error-file-format': 'サポートされていないファイル形式。PNG、JPG、WEBPをアップロードしてください。',
        'error-url': '無効な画像URL。リンクを確認して再試行してください。'
    },

    ko: {
        // Navigation
        'nav-image-prompt': '이미지에서 프롬프트로',
        'nav-inspiration': '영감',
        'nav-tutorials': '튜토리얼',
        'nav-evaluation': '평가',
        'nav-assistance': '도움말',

        // Hero Section
        'hero-title-part1': '',
        'hero-title-part2': '이미지에서 프롬프트',
        'hero-title-part3': '로, 최고의 ',
        'hero-title-part4': 'AI 아트로',
        'hero-subtitle': '영감을 주고, 창조하고, 프롬프트를 만들고, 걸작을 창조하세요',

        // Main Feature
        'main-title': '무료 이미지에서 프롬프트 생성기',
        'upload-image': '이미지 업로드',
        'input-url': '이미지 URL 입력',
        'upload-text': '사진을 업로드하거나 드래그 앤 드롭',
        'upload-formats': 'PNG, JPG 또는 WEBP 최대 4MB',
        'url-placeholder': '이미지 링크를 여기에 붙여넣기',
        'load-url': '이미지 URL 로드',
        'image-preview': '이미지 미리보기',
        'preview-placeholder': '이미지가 여기에 표시됩니다',
        'prompt-language': '프롬프트 언어',
        'generate-prompt': '프롬프트 생성',
        'generating-prompt': '이미지 프롬프트 생성 중...',
        'generated-prompt': '생성된 프롬프트',
        'prompt-placeholder': '생성된 프롬프트가 여기에 표시됩니다',
        'copy-success': '복사 성공!',

        // Inspiration
        'inspiration-title': 'AI 이미지 프롬프트 영감을 발휘하세요',
        'inspiration-desc': '뛰어난 AI 이미지를 정확하게 수정하려면 이미지의 프롬프트 단어를 얻어야 합니다.',

        // Tutorials
        'tutorials-title': '이미지 프롬프트 튜토리얼',
        'tutorial-placeholder': '튜토리얼 비디오 플레이스홀더',
        'step-1': '이미지 또는 이미지 URL을 업로드합니다.',
        'step-2': '생성된 프롬프트 단어의 언어를 선택합니다.',
        'step-3': '"프롬프트 단어 생성" 버튼을 클릭합니다.',
        'step-4': '프롬프트 단어가 생성될 때까지 몇 초 기다립니다.',

        // Evaluation
        'evaluation-title': '사용자가 이미지에서 프롬프트에 대해 말하는 것',

        // FAQ
        'faq-title': '자주 묻는 질문',
        'faq-desc': '궁금한 점이 있으신가요? 도와드리겠습니다.',

        // Footer
        'footer-desc': '고급 AI 모델로 구동되는 무료, 무제한 AI 이미지 프롬프트 생성기.',
        'footer-nav': '네비게이션',
        'footer-image-prompt': '이미지에서 프롬프트로',
        'footer-inspiration': '영감',
        'footer-tutorials': '튜토리얼',
        'footer-evaluation': '평가',
        'footer-assistance': '도움말',
        'footer-languages': '언어',
        'footer-copyright': '© 2025 이미지에서 프롬프트 생성기. 모든 권리 보유.',

        // Common
        'loading-text': '이미지를 처리 중...',
        'error-network': '네트워크 오류. 연결을 확인하고 다시 시도하세요.',
        'error-api': 'API 오류. 나중에 다시 시도하세요.',
        'error-file-size': '파일 크기가 너무 큽니다. 4MB 미만의 이미지를 업로드하세요.',
        'error-file-format': '지원되지 않는 파일 형식. PNG, JPG 또는 WEBP를 업로드하세요.',
        'error-url': '잘못된 이미지 URL. 링크를 확인하고 다시 시도하세요.'
    }
};

// Language configuration
const languageConfig = {
    'en': { flag: '🇺🇸', name: 'English', dir: 'ltr' },
    'es': { flag: '🇪🇸', name: 'Español', dir: 'ltr' },
    'de': { flag: '🇩🇪', name: 'Deutsch', dir: 'ltr' },
    'fr': { flag: '🇫🇷', name: 'Français', dir: 'ltr' },
    'pt': { flag: '🇵🇹', name: 'Português', dir: 'ltr' },
    'zh-cn': { flag: '🇨🇳', name: '简体中文', dir: 'ltr' },
    'zh-tw': { flag: '🇹🇼', name: '繁體中文', dir: 'ltr' },
    'ar': { flag: '🇸🇦', name: 'العربية', dir: 'rtl' },
    'ru': { flag: '🇷🇺', name: 'Русский', dir: 'ltr' },
    'ja': { flag: '🇯🇵', name: '日本語', dir: 'ltr' },
    'ko': { flag: '🇰🇷', name: '한국어', dir: 'ltr' }
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}

// Set current language
function setCurrentLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    updateLanguageDisplay(lang);
    translatePage(lang);
    updateDocumentDirection(lang);
}

// Update language display in UI
function updateLanguageDisplay(lang) {
    const config = languageConfig[lang];
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.innerHTML = `<span class="text-sm">${config.flag} ${config.name.substring(0, 2).toUpperCase()}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>`;
    }
}

// Update document direction for RTL languages
function updateDocumentDirection(lang) {
    const config = languageConfig[lang];
    document.documentElement.dir = config.dir;
    document.documentElement.lang = lang;
}

// Translate page content
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else if (translations['en'] && translations['en'][key]) {
            // Fallback to English
            element.textContent = translations['en'][key];
        }
    });
}

// Get translated text
function getTranslation(key, lang = null) {
    const currentLang = lang || getCurrentLanguage();
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

// Initialize language system
function initLanguageSystem() {
    const currentLang = getCurrentLanguage();
    updateLanguageDisplay(currentLang);
    translatePage(currentLang);
    updateDocumentDirection(currentLang);
}

// Export functions for use in main.js
window.LanguageSystem = {
    getCurrentLanguage,
    setCurrentLanguage,
    getTranslation,
    initLanguageSystem,
    languageConfig
};
