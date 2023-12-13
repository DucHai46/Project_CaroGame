using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace BE_Caro.Models
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, string roomName)
        {
            // Gửi tin nhắn đến các client khác trong cùng phòng chat
            await Clients.All.SendAsync("ReceiveMessage", user, message, roomName);
        }

        public async Task PlayChess(string roomName)
        {
            // Gửi tin nhắn đến các client khác trong cùng phòng chat
            await Clients.All.SendAsync("PlayChess");
        }

        public async Task JoinRoom(string roomName, string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.All.SendAsync("JoinRoom", user);
        }

        public async Task LeaveRoom(string roomName, string user)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            await Clients.All.SendAsync("LeaveRoom", user);
        }
    }
}
