import socket
import datetime
import threading

class Cliente:
    def __init__(self, HOST = "127.0.0.1", PORT = 5000, name = "burricimo"):
        self.name = name

        self.HOST = HOST
        self.PORT = PORT

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((HOST, PORT))
            s.sendall(f"[Nueva Persona!!!] {self.name} se ha conectado ~ Bienvinidos!".encode())

            threading.Thread(target=self.recibo_thread, args=(s,)).start()

            while True:
                toSend = input(f"{name} >>> ")
                s.sendall(f"{self.name} | {str(datetime.datetime.now()).split('.')[0]} | {toSend}".encode())
                print("client: sent")

    def recibo_thread(self, s):
        while True:
            data = s.recv(1024)
            if not data:
                continue
            print("client: get")
            print(f"{data.decode()}")

if __name__ == "__main__":
    Cliente()