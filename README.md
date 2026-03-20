# 📋 InvoiceFlow - Professional Invoice Generator

A modern, professional invoice generation application built with React and Vite. Create, manage, and export beautiful PDF invoices in seconds with an intuitive interface and powerful features.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version: 1.0.0](https://img.shields.io/badge/Version-1.0.0-green.svg)
![React: 19.2.4](https://img.shields.io/badge/React-19.2.4-blue.svg)
![Vite: 8.x](https://img.shields.io/badge/Vite-8.x-purple.svg)

---

## 🌟 Features

### ✨ Core Functionality
- **Create Professional Invoices** - Intuitive multi-step form with real-time calculations
- **Invoice Management** - View, organize, and manage all your invoices in one place
- **PDF Export** - Generate professionally formatted PDF files with a single click
- **Client Tracking** - Store and manage client information for quick invoice creation
- **Business Details** - Customize your business name, email, and address on invoices
- **Multi-Currency Support** - Create invoices in USD, EUR, INR, and GBP
- **Tax Calculation** - Configurable tax rates with automatic calculations
- **Local Storage Persistence** - All data saved automatically to your browser

### 🎨 UI/UX Excellence
- **Dark & Light Mode** - Professional theme toggle with system preference detection
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Professional Styling** - Modern SaaS-inspired design with Tailwind CSS
- **Smooth Animations** - Beautiful transitions and micro-interactions throughout
- **Accessibility** - WCAG compliant with proper contrast ratios and semantic HTML

### 💅 User Experience
- **Real-time Summary** - Invoice total updates instantly as you type
- **Line Items Management** - Add/remove invoice items dynamically
- **Professional Templates** - Print-ready invoice design
- **Smart Defaults** - Auto-populated fields for faster invoice creation
- **Form Validation** - Clear feedback on required fields

---

## 📋 Project Structure

```
Invoice Generator/
├── src/
│   ├── pages/
│   │   ├── DashboardPage.jsx          # Landing page with features & getting started
│   │   ├── InvoiceFormPage.jsx        # Multi-section invoice creation form
│   │   ├── InvoicesPage.jsx           # Invoice list & management table
│   │   └── InvoiceViewPage.jsx        # Invoice detail & PDF preview
│   ├── context/
│   │   ├── InvoiceContext.jsx         # Global invoice state & CRUD operations
│   │   └── ThemeContext.jsx           # Dark/light mode theme management
│   ├── utils/
│   │   └── invoicePdf.js              # jsPDF invoice formatting & export
│   ├── App.jsx                        # Main router & layout component
│   ├── main.jsx                       # React entry point
│   ├── index.css                      # Global styles & theme variables
│   └── assets/                        # Static assets (images, fonts)
├── public/
│   ├── logo.png                       # Application logo
│   └── index.html                     # HTML template
├── vite.config.js                     # Vite build configuration
├── package.json                       # Project dependencies
├── eslint.config.js                   # ESLint rules
└── README.md                          # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Invoice Generator"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 💻 Usage Guide

### Creating Your First Invoice

1. **Navigate to Create Invoice**
   - Click "Create Invoice" button on the dashboard
   - Or use the navigation menu

2. **Fill Invoice Details**
   - Enter invoice number (e.g., INV-2024-001)
   - Set due date for payment
   - Select currency and tax rate

3. **Add Your Business Information**
   - Enter business name
   - Add business email and address
   - This information appears on all invoices

4. **Add Client Details**
   - Enter client name (required)
   - Add client email and address
   - These are saved for future invoices

5. **Add Line Items**
   - Click "Add Item" to add products/services
   - Enter description, quantity, and rate
   - Remove items with the ✕ button (keep at least one)

6. **Add Notes (Optional)**
   - Include payment terms
   - Add special instructions
   - Include thank you message

7. **Review & Generate**
   - Check the summary sidebar for total amount
   - Click "Generate Invoice" to create

### Managing Invoices

1. **View All Invoices**
   - Click "Invoices" in navigation
   - See table with all created invoices
   - Sort by date, client, or amount

2. **View Invoice Details**
   - Click the "View" button next to any invoice
   - See full invoice preview
   - Review all details before download

3. **Download as PDF**
   - Click "Download PDF" button
   - Professionally formatted PDF saves to your device
   - Ready to send to clients

4. **Create Similar Invoice**
   - Click "Create Another" on invoice detail page
   - Returns to form for new invoice

---

## 🛠️ Technology Stack

### Frontend Framework & Build
- **React 19.2.4** - Modern UI library with hooks
- **Vite 8.x** - Lightning-fast build tool with HMR
- **React Router DOM** - Client-side routing for SPA

### Styling & Design
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom CSS** - Animations, themes, and advanced styling
- **@tailwindcss/vite** - Vite plugin for Tailwind optimization

### Data & Export
- **jsPDF 2.5.x** - PDF generation library
- **LocalStorage API** - Browser-based data persistence

### Development Tools
- **ESLint** - Code quality and consistency
- **Vite Dev Server** - Hot module replacement (HMR)

---

## 🎨 Theme & Styling

### Color Palette

**Light Mode:**
- Primary: Blue-600 (#3b82f6)
- Background: White (#ffffff)
- Text: Slate-900 (#0f172a)
- Accent: Indigo-600 (#4f46e5)

**Dark Mode:**
- Primary: Blue-400 (#60a5fa)
- Background: Slate-900 (#0f172a)
- Text: Slate-100 (#f1f5f9)
- Accent: Indigo-400 (#818cf8)

### Typography
- **Font Family:** Inter, -apple-system, BlinkMacSystemFont
- **Headings:** Bold, #0f172a (light) / #f1f5f9 (dark)
- **Body Text:** Regular, #334155 (light) / #cbd5e1 (dark)

### Animations
- `fade-in-up` - Smooth entrance animation
- `bounce-in` - Playful element appearance
- `float` - Subtle floating motion
- `scale-in` - Growing scale effect
- `glow-border` - Pulsing border glow

---

## 🎯 Key Pages

### 📊 Dashboard (`/`)
- **Purpose:** Landing page and introduction
- **Features:**
  - Hero section with value proposition
  - Feature highlights with icons
  - Getting started guide (3-step process)
  - Call-to-action buttons
  - Professional design with animations

### ✍️ Create Invoice (`/invoice/new`)
- **Purpose:** Invoice creation and form handling
- **Sections:**
  - Invoice Details (number, date, currency, tax)
  - Business Information
  - Client Information
  - Line Items Management
  - Notes & Terms
  - Real-time Summary Sidebar
- **Features:**
  - Dynamic form validation
  - Real-time calculations
  - Add/remove line items
  - Multi-currency support
  - Form descriptions for guidance

### 📋 Invoices List (`/invoices`)
- **Purpose:** Invoice management and overview
- **Features:**
  - Responsive data table
  - View invoice button
  - Download PDF button
  - Invoice number, client, date, amount
  - Empty state with CTA
  - Hover effects and animations

### 👁️ Invoice View (`/invoices/:invoiceId`)
- **Purpose:** Invoice detail and preview
- **Features:**
  - Full invoice preview
  - Sender and recipient information
  - Issue and due dates
  - Line items table
  - Subtotal, tax, and total calculation
  - Notes section
  - Download PDF button
  - Create another invoice button

---

## 📊 State Management

### InvoiceContext
Manages all invoice-related state:
```javascript
- invoices[]              // Array of all invoices
- createInvoice()        // Create new invoice
- getInvoiceById()       // Retrieve single invoice
- downloadById()         // Generate and download PDF
- localStorage sync      // Auto-persist data
```

### ThemeContext
Manages theme switching:
```javascript
- theme                  // Current theme ('light' or 'dark')
- toggleTheme()         // Switch between themes
- localStorage sync     // Remember user preference
```

---

## 🎁 Features in Detail

### PDF Export
- Professional formatting with jsPDF
- Company and client information blocks
- Itemized line-item table
- Subtotal, tax, and total calculations
- Notes section
- Print-ready layout

### Form Validation
- Required field checks
- Email format validation
- Number validation for quantities and prices
- Helpful error messages

### Local Data Persistence
- Invoice data saved to localStorage
- Theme preference remembered across sessions
- No server required - works offline
- Automatic data synchronization

### Responsive Breakpoints
- **Mobile** (320px): Single column, optimized touch targets
- **Tablet** (768px): 2-column layout where applicable
- **Desktop** (1024px+): Full multi-column layouts

---

## 🔧 Configuration

### Currency Options
- USD - US Dollar
- EUR - Euro
- INR - Indian Rupee
- GBP - British Pound

### Tax Rate
- Configurable per invoice
- Default: 10%
- Supports decimal values (e.g., 5.5%)

### Default Invoice Note
```
"Thank you for your business."
```
Customizable in InvoiceFormPage.jsx

---

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-router-dom": "latest",
  "jspdf": "^2.5.x"
}
```

**Dev Dependencies:**
- Vite
- Tailwind CSS v4
- ESLint
- @vitejs/plugin-react

---

## 🎓 Learning Resources

### Tailwind CSS
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Utility Classes Guide](https://tailwindcss.com/docs/utility-first)

### React & Vite
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)

### jsPDF
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

---

## 💡 Tips & Best Practices

### For Users
- Use descriptive invoice numbers for easy tracking
- Set clear due dates to encourage faster payments
- Include payment terms in notes section
- Regularly download and backup invoice PDFs
- Use consistent business information

### For Developers
- All state is client-side (localStorage)
- Theme is CSS class-based on `<html>` element
- Pages are route-based with React Router
- Styling uses Tailwind utility classes
- Context API for global state management

---

## 🐛 Troubleshooting

### Data Not Saving
- Check if localStorage is enabled in your browser
- Clear browser cache if experiencing issues
- Check browser console for errors

### PDF Download Issues
- Ensure pop-ups are not blocked
- Try a different browser if issues persist
- Check file size isn't exceeding limits

### Theme Not Switching
- Clear browser cache and localStorage
- Refresh the page after toggling theme
- Check browser console for errors

### Form Validation Issues
- Ensure all required fields are filled (marked with *)
- Check email format is correct
- Verify currency selection is valid

---

## 📈 Future Enhancements

Potential features for future versions:
- Invoice templates and customization
- Recurring invoices
- Payment tracking
- Client portal
- Email integration
- Multi-language support
- Cloud sync capability
- Advanced reporting

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Check the troubleshooting section above
- Review the project structure documentation
- Consult the technology stack guides

---

## ✨ Acknowledgments

- React and Vite communities for excellent tools
- Tailwind CSS for utility-first CSS framework
- jsPDF for PDF generation capabilities
- All contributors and users

---

**Happy Invoicing! 🎉**

Last Updated: March 20, 2026  
Version: 1.0.0
