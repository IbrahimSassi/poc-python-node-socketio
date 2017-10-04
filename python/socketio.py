from socketIO_client import SocketIO, BaseNamespace
import random
from faker import Faker
fake = Faker()

from time import sleep
class Namespace(BaseNamespace):

    def on_connect(self):
        print ('[Connected]')

socketIO = SocketIO('http://localhost', 3001, Namespace)
while True:
    sleep(5)
    socketIO.emit('message',{ 'label': fake.name(), 'value': random.uniform(20,50) })
socketIO.wait()
