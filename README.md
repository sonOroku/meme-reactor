**Meme Reactor**

Ngozi Enuem-Udogu
Alec O'Rourke
Brandon Tiernay
Randall Crandon

Meme Reactor – Radiate meme energy.
Meme Reactor - A platform for meme enthusiasts.
Meme Reactor - Where memes come to life.

**Design**

- **API Design:** The backend is powered by FastAPI, providing a robust and efficient framework for building APIs.
- **Data Model:** MongoDB is used as the primary database, ensuring scalability and flexibility.
- **Frontend:** GHI (based on the docker-compose file) appears to be a frontend service, potentially built with React.
- **Integrations:** Integrations with various meme-related services and data sources can be listed here.

**Intended Market**
Meme Reactor is designed for meme enthusiasts, content creators, and anyone looking to explore and share meme content. Our platform provides a unique experience tailored to the meme culture, bridging the gap between humor, creativity, and community.

**Functionality**

- **Meme Generation and Customization:** Users can create, customize, and share memes.
- **Database Exploration:** With MongoDB and mongo-express, users can explore and manage meme datasets.
- **Interactive UI:** A dynamic and responsive user interface ensures a seamless experience across devices.
- **Social Integration:** Share memes directly to popular social media platforms.
- (Other functionalities specific to Meme Reactor can be added.)

**Project Initialization**
To fully enjoy this application on your local machine, please make sure to follow these steps:

1.  Clone the repository down to your local machine.
2.  CD into the new project directory.
3.  Create the required docker volumes:
    bash
    ```bash
    docker volume create mongo-data
    ```
4.  Build the docker containers:
    bash
    ```bash
    docker-compose build
    ```
5.  Run the docker services:
    bash
    ```bash
    docker-compose up
    ```
6.  Access the FastAPI backend at `http://localhost:8000` and the GHI frontend at `http://localhost:3000`.
7.  Explore the MongoDB data using mongo-express at `http://localhost:8081`.
