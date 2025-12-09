# 🐟 Aqua-VisionAI: AI-Powered Fish Quality Detection

<div align="center">

![Aqua-VisionAI Banner](https://github.com/rushi-h-s/Aqua-VisionAI/raw/main/assets/GHBanner.png)

**Empowering fishermen with intelligent quality assessment through real-time AI vision**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-API-blue)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)]() 
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](#)

</div>

---

## 🎯 Overview

**Aqua-VisionAI** is an AI-powered web application that enables fishermen and aquaculture professionals to instantly assess fish quality and freshness. Leveraging Google's advanced vision AI (Gemini), the application provides real-time analysis of fish conditions, enabling informed decisions for grading, pricing, and market placement.

### Key Features

✨ **Real-time Fish Quality Analysis** - Powered by Google Gemini Vision API

📱 **Responsive Web Interface** - Seamless experience across all devices

🚀 **Fast & Lightweight** - Built with Vite for instant load times

🔐 **Secure API Integration** - Environment-based configuration for API keys

💡 **User-Friendly Design** - Intuitive interface designed for field use

🌐 **Deployment Ready** - Google AI Studio integration for rapid deployment

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **Google Gemini API Key** (get one from [Google AI Studio](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rushi-h-s/Aqua-VisionAI.git
   cd Aqua-VisionAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Create or update `.env.local` in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

---

## 📊 Tech Stack

| Technology | Purpose | Version |
|-----------|---------|----------|
| **React** | UI Framework | ^18.0 |
| **TypeScript** | Type Safety | ^5.0 |
| **Vite** | Build Tool | ^4.0 |
| **Gemini Vision API** | AI Analysis | Latest |
| **Tailwind CSS** | Styling | ^3.0 |

---

## 🏗️ Project Structure

```
Aqua-VisionAI/
├── src/
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Entry point
│   ├── types.ts          # TypeScript type definitions
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── .env.local            # Environment variables (local)
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

---

## 💻 Usage

### Basic Workflow

1. **Upload Image**
   - Click "Upload Fish Image" or drag-and-drop an image
   - Supports JPEG, PNG, and other common image formats

2. **AI Analysis**
   - The Gemini Vision API analyzes the fish image
   - Assessment typically completes in 2-5 seconds

3. **View Results**
   - Receive detailed quality metrics:
     - Freshness level
     - Physical condition assessment
     - Color and appearance analysis
     - Overall quality grade
     - Market recommendations

4. **Take Action**
   - Use insights for pricing decisions
   - Determine optimal market placement
   - Track quality trends over time

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` with the following:

```env
# Google Gemini API Configuration
VITE_GEMINI_API_KEY=your_api_key_here

# Optional: API endpoint customization
VITE_API_TIMEOUT=30000
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key in your Google Cloud project
4. Copy and paste into `.env.local`

---

## 📱 Deployment

### Deploy to Google AI Studio

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Access Google AI Studio**
   - Visit: https://ai.studio/
   - Upload built files from `dist/` folder
   - Application link: [https://ai.studio/apps/drive/1lEySimGp4sV3YzI-u3CiZMXGHvLVe8dp](https://ai.studio/apps/drive/1lEySimGp4sV3YzI-u3CiZMXGHvLVe8dp)

### Deploy to Vercel / Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel/Netlify**
   - Import repository in Vercel/Netlify dashboard
   - Set environment variables in project settings
   - Auto-deployment on push to main branch

---

## 🧪 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check
```

### Code Quality

- Strict TypeScript mode enabled
- ES6+ module support
- Modular component architecture

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/Aqua-VisionAI.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Maintain code style and TypeScript conventions
   - Add comments for complex logic
   - Test thoroughly before submitting

4. **Commit and push**
   ```bash
   git commit -m 'Add AmazingFeature'
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**
   - Provide clear description of changes
   - Reference any related issues

---

## 🐛 Troubleshooting

### API Key Not Working
- Verify API key is correctly set in `.env.local`
- Check that Gemini API is enabled in your Google Cloud project
- Ensure API key has access to Vision capabilities

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Image Upload Issues
- Ensure image file size < 20MB
- Supported formats: JPEG, PNG, WebP, GIF
- Clear browser cache and try again

---

## 📈 Future Roadmap

- 🎥 **Video Analysis** - Real-time video stream processing
- 📊 **Analytics Dashboard** - Historical quality trends and insights
- 🌍 **Multi-language Support** - Global accessibility
- 📱 **Mobile App** - Native iOS/Android applications
- 🔄 **Batch Processing** - Analyze multiple fish at once
- 🗂️ **Data Management** - Store and compare analysis history
- 🌐 **Marketplace Integration** - Direct connectivity with fish markets
- 🤖 **Custom ML Models** - Fine-tuned models for specific species

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Rushi H S**
- GitHub: [@rushi-h-s](https://github.com/rushi-h-s)
- Portfolio: [Your Portfolio Link]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Google Gemini Team** - For providing powerful vision AI capabilities
- **React & Vite Teams** - For excellent development tools
- **Fishermen & Aquaculture Professionals** - For inspiring this solution
- **Open Source Community** - For invaluable libraries and frameworks

---

## 📞 Support

Having issues? 

- 💬 **GitHub Issues**: [Open an issue](https://github.com/rushi-h-s/Aqua-VisionAI/issues)
- 📧 **Email Support**: your.email@example.com
- 📚 **Documentation**: Check the [Wiki](https://github.com/rushi-h-s/Aqua-VisionAI/wiki)

---

<div align="center">

**Made with ❤️ for sustainable fisheries**

[⭐ Star this repo](https://github.com/rushi-h-s/Aqua-VisionAI) if it helps you!

</div>
