package com.side.calendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.side.calendar.model.schedule.ScheduleService;
import com.side.calendar.model.schedule.ScheduleDto.ScheduleCreateDto;

@RestController
public class IndexRestController {


    private @Autowired ScheduleService scheduleService;


    @PostMapping("/schedule/create")
    public void create(ScheduleCreateDto createDto) {

        try {
            scheduleService.create(createDto);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
}
