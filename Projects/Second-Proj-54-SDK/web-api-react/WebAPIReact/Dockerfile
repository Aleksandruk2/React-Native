# ===== BUILD =====
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY WebAPIReact/WebAPIReact.csproj WebAPIReact/
RUN dotnet restore WebAPIReact/WebAPIReact.csproj

COPY . .
WORKDIR /src/WebAPIReact
RUN dotnet publish -c Release -o /app/publish

# ===== RUNTIME =====
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

EXPOSE 8080

COPY --from=build /app/publish .


ENTRYPOINT ["dotnet", "WebAPIReact.dll"]
 