
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BancoDeDados>();
builder.Services.AddCors();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(
  options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);

var app = builder.Build();

app.UseCors(builder => builder
  .AllowAnyOrigin()
  .AllowAnyHeader()
  .AllowAnyMethod()
);

app.UseSwagger();
app.UseSwaggerUI();
app.MapGet("/", () => "APIs backnet");
app.MapMedicamentosApi();
app.MapPacientesApi();

app.Run();

    //VERIFICA A SENHA DO MYSQL ali em 'password'
    //dotnet ef migrations add "VersaoInicial"
    //dotnet ef database update
    //criação do post de Medicamentos