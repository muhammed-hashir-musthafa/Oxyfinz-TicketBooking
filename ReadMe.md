# Oxyfinz Events - Event Management Platform 

A modern, full-stack event management platform built with Next.js, Express.js, and MongoDB. Discover, create, and manage events with ease.

## 🚀 Features

### User Features
- **Event Discovery**: Browse and search events with advanced filtering
- **User Authentication**: Secure registration and login system
- **Event Registration**: Register/unregister for events with capacity management
- **Personal Dashboard**: Manage registered events and created events
- **Profile Management**: Update user profile and preferences

### Admin Features
- **Event Management**: Full CRUD operations for events
- **User Management**: View and manage all users
- **Analytics Dashboard**: Event statistics and user insights
- **Role-based Access Control**: Admin and user role separation

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Dynamic event capacity and registration status
- **Input Validation**: Comprehensive form validation with Formik + Yup
- **Error Handling**: Standardized error responses and user feedback
- **Type Safety**: Full TypeScript implementation
- **API Documentation**: RESTful API with consistent response format

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Forms**: Formik + Yup validation
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: bcryptjs for password hashing
- **CORS**: Cross-origin resource sharing enabled

### DevOps & Tools
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Development**: ts-node-dev for hot reloading

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/muhammed-hashir-musthafa/oxyfinz-events.git
cd oxyfinz-events
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/oxyfinz
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create `.env.local` file in client directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📁 Project Structure

```
oxyfinz-events/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   ├── services/      # API service functions
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express.js Backend
│   ├── src/
│   │   ├── config/        # Database and app configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Utility functions
│   │   └── validations/   # Input validation rules
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Events
- `GET /api/events` - Get all events (with pagination)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (authenticated)
- `PUT /api/events/:id` - Update event (owner/admin)
- `DELETE /api/events/:id` - Delete event (owner/admin)
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/register` - Unregister from event
- `GET /api/events/user/my-events` - Get user's created events
- `GET /api/events/user/registered` - Get user's registered events

### Admin
- `GET /api/events/admin/users` - Get all users (admin only)

## 🚀 Deployment

 
### Build Commands
```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 🙏 Acknowledgments

- Next.js team for the amazing React framework
- Express.js community for the robust backend framework
- MongoDB team for the flexible database solution
- Tailwind CSS for the utility-first CSS framework

---

**Made with ❤️ by the Oxyfinz Team**
