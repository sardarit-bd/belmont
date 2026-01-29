# Belmont

## 🧰 Requirements

Make sure you have the following installed on your system:

* PHP **8.2+**
* Composer
* Node.js **18+**
* npm or yarn
* MySQL / MariaDB (or any supported database)
* Git

---

## 🚀 Local Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sardarit-bd/belmont.git
cd belmont
```

---

### 2. Install PHP Dependencies

```bash
composer install
```

---

### 3. Install Node Dependencies

```bash
npm install
```

---

### 4. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

---

### 5. Configure Database

Open the `.env` file and update your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=belmont
DB_USERNAME=root
DB_PASSWORD=
```

Create the database manually (e.g. `belmont`) before running migrations.

---

### 6. Run Database Migrations

```bash
php artisan migrate
```

---

### 7. Build Frontend Assets

For development:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

---

### 8. Start the Development Server

```bash
php artisan serve
```

The application will be available at:

```
http://127.0.0.1:8000
```

---

## 🧩 Tech Stack

* **Backend:** Laravel 12.x
* **Frontend:** React (Laravel React Starter Kit)
* **Build Tool:** Vite
* **Database:** MySQL
* **Authentication:** Laravel Starter Kit (React)
