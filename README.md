# Dugsi Hub LMS 🎓

Dugsi Hub is a modern, feature-rich Learning Management System (LMS) designed to provide a premium educational experience. Built with Next.js, Prisma, and Stripe, it offers a seamless platform for students and administrators.

## 🚀 Features

### for Students
- **Interactive Dashboard**: Track progress, view daily streaks, and access enrolled courses.
- **My Learning**: A dedicated space to manage active courses and pick up where you left off.
- **Certification System**:
  - Earn automatic digital certificates upon course completion.
  - **Verify**: Public verification link for every certificate.
  - **Download/Print**: High-quality A4 PDF export for your credentials.
  - **Hall of Fame**: Showcase all earned badges and certificates.
- **Modern Player**: Video player with progress tracking and chapter navigation.

### for SuperAdmins
- **Admin Dashboard**: Comprehensive overview of platform content and users.
- **Certificate Management**:
  - Track student completion rates.
  - Issue certificates manually or automatically.
  - View "Ready to Award" candidates.
- **Course Management**: Create, edit, and publish courses with drag-and-drop curriculum builder.
- **Analytics**: Sales performance and user engagement insights.

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Prisma ORM)
- **Auth**: Clerk
- **Payments**: Stripe
- **File Uploads**: UploadThing

## 🏁 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Environment**:
    Create a `.env` file with your Clerk, Prisma, Stripe, and UploadThing keys.

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open the App**:
    Visit [http://localhost:3000](http://localhost:3000)

## 📜 License

© 2026 Dugsi Hub. All rights reserved.
