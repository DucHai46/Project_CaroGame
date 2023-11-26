﻿using Microsoft.EntityFrameworkCore;

namespace BE_Caro.Models
{
    public class Room
    {
        public int ID { get; set; }
        public string Player_1 { get; set; }
        public string Player_2 { get; set; }
        public string ChessBoard_state { get; set; }
        public int Score_1 { get; set; }
        public int Score_2 { get; set; }
        public int Turn {  get; set; }
        public string History_chat {  get; set; }
        public Room() 
        {
            Player_1 = string.Empty;
            Player_2 = string.Empty;
            ChessBoard_state = "_________________________________________________";
            Score_1 = 0;
            Score_2 = 0;
            Turn = 1;
            History_chat = string.Empty;
        }
    }
}
