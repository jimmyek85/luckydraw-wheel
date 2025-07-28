# 1602 Lucky Draw Wheel

A beautiful and interactive lucky draw wheel application for the 1602 booth at Kuching Festival.

## Features

### 🎯 Interactive Prize Wheel
- Beautiful neon-lit spinning wheel with 11 different prizes
- Smooth animations and visual effects
- Exact probability control as specified

### 🏆 Prize Categories & Probabilities
- **Beer Card**: 0% (0/100 people)
- **RM5 Cash Voucher**: 16% (16/100 people)
- **RM10 Online Cash Voucher**: 9% (9/100 people)
- **RM20 Online Cash Voucher**: 6% (6/100 people)
- **330ml Lager Smooth**: 9% (9/100 people)
- **660ml Bottle**: 6% (6/100 people)
- **1602 Pen**: 12% (12/100 people)
- **1602 Cooler Bag**: 12% (12/100 people)
- **1602 Mug**: 0% (0/100 people)
- **Thank You**: 14% (14/100 people)
- **Spin Again**: 16% (16/100 people)

### 🌐 Multi-language Support
- English and Chinese language toggle
- Dynamic content translation

### 📱 Social Sharing
- Facebook sharing integration
- WhatsApp sharing with custom message
- Copy link functionality
- Extra RM2 cash voucher incentive for sharing

### 👨‍💼 Staff Management Panel
- Search customers by phone number
- Add extra spin chances
- View customer records and prize history
- Hidden admin panel for staff use

### 💾 Data Management
- Local storage for offline functionality
- Complete customer data recording
- Prize history tracking
- No external database dependencies

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Storage**: Browser Local Storage
- **Deployment**: Vercel (Static Site)

## Quick Start

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   npm install
   npm run dev
   ```

### Deployment on Vercel
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

## Usage Instructions

### For Customers
1. Click "Enter Lucky Draw" on the landing page
2. Fill in registration form (Name and Phone required)
3. Spin the wheel to win prizes
4. Share on social media for extra RM2 cash voucher

### For Staff
1. Click the gear icon (⚙️) in bottom-left corner
2. Enter customer phone number to search
3. Add extra chances as needed
4. View customer prize history

## File Structure

```
├── index.html          # Main application file
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel deployment configuration
├── firebase.json       # Firebase configuration (legacy)
└── README.md          # This file
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Features

- No sensitive data exposure
- Client-side data storage only
- No external API dependencies
- Safe social sharing links

## Support

For technical support or questions, please contact the 1602 team.

---

**Welcome to Kuching Festival! Visit 1602 booth for amazing prizes!**
