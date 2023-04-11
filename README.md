# spring-react-mysql-test

## 프로젝트 연동 방법
### 1) application.properties 설정
```properties
# 소스 위치: src/main/resources/application.properties

server.port=8080
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# DB Source URL, localhost에 본인의 database url 작성, database에 본인 database 이름 작성
spring.datasource.url=jdbc:mysql://localhost:3306/database?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul

# DB username, 본인 database 접속권한 사용자 계정 이름 입력
spring.datasource.username=root

# DB password, 본인 database 접속권한 사용자 계정 비밀번호 입력
spring.datasource.password=1234

spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.type.descriptor.sql=trace
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

### 2) 프로젝트 시작
- Spring Boot:
  - build.gradle 파일에서 그레이들 업데이트
  - `test-backend/src/main/java/com/example/testweb/TestWebApplication.java` 파일 실행
- React:
  - `test-backend/src/main/test-frontend/`에서 npm install 및 npm start 실행
  - 파일이 없다면 https://github.com/JaeyeoneeJ/test-frontend 에서 깃을 클론하고 해당 폴더를 `test-backend/src/main`에 위치하게 함
