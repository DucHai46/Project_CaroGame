using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_Caro.Migrations
{
    public partial class DeleteChatinRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "History_chat",
                table: "rooms");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "History_chat",
                table: "rooms",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
