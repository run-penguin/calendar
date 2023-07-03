
var pageDate = null;

$(window).on('load', function() {

    pageDate = dayjs();

    // 현재날짜 입력
    $('input[type="date"]').val(pageDate.format('YYYY-MM-DD'));

    makeCalendar();
    loadSchedule();
    
    addEvents();
});

function addEvents() {

    // 팝업 닫기
    $('.js-close').on('click', function() {
        $('.js-back').removeClass('active');
        $(this).closest('.js-popup').removeClass('active');
    });
    $('.js-back').on('click', function() {
        $('.js-back').removeClass('active');
        $('.js-popup').removeClass('active');
    });

    // 이전 달 불러오기
    $('#btnPreMonth').on('click', function(){
        pageDate = pageDate.add(-1, 'month');
        makeCalendar();
    });
    // 다음 달 불러오기
    $('#btnNextMonth').on('click', function(){
        pageDate = pageDate.add(1, 'month');
        makeCalendar();
    });
    // 오늘로 이동
    $('#btnToday').on('click', function(){
        pageDate = dayjs();
        makeCalendar();
    });


    // 일정 추가 버튼 클릭
    $('#btnAddSch').on('click', function(){

        $('.cont-wrap').addClass('calendar-control');
        $('.calendar-edit').removeClass('active');

        $('#divCreate').addClass('active');
        $('.js-back').addClass('active');
    });

    // 일정 등록
    $('#btnCreate').on('click', function() {

        $.ajax({
            type: 'post',
            url: '/schedule/create',
            data: $('#createForm').serialize(),
            success: (res) => {
                location.reload();
            },
            error: (jqXHR) => {
                console.log(jqXHR);
            }
        });
    });
}
function makeCalendar() {

    /**
     * title (year, month)
     */
    const spTitle = $('#spTitle');
    spTitle.text(pageDate.format('YYYY') + '. ' + pageDate.format('MM'));

    /**
     * set date
     */
    // month - first date,  last date
    const firstDate = pageDate.startOf('month');
    const lastDate = pageDate.endOf('month');

    // first week start date, last week end date
    const startDate = firstDate.startOf('week');
    const endDate = lastDate.endOf('week');

    // current date
    var crtDate = startDate.clone();

    /**
     * insert template
     */
    // clear
    const divMonth = $('#divMonth');
    divMonth.empty();

    var divWeek = null;

    // first week start date ~ last week end date
    while (endDate >= crtDate) {

        // week - first date
        var weekFirstDate = crtDate.startOf('week');

        // week first date => new div
        if (weekFirstDate.format('YYYY-MM-DD') === crtDate.format('YYYY-MM-DD')) {

            divWeek = $('<div>', { class: 'week' });
            divMonth.append(divWeek);
        }

        // add date frame
        var divDay = $('<div>', { class: 'day', 'data-yyyymmdd': crtDate.format('YYYY-MM-DD'), 'data-count': 0 });
        divWeek.append(divDay);


        // .day-top
        var btnDate = $('<button>', { class: 'day-top' });
        divDay.append(btnDate);

        var spDate = $('<span>', { class: 'day-num', text: crtDate.format('DD') });
        btnDate.append(spDate);

        if (firstDate > crtDate) {
            // pre month
            spDate.addClass('last');
        } else if (crtDate > lastDate) {
            // next month
            spDate.addClass('next');
        }

        // 오늘 날짜인 경우 강조
        var now = dayjs();
        if (now.format('YYYY-MM-DD') === crtDate.format('YYYY-MM-DD')) {
            spDate.addClass('today');
        }

        // .day-event
        var divEvent = $('<div>', { class: 'day-event' });
        divDay.append(divEvent);

        // add current date
        crtDate = crtDate.add(1, 'days');
    }
}
function loadSchedule() {

    // month - first date, last date
    const mFirstDate = pageDate.startOf('month');
    const mLastDate = pageDate.endOf('month');

    $.ajax({
        type: 'get',
        url: '/schedule/list',
        data: {
            startDate: mFirstDate.format('YYYY-MM-DD'),
            endDate: mLastDate.format('YYYY-MM-DD')
        },
        success: (scdList) => {
            
            const divMonth = $('#divMonth');

            // calendar first date, last date
            const calFirstDate = mFirstDate.startOf('week');
            const calLastDate = mLastDate.endOf('week');

            $.each(scdList, (scdIndex, scdDto) => {

                // schedule first date ~ last date
                var scdFirstDate = dayjs(scdDto.date);
                var scdLastDate = dayjs(scdDto.date);

                var fstWkDate = null;
                var fstWkBox = null;

                // schedule first ~ end
                var crtDate = scdFirstDate.clone();
                while (scdLastDate >= crtDate) {

                    // 현재날짜 >= 캘린더 첫번째 날 (캘린더에 표시되는 날짜의 이전 일정은 생략)
                    if (crtDate >= calFirstDate) {

                        // .day (해당 날짜의 div 찾기)
                        var divDate = divMonth.find('.day[data-yyyymmdd="' + crtDate.format('YYYY-MM-DD') + '"]');

                        // .day - count
                        var count = divDate.attr('data-count');

                        // .day-event
                        var divEvent = divDate.children('.day-event');

                        // .day-event-box
                        var divBox = $('<div>', { class: 'day-event-box row' + count });
                        divEvent.append(divBox);

                        
                        // current week - create first div
                        if (fstWkDate === null) {

                            // 공유
                            fstWkBox = divBox;

                            // day-event-box > a
                            var a = $('<a>', { href: '#', 'data-scdId': scdDto.id, class: 'sailing' });
                            divBox.append(a);

                            // day-event-box > a > span (일정 구분명)
                            console.log(scdDto);
                            var spType = $('<span>', { text: scdDto.title });
                            a.append(spType);

                            // title
                            a.attr('title', scdDto.title);

                            fstWkDate = crtDate.clone();
                        }

                        // 이번 주 마지막 날짜에 도착 / 일정의 마지막 날짜에 도착
                        // if (crtDate.format('YYYY-MM-DD') === crtDate.endOf('week').format('YYYY-MM-DD')) {

                        //     // 일정의 이번 주 첫째 날 ~ 마지막 일정까지 diff 계산
                        //     var diff1 = crtDate.endOf('week').diff(fstWkDate, 'days');
                        //     // var width = 14.29 * (diff1 + 1);
                        //     var width = (diff1 + 1) * 100;
                        //     fstWkBox.css('width', 'calc(' + width + '% + ' + diff1 + 'px)');
                        
                        //     fstWkDate = null;
                        
                        // } else if (crtDate.format('YYYY-MM-DD') === scdLastDate.format('YYYY-MM-DD')) {
                        
                        //     // 일정의 이번 주 첫째 날 ~ 마지막 일정까지 diff 계산
                        //     var diff1 = scdLastDate.diff(fstWkDate, 'days');
                        //     // var width = 14.29 * (diff1 + 1);
                        //     var width = (diff1 + 1) * 100;
                        //     fstWkBox.css('width', 'calc(' + width + '% + ' + diff1 + 'px)');
                        // }

                        // 작업 완료 후 count 기입
                        divDate.attr('data-count', ++count);
                    }

                    // +1 date
                    crtDate = crtDate.add(1, 'days');
                    
                }
                
            });
        },
        error: (jqXHR) => {
            console.log(jqXHR);
        }
    });
}