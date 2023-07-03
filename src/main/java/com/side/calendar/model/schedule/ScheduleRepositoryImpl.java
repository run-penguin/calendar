package com.side.calendar.model.schedule;

import java.sql.Date;
import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {


    private final JPAQueryFactory jqf;
    QSchedule schedule = QSchedule.schedule;


    @Override
    public List<Schedule> list(Date startDate, Date endDate) {
        return jqf
            .selectFrom(schedule)
            .where(
                schedule.date.between(startDate, endDate)
            )
            .fetch();
    }
    
}
