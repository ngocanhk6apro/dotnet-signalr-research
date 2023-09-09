using Microsoft.AspNetCore.SignalR;
using webapp.Models;

namespace webapp
{
    public class ChatHub : Hub
    {
        private readonly Guid _chatInstanceIdentity;

        public ChatHub()
        {
            _chatInstanceIdentity = Guid.NewGuid();
        }

        public async Task SendMessageAsync(ChatMessage chatMessage)
        {
            var conenctionId = Context.ConnectionId;
            await Clients.All.SendAsync("ReceiveServerMessage", chatMessage);
        }

        public override Task OnConnectedAsync()
        {
            var conenctionId = Context.ConnectionId;
            return base.OnConnectedAsync();
        }
    }
}
