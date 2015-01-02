package org.modzila.dave.event;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;

public class ListenerServer {

    public ListenerServer() {
        if (null == server) {
            Configuration config = new Configuration();
            config.setPort(9092);
            server = new SocketIOServer(config);
            server.addEventListener("chatevent", ChatObject.class, new DataListener<ChatObject>() {
                @Override
                public void onData(SocketIOClient client, ChatObject data, AckRequest ackRequest) {
                    // broadcast messages to all clients
                    server.getBroadcastOperations().sendEvent("chatevent", data);
                }
            });
            server.start();
        }
    }

    public void close() {
        if (null != server) {
            server.stop();
        }
    }

    private static SocketIOServer server;
}
