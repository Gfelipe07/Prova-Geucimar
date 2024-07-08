using Microsoft.EntityFrameworkCore;

public static class MedicamentosApi
{
  public static void MapMedicamentosApi(this WebApplication app)
  {
    var group = app.MapGroup("/medicamentos");

    group.MapGet("/", async (BancoDeDados db) =>
      {
        return await db.Medicamentos.ToListAsync();
      }
    );

  //ESTAVA SEM POST
    group.MapPost("/", async (Medicamento medicamento, BancoDeDados db) =>
      {
        db.Medicamentos.Add(medicamento);
        await db.SaveChangesAsync();
        return Results.Created($"/medicamentos/{medicamento.Id}", medicamento);
      }
    );

    group.MapPut("/{id}", async (int id, Medicamento medicamentoAlterado, BancoDeDados db) =>
      {
        var medicamento = await db.Medicamentos.FindAsync(id);
        if (medicamento is null)
        {
            return Results.NotFound();
        }
        medicamento.Nome = medicamentoAlterado.Nome;
        medicamento.Paciente = medicamentoAlterado.Paciente;

        await db.SaveChangesAsync();
        return Results.NoContent();
      }
    );

    group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
      {
        if (await db.Medicamentos.FindAsync(id) is Medicamento medicamento)
        {
          db.Medicamentos.Remove(medicamento);
          await db.SaveChangesAsync();
          return Results.NoContent();
        }
        return Results.NotFound();
      }
    );


    group.MapGet("/carga", async (BancoDeDados db) =>
      {
        foreach (var medicamento in await db.Medicamentos.ToListAsync())
        {
          db.Medicamentos.Remove(medicamento);
        }
        
        Medicamento medicamento1 = new Medicamento
        {
          Nome = "Benztropina",
          Paciente = "Maria"
        };

        Medicamento medicamento2 = new Medicamento
        {
          Nome = "Clordiazepoxida",
          Paciente = "Pedro"
        };

        Medicamento medicamento3 = new Medicamento
        {
          Nome = "Metocarbamol",
          Paciente = "Pedro"
        };

        Medicamento medicamento4 = new Medicamento
        {
          Nome = "Obinutuzumabe",
          Paciente = "Claudio"
        };

        Medicamento medicamento5 = new Medicamento
        {
          Nome = "Loratadina",
          Paciente = "Claudio"
        };

        db.Medicamentos.AddRange(medicamento1, medicamento2, medicamento3, medicamento4, medicamento5);

        await db.SaveChangesAsync();
        return Results.NoContent();
      }
    );
  }
}