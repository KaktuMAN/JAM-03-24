package com.epiroom.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "log_time")
public class LogTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "mail")
    private String mail;

    @Column(name = "date")
    private Date date;

    @Column(name = "duration")
    private int duration;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mail", insertable = false, updatable = false)
    private User user;

    public LogTime() {
    }

    public LogTime(String mail, Date date, Integer duration) {
        this.mail = mail;
        this.date = date;
        this.duration = duration;
    }

    public int getId() {
        return id;
    }

    public String getMail() {
        return mail;
    }

    public Date getDate() {
        return date;
    }

    public Integer getDuration() {
        return duration;
    }

    public User getUser() {
        return user;
    }
}
