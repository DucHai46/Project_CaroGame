using BE_Caro.Context;
using BE_Caro.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
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

        [HttpDelete("DeleteAllRoom")]
        public IActionResult DeleteAllRoom()
        {
            string tableName = "rooms";
            string resetIdentitySql = $"TRUNCATE TABLE {tableName} RESTART IDENTITY;";
            _gameContext.Database.ExecuteSqlRaw(resetIdentitySql);
            _gameContext.SaveChanges();
            return Ok();
        }

        [HttpGet("GetAllRoom")]
        public IActionResult GetRoom()
        {
            List<Room> roomList = _gameContext.rooms.ToList();
            return Ok(roomList);
        }

        [Authorize]
        [HttpGet("GetRoom")]
        public IActionResult GetRoombyId(int id)
        {
            var room = _gameContext.rooms.Where(r => r.ID == id).FirstOrDefault<Room>();
            return Ok(room);
        }

        [Authorize]
        [HttpPost("JoinRoom")]
        public async Task<IActionResult> JoinRoomAsync(int id, string name) 
        {
            var room = _gameContext.rooms.Where(r => r.ID == id).FirstOrDefault<Room>();
            if(room != null)
            {
                if(room.Player_1  == "___")
                {
                    room.Player_1 = name;
                }
                else if(room.Player_2 == "___")
                {
                    room.Player_2 = name;

                }
                else
                {
                    return BadRequest();
                }
                _gameContext.Entry(room).State = EntityState.Modified;

            }
            try
            {
                await _gameContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500);
            }
            return Ok(room);
        }

        [Authorize]
        [HttpPost("LeaveRoom")]
        public async Task<IActionResult> LeaveRoomAsync(int id, string name)
        {
            var room = _gameContext.rooms.Where(r => r.ID == id).FirstOrDefault<Room>();
            if(room != null)
            {
                if (room.Player_1 == name)
                {
                    room.Player_1 = "___";


                }
                else if (room.Player_2 == name)
                {
                    room.Player_2 = "___";

                }
                room.Score_1 = 0;
                room.Score_2 = 0;
                room.ChessBoard_state = "_________________________________________________";
                room.Turn = 1;
                _gameContext.Entry(room).State = EntityState.Modified;

            }
            try
            {
                await _gameContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500);
            }
            return Ok(room);
        }

        [Authorize]
        [HttpPost("GetTurn")]
        public async Task<IActionResult> GetTurn(int idroom) 
        {
            var room = _gameContext.rooms.Where(r => r.ID == idroom).FirstOrDefault<Room>();
            if (room != null)
            {
                if(room.Turn == 1) {  room.Turn = 2; }
                else { room.Turn = 1; }
                _gameContext.Entry(room).State = EntityState.Modified;
                try
                {
                    await _gameContext.SaveChangesAsync();
                }
                catch
                {
                    return StatusCode(500);
                }
                return Ok(room.Turn);
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPost("UpdateBoard")]
        public async Task<IActionResult> UpdateBoardAsync(int idroom, string chessboard)
        {
            var room = _gameContext.rooms.Where(r => r.ID ==idroom).FirstOrDefault<Room>();
            if(room != null)
            {
                room.ChessBoard_state = chessboard;
                _gameContext.Entry(room).State = EntityState.Modified;

            }
            try
            {
                await _gameContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500);
            }
            return Ok();
        }



    }
}
