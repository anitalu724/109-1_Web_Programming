import { gql } from 'apollo-boost';
export const CREATE_POST_MUTATION = gql`
    mutation createMessage(
        $sender: String!
        $receiver: String!
        $body: String!
    ){
        createMessage(
            data:{
                sender: $sender,
                receiver: $receiver,
                body: $body
            }
        )
        {sender, receiver, body}
    }`