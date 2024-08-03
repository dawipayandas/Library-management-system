
FROM amazoncorretto:21


WORKDIR /app


COPY target/*.jar demo5.jar


EXPOSE 8086


ENTRYPOINT ["java", "-jar", "demo5.jar"]
