#no son mas importantes
import asyncio
import socket
import time
import threading

# La clase de servidor
# definido como servidor independiente
# no hay funcionalidades de cliente, por ejemplo, no hay un método para enviar mensajes

class Servidor():

    def __init__(self, HOST = "127.0.0.1", PORT = 5000):
        self.HOST = HOST
        self.PORT = PORT

        #clientes a el servidor
        self.el_clube_de_burros = []

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((HOST, PORT))
            s.listen()

            #espera a que se conecte un cliente
            while True:
                connection = s.accept()

                self.el_clube_de_burros.append(connection)
                print(self.el_clube_de_burros)

                print(f"server event loop")

                self.recibo()

    def recibo(self):
        for conn, addr in self.el_clube_de_burros:
            data = conn.recv(1024)

            if not data:
                continue

            print("server: get")
            self.enviar(data)

    def enviar(self, data):
        for conn, addr in self.el_clube_de_burros:
            conn.sendall(data)
        print("server: MC @ All")

if __name__ == "__main__":
    Servidor()