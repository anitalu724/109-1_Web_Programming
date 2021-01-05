const Mutation = {
    // async createUser(parent, args, { Message }, info) {
    //     const newUser = { name: args.data.name, body: "" }
    //     Message.create(newUser)
    //     return await newUser;
    // },

    async createMessage(parent, args, { Message, pubsub }, info) { 
        const newMessage = { name: args.data.name, body: args.data.body };
        Message.create(newMessage);
        pubsub.publish(`messages ${args.data.name}`, {
            messages: {
                mutation: 'CREATED',
                data: [args.data]
            }
        })
        return await newMessage;
    },

    async deleteUser(parent, args, { Message, pubsub }, info) {
        const delUser = await Message.find({ name: args.data });
        if (delUser === -1) throw new Error('User not found')
        else {
            pubsub.publish(`messages`, {
                messages: {
                    mutation: 'DELETED',
                    data: delUser
                }
            })
            Message.deleteMany({ name: args.data }).then(result=>console.log(`Deleted data of ${result}`))
            .catch(err=> console.error(`Deletion failed with error: ${err}`))
            
            return delUser;
        }
    }

}
module.exports = Mutation;