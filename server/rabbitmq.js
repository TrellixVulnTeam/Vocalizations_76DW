amqp.connect('amqps://avwwkdpv:0MQ2QagyNEeJ-NhxNZy0vkp9Gr0xwCK2@codfish.rmq.cloudamqp.com/avwwkdpv', (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        
        channel.assertQueue('hello', {durable: false});

        app.post("/", async (req, res) => {
            const post = req.body;
            channel.sendToQueue('post_created', Buffer.from(JSON.stringify(post)));
              
        });

        process.on('beforeExit', () => {
            console.log('closing connection');
            connection.close();
        });
        
    });

});


mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`)});
        amqp.connect('amqps://avwwkdpv:0MQ2QagyNEeJ-NhxNZy0vkp9Gr0xwCK2@codfish.rmq.cloudamqp.com/avwwkdpv', (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }
                channel.assertQueue('post_created', {durable: false});
                channel.consume('post_created', async (msg) => {
                    const newPost = new PostMessage(JSON.parse(msg.content.toString()));
                    try {
                        await newPost.save();
                    } catch (error) {
                        console.log(error.message);
                    }
                });
            });

            process.on('beforeExit', () => {
                console.log('closing connection');
                connection.close();
            });
        });

    })
    .catch((error) => console.log(`${error.message}`));