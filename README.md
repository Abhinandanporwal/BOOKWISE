# BookWise 📚

An AI-powered smart library and book management platform built with modern web technologies. BookWise combines intelligent search, conversational querying, and personalized book organization into a seamless user experience.

---

## 🚀 Features

### 📖 Smart Book Management
- Add, update, and manage books
- Categorize books efficiently
- Track reading status
- Advanced filtering and sorting

### 🤖 AI-Powered Chat Interface
- Ask questions in natural language
- AI converts prompts into database queries
- Human-readable responses using Gemini AI

### 🔍 Intelligent Search & Filtering
- Search books instantly
- Filter by:
  - Category
  - Reading Status
  - Author
  - Date
- Multiple sorting options

### 👤 Personalized Experience
- User authentication
- User-specific book data
- Personalized recommendations and queries

### 🎨 Modern UI/UX
- Responsive design
- Smooth animations
- Clean and intuitive interface
- Optimized user experience

---

# 🛠️ Tech Stack

## Frontend
- React
- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI

## Backend & Database
- Prisma
- Supabase

## AI Integration
- Google Gemini Flash 1.5

## Authentication
- Clerk Authentication

---

# 🧠 How It Works

1. User enters a query in natural language

### Example:
```bash
Show me all completed fiction books added this month
```

2. Gemini AI processes the query

3. AI generates optimized Prisma queries

4. Database returns relevant data

5. AI converts raw results into human-friendly responses

---

# 📂 Project Structure

```bash
BookWise/
│── app/
│── components/
│── lib/
│── prisma/
│── public/
│── styles/
│── utils/
│── hooks/
│── ai/
│── supabase/
│── package.json
│── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abhinandanporwal/book_wise.git
cd bookwise
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

GEMINI_API_KEY=

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

---

## 4️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

---

## 5️⃣ Run the Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 📸 Screenshots

Add your project screenshots here.

```md
![Home Page](./screenshots/homescreen.png)
![Chat Interface](./screenshots/chatbot.png)
![Dashboard](./screenshots/dashboard.png)
```

---

# 🔥 Future Enhancements

- AI-based book recommendations
- Voice-powered assistant
- Reading analytics dashboard
- Social reading features
- Book sharing system
- OCR-based book entry
- Multi-language support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add your message"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Abhinandan Porwal
- Competitive Programmer
- Web Developer
- UI/UX Designer

---

# 🌟 Acknowledgements

Special thanks to:
- Next.js
- Prisma
- Supabase
- Clerk
- Google Gemini AI
- Tailwind CSS
- ShadCN UI

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

# 📬 Contact

For any queries or collaboration opportunities:

- GitHub: https://github.com/Abhinandanporwal
- LinkedIn: (https://www.linkedin.com/in/abhinandan-porwal-283520298/)
- Email: abhiporwal.ap@gmail.com
----
