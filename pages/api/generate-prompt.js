// 从原 api/generate-prompt.js 迁移
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
            instruction = `你是一名专业AI绘画提示词工程师。请严格按以下结构化格式分析图片并生成${promptLanguage} 提示词，无需思考过程，直接输出结果，回复中统一只有一种语言。主体:[描述图片核心对象：人物/动物/物体/场景的具体特征，包括性别、年龄、种族、姿势、动作、表情等]。外观细节:[描述主体的外貌特征、服装款式、发型设计、手持道具、佩戴配饰等具体细节]。环境背景:[说明场景的具体位置与环境特征，如森林深处、未来都市、奇幻空间等；描述光线效果与氛围，如柔光晨雾、霓虹夜景、戏剧性灯光等]。风格质感：[指定艺术风格：写实/赛博朋克/动漫/水彩等；定义色调倾向：冷色调/暖色调/高对比度/单色等]。上面结构中的主体、外观细节、环境背景、风格质感等结构上的词也要用${promptLanguage} 来表达。`;
        } else {
            instruction = `你是一名专业AI绘画提示词工程师。请根据我的描述，直接生成一段高质量、精炼且可直接用于AI文生图的${promptLanguage}提示词。无需思考过程，无需段落标题或编号，只需生成一段连贯的、包含所有必要细节的纯文本提示词。内容必须按以下逻辑顺序组织，并确保包含所有方面：主体核心： 首先描述核心对象（人物、动物、物体等）的外观、动作、表情和服饰。场景氛围： 接着说明环境背景、光线和色彩氛围。风格技术： 最后指定艺术风格、参考艺术家（如适用）。请将所有以上元素无缝衔接为一段流畅的文字。`;
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-v3',
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
                                    url: `data:image/jpeg;base64,${imageBase64}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error:', errorData);
            return res.status(response.status).json({ 
                error: 'Failed to generate prompt',
                details: errorData 
            });
        }

        const data = await response.json();
        const prompt = data.choices?.[0]?.message?.content || '';

        return res.status(200).json({ prompt });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

