using BE_Caro.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            this._hubContext = hubContext;
        }

        [HttpPost("Chat")]
        public async Task<IActionResult> Chat(string user, string message, string roomName)
        {
            await this._hubContext.Clients.Group(roomName).SendAsync("ReceiveMessage", user, message);

            return Ok();
        }

        [HttpPost("PlayChess")]
        public async Task<IActionResult> PlayChess(string user, string message, string roomName)
        {
            await this._hubContext.Clients.Group(roomName).SendAsync("ReceiveChess", user, message);

            return Ok();
        }

        [HttpPost("JoinRoom")]
        public async Task<IActionResult> JoinRoom(string userId, string roomName)
        {
            await _hubContext.Groups.AddToGroupAsync(userId, roomName);
            //await _hubContext.Clients.All.SendAsync("JoinRoom");
            return Ok();
        }

        [HttpPost("LeaveRoom")]
        public async Task<IActionResult> LeaveRoom(string userId, string roomName)
        {
            await this._hubContext.Groups.RemoveFromGroupAsync(userId, roomName);
            //await _hubContext.Clients.All.SendAsync("LeaveRoom");
            return Ok();
        }
    }
}
