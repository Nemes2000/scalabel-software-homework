﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using workday_service.Database;

#nullable disable

namespace workday_service.Migrations
{
    [DbContext(typeof(WorkdayDbContext))]
    [Migration("20250114151828_FixInitialData")]
    partial class FixInitialData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("workday_service.Models.Workday", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("ClosingTime")
                        .HasColumnType("datetime2");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<bool>("IsOpen")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("OpeningTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Workdays");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ClosingTime = new DateTime(2024, 11, 18, 17, 30, 0, 0, DateTimeKind.Local),
                            Date = new DateOnly(2024, 11, 18),
                            IsOpen = true,
                            OpeningTime = new DateTime(2024, 11, 18, 8, 0, 0, 0, DateTimeKind.Local)
                        },
                        new
                        {
                            Id = 2,
                            ClosingTime = new DateTime(2024, 11, 19, 17, 30, 0, 0, DateTimeKind.Local),
                            Date = new DateOnly(2024, 11, 19),
                            IsOpen = true,
                            OpeningTime = new DateTime(2024, 11, 19, 8, 0, 0, 0, DateTimeKind.Local)
                        },
                        new
                        {
                            Id = 3,
                            ClosingTime = new DateTime(2024, 11, 21, 16, 0, 0, 0, DateTimeKind.Local),
                            Date = new DateOnly(2024, 11, 21),
                            IsOpen = true,
                            OpeningTime = new DateTime(2024, 11, 21, 8, 0, 0, 0, DateTimeKind.Local)
                        },
                        new
                        {
                            Id = 4,
                            Date = new DateOnly(2024, 11, 22),
                            IsOpen = false
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
