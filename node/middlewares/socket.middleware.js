/**
 * Created by Ibrahim on 16/06/2017.
 */
export default io => {


  io.sockets.on('connection', (socket) => {
    //connection established
    console.log('Connected ....................');

    io.sockets.emit('this', {will: 'be received by everyone'});

    socket.on('message', message => {
      console.log("message", message);
      io.sockets.emit('messageToVue',message);
    });

  });

  io.on('disconnect', (socket) => {
    console.log("Disconnect", socket.id)
  });


};


