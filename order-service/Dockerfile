# Use OpenJDK 21 base image for building the application (Debian-based)
FROM openjdk:21-jdk-slim AS build

# Install Maven and other dependencies
RUN apt-get update && apt-get install -y maven bash curl

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

# Use the same image for the final runtime
FROM openjdk:21-jdk-slim

# Install bash and curl using apt-get
RUN apt-get update && apt-get install -y bash curl

# Set working directory for runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/order-service-0.0.1-SNAPSHOT.jar /app/order-service.jar

# Expose the port the service runs on
EXPOSE 8763

# Copy the wait-for-it script and make it executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Command to run the application when the container starts
ENTRYPOINT ["sh", "-c", "/wait-for-it.sh config-service:8762 -t 60 -- curl -f http://config-service:8762/actuator/health && java -jar /app/order-service.jar"]
