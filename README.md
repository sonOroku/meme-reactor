**Meme Reactor**

- Ngozi Enuem-Udogu
- Alec O'Rourke
- Brandon Tiernay
- Randall Crandon

Meme Reactor - Where memes go nuclear.

**Design**

- **API Design:** The backend is powered by FastAPI, providing a robust and efficient framework for building APIs.
- **Data Model:** MongoDB is used as the primary database, ensuring scalability and flexibility.
- **Frontend:** Single-Page Application (SPA) powered by React and Redux in conjunction with Bootstrap, ensuring a seamless user experience.
- **Integrations:** Memes are created by using Imgflip's Third-Party API.

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
    ```bash
    docker volume create mongo-data
    ```
4.  Build the docker containers:
    ```bash
    docker-compose build
    ```
5.  Run the docker services:
    ```bash
    docker-compose up
    ```
6.  Access the FastAPI backend at `http://localhost:8000` and the GHI frontend at `http://localhost:3000`.
7.  Explore the MongoDB data using mongo-express at `http://localhost:8081`.
