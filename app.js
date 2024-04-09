const { ApolloServer, gql } = require('apollo-server')

const books = [
    {
      id: 1,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: 2,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
]; 

const typeDefs = gql`

    type Book {
        id: ID!
        title: String!
        author: String
    }

    type Query {
        books: [Book],
        book(id: ID!): Book
    }

    type Mutation {
        addBook(title: String, author: String): Book
    }

`



const resolvers = {
    Query: {
        books: () => books,
        book: (_,{id}) => books.find(book => book.id == id)
    },

    Mutation: {
        addBook: (_,{title, author}) => {
            const book = {
                title : title,
                author : author,
                id : books.length + 1
            }
            books.push(book)
            return book
        }
    }

}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true })

const PORT = process.env.PORT || 8080 

server.listen(PORT).then(({url}) => {
    console.log(`Server is running at ${url}`)
})