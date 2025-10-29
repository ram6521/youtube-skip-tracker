# YouTube Skip Tracker

A Chrome extension that tracks which parts of YouTube videos you skip and provides detailed analytics of your viewing patterns.

## 🚀 Features

✅ **Precise Skip Tracking** - Records every skip with exact timestamps  
✅ **Visual Analytics** - Color-coded display (Green = Forward, Red = Backward)  
✅ **Statistics Dashboard** - Total skips, time skipped, skip types  
✅ **Clean Interface** - Modern, professional design  
✅ **Privacy First** - All data stays local on your device  

## 📦 Installation

### Method 1: Install from Source

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the downloaded folder
6. Done! The extension is now installed

### Method 2: Download ZIP

1. Click the green "Code" button above
2. Select "Download ZIP"
3. Extract the ZIP file
4. Follow steps 2-6 from Method 1

## 🎯 How to Use

1. Go to any YouTube video
2. Watch and skip around as usual
3. Click the extension icon in Chrome toolbar
4. Click "Show Skip Report" to see your analytics

## 💻 Technologies Used

- JavaScript (Vanilla)
- Chrome Extension API (Manifest V3)
- HTML5 & CSS3

## 📁 Project Structure
youtube-skip-tracker/
├── manifest.json # Extension configuration
├── content.js # YouTube page script (tracking logic)
├── popup.html # Extension popup UI
├── popup.js # Popup functionality
├── icon.png # Extension icon
└── README.md # Documentation

## 🎨 Features Explained

### Skip Detection
- Tracks video seeks (jumps in timeline)
- Minimum threshold: 2 seconds
- Records both forward and backward skips

### Data Display
- **Total Skips**: Number of times you skipped
- **Time Skipped**: Total duration skipped
- **Skip Types**: Breakdown of forward vs backward
- **Individual Skips**: Detailed list with timestamps

## 🔮 Future Enhancements

- Export data to CSV
- Skip heatmap visualization
- Multi-video session tracking
- Settings panel for customization

## 🔒 Privacy

All tracking data is stored locally in your browser. No data is sent to external servers.

## 👨‍💻 Author

Developed by **G. Rama purushotham Reddy**  
BTech 3rd Year Student  
Computer Science & Engineering

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the issues page.

## 📞 Contact

- GitHub: [@ram6521](https://github.com/ram6521)
- LinkedIn: ((https://www.linkedin.com/in/rama-purushotham-reddy-g-76557a342/))

---

⭐ If you find this project useful, please give it a star on GitHub!

