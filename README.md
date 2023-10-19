# DrawGap Back-end(Deco3801)
This is the backend component of the "DrawGap" app, responsible for handling user requests, storing game data, and executing game logic.
# Key Features
User registration without password  
Create and join game rooms  
Users can review all the drawings
# Project Structure
```
├─┬ nhwc_web [springboot_mybatis_demo]  
│    
│ ├── src    
│ ├── main  
│       ├── java  
│             ├── com.example.demo  
│                        ├── control        # Controller layer, handling requests and responses. 
│                        ├── entity         # Entity class, corresponding to MySQL database tables
│                        ├── mapper         # MyBatis Mapper interface
│                        ├── service        # logic layer(not much logic) 
│                        ├── utils          # tools  
│       ├──resources        # Resource directory, such as configuration files and static resources   
│              ├── mapper        # Contain SQL mappings for MyBatis. Each XML corresponds to a Java mapper interface in the application.
│              ├── application.yml        # Primary configuration file for the Spring Boot application.
├── pom.xml           # Contains the basic information of the project, dependencies, plugins, goals, and other configurations
```
# Requirements
```
Apache Maven 3.9.5
```
```
java 1.8
```
# Usage
**1.Clone the Repository**:
```
git clone [repository-url]
```
**2.Navigate to the Project Directory**: 
```
cd springboot_mybatis_demo
```
**3.Install Dependencies**: 
```
mvn install
```
**4.Compile the Project**: 
```
mvn compile
```
**5.Run Tests (Optional)**: 
```
mvn test
```
**6.Package the Application**: 
```
mvn package
```
**7.Run the Application**:
```
Open IntelliJ IDEA  
expand the com.example.demo package
Locate and double-click the DemoApplication class  
From the top toolbar or the context menu of the DemoApplication class file, select "Run" or click the green triangle icon to start the application.
```
**8.Get the port**:
```
Once the application has successfully started, you can access it by visiting http://localhost:[port], where [port] is the port you've set in the application.
```
