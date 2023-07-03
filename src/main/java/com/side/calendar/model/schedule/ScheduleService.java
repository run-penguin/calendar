package com.side.calendar.model.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.side.calendar.model.schedule.ScheduleDto.ScheduleCreateDto;

@Service
public class ScheduleService {

    
    private @Autowired ScheduleRepository scheduleRepository;


    public void create(ScheduleCreateDto createDto) throws Exception {
        Schedule schedule = Schedule.builder()
            .title(createDto.getTitle())
            .date(new java.sql.Date(createDto.getDate().getTime()))
            .hour(createDto.getHour())
            .min(createDto.getMin())
            .build();
        scheduleRepository.save(schedule);
    }
    
}
