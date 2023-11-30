using Microsoft.EntityFrameworkCore;

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
        public Room() 
        {
            Player_1 = "___";
            Player_2 = "___";
            ChessBoard_state = "_________________________________________________";
            Score_1 = 0;
            Score_2 = 0;
            Turn = 1;
        }


    }
}
