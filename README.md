# E-commerce Application

This is a full-stack e-commerce application for selling kitchen utensils.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Deployment:** Docker, Nginx

## Getting Started

1. Clone the repository
2. Create a `.env` file in the `backend` directory with the following variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `FRONTEND_URL`
3. Run `docker-compose up --build`
4. The application will be available at `http://localhost:8080`
