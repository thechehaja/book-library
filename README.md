# Angular Book Library Single Page Application

## Overview
This is a book library application built with Angular for the frontend and .NET Core for the backend. The application allows users to view a list of books, like/unlike books, and add comments to each book.

## Features
- Display a list of books with pagination.
- Like/Unlike functionality for each book.
- Add and display comments for each book.

## Technologies Used
- **Frontend:** Angular, Angular Material, RxJS
- **Backend:** .NET Core, Entity Framework Core
- **Database:** SQL Server

## Getting Started

### Prerequisites
- Node.js
- Angular CLI
- .NET Core SDK
- SQL Server

### Setting Up the Backend
1. Clone the repository:
    ```sh
    git clone https://github.com/thechehaja/book-library.git
    ```

2. Navigate to the backend project directory:
    ```sh
    cd backend/bookLibraryBackend
    ```

3. Update the `appsettings.json` with your SQL Server connection string.

4. Run database migrations:
    ```sh
    dotnet ef database update
    ```

5. Run the backend server:
    ```sh
    dotnet run
    ```

### Setting Up the Frontend
1. Navigate to the frontend project directory:
    ```sh
    cd frontend/
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the Angular development server:
    ```sh
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200`.

## Usage
- The main page displays a paginated list of books.
- Click on a book title to open a modal with detailed information and comments.
- Use the like/unlike button to like or unlike a book.
- Add comments in the modal. Comments are displayed in the modal.

## Project Structure

### Backend (ASP.NET Core)
- **Controllers:** Handle HTTP requests and responses.
- **Models:** Define the data structure for books and comments.
- **Data:** Context and configurations for Entity Framework Core.

### Frontend (Angular)
- **Components:** 
  - `BookListComponent` - Displays the list of books with pagination.
  - `BookItemComponent` - Represents a single book item with like/unlike functionality.
  - `BookModalComponent` - Displays book details and comments in a modal.
  - `SearchComponent` - Provides search functionality for the book list.
- **Services:** 
  - `BookService` - Handles HTTP requests for books and comments.
- **Models:** 
  - `Book` - Defines the book data structure.
  - `Comment` - Defines the comment data structure.

## API Endpoints

### Books
- `GET /api/books` - Retrieve a list of books with pagination.
- `PUT /api/books/{id}/like` - Update the like status of a book.

### Comments
- `GET /api/books/{id}/comments` - Retrieve comments for a specific book.
- `POST /api/books/{id}/comments` - Add a comment to a specific book.

## License
This project is licensed under the MIT License.
