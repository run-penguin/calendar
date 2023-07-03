package com.side.calendar.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.side.calendar.model.schedule.ScheduleDto.ScheduleCreateDto;
import com.side.calendar.model.schedule.ScheduleDto.ScheduleListDto;
import com.side.calendar.model.schedule.ScheduleService;

@RestController
public class IndexRestController {


    private @Autowired ScheduleService scheduleService;


    @GetMapping("/schedule/list")
    public List<ScheduleListDto> list(@DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        
        try {
            return scheduleService.list(startDate, endDate);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }

    @PostMapping("/schedule/create")
    public void create(ScheduleCreateDto createDto) {

        try {
            scheduleService.create(createDto);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
}
