package com.epiroom.api.model.dto;

import com.epiroom.api.model.LogTime;

public class SimpleLogTime {
    private String mail;
    private int duration;

    private int promotion;

    public SimpleLogTime() {
    }

    public SimpleLogTime(LogTime logTime) {
        this.mail = logTime.getUser().getMail();
        this.duration = logTime.getDuration();
        this.promotion = logTime.getUser().getPromotion().getYear();
    }

    public String getMail() {
        return mail;
    }

    public int getDuration() {
        return duration;
    }

    public int getPromotion() {
        return promotion;
    }

    public void addDuration(int duration) {
        this.duration += duration;
    }
}
