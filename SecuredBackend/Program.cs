using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = false;
    o.Authority = config.GetValue<string>("Jwt:Authority");
    o.Audience = config.GetValue<string>("Jwt:Audience");
});

builder.Services.AddCors(opts =>
{
    opts.AddPolicy(name: "any", builder => 
        builder.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("any");

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/numero", [Authorize]() =>
{
    var rng = new Random();
    int[] Numeros = Enumerable.Range(0, 100).ToArray<int>();

    return Enumerable.Range(1, 5).Select(index =>
    {
        var pos = rng.Next(1, Numeros.Length);
        return Numeros[pos];
    }).ToArray();
});

app.Run();
