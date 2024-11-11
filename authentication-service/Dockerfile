# Use OpenJDK 21 base image for building the application (Debian-based)
FROM openjdk:21-jdk-slim AS build

# Install Maven and other dependencies (curl, bash)
RUN apt-get update && apt-get install -y maven bash curl

# Set working directory for build
WORKDIR /app

# Copy pom.xml to the container
COPY pom.xml .

# Copy the source code of the application
COPY src ./src

# Download dependencies (this leverages Docker layer caching)
RUN mvn dependency:go-offline -B

# Package the application into a JAR file
RUN mvn clean package -DskipTests

# Use a smaller JRE base image for the final image (Alpine-based for reduced size)
FROM eclipse-temurin:21-alpine

# Install bash and curl (for wait-for-it script)
RUN apk add --no-cache bash curl

# Set working directory for runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/authentication-service-0.0.1-SNAPSHOT.jar /app/authentication-service.jar

# Copy the wait-for-it script for waiting on dependent services (e.g., config-service)
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the port the service runs on
EXPOSE 8767

# Command to run the application when the container starts
ENTRYPOINT ["sh", "-c", "/wait-for-it.sh config-service:8762 -t 90 -- curl -f http://config-service:8762/actuator/health && java -jar /app/authentication-service.jar"]
