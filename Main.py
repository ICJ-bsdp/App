import Server
import Client
import threading

def construir_servidor():
    Server.Servidor()

if __name__ == "__main__":
    threading.Thread(target=construir_servidor).start()

    client = Client.Cliente(name="no soy un burro")