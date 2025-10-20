## Demo

Visit the live demo:https://www.imagetoprompt.app/


# Image to Prompt Generator

A free, unlimited AI image to prompt generator that converts images into detailed prompts for Stable Diffusion and Midjourney.

## Features

- 🖼️ **Image Upload**: Support for PNG, JPG, and WEBP formats up to 4MB
- 🌐 **Multi-language Support**: 11 languages including English, Chinese, Spanish, German, French, and more
- 🎯 **AI-Powered Analysis**: Uses THUDM/GLM-4.1V-9B-Thinking model for accurate prompt generation
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🚀 **Fast Processing**: Optimized for quick prompt generation
- 🔒 **Privacy-Focused**: Images are processed temporarily and immediately deleted


## Supported Languages

- 🇺🇸 English
- 🇨🇳 简体中文 (Simplified Chinese)
- 🇹🇼 繁體中文 (Traditional Chinese)
- 🇪🇸 Español (Spanish)
- 🇩🇪 Deutsch (German)
- 🇫🇷 Français (French)
- 🇵🇹 Português (Portuguese)
- 🇸🇦 العربية (Arabic)
- 🇷🇺 Русский (Russian)
- 🇯🇵 日本語 (Japanese)
- 🇰🇷 한국어 (Korean)

## How to Use

1. **Upload an Image**: Either drag and drop an image or paste an image URL
2. **Select Language**: Choose the language for your generated prompt
3. **Generate Prompt**: Click the "Generate Prompt" button
4. **Copy Result**: Copy the generated prompt for use in AI image generators

## API Integration

This application uses the SiliconFlow API with the THUDM/GLM-4.1V-9B-Thinking model for image analysis and prompt generation.

## Deployment

### Vercel Deployment

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project in Vercel
4. Set the following environment variable:
   - `API_KEY`: Your SiliconFlow API key
5. Deploy!

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/image-to-prompt-generator.git
   cd image-to-prompt-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
image-to-prompt-generator/
├── index.html              # Main HTML file
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── languages.js       # Multi-language support
├── assets/
│   └── images/            # Image assets
├── package.json           # Node.js dependencies
├── vercel.json           # Vercel configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Custom styling with CSS variables and animations
- **JavaScript (ES6+)**: Modern JavaScript with classes and async/await
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **SiliconFlow API**: AI model integration for image analysis

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [FAQ section](https://your-vercel-app.vercel.app/#assistance) on the website
2. Open an issue on GitHub
3. Contact us at support@imageprompt.org

## Acknowledgments

- SiliconFlow for providing the AI model API
- Tailwind CSS for the utility-first CSS framework
- All contributors and users who help improve this project

---

**Made with ❤️ for the AI art community**
