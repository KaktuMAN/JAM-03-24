package com.epiroom.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "promotions")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "year")
    private int year;

    public Promotion() {
    }

    public Promotion(int year) {
        this.year = year;
    }

    public int getId() {
        return id;
    }

    public int getYear() {
        return year;
    }
}