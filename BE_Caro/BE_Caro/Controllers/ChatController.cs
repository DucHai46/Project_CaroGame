using BE_Caro.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("Chat")]
        public async Task<IActionResult> ChatAsync(string user, string message, string roomName)
        {
            await _hubContext.Clients.Group(roomName).SendAsync("ReceiveMessage", user, message);

            return Ok("Send message");
        }
    }
}
