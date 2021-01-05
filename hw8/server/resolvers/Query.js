const Query = {
    
    async post(parent, args, { Message }, info) {
        const me = await Message.find();
        if (!args.query) return me;
        else { 
            // console.log(Message.schema.paths.name)
            const result = me.filter(m => {
                return m.sender === args.query || m.receiver === args.query
            });
            return result;
        }
  },

}
module.exports = Query;