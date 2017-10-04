from socketIO_client import SocketIO, BaseNamespace
from time import sleep
class Namespace(BaseNamespace):

    def on_connect(self):
        print ('[Connected]')

socketIO = SocketIO('http://localhost', 3001, Namespace)
while True:
    sleep(5)
    socketIO.emit('message','hello world')
socketIO.wait()
