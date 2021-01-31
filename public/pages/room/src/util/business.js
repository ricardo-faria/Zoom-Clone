//business rules class 
class Business {
    constructor({ room, media,  view, socketBuilder}) {
        this.room = room
        this.media = media
        this.view = view  
        //use the builder class to do a socket connection
        this.socketBuilder = socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onUserDisconnected())
            .build()

        //emit the join room event
        this.socketBuilder.emit('join-room', this.room, 'teste01')

        this.currentStream = { }
    }

    static initialize (deps) {
        const instance = new Business(deps)
        return instance._init()
    }

    async _init() {
        this.currentStream = await this.media.getCamera()
        this.addVideoStream('test01')
    }

    addVideoStream (userId, stream = this.currentStream) {
        const isCurrentId = false
        this.view.renderVideo({
            userId,
            stream,
            isCurrentId
        })
    }

    //function called when a user connect
    onUserConnected = function() {
        return userId => {
            console.log('user connected', userId)
        }
    }

    //function called when a user disconnect
    onUserDisconnected = function() {
        return userId => {
            console.log('user disconnected', userId)
        }
    }
}