package com.side.calendar.model.schedule;

import java.sql.Date;
import java.util.List;

public interface ScheduleRepositoryCustom {
    List<Schedule> list(Date startDate, Date endDate);
}
