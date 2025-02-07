# Use the official PostgreSQL image from the Docker Hub
FROM postgres:latest

# Environment variables to configure PostgreSQL
ENV POSTGRES_DB=webshop
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=supersecretpassword

# Expose the PostgreSQL port
EXPOSE 5432

# Optional: you can include any additional setup or scripts here
# COPY your-script.sql /docker-entrypoint-initdb.d/

# The official image already runs the postgres service, so no CMD is needed

