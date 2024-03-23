package com.epiroom.api.model.dto;

import java.util.Date;

public class PostLogTime {
    private int timestamp;
    private int duration;

    public PostLogTime() {
    }

    public long getTimestamp() {
        return timestamp;
    }

    public int getDuration() {
        return duration;
    }
}
