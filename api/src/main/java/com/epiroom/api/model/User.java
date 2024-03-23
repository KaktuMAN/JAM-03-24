package com.epiroom.api.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String mail;

    @Column(name = "promotion")
    private int promotionId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "promotion", insertable = false, updatable = false)
    private Promotion promotion;

    public User() {
    }

    public User(String mail, int promotionId) {
        this.mail = mail;
        this.promotionId = promotionId;
    }

    public String getMail() {
        return mail;
    }

    public int getPromotionId() {
        return promotionId;
    }

    public Promotion getPromotion() {
        return promotion;
    }
}
