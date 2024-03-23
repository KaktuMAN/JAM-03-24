package com.epiroom.api.model.dto;

import com.epiroom.api.model.LogTime;

public class SimpleLogTime {
    private String mail;
    private int duration;

    public SimpleLogTime() {
    }

    public SimpleLogTime(LogTime logTime) {
        this.mail = logTime.getUser().getMail();
        this.duration = logTime.getDuration();
    }

    public String getMail() {
        return mail;
    }

    public int getDuration() {
        return duration;
    }
}
