#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ASP.NET.CoreWebApp.Docker.Linux/ASP.NET.CoreWebApp.Docker.Linux.csproj", "ASP.NET.CoreWebApp.Docker.Linux/"]
RUN dotnet restore "ASP.NET.CoreWebApp.Docker.Linux/ASP.NET.CoreWebApp.Docker.Linux.csproj"
COPY . .
WORKDIR "/src/ASP.NET.CoreWebApp.Docker.Linux"
RUN dotnet build "ASP.NET.CoreWebApp.Docker.Linux.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ASP.NET.CoreWebApp.Docker.Linux.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ASP.NET.CoreWebApp.Docker.Linux.dll"]