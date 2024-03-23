package com.epiroom.api.model.dto;

import java.util.List;

public class PostIntraData {
    private String mail;
    private int promotion;
    private List<PostLogTime> logTimes;

    public PostIntraData() {
    }

    public PostIntraData(String mail, int promotion, List<PostLogTime> logTimes) {
        this.mail = mail;
        this.promotion = promotion;
        this.logTimes = logTimes;
    }

    public String getMail() {
        return mail;
    }

    public int getPromotion() {
        return promotion;
    }

    public List<PostLogTime> getLogTimes() {
        return logTimes;
    }
}
