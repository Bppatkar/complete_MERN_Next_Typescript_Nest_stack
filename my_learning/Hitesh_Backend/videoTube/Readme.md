# Videotube

## [Modal](https://app.eraser.io/workspace/VItKkuh1QNeX9UpBQ7SF?origin=share)

![idea-to-database](idea-to-database.png)

Welcome to Videotube! This is a YouTube-like platform where users can upload, view, and share videos. The project is built with a React frontend and a backend powered by Node.js and Express (MERN).

## Project Status

This project is currently under development. New features and improvements are being added regularly.

## Features

- **Upload Videos**: Share your videos with the world
- **Watch Videos**: Enjoy videos uploaded by others
- **Like**: Express your opinions on videos
- **Comment**: Engage in discussions with the community
- **Search**: Find videos by keywords
- **Trending**: Discover trending videos
- **Admin Panel**: Manage content and users

## Technologies Used

### Frontend:

- React
- Redux Toolkit
- Tailwind CSS
- React Hook Form

### Backend:

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- Bcrypt (Hashing password)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Bppatkar/complete_MERN_stack/tree/main/my_learning/Hitesh_Backend/videoTube.git
cd videoTube
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in root directory with these variables:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY= your_access_token_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY= your refresh_token_expiry
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

4. Run the backend:

```bash
cd server
npm run dev
```

5. Run the frontend (in new terminal):

```bash
cd client
npm run dev
```
## Contact

For questions or feedback:

- Email: [bhanupratappatkar777@gmail.com](mailto:bhanupratappatkar777@gmail.com)
- GitHub: [Bppatkar](https://github.com/Bppatkar)
