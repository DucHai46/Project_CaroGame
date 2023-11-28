using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace BE_Caro.Models
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, string roomName)
        {
            // Gửi tin nhắn đến các client khác trong cùng phòng chat
            await Clients.OthersInGroup(roomName).SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public async Task LeaveRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
    }
}
