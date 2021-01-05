import { gql } from 'apollo-boost';
export default function query(user) { 
    return gql`
        query{
            post(query: "${user}"){
                sender
                receiver
                body
            }
        }
    `
}