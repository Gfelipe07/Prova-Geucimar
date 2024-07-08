using Microsoft.EntityFrameworkCore;

public static class PacientesApi
{
  public static void MapPacientesApi(this WebApplication app)
  {
    var group = app.MapGroup("/pacientes");

    group.MapGet("/", async (BancoDeDados db) =>
      {
        return await db.Pacientes.ToListAsync();
      }
    );

    group.MapPost("/", async (Paciente paciente, BancoDeDados db) =>
      {
        db.Pacientes.Add(paciente);
        await db.SaveChangesAsync();
        return Results.Created($"/pacientes/{paciente.Id}", paciente);
      }
    );

    group.MapPut("/{id}", async (int id, Paciente pacienteAlterado, BancoDeDados db) =>
      {
        var paciente = await db.Pacientes.FindAsync(id);
        if (paciente is null)
        {
            return Results.NotFound();
        }
        paciente.Nome = pacienteAlterado.Nome;

        await db.SaveChangesAsync();
        return Results.NoContent();
      }
    );

    group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
      {
        if (await db.Pacientes.FindAsync(id) is Paciente paciente)
        {
          db.Pacientes.Remove(paciente);
          await db.SaveChangesAsync();
          return Results.NoContent();
        }
        return Results.NotFound();
      }
    );


    group.MapGet("/carga", async (BancoDeDados db) =>
    {
      foreach (var paciente in await db.Pacientes.ToListAsync())
      {
        db.Pacientes.Remove(paciente);
      }

      Paciente paciente1 = new Paciente
      {
        Nome = "Maria"
      };

      Paciente paciente2 = new Paciente
      {
        Nome = "Pedro"
      };

      Paciente paciente3 = new Paciente
      {
        Nome = "Claudio"
      };

      db.Pacientes.AddRange(paciente1, paciente2, paciente3);

      await db.SaveChangesAsync();
      return Results.NoContent();
    }
  );
  }
}