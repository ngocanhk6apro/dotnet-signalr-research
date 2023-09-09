const initializeSignalRConnection = (func) => {
    /**
     * 
     * NOTE: SignalR using 3 types of transport:
     * - Websockets
     * - Server Send Events (SSE)
     * - Long Polling (interval ajax call)
     * 
     * The first step of establishing the connection to the signalr server is the negotiation step
     * to determine the suitable transport type to skip when you ensure the supported transport
     * you can specify the option skipNegotiation: true
     * 
     */
    const connection = new signalR.HubConnectionBuilder().withUrl("/signalr-chat", {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
    }).build();
    connection.start().then(func).catch(err => console.error(err.toString()));
    return connection;
};

const [btnChat, chatContainer, chatMessage] = ["#btnSend", "#chatContainer", "#chatMessage"].map(it => document.querySelector(it));

const chatConnection = initializeSignalRConnection(function () {
    btnChat.removeAttribute("disabled");
});

chatConnection.on("ReceiveServerMessage", ({name, content }) => { 
    const pTag = document.createElement("p");
    pTag.innerText = `${name} >> ${content}`;
    chatContainer.appendChild(pTag);
    chatMessage.value = "";
});


btnChat.addEventListener("click", () => {
    const messasge = chatMessage.value.trim();
    if (!messasge) {
        alert("Empty chat content.");
        return;
    }

    chatConnection.invoke("SendMessageAsync", {
        name: "NgocAnh",
        content: messasge
    });
});