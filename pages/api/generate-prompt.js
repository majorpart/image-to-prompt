// 从原 api/generate-prompt.js 迁移
// 配置 bodyParser 以支持更大的请求体（用于 base64 图片）
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // 增加请求体大小限制到 10MB
        },
    },
};

export default async function handler(req, res) {
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { imageBase64, language, structuredPrompt } = req.body;

        // 验证必需参数
        if (!imageBase64) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        // 从环境变量获取 OpenRouter API 密钥
        // 支持 OPENROUTER_API_KEY 或 API_KEY（向后兼容）
        const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OpenRouter API key not configured. Please set OPENROUTER_API_KEY environment variable.' });
        }

        // OpenRouter API 端点（统一接口，支持多个模型）
        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        
        // 使用 Google Gemini 2.0 Flash Lite 模型
        // 模型名称：google/gemini-2.0-flash-lite-001
        // 优势：更快的响应时间，更低的延迟，支持多模态（图片理解）
        const model = 'google/gemini-2.0-flash-lite-001';

        // 多语言提示词模板系统
        // 为每种语言生成对应的提示词，优化 Gemini 模型理解
        const getInstruction = (languageCode, structuredPrompt) => {
            const templates = {
                'en': {
                    structured: `You are a professional AI art prompt engineer. Analyze the provided image and generate a detailed, structured prompt in English. Output ONLY the prompt in the following format, using English for all labels and content:

Subject: [Describe the main subject: person/animal/object/scene with specific details including gender, age, ethnicity, pose, action, expression, etc.]

Appearance Details: [Describe physical features, clothing style, hairstyle, accessories, props, etc.]

Environment & Background: [Describe the location, setting, lighting conditions, atmosphere, mood, time of day, weather, etc.]

Artistic Style: [Specify art style: realistic/cyberpunk/anime/watercolor/digital art/etc., color palette: warm/cool/high contrast/monochrome, composition, camera angle, depth of field, etc.]

Technical Details: [Include rendering quality, level of detail, artistic techniques, visual effects, etc.]

Generate a comprehensive, production-ready prompt that can be directly used in AI image generation tools like Stable Diffusion, Midjourney, or DALL-E.`,
                    normal: `You are a professional AI art prompt engineer. Analyze the provided image and generate a high-quality, detailed, and production-ready prompt in English that can be directly used in AI image generation tools (Stable Diffusion, Midjourney, DALL-E, etc.).

Generate a single, coherent paragraph that includes ALL of the following elements in this order:
1. Main Subject: Describe the core subject (person, animal, object, etc.) with detailed appearance, pose, action, expression, and clothing.
2. Environment & Atmosphere: Describe the background, setting, lighting conditions, time of day, weather, and overall mood.
3. Artistic Style & Technique: Specify the art style, color palette, composition, camera angle, depth of field, and rendering quality.
4. Technical Details: Include level of detail, artistic techniques, visual effects, and any special characteristics.

Write in fluent, natural English. Be specific, descriptive, and comprehensive. Do not include section headers, numbering, or formatting - just a continuous, well-structured paragraph.`
                },
                'zh-cn': {
                    structured: `你是一名专业AI绘画提示词工程师。请仔细分析提供的图片，严格按照以下结构化格式生成简体中文提示词。所有标签和内容都使用简体中文：

主体：[描述图片核心对象：人物/动物/物体/场景的具体特征，包括性别、年龄、种族、姿势、动作、表情等]

外观细节：[描述主体的外貌特征、服装款式、发型设计、手持道具、佩戴配饰等具体细节]

环境背景：[说明场景的具体位置与环境特征，如森林深处、未来都市、奇幻空间等；描述光线效果、时间、天气、氛围等]

艺术风格：[指定艺术风格：写实/赛博朋克/动漫/水彩/数字艺术等；定义色调倾向：冷色调/暖色调/高对比度/单色等；构图、视角、景深等]

技术细节：[包括渲染质量、细节层次、艺术技法、视觉效果等]

生成一个全面、可直接用于Stable Diffusion、Midjourney或DALL-E等AI图像生成工具的生产级提示词。`,
                    normal: `你是一名专业AI绘画提示词工程师。请仔细分析提供的图片，生成一段高质量、详细且可直接用于AI图像生成工具（Stable Diffusion、Midjourney、DALL-E等）的简体中文提示词。

生成一个连贯的段落，按以下顺序包含所有元素：
1. 主体核心：描述核心对象（人物、动物、物体等）的详细外观、姿势、动作、表情和服饰。
2. 环境氛围：描述背景、场景、光线条件、时间、天气和整体氛围。
3. 艺术风格与技术：指定艺术风格、色彩调色板、构图、视角、景深和渲染质量。
4. 技术细节：包括细节层次、艺术技法、视觉效果和特殊特征。

使用流畅、自然的简体中文。要具体、描述性强且全面。不要包含章节标题、编号或格式，只需一个连续、结构良好的段落。`
                },
                'zh-tw': {
                    structured: `你是一名專業AI繪畫提示詞工程師。請仔細分析提供的圖片，嚴格按照以下結構化格式生成繁體中文提示詞。所有標籤和內容都使用繁體中文：

主體：[描述圖片核心對象：人物/動物/物體/場景的具體特徵，包括性別、年齡、種族、姿勢、動作、表情等]

外觀細節：[描述主體的外貌特徵、服裝款式、髮型設計、手持道具、佩戴配飾等具體細節]

環境背景：[說明場景的具體位置與環境特徵，如森林深處、未來都市、奇幻空間等；描述光線效果、時間、天氣、氛圍等]

藝術風格：[指定藝術風格：寫實/賽博龐克/動漫/水彩/數位藝術等；定義色調傾向：冷色調/暖色調/高對比度/單色等；構圖、視角、景深等]

技術細節：[包括渲染質量、細節層次、藝術技法、視覺效果等]

生成一個全面、可直接用於Stable Diffusion、Midjourney或DALL-E等AI圖像生成工具的生產級提示詞。`,
                    normal: `你是一名專業AI繪畫提示詞工程師。請仔細分析提供的圖片，生成一段高質量、詳細且可直接用於AI圖像生成工具（Stable Diffusion、Midjourney、DALL-E等）的繁體中文提示詞。

生成一個連貫的段落，按以下順序包含所有元素：
1. 主體核心：描述核心對象（人物、動物、物體等）的詳細外觀、姿勢、動作、表情和服飾。
2. 環境氛圍：描述背景、場景、光線條件、時間、天氣和整體氛圍。
3. 藝術風格與技術：指定藝術風格、色彩調色板、構圖、視角、景深和渲染質量。
4. 技術細節：包括細節層次、藝術技法、視覺效果和特殊特徵。

使用流暢、自然的繁體中文。要具體、描述性強且全面。不要包含章節標題、編號或格式，只需一個連續、結構良好的段落。`
                },
                'es': {
                    structured: `Eres un ingeniero profesional de prompts para arte con IA. Analiza la imagen proporcionada y genera un prompt detallado y estructurado en español. Genera SOLO el prompt en el siguiente formato, usando español para todas las etiquetas y contenido:

Sujeto: [Describe el sujeto principal: persona/animal/objeto/escena con detalles específicos incluyendo género, edad, etnia, pose, acción, expresión, etc.]

Detalles de Apariencia: [Describe características físicas, estilo de ropa, peinado, accesorios, props, etc.]

Ambiente y Fondo: [Describe la ubicación, escenario, condiciones de iluminación, atmósfera, estado de ánimo, hora del día, clima, etc.]

Estilo Artístico: [Especifica el estilo artístico: realista/cyberpunk/anime/acuarela/arte digital/etc., paleta de colores: cálida/fría/alto contraste/monocromática, composición, ángulo de cámara, profundidad de campo, etc.]

Detalles Técnicos: [Incluye calidad de renderizado, nivel de detalle, técnicas artísticas, efectos visuales, etc.]

Genera un prompt completo y listo para producción que pueda usarse directamente en herramientas de generación de imágenes IA como Stable Diffusion, Midjourney o DALL-E.`,
                    normal: `Eres un ingeniero profesional de prompts para arte con IA. Analiza la imagen proporcionada y genera un prompt de alta calidad, detallado y listo para producción en español que pueda usarse directamente en herramientas de generación de imágenes IA (Stable Diffusion, Midjourney, DALL-E, etc.).

Genera un párrafo único y coherente que incluya TODOS los siguientes elementos en este orden:
1. Sujeto Principal: Describe el sujeto central (persona, animal, objeto, etc.) con apariencia detallada, pose, acción, expresión y ropa.
2. Ambiente y Atmósfera: Describe el fondo, escenario, condiciones de iluminación, hora del día, clima y estado de ánimo general.
3. Estilo Artístico y Técnica: Especifica el estilo artístico, paleta de colores, composición, ángulo de cámara, profundidad de campo y calidad de renderizado.
4. Detalles Técnicos: Incluye nivel de detalle, técnicas artísticas, efectos visuales y características especiales.

Escribe en español fluido y natural. Sé específico, descriptivo y completo. No incluyas encabezados de sección, numeración o formato, solo un párrafo continuo y bien estructurado.`
                },
                'de': {
                    structured: `Du bist ein professioneller KI-Kunst-Prompt-Ingenieur. Analysiere das bereitgestellte Bild und generiere einen detaillierten, strukturierten Prompt auf Deutsch. Gib NUR den Prompt im folgenden Format aus, verwende Deutsch für alle Beschriftungen und Inhalte:

Subjekt: [Beschreibe das Hauptmotiv: Person/Tier/Objekt/Szene mit spezifischen Details einschließlich Geschlecht, Alter, Ethnizität, Pose, Aktion, Ausdruck usw.]

Erscheinungsdetails: [Beschreibe körperliche Merkmale, Kleidungsstil, Frisur, Accessoires, Requisiten usw.]

Umgebung & Hintergrund: [Beschreibe den Ort, die Szenerie, Lichtverhältnisse, Atmosphäre, Stimmung, Tageszeit, Wetter usw.]

Künstlerischer Stil: [Spezifiziere den Kunststil: realistisch/Cyberpunk/Anime/Aquarell/Digitalkunst usw., Farbpalette: warm/kalt/hoher Kontrast/monochrom, Komposition, Kamerawinkel, Schärfentiefe usw.]

Technische Details: [Füge Renderqualität, Detaillierungsgrad, künstlerische Techniken, visuelle Effekte usw. hinzu]

Generiere einen umfassenden, produktionsreifen Prompt, der direkt in KI-Bildgenerierungstools wie Stable Diffusion, Midjourney oder DALL-E verwendet werden kann.`,
                    normal: `Du bist ein professioneller KI-Kunst-Prompt-Ingenieur. Analysiere das bereitgestellte Bild und generiere einen hochwertigen, detaillierten und produktionsreifen Prompt auf Deutsch, der direkt in KI-Bildgenerierungstools (Stable Diffusion, Midjourney, DALL-E usw.) verwendet werden kann.

Generiere einen einzigen, kohärenten Absatz, der ALLE folgenden Elemente in dieser Reihenfolge enthält:
1. Hauptmotiv: Beschreibe das zentrale Motiv (Person, Tier, Objekt usw.) mit detaillierter Erscheinung, Pose, Aktion, Ausdruck und Kleidung.
2. Umgebung & Atmosphäre: Beschreibe den Hintergrund, die Szenerie, Lichtverhältnisse, Tageszeit, Wetter und die allgemeine Stimmung.
3. Künstlerischer Stil & Technik: Spezifiziere den Kunststil, die Farbpalette, Komposition, Kamerawinkel, Schärfentiefe und Renderqualität.
4. Technische Details: Füge Detaillierungsgrad, künstlerische Techniken, visuelle Effekte und besondere Merkmale hinzu.

Schreibe in fließendem, natürlichem Deutsch. Sei spezifisch, beschreibend und umfassend. Füge keine Abschnittsüberschriften, Nummerierung oder Formatierung hinzu - nur einen kontinuierlichen, gut strukturierten Absatz.`
                },
                'fr': {
                    structured: `Vous êtes un ingénieur professionnel de prompts pour l'art IA. Analysez l'image fournie et générez un prompt détaillé et structuré en français. Générez UNIQUEMENT le prompt dans le format suivant, en utilisant le français pour toutes les étiquettes et le contenu :

Sujet : [Décrivez le sujet principal : personne/animal/objet/scène avec des détails spécifiques incluant le genre, l'âge, l'ethnicité, la pose, l'action, l'expression, etc.]

Détails d'Apparence : [Décrivez les caractéristiques physiques, le style vestimentaire, la coiffure, les accessoires, les accessoires, etc.]

Environnement & Arrière-plan : [Décrivez l'emplacement, le décor, les conditions d'éclairage, l'atmosphère, l'ambiance, l'heure de la journée, la météo, etc.]

Style Artistique : [Spécifiez le style artistique : réaliste/cyberpunk/anime/aquarelle/art numérique/etc., palette de couleurs : chaud/froid/haut contraste/monochrome, composition, angle de caméra, profondeur de champ, etc.]

Détails Techniques : [Incluez la qualité de rendu, le niveau de détail, les techniques artistiques, les effets visuels, etc.]

Générez un prompt complet et prêt pour la production qui peut être utilisé directement dans des outils de génération d'images IA comme Stable Diffusion, Midjourney ou DALL-E.`,
                    normal: `Vous êtes un ingénieur professionnel de prompts pour l'art IA. Analysez l'image fournie et générez un prompt de haute qualité, détaillé et prêt pour la production en français qui peut être utilisé directement dans des outils de génération d'images IA (Stable Diffusion, Midjourney, DALL-E, etc.).

Générez un seul paragraphe cohérent qui inclut TOUS les éléments suivants dans cet ordre :
1. Sujet Principal : Décrivez le sujet central (personne, animal, objet, etc.) avec une apparence détaillée, une pose, une action, une expression et des vêtements.
2. Environnement & Atmosphère : Décrivez l'arrière-plan, le décor, les conditions d'éclairage, l'heure de la journée, la météo et l'ambiance générale.
3. Style Artistique & Technique : Spécifiez le style artistique, la palette de couleurs, la composition, l'angle de caméra, la profondeur de champ et la qualité de rendu.
4. Détails Techniques : Incluez le niveau de détail, les techniques artistiques, les effets visuels et les caractéristiques spéciales.

Écrivez en français fluide et naturel. Soyez spécifique, descriptif et complet. N'incluez pas d'en-têtes de section, de numérotation ou de formatage - juste un paragraphe continu et bien structuré.`
                },
                'pt': {
                    structured: `Você é um engenheiro profissional de prompts para arte com IA. Analise a imagem fornecida e gere um prompt detalhado e estruturado em português. Gere APENAS o prompt no seguinte formato, usando português para todos os rótulos e conteúdo:

Sujeito: [Descreva o sujeito principal: pessoa/animal/objeto/cena com detalhes específicos incluindo gênero, idade, etnia, pose, ação, expressão, etc.]

Detalhes de Aparência: [Descreva características físicas, estilo de roupa, penteado, acessórios, adereços, etc.]

Ambiente e Fundo: [Descreva a localização, cenário, condições de iluminação, atmosfera, humor, hora do dia, clima, etc.]

Estilo Artístico: [Especifique o estilo artístico: realista/cyberpunk/anime/aquarela/arte digital/etc., paleta de cores: quente/frio/alto contraste/monocromático, composição, ângulo da câmera, profundidade de campo, etc.]

Detalhes Técnicos: [Inclua qualidade de renderização, nível de detalhe, técnicas artísticas, efeitos visuais, etc.]

Gere um prompt abrangente e pronto para produção que possa ser usado diretamente em ferramentas de geração de imagens IA como Stable Diffusion, Midjourney ou DALL-E.`,
                    normal: `Você é um engenheiro profissional de prompts para arte com IA. Analise a imagem fornecida e gere um prompt de alta qualidade, detalhado e pronto para produção em português que possa ser usado diretamente em ferramentas de geração de imagens IA (Stable Diffusion, Midjourney, DALL-E, etc.).

Gere um único parágrafo coerente que inclua TODOS os seguintes elementos nesta ordem:
1. Sujeito Principal: Descreva o sujeito central (pessoa, animal, objeto, etc.) com aparência detalhada, pose, ação, expressão e roupas.
2. Ambiente e Atmosfera: Descreva o fundo, cenário, condições de iluminação, hora do dia, clima e humor geral.
3. Estilo Artístico e Técnica: Especifique o estilo artístico, paleta de cores, composição, ângulo da câmera, profundidade de campo e qualidade de renderização.
4. Detalhes Técnicos: Inclua nível de detalhe, técnicas artísticas, efeitos visuais e características especiais.

Escreva em português fluente e natural. Seja específico, descritivo e abrangente. Não inclua cabeçalhos de seção, numeração ou formatação - apenas um parágrafo contínuo e bem estruturado.`
                },
                'ar': {
                    structured: `أنت مهندس محترف لكتابة أوامر الفن بالذكاء الاصطناعي. حلل الصورة المقدمة وقم بإنشاء أمر مفصل ومنظم باللغة العربية. أنشئ الأمر فقط بالتنسيق التالي، باستخدام العربية لجميع التسميات والمحتوى:

الموضوع: [وصف الموضوع الرئيسي: شخص/حيوان/كائن/مشهد بتفاصيل محددة بما في ذلك الجنس، العمر، العرق، الوضعية، الحركة، التعبير، إلخ]

تفاصيل المظهر: [وصف الخصائص الجسدية، نمط الملابس، تصفيفة الشعر، الإكسسوارات، الدعائم، إلخ]

البيئة والخلفية: [وصف الموقع، المشهد، ظروف الإضاءة، الجو، المزاج، وقت اليوم، الطقس، إلخ]

الأسلوب الفني: [حدد الأسلوب الفني: واقعي/سايبربانك/أنيمي/ألوان مائية/فن رقمي/إلخ، لوحة الألوان: دافئ/بارد/تباين عالي/أحادي اللون، التكوين، زاوية الكاميرا، عمق المجال، إلخ]

التفاصيل التقنية: [قم بتضمين جودة العرض، مستوى التفاصيل، التقنيات الفنية، التأثيرات البصرية، إلخ]

قم بإنشاء أمر شامل وجاهز للإنتاج يمكن استخدامه مباشرة في أدوات إنشاء الصور بالذكاء الاصطناعي مثل Stable Diffusion أو Midjourney أو DALL-E.`,
                    normal: `أنت مهندس محترف لكتابة أوامر الفن بالذكاء الاصطناعي. حلل الصورة المقدمة وقم بإنشاء أمر عالي الجودة ومفصل وجاهز للإنتاج باللغة العربية يمكن استخدامه مباشرة في أدوات إنشاء الصور بالذكاء الاصطناعي (Stable Diffusion، Midjourney، DALL-E، إلخ).

قم بإنشاء فقرة واحدة متماسكة تتضمن جميع العناصر التالية بهذا الترتيب:
1. الموضوع الرئيسي: وصف الموضوع المركزي (شخص، حيوان، كائن، إلخ) بمظهر مفصل، وضعية، حركة، تعبير وملابس.
2.البيئة والجو: وصف الخلفية، المشهد، ظروف الإضاءة، وقت اليوم، الطقس والمزاج العام.
3.الأسلوب الفني والتقنية: حدد الأسلوب الفني، لوحة الألوان، التكوين، زاوية الكاميرا، عمق المجال وجودة العرض.
4.التفاصيل التقنية: قم بتضمين مستوى التفاصيل، التقنيات الفنية، التأثيرات البصرية والخصائص الخاصة.

اكتب بالعربية بطلاقة وطبيعية. كن محددًا ووصفيًا وشاملًا. لا تتضمن عناوين الأقسام أو الترقيم أو التنسيق - فقط فقرة مستمرة ومنظمة جيدًا.`
                },
                'ru': {
                    structured: `Вы профессиональный инженер промптов для ИИ-искусства. Проанализируйте предоставленное изображение и создайте детальный структурированный промпт на русском языке. Выведите ТОЛЬКО промпт в следующем формате, используя русский язык для всех меток и содержимого:

Субъект: [Опишите основной объект: человек/животное/предмет/сцена с конкретными деталями, включая пол, возраст, этническую принадлежность, позу, действие, выражение и т.д.]

Детали Внешности: [Опишите физические характеристики, стиль одежды, прическу, аксессуары, реквизит и т.д.]

Окружение и Фон: [Опишите местоположение, обстановку, условия освещения, атмосферу, настроение, время суток, погоду и т.д.]

Художественный Стиль: [Укажите художественный стиль: реалистичный/киберпанк/аниме/акварель/цифровое искусство/ит.д., цветовая палитра: теплая/холодная/высокий контраст/монохромная, композиция, угол камеры, глубина резкости и т.д.]

Технические Детали: [Включите качество рендеринга, уровень детализации, художественные техники, визуальные эффекты и т.д.]

Создайте всеобъемлющий, готовый к использованию промпт, который можно напрямую использовать в инструментах генерации изображений ИИ, таких как Stable Diffusion, Midjourney или DALL-E.`,
                    normal: `Вы профессиональный инженер промптов для ИИ-искусства. Проанализируйте предоставленное изображение и создайте высококачественный, детальный и готовый к использованию промпт на русском языке, который можно напрямую использовать в инструментах генерации изображений ИИ (Stable Diffusion, Midjourney, DALL-E и т.д.).

Создайте один связный абзац, который включает ВСЕ следующие элементы в этом порядке:
1. Основной Субъект: Опишите центральный объект (человек, животное, предмет и т.д.) с детальной внешностью, позой, действием, выражением и одеждой.
2. Окружение и Атмосфера: Опишите фон, обстановку, условия освещения, время суток, погоду и общее настроение.
3. Художественный Стиль и Техника: Укажите художественный стиль, цветовую палитру, композицию, угол камеры, глубину резкости и качество рендеринга.
4. Технические Детали: Включите уровень детализации, художественные техники, визуальные эффекты и особые характеристики.

Пишите на плавном, естественном русском языке. Будьте конкретны, описательны и всеобъемлющи. Не включайте заголовки разделов, нумерацию или форматирование - только непрерывный, хорошо структурированный абзац.`
                },
                'ja': {
                    structured: `あなたはプロのAIアートプロンプトエンジニアです。提供された画像を分析し、日本語で詳細な構造化プロンプトを生成してください。以下の形式でプロンプトのみを出力し、すべてのラベルとコンテンツに日本語を使用してください：

主題：[主要な被写体を説明：人物/動物/物体/シーン、性別、年齢、民族、ポーズ、動作、表情などの具体的な詳細を含む]

外見の詳細：[身体的特徴、服装スタイル、髪型、アクセサリー、小道具などを説明]

環境と背景：[場所、設定、照明条件、雰囲気、ムード、時間帯、天候などを説明]

芸術的スタイル：[芸術スタイルを指定：リアル/サイバーパンク/アニメ/水彩/デジタルアートなど、カラーパレット：暖色/寒色/高コントラスト/モノクロ、構図、カメラアングル、被写界深度など]

技術的詳細：[レンダリング品質、詳細レベル、芸術技法、視覚効果などを含む]

Stable Diffusion、Midjourney、DALL-EなどのAI画像生成ツールで直接使用できる包括的で本番準備が整ったプロンプトを生成してください。`,
                    normal: `あなたはプロのAIアートプロンプトエンジニアです。提供された画像を分析し、Stable Diffusion、Midjourney、DALL-EなどのAI画像生成ツールで直接使用できる高品質で詳細な本番準備が整った日本語プロンプトを生成してください。

この順序で以下のすべての要素を含む単一の一貫した段落を生成してください：
1. 主要な主題：詳細な外見、ポーズ、動作、表情、服装を含む中心的な被写体（人物、動物、物体など）を説明
2. 環境と雰囲気：背景、設定、照明条件、時間帯、天候、全体的なムードを説明
3. 芸術的スタイルと技術：芸術スタイル、カラーパレット、構図、カメラアングル、被写界深度、レンダリング品質を指定
4. 技術的詳細：詳細レベル、芸術技法、視覚効果、特別な特徴を含む

流暢で自然な日本語で書いてください。具体的で、説明的で、包括的である必要があります。セクション見出し、番号付け、またはフォーマットを含めないでください - 連続的で構造化された段落のみです。`
                },
                'ko': {
                    structured: `당신은 전문 AI 아트 프롬프트 엔지니어입니다. 제공된 이미지를 분석하고 한국어로 상세하고 구조화된 프롬프트를 생성하세요. 다음 형식으로 프롬프트만 출력하고, 모든 레이블과 콘텐츠에 한국어를 사용하세요:

주제: [주요 피사체 설명: 사람/동물/물체/장면, 성별, 나이, 민족, 포즈, 동작, 표정 등의 구체적인 세부사항 포함]

외모 세부사항: [신체적 특징, 의상 스타일, 헤어스타일, 액세서리, 소품 등을 설명]

환경 및 배경: [위치, 설정, 조명 조건, 분위기, 기분, 시간대, 날씨 등을 설명]

예술적 스타일: [예술 스타일 지정: 사실적/사이버펑크/애니메/수채화/디지털 아트 등, 색상 팔레트: 따뜻한/차가운/고대비/단색, 구도, 카메라 각도, 심도 등]

기술적 세부사항: [렌더링 품질, 세부 수준, 예술 기법, 시각 효과 등을 포함]

Stable Diffusion, Midjourney, DALL-E와 같은 AI 이미지 생성 도구에서 직접 사용할 수 있는 포괄적이고 프로덕션 준비가 된 프롬프트를 생성하세요.`,
                    normal: `당신은 전문 AI 아트 프롬프트 엔지니어입니다. 제공된 이미지를 분석하고 Stable Diffusion, Midjourney, DALL-E와 같은 AI 이미지 생성 도구에서 직접 사용할 수 있는 고품질, 상세하고 프로덕션 준비가 된 한국어 프롬프트를 생성하세요.

다음 순서로 다음의 모든 요소를 포함하는 단일의 일관된 단락을 생성하세요:
1. 주요 주제: 상세한 외모, 포즈, 동작, 표정, 의상을 포함한 중심 피사체(사람, 동물, 물체 등) 설명
2. 환경 및 분위기: 배경, 설정, 조명 조건, 시간대, 날씨, 전반적인 기분 설명
3. 예술적 스타일 및 기법: 예술 스타일, 색상 팔레트, 구도, 카메라 각도, 심도, 렌더링 품질 지정
4. 기술적 세부사항: 세부 수준, 예술 기법, 시각 효과, 특별한 특징 포함

유창하고 자연스러운 한국어로 작성하세요. 구체적이고, 설명적이며, 포괄적이어야 합니다. 섹션 제목, 번호 매기기 또는 형식을 포함하지 마세요 - 연속적이고 잘 구조화된 단락만 작성하세요.`
                }
            };

            // 获取对应语言的模板，如果不存在则使用英语模板
            const template = templates[languageCode] || templates['en'];
            return structuredPrompt === 'yes' ? template.structured : template.normal;
        };

        // 生成优化后的提示词
        const instruction = getInstruction(language || 'en', structuredPrompt);

        // 准备图片 URL（确保格式正确）
        const imageUrl = imageBase64.startsWith('data:') 
            ? imageBase64 
            : `data:image/jpeg;base64,${imageBase64}`;

        // 构建请求体（OpenRouter 使用 OpenAI 兼容格式）
        const requestBody = {
            model: model,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: instruction
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageUrl
                            }
                        }
                    ]
                }
            ],
            max_tokens: 2000,
            temperature: 0.7
        };

        // 发送请求到 OpenRouter API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                // OpenRouter 可选头信息（用于排名和统计）
                'HTTP-Referer': process.env.SITE_URL || 'https://imagetoprompt.app',
                'X-Title': 'Image to Prompt Generator'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = await response.text();
            }
            console.error('API Error:', errorData);
            
            // 提取错误信息
            const errorMessage = errorData?.message || errorData?.error || (typeof errorData === 'string' ? errorData : 'Failed to generate prompt');
            
            return res.status(response.status).json({ 
                success: false,
                error: errorMessage,
                details: errorData 
            });
        }

        const data = await response.json();
        const prompt = data.choices?.[0]?.message?.content || '';

        // 返回与前端期望的格式一致的响应
        return res.status(200).json({ 
            success: true,
            prompt: prompt 
        });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ 
            success: false,
            error: error.message || 'Internal server error' 
        });
    }
}

