using Microsoft.EntityFrameworkCore;

namespace BE_Caro.Models
{
    public class Room : DbContext
    {
        public string Player_1 { get; set; }
        public string Player_2 { get; set; }
        public string ChessBoard_state { get; set; }
        public int Score_1 { get; set; }
        public int Score_2 { get; set; }
        public int Turn {  get; set; }
    }
}
