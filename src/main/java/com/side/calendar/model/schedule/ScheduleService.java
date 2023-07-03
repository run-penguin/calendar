package com.side.calendar.model.schedule;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.side.calendar.model.schedule.ScheduleDto.ScheduleCreateDto;
import com.side.calendar.model.schedule.ScheduleDto.ScheduleListDto;

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

    public List<ScheduleListDto> list(Date startDate, Date endDate) throws Exception {
        
        java.sql.Date sDate = new java.sql.Date(startDate.getTime());
        java.sql.Date eDate = new java.sql.Date(endDate.getTime());

        List<ScheduleListDto> dtoList = new ArrayList<ScheduleListDto>();
        for (Schedule scd : scheduleRepository.list(sDate, eDate)) {
            dtoList.add(
                ScheduleListDto.builder()
                .id(scd.getId())
                .title(scd.getTitle())
                .date(new Date(scd.getDate().getTime()))
                .hour(scd.getHour())
                .min(scd.getMin())
                .build()
            );
        }

        return dtoList;
    }
    
}
