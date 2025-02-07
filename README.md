# Webshop Application

A robust and modular Webshop application built with **Spring Boot/Angular**. The application supports various e-commerce functionalities, including user management, category management, address handling, and a hierarchical category structure.

Latest deployed version: https://codecraft-webshop-project.netlify.app/
---

## Features

- **User Management**: Handle user accounts and authentication using JWT security.
- **Category Management**:
    - Support for nested categories with parent-child relationships.
    - Retrieve full category hierarchies or lightweight subcategory lists.
- **Entity Management**:
    - CRUD operations for entities.
- **RESTful APIs**:
    - Exposes well-structured endpoints for integration with frontend or third-party services.
- **Modular Architecture**:
    - Clear separation of concerns between Controllers, Services, Repositories, and DTOs.

---

Technologies Used

    Backend: Spring Boot (Spring Data JPA, Spring Security)
    Frontend: Typescript/Angular
    Database: PostgreSQL docker container
    Dependency Management: Maven
    Java Version: 21

# Webshop API Endpoints

## Endpoints for Categories, Carts, Address, Orders, Products, and Reviews

### Categories
| Method | Endpoint                          | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/categories/{id}`           | Get category by ID             |
| GET    | `/api/categories`                | Get all categories             |
| POST   | `/api/categories`                | Create a new category          |
| PUT    | `/api/categories/{id}`           | Update a category              |
| DELETE | `/api/categories/{id}`           | Delete a category by ID        |
| GET    | `/api/categories/parent/{id}`    | Get subcategories by parent ID |

### Carts
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/api/carts/{userEmail}`         | Get cart by user email              |
| POST   | `/api/carts/{userEmail}`         | Add item to cart                    |
| DELETE | `/api/carts/{userEmail}/{itemId}`| Remove item from cart               |
| DELETE | `/api/carts/{userEmail}`         | Clear the cart                      |

### Address
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/api/addresses/{id}`            | Get address by ID                   |
| GET    | `/api/addresses/user/{email}`    | Get address by user email           |
| POST   | `/api/addresses`                 | Create a new address                |
| PUT    | `/api/addresses/{id}`            | Update an address                   |
| DELETE | `/api/addresses/{id}`            | Delete an address by ID             |
| DELETE | `/api/addresses/user/{email}`    | Delete an address by user email     |

### Orders
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/api/orders/{id}`               | Get order by ID                     |
| GET    | `/api/orders/user/{email}`       | Get orders by user email            |
| POST   | `/api/orders`                    | Create a new order                  |

### Products
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/api/products/{id}`             | Get product by ID                   |
| GET    | `/api/products`                  | Get all products                    |
| POST   | `/api/products`                  | Create a new product                |
| PUT    | `/api/products/{id}`             | Update a product                    |
| DELETE | `/api/products/{id}`             | Delete a product by ID              |

### Reviews
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/api/reviews/{id}`              | Get review by ID                    |
| GET    | `/api/reviews/product/{id}`      | Get reviews for a product           |
| POST   | `/api/reviews`                   | Create a new review                 |
| PUT    | `/api/reviews/{id}`              | Update a review                     |
| DELETE | `/api/reviews/{id}`              | Delete a review by ID               |

---

# Running the Backend Locally

## Steps to Clone and Run the Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nnarciss98/E-commerce-Webshop.git webshop
   cd webshop
   ```

2. **Set Up the Database:**
    - Ensure you have a running instance of a database (e.g., PostgreSQL, MySQL).
      - In Webshop utils you have the necessary docker files to create the container, to do so run this:
          ```bash 
          docker build -t webapp_postgres .
          docker-compose up -d
          ```
    - Update the `application.yml` file with your database credentials.

   Example configuration:
   ```yml
    spring:
        datasource:
            url: jdbc:postgresql://localhost:5432/webshop
            username: user
            password: supersecretpassword
            driver-class-name: org.postgresql.Driver
        jpa:
            database: postgresql
            database-platform: org.hibernate.dialect.PostgreSQLDialect
            hibernate:
                ddl-auto: create-drop
   ```

3. **Build the Project:**
   Make sure you have Maven installed. Then, build the project:
   ```bash
   mvn clean install
   ```

4. **Run the Application:**
   You can run the application using the following command:
   ```bash
   mvn spring-boot:run
   ```
   Alternatively, you can run the generated JAR file:
   ```bash
   java -jar target/webshop-0.0.1-SNAPSHOT.jar
   ```

5. **Access the API:**
    - The API will be available at `http://localhost:8080`.
    - Use tools like Postman or cURL to interact with the endpoints.

