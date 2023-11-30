﻿using BE_Caro.Context;
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
        public IActionResult JoinRoom(int id, string name) 
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
            }
            _gameContext.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpPost("LeaveRoom")]
        public IActionResult LeaveRoom(int id, string name)
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
                else
                {
                    return BadRequest();
                }
            }
            _gameContext.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpGet("GetTurn")]
        public IActionResult GetTurn(int idroom) 
        {
            var room = _gameContext.rooms.Where(r => r.ID == idroom).FirstOrDefault<Room>();
            var my_turn = 1;
            if (room != null)
            {
                my_turn = room.Turn;
                room.Turn = 3 - room.Turn;
            }
            _gameContext.SaveChanges();
            return Ok(my_turn);
        }


    }
}