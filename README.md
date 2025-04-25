# Portfolio Website

A professional portfolio website for an IT student, built with Django.

## Features
- Home, About, Projects, Blog, and Contact pages
- Admin management for skills, projects, and blog posts
- Responsive design using Bootstrap
- Contact form (with email logic ready)
- Static and media file support

## Setup
1. Clone/download this repository.
2. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```
6. Start the development server:
   ```
   python manage.py runserver
   ```
7. Access the site at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Customization
- Edit templates in `templates/` for your own content and style.
- Add your profile image to `static/images/profile.jpg`.
- Add your resume as `static/resume.pdf`.

## Admin
- Manage skills, projects, and blog posts at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---
MIT License
