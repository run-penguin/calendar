
var pageDate = null;

$(window).on('load', function() {

    pageDate = dayjs();

    makeCalendar();
    
    addEvents();
});

function addEvents() {

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