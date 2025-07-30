# 🚀 Nexus PM - Modern Project Management System

A comprehensive full-stack project management platform built with Spring Boot and Next.js, featuring real-time collaboration, kanban boards, and advanced project tracking capabilities.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)

---

## 🏗️ Architecture Overview

**Frontend**: Next.js 15 with TypeScript, TailwindCSS, and shadcn/ui components  
**Backend**: Spring Boot 3.5.3 with RESTful APIs and JPA/Hibernate  
**Database**: H2 (Development) / PostgreSQL (Production)  
**Authentication**: Simplified authentication with direct dashboard access  
**Real-time**: WebSocket support for live updates  

---

## ✨ Core Features

### 📋 Project Management
- **Multi-Project Support**: Create and manage multiple projects
- **Issue Tracking**: Create, assign, and track issues with custom statuses
- **Sprint Management**: Plan and execute agile sprints
- **Kanban Boards**: Drag-and-drop task management with real-time updates
- **Team Collaboration**: Member management with role-based permissions

### 🎯 Advanced Capabilities
- **Real-time Updates**: Live synchronization across all connected clients
- **Activity Tracking**: Comprehensive audit trail for all project activities
- **File Attachments**: Upload and manage project-related documents
- **Notifications**: Smart notification system for project updates
- **Labels & Categories**: Organize issues with custom labels and categories

### 🔐 Security & Access
- **Simplified Authentication**: Easy access with bypass for development
- **CORS Configuration**: Secure cross-origin resource sharing
- **Role-based Structure**: Admin, Manager, and Member roles framework

### 📊 Dashboard & Analytics
- **Project Overview**: Real-time project statistics and progress
- **Sprint Progress**: Visual sprint burndown and velocity charts
- **Activity Timeline**: Recent activities and project updates
- **Quick Actions**: Fast access to common project operations

---

## 🛠️ Technology Stack

### Backend (Spring Boot)
```
├── Spring Boot 3.5.3
├── Spring Security 6.5.1 (Simplified)
├── Spring Data JPA
├── H2 Database (Dev)
├── PostgreSQL (Prod)
├── Maven Build System
└── Spring Boot Actuator
```

### Frontend (Next.js)
```
├── Next.js 15.1.0
├── TypeScript 5.0
├── TailwindCSS 3.4.1
├── shadcn/ui Components
├── Radix UI Primitives
├── React Hook Form
├── Zustand State Management
└── Lucide React Icons
```

### Development Tools
```
├── Spring Boot DevTools
├── Next.js Hot Reload
├── ESLint & Prettier
├── TypeScript Compiler
├── PostCSS & Autoprefixer
└── Component Documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (for Spring Boot backend)
- **Node.js 18+** (for Next.js frontend)
- **Maven 3.6+** (for dependency management)
- **Git** (for version control)

### Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd "nexus-pm-backend"

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Backend will start on http://localhost:8080/api
# H2 Console: http://localhost:8080/api/h2-console
```

### Frontend Setup (Next.js)

```bash
# Navigate to project root (where package.json is located)
cd "Nexus PM"

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Frontend will start on http://localhost:3000
```

### Quick Access
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/api/h2-console
- **Health Check**: http://localhost:8080/api/actuator/health

### Database Configuration

**Development (H2 - Default)**
```yaml
# H2 console available at: http://localhost:8080/api/h2-console
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: 
```

**Production (PostgreSQL)**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/nexuspm
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

---

## 📁 Project Structure

```
Nexus PM/
├── nexus-pm-backend/          # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/nexuspm/nexus_pm_backend/
│   │       ├── controller/    # REST API Controllers
│   │       ├── service/       # Business Logic Services
│   │       ├── repository/    # Data Access Layer
│   │       ├── model/         # JPA Entities
│   │       ├── dto/           # Data Transfer Objects
│   │       ├── config/        # Configuration Classes
│   │       └── security/      # Security Components
│   ├── src/main/resources/
│   │   ├── application.yml    # App Configuration
│   │   └── static/           # Static Resources
│   └── pom.xml               # Maven Dependencies
│
├── app/                      # Next.js Application
│   ├── (auth)/              # Authentication Pages
│   ├── dashboard/           # Dashboard Pages
│   ├── profile/             # User Profile
│   ├── globals.css          # Global Styles
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Landing Page
│
├── components/              # React Components
│   ├── auth/               # Authentication Components
│   ├── board/              # Kanban Board Components
│   ├── dashboard/          # Dashboard Components
│   ├── issues/             # Issue Management
│   ├── layout/             # Layout Components
│   ├── profile/            # Profile Components
│   ├── providers/          # Context Providers
│   └── ui/                 # UI Components (shadcn)
│
├── hooks/                  # Custom React Hooks
├── lib/                    # Utility Libraries
├── styles/                 # Additional Styles
├── types/                  # TypeScript Definitions
└── public/                 # Static Assets
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the root directory:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Database (Production)
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password

# Application Settings
NODE_ENV=development
```

### Backend Configuration

Key configuration files:
- `application.yml` - Main application configuration
- `SecurityConfig.java` - Simplified security setup
- Database auto-configuration with H2

---

## 🔗 API Endpoints

### Health & Monitoring
```
GET    /api/actuator/health     # Application health status
GET    /api/actuator/info       # Application information
GET    /api/actuator/metrics    # Application metrics
```

### Projects (Future Implementation)
```
GET    /api/projects            # List all projects
POST   /api/projects            # Create new project
GET    /api/projects/{id}       # Get project details
PUT    /api/projects/{id}       # Update project
DELETE /api/projects/{id}       # Delete project
```

### Issues (Future Implementation)
```
GET    /api/issues              # List issues
POST   /api/issues              # Create issue
GET    /api/issues/{id}         # Get issue details
PUT    /api/issues/{id}         # Update issue
DELETE /api/issues/{id}         # Delete issue
```

---

## 🧪 Testing

### Backend Testing
```bash
cd nexus-pm-backend
mvn test                        # Run all tests
mvn test -Dtest=ClassName       # Run specific test class
mvn spring-boot:run             # Start application
```

### Frontend Testing
```bash
npm run test                    # Run Jest tests
npm run test:watch              # Run tests in watch mode
npm run test:coverage           # Generate coverage report
npm run lint                    # Run ESLint
```

---

## 🚢 Deployment

### Backend Deployment
```bash
# Build production JAR
mvn clean package -DskipTests

# Run production build
java -jar target/nexus-pm-backend-0.0.1-SNAPSHOT.jar

# Or with specific profile
java -jar target/nexus-pm-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel --prod

# Or deploy to Netlify
npm run build && netlify deploy --prod --dir=.next
```

---

## 🚀 Features in Development

### Current Status
- ✅ Spring Boot backend setup
- ✅ Next.js frontend setup  
- ✅ Database configuration (H2)
- ✅ Basic security configuration
- ✅ Component structure
- ✅ Authentication bypass for development

### Upcoming Features
- 🔄 Project management endpoints
- 🔄 Issue tracking system
- 🔄 Kanban board implementation
- 🔄 Real-time WebSocket integration
- 🔄 User management system
- 🔄 Sprint planning tools

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow Java coding standards for backend
- Use TypeScript strictly for frontend
- Write meaningful commit messages
- Add tests for new features
- Update documentation for API changes

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Check Java version
java --version

# Clean and rebuild
mvn clean install

# Check port availability
netstat -an | findstr :8080
```

**Frontend won't start**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
```

**Database connection issues**
- Verify H2 console access at `/h2-console`
- Check `application.yml` database configuration
- Ensure no port conflicts on 8080

---

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Spring Boot** - Powerful Java framework
- **Next.js** - React production framework
- **shadcn/ui** - Beautiful UI components
- **TailwindCSS** - Utility-first CSS framework
- **H2 Database** - Fast in-memory database for development

---

## 📞 Support

For support, create an issue in this repository or contact the development team.

---

**Built with ❤️ using Spring Boot and Next.js**

- **Frontend**: React.js, TailwindCSS / Material UI, React Router, Redux / Context API  
- **Backend**: Node.js, Express.js, Socket.io, JWT Auth, REST API  
- **Database**: MongoDB with aggregation pipelines  
- **Real-time**: WebSockets via Socket.io  

---

## ✨ Key Features

### 🧩 Issue & Task Management
- Create & manage Projects → Epics → Tasks → Subtasks  
- Custom statuses, labels, priority, attachments  
- Relationships: blockers, dependencies  

### 🧠 Workflow & Boards
- Kanban & Scrum Boards (Sprint / Backlog / WIP Limits)  
- Drag-and-drop Custom Workflow Builder  
- Swimlanes (Assignee, Epic, Priority)  
- Condition-based transitions & automation  

### 💬 Real-Time Team Collaboration
- Live editing of task details and descriptions  
- Presence indicators (see who’s online)  
- Typing indicators, comment syncing, live @mentions  
- Real-time drag & drop with instant board updates  
- Smart conflict resolution  

### 🧮 Reports & Dashboards
- Sprint Burndown/Burnup, Velocity, Control Charts  
- Time tracking reports  
- Custom Dashboards with widgets  

### 🛎️ Notifications System
- Email and in-app notifications  
- Watchers and followers per task  
- Mention alerts  

### 🔐 Authentication & Roles
- JWT auth with role-based access (Admin, Manager, Member)  

### 📅 Project Planning
- Backlog grooming, epic grouping, release tagging  
- Calendar & Gantt-style timeline view  

---

## 📦 Bonus Features
- Dark/Light mode toggle  
- Global search (tasks, users, projects)  
- Export to CSV/PDF  
- Project templates  
- Admin Panel  

---

## 🧑‍💻 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/jira-clone.git
cd jira-clone

# Install backend
cd server
npm install
npm run dev

# Install frontend
cd ../client
npm install
npm start
