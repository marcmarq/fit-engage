# Fit-Engage: Gym CRM Application

Fit-Engage is a comprehensive Gym Customer Relationship Management (CRM) application built using the MERN stack, incorporating Vite, React, Node.js, and Tailwind CSS. This application streamlines gym operations by providing essential functionalities for both administrators and members.

## Features

- **Dashboard**: Offers an overview of gym statistics, including member counts, revenue, and recent activities.
- **Admin Profile**: Allows administrators to manage their profiles, update personal information, and change passwords.
- **Registration**: Enables new members to sign up by providing necessary personal details and membership preferences.
- **Payments**: Facilitates secure processing of membership fees and other payments, with options for various payment methods.
- **View Members**: Allows administrators to view and manage member profiles, including contact information, membership status, and payment history.

## Technologies Used

- **Client**:
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A build tool that provides a fast development environment.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

- **Server**:
  - **Node.js**: A JavaScript runtime environment for server-side development.
  - **Express.js**: A web application framework for Node.js.

- **Database**:
  - **MongoDB**: A NoSQL database for storing application data.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/fit-engage.git
   cd fit-engage
   ```

2. **Install Server Dependencies**:

   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**:

   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**:

   Create a `.env` file in the `server` directory and add the following variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Application**:

   - Start the server:

     ```bash
     cd server
     npm start
     ```

   - Start the client development server:

     ```bash
     cd ../client
     npm run dev
     ```

   The application will be accessible at `http://localhost:3000`.
