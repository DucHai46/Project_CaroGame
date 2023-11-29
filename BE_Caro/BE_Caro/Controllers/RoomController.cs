using BE_Caro.Context;
using BE_Caro.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly CaroGameContext _gameContext;

        public RoomController(CaroGameContext gameContext)
        {
            _gameContext = gameContext;
        }

        [HttpPost("CreateRoom")]
        public IActionResult JoinRoom()
        {
            Room room = new Room();
            _gameContext.Add(room);
            _gameContext.SaveChanges();
            return Ok();
        }

        [HttpGet("GetAllRoom")]
        public IActionResult GetRoom()
        {
            List<Room> roomList = _gameContext.rooms.ToList();
            return Ok(roomList);
        }

        [HttpGet("GetRoom")]
        public IActionResult GetRoombyId(int id)
        {
            var room = _gameContext.rooms.Where(r => r.ID == id).FirstOrDefault<Room>();
            return Ok(room);
        }

        [HttpPost("JoinRoom")]
        [Authorize]
        public IActionResult JoinRoom(int id, string name) 
        {
            var room = _gameContext.rooms.Where(r => r.ID == id).FirstOrDefault<Room>();
            if(room.Player_1  == "")
            {
                room.Player_1 = name;
            }
            else if(room.Player_2 == "")
            {
                room.Player_2 = name;
            }
            else
            {
                return BadRequest();
            }
            _gameContext.SaveChanges();
            return Ok();
        }

        [HttpPost("LeaveRoom")]
        [Authorize]
        public IActionResult LeaveRoom(int id, string name)
        {
            var room = _gameContext.rooms.Where(r => r.ID == id).FirstOrDefault<Room>();
            if (room.Player_1 == name)
            {
                room.Player_1 = "";
            }
            else if (room.Player_2 == name)
            {
                room.Player_2 = "";
            }
            else
            {
                return BadRequest();
            }
            _gameContext.SaveChanges();
            return Ok();
        }


    }
}
