
# graphql-tutorial

A GraphQL tutorial project built in Node.js. This project was started based on a tutorial on YouTube but has been significantly embellished to demonstrate advanced GraphQL capabilities. The purpose of this app is to showcase my ability to create a GraphQL Node.js application.

## Description

This project serves as a demonstration of creating a GraphQL server using Node.js, TypeScript, and Apollo Server. It includes examples of how to define a GraphQL schema, create resolvers, and handle relationships between data entities.

### Live Demo

The live demo will be available soon. (Coming later)

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- TypeScript (v4 or later)

### Steps

1. **Clone the repository:**

```sh
git clone https://github.com/Fast-Dog-Coding/graphql-tutorial.git
cd graphql-tutorial
```

2. **Install dependencies:**

```sh
npm install
```

3. **Compile TypeScript files:**

```sh
npm run compile
```

4. **Start the server:**

```sh
npm start
```

The GraphQL server will be running at `http://localhost:4000`.

### Example Queries

Once the server is running, you can use the following example queries to test the GraphQL API:

- **Get all reviews:**

```graphql
query {
  reviews {
    id
    rating
    content
    author {
      name
    }
    game {
      title
    }
  }
}
```

- **Add a new review:**

```graphql
mutation {
  addReview(input: {
    rating: 10,
    content: "Fantastic game!",
    author_id: "1",
    game_id: "1"
  }) {
    id
    rating
    content
    author {
      name
    }
    game {
      title
    }
  }
}
```

## Credits

- This project is based on the [GraphQL Crash Course](https://youtube.com/playlist?list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y&si=ejU9djFB0fvYKJZB) by NetNinja.
- Additional help and guidance from ChatGPT by OpenAI.

## License

This project is licensed under the ISC License.

## Copyright

Copyright © 2024 Fast Dog Coding
