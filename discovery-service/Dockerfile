# Use Maven base image for building the application (Maven pre-installed)
FROM maven:3.9.4-eclipse-temurin-21 AS build

# Set working directory for the build process
WORKDIR /app

# Copy pom.xml to the container
COPY pom.xml .

# Copy source code
COPY src ./src

# Download dependencies (to optimize caching)
RUN mvn dependency:go-offline -B

# Package the application into a JAR file
RUN mvn clean package -DskipTests

# Use OpenJDK base image for runtime
FROM openjdk:21-jdk-slim

# Install bash and curl
RUN apt-get update && apt-get install -y bash curl

# Set working directory for runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/discovery-service-0.0.1-SNAPSHOT.jar /app/discovery-service.jar

# Expose the port the service runs on
EXPOSE 8761

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "/app/discovery-service.jar"]
