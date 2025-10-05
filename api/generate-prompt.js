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

        // 从环境变量获取API密钥
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';

        // 根据语言代码获取对应的语言名称
        const getPromptLanguage = (languageCode) => {
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
        };

        const promptLanguage = getPromptLanguage(language);

        // 根据structuredPrompt选择不同的指令
        let instruction;
        if (structuredPrompt === 'yes') {
            instruction = `你是一名专业的AI绘画提示词工程师。请详细分析这张图片，并为我生成一段非常详细、专业的${promptLanguage} AI文生图提示词。
请严格按照以下步骤输出结果：  
1. **主体**：描述图片的主要对象（人物/动物/物体/场景），包括性别、年龄、种族、姿势、动作、表情等。  
2. **外观细节**：描述主体的外貌、服装、发型、道具、配饰等。  
3. **环境/背景**：说明场景位置（如森林、城市、未来科幻、奇幻世界等），光线氛围（晨光、夜晚、霓虹灯、电影感等）。  
4. **风格与质感**：指定艺术风格（写实、赛博朋克、动漫、水彩、油画、摄影风格等）、色调（冷色调、暖色调、高对比度、黑白等）。  
5. **技术参数提示**：可补充常用的 AI 绘图关键词（如 "ultra detailed, 8k, sharp focus, masterpiece, cinematic lighting" 等）。
请直接用${promptLanguage}结构化输出最终提示词，并保证回复语言的单一性，便于我理解。`;
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

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return res.status(200).json({ 
                success: true, 
                prompt: data.choices[0].message.content 
            });
        } else {
            throw new Error('Invalid API response format');
        }

    } catch (error) {
        console.error('Error generating prompt:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error' 
        });
    }
}
