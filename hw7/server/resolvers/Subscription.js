const Subscription = {
    messages: {
        async subscribe( parent, args, { Message, pubsub }, info) {
            let messages
            
            if (!args.query) {
                messages = await Message.find().sort({ _id: 1 })
                if (!messages) {
                    throw new Error('Post not found')
                }
                return pubsub.asyncIterator(`messages`)
            }
            else {
                messages = await Message.find({name: args.query}).sort({ _id: 1 })
                if (!messages) {
                    throw new Error('Post not found')
                }
                return pubsub.asyncIterator([`messages ${args.query}`,`messages`])
            }

        }
    }
}

module.exports = Subscription