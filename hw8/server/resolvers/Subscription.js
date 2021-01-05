const Subscription = {
    message: {
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
                console.log(`message ${args.query}`)
                return pubsub.asyncIterator([`message ${args.query}`])
            }

        }
    }
}

module.exports = Subscription