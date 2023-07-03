package com.side.calendar.model.schedule;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class ScheduleDto {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ScheduleCreateDto {
        
        String title;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        Date date;

        Integer hour;
        Integer min;
    }
    
}
