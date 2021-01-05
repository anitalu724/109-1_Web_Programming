import { gql } from 'apollo-boost';
export default function subscribe(subscriber) { 
    return gql`
        subscription{
            message(query: "${subscriber}"){
                mutation
                data{
                    sender
                    receiver
                    body
                }
            }
        }
    `
}